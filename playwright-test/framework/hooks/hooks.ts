import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { invokeBrowser } from '../browsers/browserManager';
import { getEnv } from '../config/env/env';
import { createLogger } from 'winston';
import { options } from '../logger/logger';
import { devices } from 'playwright';
import { PageManager } from '../pages/PageManager';
import { CustomWorld } from '../support/world';
import { Browser } from '@playwright/test';
import * as fs from 'fs-extra';
let browser: Browser;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function (this: CustomWorld, { pickle }) {
  const device = devices[process.env.npm_config_device!] || devices['Desktop Chrome'];
  const scenarioName = pickle.name + pickle.id;
  this.context = await browser.newContext({
    recordVideo: {
      dir: 'test-results/videos',
    },
    ...device,
  });
  await this.context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  this.page = await this.context.newPage();

  this.pageManager = new PageManager(this.page);
  this.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle }) {
  const path = `./test-results/trace/${pickle.id}.zip`;
  const img = await this.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' });
  const videoPath = await this.page.video().path();

  await this.context.tracing.stop({ path: path });
  await this.page.close();
  await this.context.close();

  await this.attach(img, 'image/png');
  await this.attach(fs.readFileSync(videoPath), 'video/webm');
  const traceFileLink = `<a href="${path}" download>Trace</a>`;
  await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
});

AfterAll(async () => {
  browser.close();
});
