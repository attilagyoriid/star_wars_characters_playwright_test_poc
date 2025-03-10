import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class StarWarsHomePage extends BasePage {
  readonly buttons: Locator;
  readonly containerRegistrationCompleted: Locator;
  readonly comboboxCharacter: Locator;
  readonly headingCharacterName: Locator;
  readonly images: Locator;

  urlRequestedOnRegistration = 'https://codenboxautomationlab.com/wp-admin/admin-ajax.php';

  constructor(page: Page) {
    super(page);
    this.comboboxCharacter = page.getByRole('combobox');
    this.headingCharacterName = page.locator('h2');
    this.images = page.getByRole('img');
    this.buttons = page.getByRole('button');
  }

  async selectCharacterName(characterName: string) {
    await this.comboboxCharacter.selectOption(characterName);
  }

  async pressButtonByText(buttonText: string) {
    const button = this.buttons.filter({ hasText: buttonText });
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  async getCharacterName() {
    return await this.headingCharacterName.textContent();
  }

  async getImageByAltText(altText: string) {
    return await this.page.getByRole('img', { name: altText });
  }

  async getMissingImagePlaceholderByText(text: string, exact = true) {
    return this.getElementByText(text, exact);
  }
}
