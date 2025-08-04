import { error } from 'console';
import cryptoJs from 'crypto-js'

export  default class commonutils{

    private secretkey : string 

    /**
     * initaliazing secret_key
     */
    
constructor(){

    //this.secretkey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
    
   if(process.env.SECRET_KEY){

    this.secretkey = process.env.SECRET_KEY

} else{

    throw new Error("Please provide secret key while starting execution")

}
}
/**
 * provide encrytpted data from string
 * @param data 
 * @returns encrytpted data
 */
public encryptData(data: string){

    const encrypteddata = cryptoJs.AES.encrypt(data, this.secretkey).toString();
    console.log(encrypteddata)
    return encrypteddata;
}
/**
 *  provide Decrypteddata data in stringformat 
 * @param data 
 * @returns decryptData
 */

public decryptData(encdata: string){

    const decrypteddata = cryptoJs.AES.decrypt(encdata, this.secretkey).toString(cryptoJs.enc.Utf8);
    
    return decrypteddata;
}

}
