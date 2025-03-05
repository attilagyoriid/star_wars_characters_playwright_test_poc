import * as fs from 'fs-extra';

import { CustomWorld } from '../../../framework/support/world';
import { Given } from '@cucumber/cucumber';

Given(
  'I mock reponse for api: {string} with {string} as response',
  async function (this: CustomWorld, api: string, responseFixture: string) {
    console.log('Mocking API responses from endpoint: **/api/people/...');
    const peopleMockResponse = await import(`../fixtures/${responseFixture}`);

    await this.page.route(api, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(peopleMockResponse),
      });
    });
  }
);
