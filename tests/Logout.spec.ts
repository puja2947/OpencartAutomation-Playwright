import {test,expect} from '@playwright/test';
import { homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';

let config:TestConfig;
let logoutPage:LogoutPage;
let homePage:homepage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;

test.beforeEach(async({page})=>{
config=new TestConfig();
await page.goto(config.appUrl);

homePage=new homepage(page);
loginPage=new LoginPage(page);
myAccountPage=new MyAccountPage(page);
logoutPage=new LogoutPage(page);
})

test.afterEach(async({page})=>{

  await page.close();  
})

test('Logout testing @sanity @regression',async()=>{

await homePage.clickMyAccount();
await homePage.clickLogin();

await loginPage.login(config.email,config.password);

 // Step 4: Verify successful login
  expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy();
logoutPage=await myAccountPage.clickLogout();

const isContinueBtnVisible=await logoutPage.isContinueButtonVisible();
expect(isContinueBtnVisible).toBeTruthy();

homePage=await logoutPage.clickContinue();
const isHomePageExists:boolean=await homePage.isHomePageExists();
expect(isHomePageExists).toBeTruthy();
})
