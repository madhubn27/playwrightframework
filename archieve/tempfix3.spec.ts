//import {test} from '../fixtures/pom-fixture'
import { expect } from '@playwright/test';
//import { test } from '../fixtures/common-fixture'
import {test} from '../fixtures/hooks-fixture'
import { LoginPage } from '../pages/LoginPage';


//import commonutils from '../utils/commonUtils'
//test.beforeEach('Before Each Hook', async({loginpage , gotoURL})=>{
 //  await loginpage.gotoOrangeHrm()
//})

//test.afterEach('Before Each Hook', async({userpage, gotoURL})=>{
//await userpage.logout()
//})

test('Login', async({page, loginpage, commonutils})=>{

   // console.log(process.env.BASE_URL)
   // console.log(process.env.USER_NAME)
   // console.log(process.env.PASSWORD)
//const commonutilobj = new commonutils()
//commonutilobj.encryptData('Admin')
//commonutilobj.encryptData('admin123')
//const decryptedUsername = commonutils.decryptData(process.env.USER_NAME!);
//const decryptedPassword = commonutils.decryptData(process.env.PASSWORD!);


await loginpage.gotoOrangeHrm();
console.log(await page.title())
//await loginpage.loginOrangeHrm(decryptedUsername, decryptedPassword);
/*
test('temptest2', async ({ page, gotoURL}) => {
   await expect(page).toHaveTitle('OrangeHRM');
 });*/

})
test('temptest2', async ({ page, gotoURL}) => {
   await expect(page).toHaveTitle('OrangeHRM');
 });
test('temptest3', async ({ page,gotoURL, logout}) => {
   await expect(page).toHaveTitle('OrangeHRM');
 });

 