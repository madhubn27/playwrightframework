import {test as baseTest} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/Dashboard'
import { Userpage } from '../pages/Userpage'
import { Leftnavigation } from '../pages/Leftnavigation'
import { Pimpage } from '../pages/PimPage'


type pomfixturetype ={

    loginpage: LoginPage
    dashboardpage: DashboardPage
    userpage: Userpage
    leftnavigation: Leftnavigation
    pimpgae:Pimpage

}

export const test = baseTest.extend<pomfixturetype>({

    loginpage: async({page},use)=>{

        await use(new LoginPage(page));
    },
    dashboardpage: async({page},use)=>{
     
        await use(new DashboardPage(page));

    },
    userpage: async({page},use)=>{
     
        await use(new Userpage(page));

    },
    leftnavigation: async({page},use)=>{
     
        await use(new Leftnavigation(page));

    },
    pimpgae: async({page},use)=>{

        await use(new Pimpage(page))
    }

})
