import { test, expect } from '@playwright/test'

test('Handle simple alert', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog', async dialog=>{
        console.log(dialog.message());
        await dialog.accept();
    })
await page.getByText("Simple Alert").click();

    })

test('Handle confirmation alert',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog', async dialog =>{
        console.log(dialog.message());
        await dialog.dismiss();
    })
await page.getByText("Confirmation Alert").click();

})

test('Handle prompt alert', async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async dialog =>{
        console.log(dialog.message());
        dialog.accept('Kiruthika'); // give the name in the textbox like this 
    
    })
await page.getByText('Prompt Alert').click();
})