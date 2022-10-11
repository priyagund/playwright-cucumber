import { After, Before, Status, World } from "@cucumber/cucumber";
import { Browser, chromium, firefox, Page, webkit } from "playwright";
import { AllPage } from "../pages/all-pages/AllPage";
import { config } from "./runsetting.config";
//import {world} from ""
let page: Page;
let browser: Browser;
let allPage: AllPage;

Before(async () => {
  console.log("test running on firefox" + config.browser);
  switch (config.browser) {
    case "firefox":
      console.log("in firefox mode" + config.browserOptions);
      browser = await firefox.launch(config.browserOptions);
      // console.log("test running on firefox");
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  //browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  allPage = await new AllPage(page);
});

After(async function (this: World, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenShot = await page.screenshot();
    await this.attach(screenShot, "image/png");
    console.log("capturing screenshot");
  }
  await browser.close();
});

export { page, allPage };
