import ExcelJS from 'exceljs'
import {test,expect} from '@playwright/test'
 
test.skip('Read the excel file', async({page})=>{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('C:/Users/Kiruthika Dinesh/Desktop/Playwright_Learning/test data/Mydata.xlsx');
 
    const sheet = workbook.getWorksheet('Sheet1');
 
    sheet.eachRow((row, rownumber)=>{
        row.eachCell((cell, cellnumber)=>{
            console.log(cell.value)
        })
    })
 
})
 
 
test('Read Excel by column by column',async({page})=>{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('C:/Users/Kiruthika Dinesh/Desktop/Playwright_Learning/test data/Mydata.xlsx');
 
    const sheet = workbook.getWorksheet('Sheet1');
 
    sheet.eachRow((row, rownumber)=>{
        const username = row.getCell(1).value;
        console.log(username);
        const password = row.getCell(2).value;
        console.log(password);
    })
})