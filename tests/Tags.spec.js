import {test,expect} from '@playwright/test'


// Run tests tagged with sanity:
// npx.cmd playwright test tests/Tags.spec.js --grep "@sanity"
// Run tests tagged with regression:
// npx.cmd playwright test tests/Tags.spec.js --grep "@regression"
// Run sanity tests except those that also have the regression tag:
// npx.cmd playwright test tests/Tags.spec.js --grep "@sanity" --grep-invert "@regression"


test('TC1@sanity', async({page})=>{

    console.log('TC1')
})


test('TC2@sanity', async({page})=>{

   console.log('TC2')

})


test('TC3@sanity@regression', async({page})=>{

       console.log('TC3')

})


test('TC4@sanity', async({page})=>{

       console.log('TC4')

})


test('TC5@sanity@regression', async({page})=>{

   console.log('TC5')
})