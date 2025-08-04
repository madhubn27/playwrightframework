import { Locator, Page } from "@playwright/test";

export class LoginPage{

    readonly page:Page
    readonly userNameInput:Locator
    readonly passwordInput:Locator
    readonly loginButton:Locator
    readonly errormessage: Locator


    constructor(page: Page) {    ///constructor(page1: Page)
        
        this.page = page  /// this.page = page1
        this.userNameInput =  page.getByRole('textbox', { name: 'Username' })//
      // this.userNameInput = page.locator('input[name="username"]');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errormessage = page.getByRole('alert')
    }
/**
 * open url into browser     /// slash double star
 */
    async gotoOrangeHrm(){

      await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`)
    }

/**
 * login into app
 * @param username 
 * @param password 
 */

    async loginOrangeHrm(username: string, password: string){

       await this.userNameInput.fill(username)
       await this.passwordInput.fill(password)
       await this.loginButton.click()
    }

}