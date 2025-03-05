import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { PageManager } from '@pages/PageManager';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { Logger } from 'winston';

export interface ICustomWorld extends World {
  context: BrowserContext;
  page: Page;
  browser: Browser;
  pageManager: PageManager;
  logger: Logger;
}

export class CustomWorld extends World implements ICustomWorld {
  context: BrowserContext;
  page: Page;
  browser: Browser;
  pageManager: PageManager;
  logger: Logger;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
