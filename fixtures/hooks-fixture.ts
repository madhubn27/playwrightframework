import { LoginPage } from '../pages/LoginPage'
import { Userpage } from '../pages/Userpage'
import {test as baseTest} from './common-fixture'

type HooksFixtureType = {

    gotoURL: any
    logout : any
}

export const test = baseTest.extend<HooksFixtureType>({

gotoURL: async({loginpage}, use)=>{

    await loginpage.gotoOrangeHrm();
    await use()
},
logout: async({userpage},use)=>{
await use()
await userpage.logout();
}

})
export {expect} from '@playwright/test'