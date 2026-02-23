
import{Page,expect,Locator} from '@playwright/test';

export class  homepage{

//variables
private readonly page:Page;
private readonly lnkMyAccount:Locator;
private readonly lnkRegister:Locator;
private readonly lnkLogin:Locator;
private readonly txtSearchBox:Locator;
private readonly btnSearch:Locator;

//constructor

constructor(page:Page)
{
this.page=page;
this.lnkMyAccount= this.page.locator('span:has-text("My Account")');
this.lnkLogin=this.page.locator('a:has-text("Login")');
this.lnkRegister=this.page.locator('a:has-text("Register")');
this.txtSearchBox=this.page.getByPlaceholder('Search');
this.btnSearch= this.page.locator("#search button");
}

//action method
 
//check if homepage exists

async isHomePageExists()
{
    let title:string= await this.page.title();
if(title)
{
    return true;
}
else 
    return false;
}
  //click 'My Account'
async clickMyAccount(){

    try{
        await this.lnkMyAccount.click();
    }
    catch(error)
    {
        console.log('Error has happened while clicking my account link',error);
        throw error;
    }
}
   //click on register link
async clickRegisterLink()
{
     try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Register': ${error}`);
            throw error;
        }
}
   //click on Login link
  // Click "Login" link
    async clickLogin(){
        try {
            await this.lnkLogin.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Login': ${error}`);
            throw error;
        }
    }   

   async inputSearchItem(item:string)
   {
    await this.txtSearchBox.fill(item);
   } 

   async clickSearchBtn()
   {
    await this.btnSearch.click();
   }
}