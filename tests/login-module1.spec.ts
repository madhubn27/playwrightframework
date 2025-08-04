import { expect, test } from '../fixtures/hooks-fixture'
import Loginmodule from '../data/login-module-data.json'
//import { expect } from '@playwright/test'

test.use({
    storageState: {

        cookies: [],
        origins: []
    }
})

test('Login with invalid password', {
    tag: ['@UI', '@SMOKE', '@REG'],
    annotation: {
        type: 'test case link9',
        description: 'Jir test case link LDHUB-737838-99',
    }
}, async ({ gotoURL, loginpage, commonutils }) => {

    const username = commonutils.decryptData(process.env.USER_NAME!)
    await loginpage.loginOrangeHrm(username, Loginmodule.wrongpassword)
    await expect(loginpage.errormessage).toHaveText(Loginmodule.errormessage)
    await expect(loginpage.userNameInput).toBeVisible()
})
test.describe("Invalid login test", {
    tag: '@InvalidLogin',
    annotation: {
        type: 'storylink',
        description: 'jira link of the story '
    }
}, () => {

    test('Login with invalid username', {
        tag: ['@UI', '@UAT', '@REG'],
        annotation: {
            type: 'test case link2',
            description: 'Jir test case link LDHUB-737838-2'

        }
    }, async ({ gotoURL, loginpage, commonutils }) => {

        const password = commonutils.decryptData(process.env.PASSWORD!)
        await loginpage.loginOrangeHrm(Loginmodule.incorrectusername, password)
        await expect(loginpage.errormessage).toHaveText(Loginmodule.errormessage)

    })

    test('Login with invalid username and password', {
        tag: ['@SMOKE', '@UAT'],
        annotation: {
            type: 'test case link3',
            description: 'Jir test case link LDHUB-737838-5'

        }
    }, async ({ gotoURL, loginpage, commonutils }) => {

        const password = commonutils.decryptData(process.env.PASSWORD!)
        await loginpage.loginOrangeHrm(Loginmodule.incorrectusername, Loginmodule.wrongpassword)
        await expect(loginpage.errormessage).toHaveText(Loginmodule.errormessage)
       // await expect(loginpage.errormessage).toHaveText("ajhaj")

    })

})
test('Login with visual testing invalid username and password', {
    tag: ['@VISUAL'],
    annotation: {
        type: 'test case link3',
        description: 'Jir test case link LDHUB-737838-5'

    }
}, async ({ gotoURL, loginpage, commonutils, leftnavigation }) => {


    const usernamenew = commonutils.decryptData(process.env.USER_NAME!)
    const passwordnew = commonutils.decryptData(process.env.PASSWORD!)


    await loginpage.loginOrangeHrm(usernamenew, passwordnew);
    await expect(leftnavigation.logo).toHaveScreenshot('OrangeHrmBrandLogo.png')
    await expect(leftnavigation.leftnavigationpanel).toHaveScreenshot('leftnavipanel.png')


})
