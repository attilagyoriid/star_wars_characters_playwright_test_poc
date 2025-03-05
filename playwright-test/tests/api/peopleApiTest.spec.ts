import { test, expect, APIRequestContext } from '@playwright/test';
import * as expectedResponse from './fixtures/people_reponse.json';
import { PerformanceMeasure } from 'framework/service/performanceMeasure';

async function getPeople(request: APIRequestContext) {
  const response = await request.get('https://swapi.dev/api/people/');
  await expect(response, 'API response status should be 200').toBeOK();

  return response;
}

test(
  'Verify SWAPI people endpoint',
  {
    tag: ['@api'],
  },
  async ({ request }) => {
    const response = await getPeople(request);
    const actualResponse = await response.json();

    await expect(response, 'API response status should be 200').toBeOK();

    await expect(
      actualResponse.count,
      `Expected count to be ${expectedResponse.count}, but got ${actualResponse.count}`
    ).toBe(expectedResponse.count);

    await expect(
      actualResponse.results.length,
      `Expected ${expectedResponse.results.length} results, but got ${actualResponse.results.length}`
    ).toEqual(expectedResponse.results.length);
    expect(actualResponse.results).toMatchObject(expectedResponse.results);
  }
);
