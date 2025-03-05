import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { RegistrationPage } from './registrationPage';
import { StarWarsHomePage } from './starWarsHomePage';

export class PageManager extends BasePage {
  private readonly _registrationPage: RegistrationPage;
  private readonly _starWarsHomePage: StarWarsHomePage;

  constructor(page: Page) {
    super(page);

    this._registrationPage = new RegistrationPage(this.page);
    this._starWarsHomePage = new StarWarsHomePage(this.page);
  }

  get registrationPage() {
    return this._registrationPage;
  }

  get starWarsHomePage() {
    return this._starWarsHomePage;
  }
}
