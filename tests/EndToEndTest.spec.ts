/*
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect, Page } from "@playwright/test";
import { TestConfig } from "../test.config";
import { homepage } from "../pages/HomePage";
import { registerpage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { ProductPage } from "../pages/ProductPage";
import { SearchResults } from "../pages/SearchResultPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { randomDataUtil } from "../utils/randomDataGenerator";


//function to perform Registration
async function performRegistration(page: Page): Promise<string> {
  let config = new TestConfig();
  await page.goto(config.appUrl);

  let homePage = new homepage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegisterLink();

  let registerPage = new registerpage(page);
  await registerPage.inputFirstName(randomDataUtil.getFirstName());
  await registerPage.inputLastName(randomDataUtil.getLastName());
  await registerPage.inputPhoneNo(randomDataUtil.getPhoneNumber());
  let email: string = randomDataUtil.getEmail();
  await registerPage.inputEmail(email);
  await registerPage.inputPassword("test1234");
  await registerPage.confirmPassword("test1234");
  await registerPage.clickPolicy();
  await registerPage.clickContinue();
  const confirmationMsg = await registerPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");
  return email;
}

//function to perform Logout
async function performLogout(page: Page): Promise<void> {
  const myAccountPage = new MyAccountPage(page);
  const logoutPage: LogoutPage = await myAccountPage.clickLogout();
  expect(await logoutPage.isContinueButtonVisible()).toBeTruthy();
  const homePage: homepage = await logoutPage.clickContinue();
  expect(await homePage.isHomePageExists()).toBeTruthy();
}

//Perform login with same account
async function performLogin(page: Page, email: string) {
  let config = new TestConfig();
  await page.goto(config.appUrl);
  const homePage = new homepage(page);
  await homePage.clickMyAccount();
  await homePage.clickLogin();

  const loginPage = new LoginPage(page);
  await loginPage.setEmail(email);
  await loginPage.setPassword("test1234");
  await loginPage.clickLogin();
  // loginPage.getErrorMsg()

  const myAccountPage = new MyAccountPage(page);
  expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy();
}

//function to Search for a product and add it to the shopping cart

async function performAddToCart(
  page: Page,
  productName: string,
  quantity: string,
) {
  const homePage = new homepage(page);
  await homePage.inputSearchItem(productName);
  await homePage.clickSearchBtn();

  const searchResult = new SearchResults(page);
  expect(await searchResult.isSearchResultPageExists()).toBeTruthy();
  expect(await searchResult.isProductExists(productName)).toBeTruthy();
  if (await searchResult.isProductExists(productName)) {
    await searchResult.selectProduct(productName);

    const productPage = new ProductPage(page);

    await productPage.setProductQuantity(quantity);
    await productPage.addProductToCart();
    await page.waitForTimeout(3000);
    expect(await productPage.isConfirmationMsgVisible()).toBeTruthy();
  }
}

  //verify cart contents

  async function verifyCart(page: Page) {
    const productPage = new ProductPage(page);
    await productPage.clickItemBtn();
    await productPage.clickViewCartLnk();
    await page.waitForTimeout(3000);
    const config = new TestConfig();
    const shoppingCartPage = new ShoppingCartPage(page);
    await page.waitForTimeout(3000);
   
    const total_price = await shoppingCartPage.getTotalPrice();
    expect(total_price).toBe(config.totalPrice);
  }


//perform checkout
async function performCheckout(page: Page) {
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.clickCheckout();
  let checkoutPage = new CheckoutPage(page);
  checkoutPage = await shoppingCartPage.clickCheckout();
  await page.waitForTimeout(3000);
  expect(checkoutPage.isCheckoutPageExists()).toBeTruthy();
  await page.close();
}

// This is the main test block that runs the entire flow
test('execute end-to-end test flow @end-to-end', async ({ page }) => {

const config=new TestConfig();

await page.goto(config.appUrl);

const email:string=await performRegistration(page);
console.log("✅ Registration is completed!");

await performLogout(page);
console.log("✅ Logout is completed!");

await performLogin(page,email);
console.log("✅ Login is completed!");

await performAddToCart(page,config.productName,config.productQuantity);
console.log("✅ Product is added to the Cart!");

await verifyCart(page);
console.log("✅ cart total price is verified!");

// await performCheckout(page);
// console.log("✅ checkout page is visited!");

})
