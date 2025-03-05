import { LaunchOptions, chromium, firefox, webkit } from '@playwright/test';

const options: LaunchOptions = {
  headless: !!process.env.npm_config_headless || false,
};
export const invokeBrowser = async () => {
  console.log('HEADLESS: ' + !!process.env.npm_config_headless || false);
  const browserType = process.env.npm_config_browser || 'chrome';
  switch (browserType) {
    case 'chrome':
      return await chromium.launch(options);
    case 'firefox':
      return await firefox.launch(options);
    case 'webkit':
      return await webkit.launch(options);
    default:
      throw new Error('Please set the proper browser!');
  }
};
