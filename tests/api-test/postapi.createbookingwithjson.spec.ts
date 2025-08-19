
import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'
//test : create booking
//request type : post
//request body : static

test('create post request using static body', async ({ request }) => {


    //request body
  const jsonfile = path.resolve(__dirname, "../../data/api-data/apidatapavan.json");  
  const requestbody = JSON.parse(fs.readFileSync(jsonfile,'utf-8'))

    //send post request 

    const response = await request.post("https://restful-booker.herokuapp.com/booking", { data: requestbody })

    const responsebody = await response.json()
    console.log(responsebody)

    //validate status

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    //validate response attributes
    expect(responsebody).toHaveProperty('bookingid')
    expect(responsebody).toHaveProperty('booking')
    expect(responsebody).toHaveProperty('booking.additionalneeds')

    //validate booking details

    const booking = responsebody.booking;

    expect(booking).toMatchObject({

        "firstname": requestbody.firstname,
        "lastname": requestbody.lastname,
        "totalprice": requestbody.totalprice,
        "depositpaid": requestbody.depositpaid,
        "additionalneeds": requestbody.additionalneeds

    })
//validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({    //json path booking.bookingdates

        "checkin": requestbody.bookingdates.checkin,
        "checkout": requestbody.bookingdates.checkout

    })
})