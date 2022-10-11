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
