import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class StarWarsHomePage extends BasePage {
  // readonly inputBoxFirstName: Locator;
  // readonly inputBoxLastName: Locator;
  readonly inputBoxPhoneNumber: Locator;
  readonly inputBoxEmail: Locator;
  readonly inputSelectMonth: Locator;
  readonly inputSelectCourse: Locator;
  readonly containerSocial: Locator;
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
    // this.inputBoxFirstName = page.getByLabel('First Name *');
    // this.inputBoxLastName = page.getByLabel('Last Name *');
    // this.inputBoxPhoneNumber = page.getByLabel('Phone');
    // this.inputBoxEmail = page.getByLabel('Email *');
    // this.inputSelectMonth = page.getByLabel('Select the Month of the Batch');
    // this.inputSelectCourse = page.getByLabel('Select the Course you would');
    // this.containerSocial = page.locator('#nf-field-23-container');
    this.buttons = page.getByRole('button');
    // this.containerRegistrationCompleted = page.getByLabel('Your registration is').getByRole('paragraph');
  }

  async selectCharacterName(characterName: string) {
    await this.comboboxCharacter.selectOption(characterName);
  }

  async fillLastName(lastName: string) {
    await this.inputBoxLastName.fill(lastName);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.inputBoxPhoneNumber.fill(phoneNumber);
  }

  async fillEmail(email: string) {
    await this.inputBoxEmail.fill(email);
  }

  async selectMonth(month: string) {
    await this.inputSelectMonth.selectOption(month);
  }

  async selectCourse(course: string) {
    await this.inputSelectCourse.selectOption(course);
  }

  async selectSocial(social: string) {
    await this.containerSocial.filter({ hasText: social }).click();
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
