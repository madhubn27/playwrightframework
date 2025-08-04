import { expect } from '@playwright/test';
import { test } from '../fixtures/common-fixture'


test('Globalsetup for Auto Login', async({page, loginpage,dashboardpage, commonutils})=>{

const decryptedUsername = commonutils.decryptData(process.env.USER_NAME!);
const decryptedPassword = commonutils.decryptData(process.env.PASSWORD!);

await loginpage.gotoOrangeHrm()
await loginpage.loginOrangeHrm(decryptedUsername,decryptedPassword)
//await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`)
await page.waitForURL(process.env.BASE_URL + '/web/index.php/dashboard/index')
await expect(dashboardpage.dashboardtitlenext).toHaveText('Dashboard')
await page.context().storageState({

    path: './playwright/.auth/auth.json'
})

})