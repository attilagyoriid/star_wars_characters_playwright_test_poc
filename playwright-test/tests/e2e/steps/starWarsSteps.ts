import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../../framework/support/world';

const { Before } = require('@cucumber/cucumber');

Given('I am on the Star Wars home page', async function (this: CustomWorld) {
  await this.pageManager.starWarsHomePage.visitPage();
  await this.pageManager.starWarsHomePage.waitForLoadState('domcontentloaded', 40000);
});

When('I select {string} from the list', async function (this: CustomWorld, characterName: string) {
  await this.pageManager.starWarsHomePage.selectCharacterName(characterName);
});
When('I fill Last Name field with: {string}', async function (this: CustomWorld, lastName: string) {
  await this.pageManager.registrationPage.fillLastName(lastName);
});
When('I fill Email field with: {string}', async function (this: CustomWorld, email: string) {
  await this.pageManager.registrationPage.fillEmail(email);
});
When('I fill Phone field with: {string}', async function (this: CustomWorld, phone: string) {
  await this.pageManager.registrationPage.fillPhoneNumber(phone);
});
When('I select item: {string} from Course drop-down list', async function (this: CustomWorld, course: string) {
  await this.pageManager.registrationPage.selectCourse(course);
});
When('I select item: {string} from Month drop-down list', async function (this: CustomWorld, month: string) {
  await this.pageManager.registrationPage.selectMonth(month);
});
When('I select item: {string} from How do you know about us list', async function (this: CustomWorld, social: string) {
  await this.pageManager.registrationPage.selectSocial(social);
});
When('I click {string} button', async function (this: CustomWorld, buttonText: string) {
  await this.pageManager.starWarsHomePage.pressButtonByText(buttonText);
});

Then('I will see the name of {string}', async function (this: CustomWorld, characterName: string) {
  expect(await this.pageManager.starWarsHomePage.getCharacterName()).toEqual(characterName);
});

Then('I will see the image of {string}', async function (this: CustomWorld, characterName: string) {
  expect(await this.pageManager.starWarsHomePage.getImageByAltText(characterName)).toBeVisible();
});
Then('I will not see the image of {string}', async function (this: CustomWorld, characterName: string) {
  expect(await this.pageManager.starWarsHomePage.getImageByAltText(characterName)).not.toBeVisible();
});
Then('I will see missing image text {string}', async function (this: CustomWorld, text: string) {
  expect(await this.pageManager.starWarsHomePage.getMissingImagePlaceholderByText(text)).toBeVisible();
});
