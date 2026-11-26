import ExcelJS from 'exceljs'
import { test, expect } from '@playwright/test'
test('Read Excel by column by column', async ({ page }) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('C:/Users/Kiruthika Dinesh/Desktop/Playwright_Learning/test data/Mydata.xlsx');

    const sheet = workbook.getWorksheet('Sheet1');
    if (!sheet) {
        throw new Error('Worksheet "Sheet1" was not found');
    }

    // Loop through Excel rows
    for (let i = 2; i <= sheet.rowCount; i++) {

        const row = sheet.getRow(i);

        const username = String(row.getCell(1).value ?? '').trim();
        const password = String(row.getCell(2).value ?? '').trim();

        // Skip empty rows
        if (!username || !password) {
            console.log(`Skipping empty row: ${i}`);
            continue;
        }


        console.log(`Testing Excel row: ${i}`);
        console.log(`Username: ${username}`);

        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill(username);
        await page.locator('#password').fill(password);
        await page.locator('#login-button').click();
        await expect(page.getByText('Products', { exact: true })).toBeVisible();


    }
})
