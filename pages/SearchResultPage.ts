import {Page,Locator} from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResults{

private readonly page:Page;
private readonly searchHeader:Locator;
private readonly searchProducts:Locator;

constructor(page:Page)
{
    this.page=page;
    this.searchHeader=page.locator('#content h1');
    this.searchProducts=page.locator('h4>a');
}


async isSearchResultPageExists():Promise<boolean>
{
const textHeader=await this.searchHeader.textContent();
return textHeader?.includes('Search -')??false;
}

async isProductExists(pname:string):Promise<boolean>
{
const count=await this.searchProducts.count();
for(let i=0;i< count;i++)
{
const product=this.searchProducts.nth(i);
const productText=await product.innerText();
if(productText===pname)
{
    return true;
    break;
}
}
return false;
}

async selectProduct(productName:string):Promise<ProductPage | null>
{
const count=await this.searchProducts.count();
for(let i=0;i< count;i++)
{
const product=this.searchProducts.nth(i);
const productText=await product.innerText();
if(productText===productName)
{
   await product.click();
   return new ProductPage(this.page);
}
}
console.log(`product ${productName} not found`);
return null;
}

async getProductCount():Promise<number>
{
    return await this.searchProducts.count();
}
}