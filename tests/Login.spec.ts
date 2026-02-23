import {test,expect} from '@playwright/test';
import { homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';  //for getting url and login data

let homePage:homepage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;
let config:TestConfig;

test.beforeEach(async({page})=>{
config=new TestConfig();
await page.goto(config.appUrl);

homePage=new homepage(page);
loginPage=new LoginPage(page);
myAccountPage=new MyAccountPage(page);

})

test.afterEach(async({page})=>{

await page.waitForTimeout(3000);
await page.close();    
})

test('User Login Test- using config data @master@sanity@regression',async()=>{

    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //enter valid credential to login

    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

//verify successful login by checking 'My Account ' presence

 expect(await myAccountPage.msgText()).toBe('My Account');
const isLoggedIn=await myAccountPage.isMyAccountPageExist();
expect(isLoggedIn).toBeTruthy()
})