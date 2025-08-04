import { Locator, Page, test } from "@playwright/test";
import { LoadFnOutput } from "module";

export class Pimpage{

    readonly page:Page
    readonly addPimbutton: Locator
    readonly firstnametextbox : Locator
    readonly middletnametextbox : Locator
    readonly lastnametextbox : Locator
    readonly savebutton: Locator
    readonly newemployeenameheading: Locator

constructor(page:Page){

    this.page = page
    this.addPimbutton = page.getByRole('button', { name: ' Add' })
     this.firstnametextbox = page.getByRole('textbox', { name: 'First Name' })
     this.middletnametextbox = page.getByRole('textbox', { name: 'Middle Name' })
     this.lastnametextbox = page.getByRole('textbox', { name: 'Last Name' })
     this.savebutton = page.getByRole('button', { name: 'Save' })
     this.newemployeenameheading = page.locator('.orangehrm-edit-employee-name')

}

async addEmployee(FirstName: string, middlename: string, lastname: string){

    await this.addPimbutton.click()
    await this.firstnametextbox.fill(FirstName)
    await this.middletnametextbox.fill(middlename)
    await this.lastnametextbox.fill(lastname)
    await this.savebutton.click();


}


}
