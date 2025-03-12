import { XrayTestRetrieverWithTypes } from './retrieveXrayBDDTests';
import dotenv from 'dotenv';

dotenv.config();

async function downloadFeatures() {
  const retriever = new XrayTestRetrieverWithTypes('features');

  try {
    const testExecutionKey = process.env.npm_config_ExecutionKey || process.env.EXECUTION_KEY;
    if (!testExecutionKey) {
      throw new Error('XRAY_TEST_EXECUTION_KEY environment variable is required');
    }

    const features = await retriever.retrieveCucumberFeatures(testExecutionKey);
    console.log(`Successfully downloaded ${features.length} features`);
  } catch (error) {
    console.error('Failed to download features:', error);
    process.exit(1);
  }
}

downloadFeatures();
