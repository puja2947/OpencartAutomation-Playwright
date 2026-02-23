import {Page,Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage{

    private readonly page:Page;
    private readonly msgHeading:Locator;
    private readonly lnkLogout:Locator;

    constructor(page:Page)
    {
this.page=page;
this.msgHeading=page.locator("h2:has-text('My Account')");
this.lnkLogout= page.locator("#column-right a:has-text('Logout')");
    }

    async clickLogout():Promise<LogoutPage>
    {
        try{
    await this.lnkLogout.click();
return new LogoutPage(this.page);
    }
    catch(error)
    {
        console.log(`Error occured while clicking logout button : ${error}`);
        throw error; 
    }
    }

    async isMyAccountPageExist():Promise<boolean>{
try{
    await this.msgHeading.waitFor({ state: 'visible', timeout: 5000 });
    const msgText=await this.msgHeading.innerText();
    console.log(msgText);
    const isMsgVisible=await this.msgHeading.isVisible();
    return isMsgVisible;
}
catch(error)
{
    console.log(`Error checking my account page visibility ${error}`);
    return false;
}
    }

    async msgText()
    {
        return await this.msgHeading.innerText();
    }
}