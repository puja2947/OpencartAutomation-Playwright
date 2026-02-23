
import{Page,expect,Locator} from '@playwright/test';

export class  registerpage{

private readonly page:Page;
private readonly txtFirstName:Locator;
private readonly txtLastName:Locator;
private readonly txtEmail:Locator;
private readonly txtPhone:Locator;
private readonly txtPassword:Locator;
private readonly txtConfirmPwd:Locator;
//private readonly radioNewsLetter:Locator;
private readonly chkdPolicy:Locator;
private readonly btnContinue:Locator;
private readonly msgConfirmation:Locator;

//constructor

constructor(page:Page)
{
this.page=page;
this.txtFirstName= page.locator('#input-firstname');
this.txtLastName=page.locator('#input-lastname');
this.txtEmail=page.locator('#input-email');
this.txtPhone= page.locator('#input-telephone');
this.txtPassword=page.locator('#input-password');
this.txtConfirmPwd=page.locator('#input-confirm');
this.chkdPolicy=page.locator("input[name='agree']");
this.btnContinue=page.locator("input[value='Continue']");
this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');

}

//action method

async inputFirstName(fname:string)
{
await this.txtFirstName.fill(fname);
}

async inputLastName(lname:string)
{
await this.txtLastName.fill(lname);
}

async inputEmail(email:string)
{
await this.txtEmail.fill(email);
}

async inputPhoneNo(number:string)
{
await this.txtPhone.fill(number);
}

async inputPassword(pwd:string)
{
await this.txtPassword.fill(pwd);
}

async confirmPassword(pwd:string)
{
await this.txtConfirmPwd.fill(pwd);
}

async clickPolicy()
{
   await this.chkdPolicy.click();
}

async clickContinue()
{
    await this.btnContinue.click();
}

async getConfirmationMsg():Promise<string>{
let msg:string= await this.msgConfirmation.innerText();
return msg;
}
/*
 async getConfirmationMsg(): Promise<string> {
        return await this.msgConfirmation.textContent() ?? '';
    }*/
}
