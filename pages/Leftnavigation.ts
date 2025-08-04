
import { Locator, Page } from '@playwright/test'
import {test} from '../fixtures/hooks-fixture'

export class Leftnavigation{

    readonly page: Page
    readonly pim: Locator
    readonly logo : Locator
    readonly leftnavigationpanel:Locator


    constructor(page:Page){
        this.page= page
        this.pim = page.getByRole('link', { name: 'PIM' })
       this.logo = page.locator("img[alt='client brand banner']")
       // this.logo = page.getByRole('link', { name: 'client brand banner' })
        this.leftnavigationpanel = page.locator('.oxd-sidepanel-body')
    }

    async pimClick(){

        await this.pim.click()

    }

}