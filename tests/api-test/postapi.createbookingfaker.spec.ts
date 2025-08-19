
import { test, expect } from '@playwright/test'
import {faker} from "@faker-js/faker"
import {DateTime} from 'luxon'

//test : create booking
//request type : post
//request body : dynamic

test('create post request using static body', async ({ request }) => {

//data generation using fake 

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const totalprice  = faker.number.int({min:100, max:50000});
const depositpaid = faker.datatype.boolean();
const checkindate = DateTime.now().toFormat("yyyy-MM-dd")
const checkoutdate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")

const additionalneeds = "super bowls"

    //request body
    const requestbody = {

        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalprice,
        "depositpaid": depositpaid,
        "bookingdates": {
            "checkin": checkindate,
            "checkout": checkoutdate
        },
        "additionalneeds": additionalneeds,
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