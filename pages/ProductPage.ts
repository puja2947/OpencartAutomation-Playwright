import {Page,Locator} from '@playwright/test'
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage{

    private readonly page:Page;
private readonly btnAddToCart:Locator;
private readonly txtQuantity:Locator;
private readonly btnCartItems:Locator;
private readonly confirmationMsg:Locator;
private readonly linkViewCart:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.btnAddToCart=page.locator('#button-cart');
        this.txtQuantity=page.locator('#input-quantity');
        this.btnCartItems= page.locator('#cart');
        this.confirmationMsg=page.locator('.alert.alert-success.alert-dismissible');
        this.linkViewCart=page.locator("a:has-text('View Cart')");
    }


    async setProductQuantity(quantity:string)
    {
        await this.txtQuantity.fill(quantity);
    }

    async addProductToCart()
    {
        await this.btnAddToCart.click();
    }

    async isConfirmationMsgVisible():Promise<boolean>
    {
return await this.confirmationMsg.isVisible();
//return await expect(this.confirmationMsg).toBeVisible(); 
}

async clickItemBtn(){

    await this.btnCartItems.click();
}

async clickViewCartLnk():Promise<ShoppingCartPage>{

    await this.linkViewCart.click();
    return new ShoppingCartPage(this.page);
}

async addProductToCartComplete(quantity:string)
{
await this.txtQuantity.fill(quantity);
await this.btnAddToCart.click();
}
}