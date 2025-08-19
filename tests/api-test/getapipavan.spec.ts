import { test, expect } from '@playwright/test'

test('get booking details by ID path param', async ({ request }) => {

  const bookingid = 2 //we can pass this as path parameter
  //send get request 

  const respnse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`)

  const respbody = await respnse.json();
  console.log(respbody)

  expect(respnse.ok()).toBeTruthy()
  expect(respnse.status()).toBe(200)


})

test.only('get booking details by Name -query parameter', async ({ request }) => {

  const firstname = 'Jim'
  const lastname = 'Brown'

  //sending get request along with query parameters
  const respnse = await request.get("https://restful-booker.herokuapp.com/booking/", {
    params: { firstname, lastname }
  })

  const respbody = await respnse.json();
  console.log(respbody)

  expect(respnse.ok()).toBeTruthy()
  expect(respnse.status()).toBe(200)

  //check response should be empty

  await (respbody.length).toBeGreaterThan(0);

  for (const item of respbody) {

    expect(item).toHaveProperty('bookingid')
    expect(typeof item.bookingid).toBe("numnber")
    expect(item.bookingid).toBeGreaterThan(0)
  }






})