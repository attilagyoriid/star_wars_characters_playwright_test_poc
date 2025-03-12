const { XrayCloudClient } = require('@xrayio/jira');

const xray = new XrayCloudClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
});

async function uploadResults() {
  try {
    await xray.authenticate();
    const response = await xray.importExecutionCucumberJson('reports/cucumber-report.json');
    console.log('Upload successful:', response);
  } catch (error) {
    console.error('Error uploading results:', error);
    process.exit(1); // Ensure a non-zero exit code on failure
  }
}
