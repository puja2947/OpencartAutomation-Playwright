import {Page,Locator} from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class ShoppingCartPage{

    private readonly page:Page;
    private readonly btnCheckout:Locator;
    private readonly lblTotalPrice:Locator;

    constructor(page:Page)
    {
this.page=page;
this.btnCheckout=page.locator('.buttons .btn.btn-primary');

        this.lblTotalPrice = page.locator(
  '//tr[td[normalize-space()="Total:"]]/td[last()]'
);
    }

    async getTotalPrice():Promise<string | null>
    {
        console.log(await this.lblTotalPrice.innerText());
        try{
          return  await this.lblTotalPrice.innerText();
        }
        catch(error)
        {
            return null;
        }
    }

    async clickCheckout():Promise<CheckoutPage>
    {
        await this.btnCheckout.click();
        return new CheckoutPage(this.page);
    }

    async isPageLoaded():Promise<boolean>
    {
        try{
            return await this.btnCheckout.isVisible();
        }
        catch(error)
        {
            return false;
        }
    }
}
