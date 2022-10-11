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
