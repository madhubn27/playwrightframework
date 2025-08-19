/*
1)create booking
2)get booking
3) update booking  - token needed
4)delete booking - token needed

*/
import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from "path";

//utility function returns json file data

function readjson(filepath: string) {

    return JSON.parse(fs.readFileSync(path.resolve(__dirname, filepath), "utf-8"))
};


test('Delete booking end to end', async ({ request }) => {

    //1)create new booking
    const jsonfile = path.resolve(__dirname, "../../data/api-data/apidatapavan.json");
    const requestbody = JSON.parse(fs.readFileSync(jsonfile, 'utf-8'))

    const postresponse = await request.post("https://restful-booker.herokuapp.com/booking", { data: requestbody })

    const responsebody = await postresponse.json()
    console.log(responsebody)
    const bookingid = responsebody.bookingid
    console.log("booking is created and booking id is ", bookingid)

    //2 .get booking

    const getresponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`)

    const getjsonresponse = await getresponse.json()
    console.log("Booking details are", getjsonresponse)


    //3. create token 

    //updating booking (token)


    const tokenrequestbody = readjson('../../data/api-data/token_request_body.json')
    const tokenresponse = await request.post('https://restful-booker.herokuapp.com/auth',
        {
            data: tokenrequestbody,
            headers: { 'Content-Type': 'application/json' }

        });
    expect(tokenresponse.ok()).toBeTruthy();
    const tokenrespnbody = await tokenresponse.json();

    const token = tokenrespnbody.token
    console.log("token -------> ", token)


    //sedning put request
    const updaterequestbody = readjson('../../data/api-data/putapiupdate.json')
    const updateresponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`,
        {
            headers: {
                'Content-Type': 'application/json',
                "Cookie": `token=${token}`

            },

            data: updaterequestbody
        }
    )

    expect(updateresponse.ok()).toBeTruthy()
    expect(updateresponse.status()).toBe(200)

    const updaterespbody = await updateresponse.json()
    console.log(updaterespbody)
//4 delete booking

  const deleteresp = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`,

  {
     headers:{"Cookie": `token=${token}`}
  })

  expect(deleteresp.statusText()).toBe("Created")
  expect(deleteresp.status()).toBe(201)
  console.log("Bookings are deleted")

})