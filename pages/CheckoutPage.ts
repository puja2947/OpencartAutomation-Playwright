import {Page,Locator} from '@playwright/test';

export class CheckoutPage{

private readonly page:Page;


constructor(page:Page)
{
    this.page=page;
}


async isCheckoutPageExists():Promise<boolean>
{
const title=await this.page.title();
if(title.includes('Checkout'))
{
    return true;
}
else
    return false;
}
}