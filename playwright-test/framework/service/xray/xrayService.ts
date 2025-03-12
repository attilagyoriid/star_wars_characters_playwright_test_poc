import axios, { AxiosInstance } from 'axios';
import fs from 'fs-extra';

export interface XrayFeature {
  name: string;
  content: string;
  tags: string[];
  scenarios: string[];
}

export class XrayService {
  private api: AxiosInstance;
  private token: string;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://xray.cloud.getxray.app/api/v2',
      timeout: 30000,
    });
  }

  async authenticate() {
    try {
      const response = await axios.post('https://xray.cloud.getxray.app/api/v2/authenticate', {
        client_id: process.env.XRAY_CLIENT_ID,
        client_secret: process.env.XRAY_CLIENT_SECRET,
      });
      this.token = response.data;
      this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      return this.token;
    } catch (error) {
      console.error('Xray authentication failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async retrieveCucumberFeatures(testExecutionKey: string) {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await this.api.get(`/export/cucumber?keys=${testExecutionKey}`, {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log('response', response);

      // Save features to file
      await fs.writeJson('features/downloaded-features.json', response.data, { spaces: 2 });

      return response.data;
    } catch (error) {
      console.error('Failed to retrieve Cucumber features:', error.response?.data || error.message);
      throw error;
    }
  }
}
