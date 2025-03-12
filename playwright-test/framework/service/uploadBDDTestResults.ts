import { qTestService } from './QTestService';
import path from 'path';

async function uploadResults() {
  console.log('__dirname', __dirname);
  const reportPath = path.resolve(__dirname, '../../test-results/cucumber-report.json');
  try {
    await qTestService.uploadResults(reportPath);
    console.log('Test results uploaded to qTest successfully');
  } catch (error) {
    console.error('Failed to upload results:', error);
    process.exit(1);
  }
}

uploadResults();
