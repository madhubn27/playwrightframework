import {test, expect} from '../fixtures/hooks-fixture'
import pimdata from '../data/employee-data.json'

test('Pim page add employee',{
    tag :['@UI','@DEV'],
    annotation:{
type:'test case link',
description: 'Jir test case link LDHUB-737838'

    }
}, async({gotoURL, leftnavigation, pimpgae})=>{

   await test.step("Open Pim module",async()=>{

        await leftnavigation.pimClick()   
    })
  await test.step("add pim employee details",async()=>{
    await pimpgae.addEmployee(pimdata.FirstName,pimdata.middlename,pimdata.lastname)
    await expect(pimpgae.newemployeenameheading).toHaveText(`${pimdata.FirstName} ${pimdata.lastname}`)

   })
    
   
    // await expect(pimpgae.newemployeenameheading).toHaveText(`${pimdata.FirstName} ${pimdata.middlename} ${pimdata.lastname}`)
})