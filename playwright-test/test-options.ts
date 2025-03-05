import { test as base } from '@playwright/test';
import { PageManager } from '@pages/PageManager';

export interface TestOptions {
  globalsQaURL: string;
  formLayoutsPage: string;
  pageManager: PageManager;
}

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', { option: true }],

  formLayoutsPage: async ({ page }, run) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await run('');
    console.log('Tear Down');
  },

  pageManager: async ({ page }, run) => {
    const pm = new PageManager(page);
    await run(pm);
  },
});
