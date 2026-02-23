import {test,expect} from '@playwright/test';
import {homepage} from '../pages/HomePage.ts';
import {registerpage} from '../pages/RegisterPage.ts';
import {TestConfig} from '../test.config.ts';
import {randomDataUtil} from '../utils/randomDataGenerator.ts';

test('User Registration test',async({page})=>{

      //Launch & navigate to url
  const config=  new TestConfig();
  await page.goto(config.appUrl); 
       
       //click on My Accounts then Register
  const homePage=new homepage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegisterLink();
       //Fill in all the details
  const registerPage=new registerpage(page);
  await registerPage.inputFirstName(randomDataUtil.getFirstName());
  await registerPage.inputLastName(randomDataUtil.getLastName());
  await registerPage.inputEmail(randomDataUtil.getEmail());
  await registerPage.inputPhoneNo(randomDataUtil.getPhoneNumber());
  const password=randomDataUtil.getPassword();
  await registerPage.inputPassword(password);
  await registerPage.confirmPassword(password);

  await registerPage.clickPolicy();
  await registerPage.clickContinue();

  //validate confirmation message

  const confirmationMsg=await registerPage.getConfirmationMsg();
  expect(confirmationMsg).toContain('Your Account Has Been Created!');

  await page.waitForTimeout(3000);
})