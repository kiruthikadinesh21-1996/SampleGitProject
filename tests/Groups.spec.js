import {test, expect} from '@playwright/test'

// To group we need to add describe in test
//you can use skip or only for running and ignoring any test
// even you can add in describe.skip or only for groups and also you can add in test.skip or test.only for the test inside groups
test.describe('Group_01', ()=>{
    test('Testcase_01', async({page})=>{

        console.log('Testcase1');
        

    })

    test('Testcase_02', async({page})=>{

        console.log('Testcase2');
        

    })
})

test.describe('Group_02', ()=>{
    test('Testcase_02', async({page})=>{

        console.log('Testcase3');
        

    })

    test('Testcase_04', async({page})=>{

        console.log('Testcase4');
        

    })
})


