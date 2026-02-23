import {test,expect} from '@playwright/test';
import { homepage } from '../pages/HomePage';
import {SearchResults} from '../pages/SearchResultPage';
import { TestConfig } from '../test.config';

let config:TestConfig;
let homePage:homepage;
let searchResulePage:SearchResults;

test.beforeEach(async({page})=>{

    config= new TestConfig();
    await page.goto(config.appUrl);

    homePage=new homepage(page);
    searchResulePage= new SearchResults(page);
})

test.afterEach(async({page})=>{

    await page.close();
})

test('Search product @master @regression',async()=>{

    await homePage.inputSearchItem(config.productName);
    await homePage.clickSearchBtn();

    expect(await searchResulePage.isSearchResultPageExists()).toBeTruthy();

    expect(await searchResulePage.isProductExists(config.productName)).toBeTruthy();

})