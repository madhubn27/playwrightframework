import{APIRequestContext} from '@playwright/test'
import apipathdata from '../data/api-data/api-data.json'

import commonUtils from '../utils/commonUtils'
export default class commonapitest{


private request : APIRequestContext

constructor(request : APIRequestContext){

this.request = request
}
public async createtoken(){

    const commonutilsobj = new commonUtils();

    const apiusername = commonutilsobj.decryptData(process.env.API_USER_NAME!)
    const apipassword = commonutilsobj.decryptData(process.env.API_PASSWORD!)
   const createtoken =  await this.request.post(apipathdata.auth_path,{
        data:{

            "username" : apiusername,
            "password" : apipassword
        }
    })
   const createtokenjsonresp =  await createtoken.json()
   return createtokenjsonresp.token;
}

}