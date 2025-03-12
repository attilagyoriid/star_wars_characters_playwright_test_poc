import Gherkin from 'gherkin';

export class FeatureFormatter {
  static formatGherkin(gherkinString: any) {
    const gherkinParser = new Gherkin.Parser();
    const gherkinFeatures = gherkinParser.parse(gherkinString);
    let result: string = `${gherkinFeatures.feature.keyword}: ${gherkinFeatures.feature.name}\n\n`;

    // Include tags if available
    if (gherkinFeatures.feature.tags && gherkinFeatures.feature.tags.length > 0) {
      result += gherkinFeatures.feature.tags.map((tag: any) => `@${tag.name}`).join(' ') + '\n\n';
    }

    gherkinFeatures.feature.children.forEach((scenario: any) => {
      result += `Scenario: ${scenario.scenario.keyword} ${scenario.scenario.name}\n`;

      // Include tags for each scenario
      if (scenario.scenario.tags && scenario.scenario.tags.length > 0) {
        result += '  Tags: ' + scenario.scenario.tags.map((tag: any) => `@${tag.name}`).join(' ') + '\n';
      }

      scenario.scenario.steps.forEach((step: any) => {
        result += `  ${step.keyword} ${step.text}\n`;
      });

      if (scenario.scenario.examples) {
        result += 'Examples:\n';
        scenario.scenario.examples.forEach((example: any) => {
          result += '  | ' + example.join(' | ') + ' |\n';
        });
      }

      result += '\n';
    });

    return result;
  }
}
