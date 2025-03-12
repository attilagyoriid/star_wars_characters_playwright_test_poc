import { Parser, AstBuilder } from '@cucumber/gherkin';
import { GherkinDocument, IdGenerator, generateMessages } from '@cucumber/messages';
import PrettyFormatter from '@cucumber/pretty-formatter';
import { Readable } from 'stream';

export class GherkinFormatter {
  private static parser: Parser;
  private static idGenerator: IdGenerator;
  private static formatter: any;

  private static initialize() {
    this.idGenerator = new IdGenerator();
    this.parser = new Parser(new AstBuilder(this.idGenerator));
    this.formatter = new PrettyFormatter({
      colorsEnabled: false,
      printAttachments: false,
    });
  }

  public static async formatGherkinString(content: string): Promise<string> {
    if (!this.parser) {
      this.initialize();
    }

    try {
      // Clean the content
      const cleanContent = this.cleanGherkinContent(content);

      // Extract individual features
      const features = this.extractFeatures(cleanContent);

      // Format each feature
      const formattedFeatures = await Promise.all(features.map((feature) => this.formatSingleFeature(feature)));

      return formattedFeatures.join('\n\n');
    } catch (error) {
      console.error('Error formatting Gherkin content:', error);
      throw error;
    }
  }

  private static cleanGherkinContent(content: string): string {
    return (
      content
        // Remove binary content
        .replace(/PK[\x00-\x09\x0B-\x0F\x10-\x1F\x7F-\xFF][^\n]*/g, '')
        .replace(/[\x00-\x09\x0B-\x0F\x10-\x1F\x7F-\xFF]/g, '')
        // Fix line endings
        .replace(/\r\n/g, '\n')
        // Remove excessive tabs
        .replace(/\t/g, '  ')
        // Remove empty lines with spaces
        .replace(/^\s*[\r\n]/gm, '\n')
        // Remove multiple consecutive empty lines
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    );
  }

  private static extractFeatures(content: string): string[] {
    const features: string[] = [];
    let currentFeature = '';
    let inFeature = false;

    content.split('\n').forEach((line) => {
      if (line.includes('Feature:') && !line.includes('Scenario:')) {
        if (inFeature) {
          features.push(currentFeature.trim());
        }
        currentFeature = line + '\n';
        inFeature = true;
      } else if (inFeature) {
        currentFeature += line + '\n';
      }
    });

    if (currentFeature) {
      features.push(currentFeature.trim());
    }

    return features;
  }

  private static async formatSingleFeature(content: string): Promise<string> {
    try {
      // Parse the feature content
      const gherkinDocument = this.parser.parse(content);

      // Generate messages
      const messages = generateMessages(gherkinDocument, 'feature.feature', this.idGenerator);

      // Format using the messages
      let formattedContent = '';
      const writer = {
        write: (chunk: string) => {
          formattedContent += chunk;
        },
      };

      const stream = new Readable({
        objectMode: true,
        read() {
          messages.forEach((message) => this.push(message));
          this.push(null);
        },
      });

      await this.formatter.formatStream(stream, writer);

      return this.postProcessFormatting(formattedContent);
    } catch (error) {
      console.error('Error formatting feature:', error);
      return content; // Return original content if formatting fails
    }
  }

  private static postProcessFormatting(content: string): string {
    return content
      .split('\n')
      .map((line) => {
        if (line.trim().startsWith('Scenario:') || line.trim().startsWith('Scenario Outline:')) {
          return `  ${line.trim()}`;
        }
        if (
          line.trim().startsWith('Given ') ||
          line.trim().startsWith('When ') ||
          line.trim().startsWith('Then ') ||
          line.trim().startsWith('And ') ||
          line.trim().startsWith('But ')
        ) {
          return `    ${line.trim()}`;
        }
        if (line.trim().startsWith('|')) {
          return `      ${line.trim()}`;
        }
        if (line.trim().startsWith('Examples:')) {
          return `    ${line.trim()}`;
        }
        if (line.trim().startsWith('Background:')) {
          return `  ${line.trim()}`;
        }
        if (line.trim().startsWith('@')) {
          return line.trim();
        }
        return line;
      })
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/Examples:/g, '\n    Examples:')
      .replace(/\|\s{2,}/g, '| ')
      .replace(/\s{2,}\|/g, ' |');
  }
}
