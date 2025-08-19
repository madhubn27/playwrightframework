
import { test, expect } from '@playwright/test'

//test : create booking
//request type : post
//request body : static

test('create post request using static body', async ({ request }) => {


    //request body
    const requestbody = {

        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast",
    }

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

        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast"

    })
//validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({    //json path booking.bookingdates

        "checkin": "2018-01-01",
        "checkout": "2019-01-01"

    })
})