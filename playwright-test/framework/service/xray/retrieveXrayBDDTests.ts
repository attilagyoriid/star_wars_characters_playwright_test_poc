import { XrayService } from './xrayService';
import fs from 'fs-extra';
import path from 'path';
import { Parser } from 'gherkin';

class XrayTestRetriever {
  private xrayService: XrayService;
  private outputDir: string;

  constructor(outputDir: string = 'features') {
    this.xrayService = new XrayService();
    this.outputDir = outputDir;
  }

  async retrieveCucumberFeatures(testExecutionKey: string) {
    try {
      // Ensure output directory exists
      await fs.ensureDir(this.outputDir);

      // Authenticate and retrieve features
      await this.xrayService.authenticate();
      const features = await this.xrayService.retrieveCucumberFeatures(testExecutionKey);

      // Save features to file
      const filePath = path.join(this.outputDir, 'downloaded-features.feature');

      // Convert features to string before writing
      await fs.writeFile(filePath, JSON.stringify(features, null, 2));

      return features;
    } catch (error) {
      console.error('Failed to retrieve Cucumber features:', error);
      throw error;
    }
  }

  // If features need to be saved as individual files
  private async saveFeatures(features: any[]) {
    for (const feature of features) {
      const fileName = `${this.sanitizeFileName(feature.name)}.feature`;
      const filePath = path.join(this.outputDir, fileName);

      // Ensure feature content is a string
      const featureContent = typeof feature === 'string' ? feature : JSON.stringify(feature, null, 2);

      await fs.writeFile(filePath, featureContent);
    }
  }

  private sanitizeFileName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// Add proper types
interface XrayFeature {
  name: string;
  content: string;
  tags?: string[];
}

// Updated class with types
class XrayTestRetrieverWithTypes {
  private xrayService: XrayService;
  private outputDir: string;

  constructor(outputDir: string = 'features') {
    this.xrayService = new XrayService();
    this.outputDir = outputDir;
  }

  async retrieveCucumberFeatures(testExecutionKey: string): Promise<XrayFeature[]> {
    try {
      await fs.ensureDir(this.outputDir);
      await this.xrayService.authenticate();

      const features = await this.xrayService.retrieveCucumberFeatures(testExecutionKey);

      // Save all features
      await this.saveFeatures(features);

      // Also save raw JSON for reference
      const jsonPath = path.join(this.outputDir, 'features.json');
      await fs.writeFile(jsonPath, JSON.stringify(features, null, 2));

      return features;
    } catch (error) {
      console.error('Failed to retrieve Cucumber features:', error);
      throw error;
    }
  }

  private async saveFeatures(features: string) {
    console.log('Saving features:', features);
    const fileName = `${this.sanitizeFileName('execution')}.feature`;
    const filePath = path.join(this.outputDir, fileName);

    // const cleanString = features.replace(/PK[\x00-\xFF]+/g, '');
    // const parser = new Parser();
    // const parsed = parser.parse(cleanString);
    await fs.writeFile(filePath, this.cleanText(features));
  }

  private cleanText(rawString: string): string {
    // Regular expression to remove non-printable ASCII characters and binary data (ZIP header and footer)

    let cleanedString = rawString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x80-\xFF]/g, '');
    const pattern = /x001_.*?(?=\n|$)/;
    cleanedString = cleanedString.replace(pattern, '');
    return cleanedString;
  }

  private parseString(input: string): string {
    // Remove non-printable characters (excluding newlines, tabs, and carriage returns)
    const cleanedString = input.replace(/[\x00-\x1F\x7F-\x9F&&[^\n\r\t]]/g, '');

    // Normalize the line breaks (optional if you need specific formatting)
    const readableString = cleanedString.replace(/\s+/g, ' ').trim();

    return readableString;
  }

  private sanitizeFileName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// Example usage
async function main() {
  const retriever = new XrayTestRetrieverWithTypes();

  try {
    const features = await retriever.retrieveCucumberFeatures(process.env.XRAY_TEST_EXECUTION_KEY);
    console.log(`Retrieved ${features.length} features`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

export { XrayTestRetriever, XrayTestRetrieverWithTypes, XrayFeature };
