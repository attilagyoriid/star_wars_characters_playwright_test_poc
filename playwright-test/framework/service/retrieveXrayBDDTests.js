require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { JIRA_BASE_URL, XRAY_CLIENT_ID, XRAY_CLIENT_SECRET } = process.env;
const XRAY_AUTHENTICATION_URL = 'https://xray.cloud.getxray.app/api/v2/authenticate';

const EXECUTION_KEY = process.env.npm_config_ExecutionKey || process.env.EXECUTION_KEY;
async function authenticate() {
  console.log('EXECUTION_KEY', EXECUTION_KEY);
  const response = await axios.post(XRAY_AUTHENTICATION_URL, {
    client_id: XRAY_CLIENT_ID,
    client_secret: XRAY_CLIENT_SECRET,
  });
  return response.data;
}

async function retrieveCucumberFeatures(token) {
  console.log('EXECUTION_KEY', EXECUTION_KEY);
  const response = await axios.get(
    `${JIRA_BASE_URL}/rest/raven/1.0/export/test?keys=${EXECUTION_KEY}&format=cucumber`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer',
    }
  );

  const zipPath = path.join(__dirname, 'cucumber_features.zip');
  fs.writeFileSync(zipPath, response.data);
  console.log(`Cucumber features retrieved and saved to ${zipPath}`);
}

(async () => {
  try {
    const token = await authenticate();
    await retrieveCucumberFeatures(token);
  } catch (error) {
    console.error('Error retrieving Cucumber features:', error.message);
  }
})();
