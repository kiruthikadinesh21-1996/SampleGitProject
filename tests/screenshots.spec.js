import {test} from '@playwright/test';

test('How to take screenshot',async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/');

  // page screenshot
  await page.screenshot({path:'tests/Myscreenshots/'+Date.now()+'image1.png'});


// full page
  await page.screenshot({path:'tests/MyScreenshots/'+Date.now()+'image2.png',fullPage:true});

  //element screenshot

  await page.getByPlaceholder('Enter Name').screenshot({path:'tests/MyScreenshots/image3.png'});
})
