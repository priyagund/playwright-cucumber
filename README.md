## step by step instalation for playwright cucumber

1.initialize npm

```
npm init
```

2.install cucumber

```
npm install @cucumber/cucumber
```

3.install typescript

```
npm install typescript
```

4.install playwright as library

```
npm install playwright@latest

```

5. add cucumber extentions

## error and solution

1.

```
/Users/priyankagund/Documents/playwright-cucumber/step-defs/login-step.ts:1
import { Given, Then, When } from "@cucumber/cucumber";
^^^^^^

SyntaxError: Cannot use import statement outside a module

```

solution

```
i.npm install ts-node
ii. add --require-module ts-node/register package.json

```

## How to run Test:

add below script in pacakge.json

```
"test": "cucumber-js features/*.feature  --require step-defs/*.ts --require-module ts-node/register"
```

then run below command

```
npm run test
```

instiade of adding additional component in script add component in cucumber.js file as below.

```
const options = [
    "--require-module ts-node/register",
    "--require step-defs/*.ts",
    "-f json:test-report/cucumber_report.json",
    "--retry", "2",
    "--parallel", "2"
].join(" ");

let runsettings = ["features/*.feature", options].join(" ");

module.exports = {
    runner: runsettings,
};
```

then run below command to run cucumber test

```
npx cucumber-js  -p runner

```

## How to write test ?

creat globle config to create and close browser for each test

```

import { After, Before, Status, World } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";
import { AllPage } from "../pages/all-pages/AllPage";
//import {world} from ""
let page: Page;
let browser: Browser;
let allPage: AllPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
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

```

Add features file as below

```
Feature: Login feature
    As an user I should be able to login with valid credentials

  @smoke
  Scenario: Should be able to login with valid credentials
    Given I navigate to login page
    And I enter username 'standard_user'
    And I enter password 'secret_sauce'
    When I click login button
    Then I will be navigated to home page

```

Add step def class and specify business login

```
import { Given, Then, When } from "@cucumber/cucumber";
import { allPage } from "../config/global-config";

Given("I navigate to login page", async function () {
  await allPage.LoginPage.navigateTologin();
});
Given("I enter username {string}", async function (username) {
  //console.log("username enterger" + username);
  await allPage.LoginPage.enterUsername(username);
});
Given("I enter password {string}", async function (password) {
  await allPage.LoginPage.enterPassword(password);
});
When("I click login button", async function () {
  await allPage.LoginPage.clickOnLogin();
});
Then("I will be navigated to home page", async function () {
  await allPage.LoginPage.navigateToHomePage();
});

```

## How to add page object design pattern with playwright cucumber

i. create page class as shown below example

```
import { expect, Page } from "@playwright/test";

export class LoginPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  public async navigateTologin() {
    this.page.goto("https://www.saucedemo.com/");
  }

  public async enterUsername(username: string) {
    await this.page.locator("#user-name").type(username);
  }

  public async enterPassword(password: any) {
    await this.page.locator("#password").type(password);
  }

  public async clickOnLogin() {
    await this.page.locator("#login-button").click();
  }

  public async navigateToHomePage() {
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html"
    );
  }
}

```

ii. All page object will provided in Allpages class as below

```
import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class AllPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get LoginPage(): LoginPage {
    return new LoginPage(this.page);
  }
}
```

iii. now create instance of that AllPage class in test layer to access page object.

```
import { After, Before, Status, World } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";
import { AllPage } from "../pages/all-pages/AllPage";
//import {world} from ""
let page: Page;
let browser: Browser;
let allPage: AllPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  allPage = await new AllPage(page);
});

```

iv. in step def class you can access AllPages instance like below

```
import { Given, Then, When } from "@cucumber/cucumber";
import { allPage } from "../config/global-config";

Given("I navigate to login page", async function () {
  await allPage.LoginPage.navigateTologin();
});
Given("I enter username {string}", async function (username) {
  //console.log("username enterger" + username);
  await allPage.LoginPage.enterUsername(username);
});
Given("I enter password {string}", async function (password) {
  await allPage.LoginPage.enterPassword(password);
});
When("I click login button", async function () {
  await allPage.LoginPage.clickOnLogin();
});
Then("I will be navigated to home page", async function () {
  await allPage.LoginPage.navigateToHomePage();
});
import { Given, Then, When } from "@cucumber/cucumber";
import { allPage } from "../config/global-config";

Given("I navigate to login page", async function () {
  await allPage.LoginPage.navigateTologin();
});
Given("I enter username {string}", async function (username) {
  //console.log("username enterger" + username);
  await allPage.LoginPage.enterUsername(username);
});
Given("I enter password {string}", async function (password) {
  await allPage.LoginPage.enterPassword(password);
});
When("I click login button", async function () {
  await allPage.LoginPage.clickOnLogin();
});
Then("I will be navigated to home page", async function () {
  await allPage.LoginPage.navigateToHomePage();
});
```

## How to generate report with cucumber

i. install cucumber-html-reporter with below command

```
npm install cucumber-html-reporter
```

ii. then add typescript file add below information.

```
var reporter = require("cucumber-html-reporter");

var options = {
  theme: "bootstrap",
  jsonFile: "test-report/cucumber_report.json",
  output: "test-report/cucumber_report.html",
  screenshotsDirectory: "test-report/screenshots",
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
};
reporter.generate(options);
```

Now we need to add entry for creating json file for each test run

```
const options = [
  "--require-module ts-node/register",
  "--require step-defs/*.ts",
  "-f json:test-report/cucumber_report.json", // for json report
].join(" ")
```

Now add the below command in test scripts to run this node js file

```
node reporter-config.ts

```

## How to run test in parallel

```
add "--parallel", "3" (no of thread) in cucumber.js file
```

or add below command in pacakge.json

```
 "test:parallel": "cucumber-js  -p runner --parallel=2 && node reporter-config.ts",

```

## How to run test in different browser

i.add typescript file to and add browser option in that as below.

here chromium is default browser.

```
import { LaunchOptions } from "@playwright/test";

const browserOptions: LaunchOptions = {
  tracesDir: "traces",
  headless: true,
};

export const config = {
  browser: process.env.BROWSER || "chromium",
  browserOptions,
};

```

ii.add condition in global config file to select browser

```
Before(async () => {
  switch (config.browser) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
```
