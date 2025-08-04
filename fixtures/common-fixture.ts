import { test as baseTest } from '../fixtures/pom-fixture';
import commonutils from '../utils/commonUtils';


type commonfixturetype ={

    commonutils : commonutils
}

export const test = baseTest.extend<commonfixturetype>({

    commonutils : async({},use)=>{
    use(new commonutils())

    }

})
