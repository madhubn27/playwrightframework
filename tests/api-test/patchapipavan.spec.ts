
/*

data from json file 
create token 

create booking - post --> booking id
partial update booking - patch --> required token

*/

import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from "path";

//utility function returns json file data

function readjson(filepath: string) {

    return JSON.parse(fs.readFileSync(path.resolve(__dirname,filepath),"utf-8")
);
}

test('partial updatebooking with patch', async ({ request }) => {

    //1)create a booking (post) -- booking id 
    const requestbody = readjson("../../data/api-data/apidatapavan.json")
    const createresposnse = await request.post("https://restful-booker.herokuapp.com/booking", 
        
        { 
            data: requestbody,
            headers: { 'Content-Type': 'application/json' } 
        })
    //expect(createresposnse.ok()).toBeTruthy();

    const jsonbodyresponse = await createresposnse.json()

    const bookingid = jsonbodyresponse.bookingid

    console.log("booking id -------> ", bookingid)
    //update booking(put) //required token
    //token creation

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

    // sending update put

    const patchrequestbody = readjson('../../data/api-data/patchapipavan.json')
    const partialupdateresponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingid}`,
        {
            headers: { 
                'Content-Type': 'application/json', 
                "Cookie": `token=${token}`
            
            },
            
            data: patchrequestbody
        }
    )

expect(partialupdateresponse.ok()).toBeTruthy()
expect(partialupdateresponse.status()).toBe(200)

const partialupdaterespbody = await partialupdateresponse.json()
console.log(partialupdaterespbody)


})