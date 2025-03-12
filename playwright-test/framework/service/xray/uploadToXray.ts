import fs from 'fs-extra';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const XRAY_CLIENT_ID = process.env.XRAY_CLIENT_ID;
const XRAY_CLIENT_SECRET = process.env.XRAY_CLIENT_SECRET;
const XRAY_AUTH_URL = 'https://xray.cloud.getxray.app/api/v2/authenticate';
const XRAY_UPLOAD_URL =
  'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber?projectKey=DE&testExecKey=DE-13';
const REPORT_PATH = './test-results/cucumber-report.json';

// Function to authenticate with Xray and get a token
async function getXrayToken(): Promise<string> {
  try {
    const response = await axios.post<string>(XRAY_AUTH_URL, {
      client_id: XRAY_CLIENT_ID,
      client_secret: XRAY_CLIENT_SECRET,
    });

    return response.data; // The response contains only the token as a string
  } catch (error: any) {
    console.error('Error getting Xray token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Xray.');
  }
}

// Function to upload test results to Xray
async function uploadResults(): Promise<void> {
  try {
    const token = await getXrayToken();
    const reportData = await fs.readFile(REPORT_PATH, 'utf-8');

    const response = await axios.post<{ testExecIssue: { key: string } }>(XRAY_UPLOAD_URL, reportData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    console.log('✅ Xray Test Execution ID:', response.data.testExecIssue.key);
  } catch (error: any) {
    console.error('❌ Error uploading results to Xray:', error.response?.data || error.message);
  }
}

// Run the upload process
uploadResults();
