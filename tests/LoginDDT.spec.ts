//we will not add hooks as test will be repeated so mant times and take data from json file

////note: testName must always b different otherwise it will be considered as duplicate test

import {test,expect} from '@playwright/test';
import { homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';  //for getting url and login data
import {dataProvider} from '../utils/dataProvider.ts';

const jsonPath="testdata/loginData.json";
const jsonTestData=dataProvider.getTestDataFromJSON(jsonPath);
for(const data of jsonTestData)
{
    test(`Login test with ${data.testName} @datadriven`,async({page})=>{

        const config= new TestConfig();
        await page.goto(config.appUrl);
        const homePage= new homepage(page);
       
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage=new LoginPage(page);
        await loginPage.login(data.email,data.password);

       if(data.expected.toLowerCase()==='success')
       {
        const accountPage=new MyAccountPage(page);
        const isLogged= await accountPage.isMyAccountPageExist();
        expect(isLogged).toBeTruthy();
       }
       else
       {
      const errorText=  await loginPage.getErrorMsg();
      expect(errorText).toBe(' Warning: No match for E-Mail Address and/or Password.');
       }
    })
}
