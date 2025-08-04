import{Locator, Page} from '@playwright/test'

export class DashboardPage{

readonly page: Page;
readonly dashboardtitlenext: Locator;

constructor(page: Page){

this.page = page;
this.dashboardtitlenext = page.getByRole('heading',{name: 'Dashboard'})

}

}