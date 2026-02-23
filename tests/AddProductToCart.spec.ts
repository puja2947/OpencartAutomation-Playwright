import {test,expect} from '@playwright/test'
import { homepage } from '../pages/HomePage'
import {SearchResults} from '../pages/SearchResultPage'
import { ProductPage } from '../pages/ProductPage'
import { TestConfig} from '../test.config';

let config:TestConfig;
let homePage:homepage;
let searchProduct:SearchResults;
let productPage:ProductPage

test.beforeEach(async({page})=>{
config=new TestConfig();
await page.goto(config.appUrl);  

homePage=new homepage(page);
searchProduct=new SearchResults(page);
productPage=new ProductPage(page);
})

test.afterEach(async({page})=>{

    await page.close();
})

test('Add Product to cart @master',async()=>{

  await  homePage.inputSearchItem(config.productName);
  await homePage.clickSearchBtn();

expect(await searchProduct.isProductExists(config.productName)).toBeTruthy();
if(await searchProduct.isProductExists(config.productName))
{
await searchProduct.selectProduct(config.productName);
await productPage.setProductQuantity(config.productQuantity);
await productPage.addProductToCart();
expect(await productPage.isConfirmationMsgVisible()).toBeTruthy();
}
})