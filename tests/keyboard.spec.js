import {test, expect} from '@playwright/test'

test.only("Handle keyboard actions", async({page})=>{
    await page.goto("https://platform.text.com/tools/diff-checker")
    await page.locator ("//textarea[@class='text-editor_editor__pymkg']").first().fill("test automation");
    await page.pause();

    // Methods -- press () - press the key and release
    //down () -- it will keep press
    //up () -- it will release
    //press()- down +up

        await page.keyboard.press('Control+A');
        await page.keyboard.press('Control+C');
        await page.locator("//textarea[@class='text-editor_editor__pymkg']").last().click();
        await page.keyboard.press('Control+V')
        await expect(page.locator("//textarea[@class='text-editor_editor__pymkg']").last()).toHaveValue("test automation");


})