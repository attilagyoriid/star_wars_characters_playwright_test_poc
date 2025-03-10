import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async visitPage(path = '/') {
    await this.page.goto((process.env.npm_config_baseurl || process.env.BASE_URL) + path);
  }

  async waitForElementVisible(locator: Locator, timeout = 8000) {
    try {
      await locator.waitFor({
        state: 'visible',
        timeout: timeout,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Element not visible after ${timeout}ms: ${error.message}`);
      }
      throw new Error(`Element not visible after ${timeout}ms: Unknown error occurred`);
    }
  }
  async waitForElementAndClick(locator: Locator, timeout = 30000) {
    await this.waitForElementVisible(locator, timeout);
    await locator.click();
  }

  async waitForElementAndFill(locator: Locator, text: string, timeout = 30000) {
    await this.waitForElementVisible(locator, timeout);
    await locator.fill(text);
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle', timeout = 30000) {
    await this.page.waitForLoadState(state, { timeout });
  }

  async getElementByText(text: string, exact = true) {
    return this.page.getByText(text, { exact });
  }
}
