import { test as baseTest } from '../fixtures/pom-fixture';
import CommonApitest from '../utils/commonapitest';
import CommonUtils from '../utils/commonUtils';


type commonfixturetype ={

    commonutils : CommonUtils
    commonapitest :CommonApitest
}

export const test = baseTest.extend<commonfixturetype>({

    commonutils : async({},use)=>{
    use(new CommonUtils())

    },
    commonapitest: async({request},use)=>{
        use(new CommonApitest(request))
    }

})
