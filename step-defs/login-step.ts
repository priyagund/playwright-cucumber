import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../config/global-config";
Given("I navigate to login page", async function () {
  await page.goto("https://www.saucedemo.com/");
});
Given("I enter username {string}", async function (username) {
  await page.locator("#user-name").type(username);
});
Given("I enter password {string}", async function (password) {
  await page.locator("#password").type(password);
});
When("I click login button", async function () {
  await page.locator("#login-button").click();
});
Then("I will be navigated to home page", async function () {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
