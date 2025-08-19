import { test, expect, chromium } from '@playwright/test';

import path from 'path';

test('allcheck', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.getByPlaceholder('Enter Name').fill('admin');
  await page.locator("//input[@id='email']").fill('test123@gmail.com');
  await page.locator('#phone').fill('973939392');
  await page.locator("//textarea[@id='textarea']").fill('97393980392');
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  //checkbox
  const checkboxes = page.locator('div.form-group:has(label:has-text("Days:")) input[type="checkbox"]');
  const count = await checkboxes.count();

  for (let i = 0; i < count; i++) {
    const checkbox = checkboxes.nth(i);
    const value = await checkbox.getAttribute('value'); // or use 'id'

    if (value === 'friday' || value === 'sunday') {
      await checkbox.check();
    }
  }
  //dropdown
  await page.locator('#country').selectOption('india')
  await page.waitForTimeout(2000)
  await page.locator('#country').selectOption({ label: 'Japan' });
  //multiple dropdwn
  await page.locator("#colors").selectOption([{ label: 'White' }, { label: 'Green' }])
  await page.locator('#animals').selectOption([{ label: 'Dog' }, { label: 'Elephant' }])
  
}); 

test('calendar datepicker 1',async({page})=>{

 const targetday = '12';
  const targetmonth = 'May'
  const targetyear = '2029'
  

  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.locator('#datepicker').click()
  

  //const month = await page.locator('.ui-datepicker-month').textContent();

  while(true){
    
    const month = await page.locator('.ui-datepicker-month').textContent();

    const year = await page.locator('.ui-datepicker-year').textContent();

    if (month?.trim() === targetmonth && year?.trim() === targetyear) {
      break;
    }
    await page.locator('.ui-icon.ui-icon-circle-triangle-e').click()
    await page.waitForTimeout(1000); // let calendar update
  }
    const days =  page.locator('.ui-datepicker-calendar td a.ui-state-default')

    const count = await days.count()

    for(let i=0;i<count;i++){

     const day = await days.nth(i).textContent()
     if(day?.trim() === targetday){
      await days.nth(i).click();
      break;
     }

    }
    await page.waitForTimeout(1000)
    const selectedDate = await page.locator('#datepicker').inputValue();
    console.log('✅ Selected date:', selectedDate); // Expect: 05/12/2029
})
test('calendar date 2',async({page})=>{

  const targetday = '12';
   const targetmonth = 'Jun'
   const targetyear = '2032'
   
 
   await page.goto('https://testautomationpractice.blogspot.com/');
   await page.locator('#txtDate').click()
   await page.locator('.ui-datepicker-month').selectOption({label:targetmonth})
   await page.locator('.ui-datepicker-year').selectOption({label:targetyear})

   //

   const days2 =  page.locator('.ui-datepicker-calendar td a')

   const count = await days2.count()
   for(let i=0;i<count;i++){

    const day = await days2.nth(i).textContent()
    if(day?.trim() === targetday){
     await days2.nth(i).click();
     break;
    }

   }
   
   await page.waitForTimeout(1000)
   const selectedDate = await page.locator('#datepicker').inputValue();
   console.log('✅ Selected date:', selectedDate); // Expect: 05/12/2029
   
 })

 test('calendar datepick 3',async({page})=>{

  const targetday = '12';
   const targetmonth = 'Jun'
   const targetyear = '2032'
   
 
   await page.goto('https://testautomationpractice.blogspot.com/');
   await page.locator('#txtDate').click()
   await page.locator('.ui-datepicker-month').selectOption({label:targetmonth})
   await page.locator('.ui-datepicker-year').selectOption({label:targetyear})

   //

   const days2 =  page.locator('.ui-datepicker-calendar td a')

   const count = await days2.count()
   for(let i=0;i<count;i++){

    const day = await days2.nth(i).textContent()
    if(day?.trim() === targetday){
     await days2.nth(i).click();
     break;
    }

   }
   
   await page.waitForTimeout(1000)
   const selectedDate = await page.locator('#datepicker').inputValue();
   console.log('✅ Selected date:', selectedDate); // Expect: 05/12/2029
   
 })

 test('allverify',async({page})=>{
//multiple files upload
  await page.goto('https://testautomationpractice.blogspot.com/');

  const filePath = path.resolve(__dirname, '../files/receipt.pdf');
  const filePath2 = path.resolve(__dirname, '../files/Document.pdf')
 const handle =   page.locator('#singleFileInput')
 
 await handle.setInputFiles(filePath);

 await page.locator("form[id='singleFileForm'] button[type='submit']").click();

 await page.waitForTimeout(2000)
 
 const multiplehandle =  await page.locator('#multipleFilesInput')
 await multiplehandle.setInputFiles([filePath, filePath2]);
 await page.locator("form[id='multipleFilesForm'] button[type='submit']").click();
 await page.waitForTimeout(2000)

 })
 
 test('window handling',async({page})=>{

  await page.goto('https://testautomationpractice.blogspot.com/');
  const popupPromise =  page.waitForEvent('popup')

  await page.getByRole('button',{name:'New Tab'}).click()
  const newPage = await popupPromise;
  await newPage.waitForLoadState(); 
  console.log(await newPage.title());
  await expect(newPage.getByText('Basic Database Validation')).toHaveText('1. Basic Database Validation')
  await page.bringToFront();
  await page.waitForTimeout(2000)
  await expect(page.getByText('Mouse Hover')).toHaveText('Mouse Hover')
  await page.locator('.dropbtn').hover()
  const dropdownItem = await page.locator('.dropdown-content a',{ hasText: 'Mobiles'})
  await expect(dropdownItem).toBeVisible();
  await dropdownItem.click();


  
 })

 test('amazon',async({page})=>{

  await page.goto('https://www.amazon.in/')
  await page.locator('#twotabsearchtextbox').click()
  await page.locator('#twotabsearchtextbox').fill('Mobiles')
  await page.locator('#nav-search-submit-button').click();
  const products = page.locator('//div[contains(@data-cel-widget, "search_result_") and @data-component-type="s-search-result"]');
 // const products2 = page.locator('//div[contains(@data-cel-widget, "search_result_")]');
  await products.nth(6).click()

 })



test.only('Find broken links', async ({ page, request }) => {
  await page.goto('https://testautomationpractice.blogspot.com/#');

  // Step 1: Collect all links
  const links = await page.locator('a').all();

  // Step 2 & 3: Check each link
  for (const link of links) {
    const href = await link.getAttribute('href');

    if (href && href.startsWith('http')) {
      const response = await request.get(href);

      if (response.status() >= 400) {
        console.log(`❌ Broken link: ${href} (status: ${response.status()})`);
      } else {
        console.log(`✅ Valid link: ${href}`);
      }
    }
  }
});
