import {test,Page,Locator} from '@playwright/test';

export class LoginPage{

    private readonly page:Page;
    private readonly txtEmail:Locator;
    private readonly txtPassword:Locator;
    private readonly btnLogin:Locator;
    private readonly errorMsg:Locator;

    constructor(page:Page)
    {
this.page=page;
this.txtEmail=page.locator('#input-email');
this.txtPassword=page.locator('#input-password');
this.btnLogin=page.locator("input[value='Login']");
this.errorMsg=page.locator('.alert');
    }

    async setEmail(email:string)
    {
        await this.txtEmail.fill(email);
    }
async setPassword(pwd:string)
{
    await this.txtPassword.fill(pwd);
}

async clickLogin()
{
    await this.btnLogin.click();
}

async getErrorMsg():Promise<string>
{
    const msg=await this.errorMsg.innerText();
    return msg;
}

// async getErrorMsg():Promise<string | null>
// {
//    return(await this.errorMsg.textContent());
// }

async login(email:string,pwd:string)
{
    await this.setEmail(email);
    await this.setPassword(pwd);
    await this.clickLogin();
}
}