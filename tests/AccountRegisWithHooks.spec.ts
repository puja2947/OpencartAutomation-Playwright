import { test, expect } from "@playwright/test";
import { homepage } from "../pages/HomePage.ts";
import { registerpage } from "../pages/RegisterPage.ts";
import { TestConfig } from "../test.config.ts";
import { randomDataUtil } from "../utils/randomDataGenerator.ts";

let homePage: homepage;
let registerPage: registerpage;

test.beforeEach(async ({ page }) => {
  //Launch & navigate to url
  const config = new TestConfig();
  await page.goto(config.appUrl);

  homePage = new homepage(page);
  registerPage = new registerpage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});
test("User Registration test @master@sanity@regression ", async () => {
  await homePage.clickMyAccount();
  await homePage.clickRegisterLink();
  //Fill in all the details

  await registerPage.inputFirstName(randomDataUtil.getFirstName());
  await registerPage.inputLastName(randomDataUtil.getLastName());
  await registerPage.inputEmail(randomDataUtil.getEmail());
  await registerPage.inputPhoneNo(randomDataUtil.getPhoneNumber());
  const password = randomDataUtil.getPassword();
  await registerPage.inputPassword(password);
  await registerPage.confirmPassword(password);

  await registerPage.clickPolicy();
  await registerPage.clickContinue();

  //validate confirmation message

  const confirmationMsg = await registerPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");
});
