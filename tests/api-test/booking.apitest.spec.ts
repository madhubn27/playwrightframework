//import { test, expect } from '@playwright/test'
import apipathdata from '../../data/api-data/api-data.json'
import modulepathdata from '../../data/api-data/restful-booker-apimodule.json'
//import commonapitest from '../../utils/commonapitest'
import { test } from '../../fixtures/common-fixture'; 
import { expect } from '@playwright/test'; 



/*
test("API testing", async({request})=>{

   const bookingid =  await request.get('https://restful-booker.herokuapp.com/booking');
   console.log(await bookingid.json())

})

test("Booking id", async({request})=>{

    const bookingiddetails =  await request.get('booking/1');
    console.log(await bookingiddetails.json())
 
 })*/

test('fetch all booking ids using get API ', {
   tag: ['@API, @UAT'],
   annotation: {
      type: "testcaselink",
      description: 'Jira link ticket'
   }

}, async ({ request }) => {

   const bookingIdresp = await request.get(apipathdata.booking_path)
   const bookingIdrespjson = await bookingIdresp.json()
   console.log(bookingIdrespjson)
   expect(bookingIdresp.status()).toBe(200)
   expect(bookingIdresp.statusText()).toBe('OK')
   expect(bookingIdresp.status()).toBeTruthy();
   expect(bookingIdresp.headers()['content-type']).toBe(modulepathdata.content_type)
   expect(bookingIdrespjson).not.toBeNull()


})

test('fetch booking details of an id getAPI', {

   tag: ['@API'],
   annotation: {

      type: 'testcaselink',
      description: 'jiralinkdata'

   }

}, async ({ request }) => {
   const bookingdetailsresp = await request.get(`${apipathdata.booking_path}/${modulepathdata.booking_id}`)
   const bookingdetailsjson = await bookingdetailsresp.json()
   console.log(bookingdetailsjson);
   expect(bookingdetailsresp.status()).toBe(200)
   expect(bookingdetailsresp.statusText()).toBe('OK')
   expect(bookingdetailsresp.status()).toBeTruthy();
   expect(bookingdetailsjson).not.toBeNull()
   expect(bookingdetailsjson.firstname).toEqual(modulepathdata.firstname)
})

test('fetch booking details of an id postAPI',{
tag:['@API'],
annotation:{
 
   type:'Test cse link',
   description:'link of jira test case'

}

},async({request})=>{

   const creatingbookingresp = await request.post(apipathdata.booking_path,{
      data : modulepathdata.Createbooking
   })
   console.log("creatingbookingresp:", creatingbookingresp);
   const creatingbookingjsonresp = await creatingbookingresp.json();
   console.log("creatingbookingjsonresp:", creatingbookingjsonresp);
   await expect(creatingbookingresp.status()).toBe(200)
    expect(creatingbookingjsonresp.booking).toMatchObject(modulepathdata.Createbooking)

   })
      test.only('fetch booking details of an id putAPI',{
         tag:['@API'],
         annotation:{
         
            type:'Test cse link',
            description:'link of jira test case'
         
         }
         
         },async({request, commonapitest})=>{
         
         const tokenvalue = await commonapitest.createtoken()
         const updatebookingresp = await request.put(`${apipathdata.booking_path}/${modulepathdata.booking_id2}`,{
               headers:{
               Cookie:`token=${tokenvalue}`,
              
               },
               data : modulepathdata.updatebooking
            })
         const updaterespjson = await updatebookingresp.json()
          expect(updatebookingresp.status()).toBe(200)
         expect(updaterespjson.booking).toMatchObject(modulepathdata.updatebooking)

  /*     const status = updatebookingresp.status();
const contentType = updatebookingresp.headers()['content-type'] || '';
const rawBody = await updatebookingresp.text();

console.log('Status:', status);
console.log('Response Body:', rawBody);

expect(status).toBe(200);

if (!contentType.includes('application/json')) {
  throw new Error(`Expected JSON but got: ${rawBody}`);
}

const updaterespjson = JSON.parse(rawBody);
expect(updaterespjson.booking).toMatchObject(modulepathdata.updatebooking);
*/
            
            })