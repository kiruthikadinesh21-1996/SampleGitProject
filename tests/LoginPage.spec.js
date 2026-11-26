import { test, expect } from '@playwright/test'
test.only("first test case", async ({ page }) => {

      await page.goto('https://demowebshop.tricentis.com/login')
      const pageTitle = page.title()

      console.log(pageTitle);

      await expect(page).toHaveTitle('Demo Web Shop. Login')

      await page.close()


})

test("sauce labs login", async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole("button", {name:'Login'}).click();
})