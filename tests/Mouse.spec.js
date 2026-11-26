import {test, expect} from '@playwright/test'

//Mouse actions - right click, double click -- dblclick() and drag & drop -- dragto()

test("Handle Mouse actions",async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
page.locator("//button[text()='Point Me']").hover();
//await page.pause();
// right click need to mention as right in click method as button:right

await page.locator("//a[text()='Laptops']").click({button:'right'});

await page.locator("//button[text()='Copy Text']").dblclick();

const source = page.locator("//div[@id='draggable']")
const target = page.locator("//div[@id='droppable']")
source.dragTo(target);



})