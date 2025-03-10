module.exports = {
  default: {
    tags: process.env.npm_config_tags || '',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['tests/**/features/**/*.feature'],
    publishQuiet: false,
    dryRun: false,
    require: [
      'tests/**/steps/**/*.ts', // Ensure this path is correct
      'framework/hooks/hooks.ts', // Ensure this path is correct
    ],
    requireModule: ['ts-node/register'],
    format: ['html:test-results/cucumber-report.html', 'json:test-results/cucumber-report.json', 'rerun:@rerun.txt'],
    parallel: +process.env.npm_config_parallel || 3,
  },
  rerun: {
    formatOptions: {
      snippetInterface: 'async-await',
    },
    publishQuiet: true,
    dryRun: false,
    require: [
      'tests/**/steps/**/*.ts', // Ensure this path is correct
      'framework/hooks/hooks.ts', // Ensure this path is correct
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'rerun:@rerun.txt',
    ],
    parallel: 2,
  },
};
