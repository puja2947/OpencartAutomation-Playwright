import {Page,Locator} from '@playwright/test';
import {homepage} from './HomePage.ts';
export class LogoutPage{

    private readonly page:Page;
    private readonly btnContinue:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.btnContinue= page.locator('.btn.btn-primary');
    }

    async clickContinue():Promise<homepage>
    {
       await this.btnContinue.click();
       return new homepage(this.page);
    }

async isContinueButtonVisible():Promise<boolean>
{
    return await this.btnContinue.isVisible();
}    
}