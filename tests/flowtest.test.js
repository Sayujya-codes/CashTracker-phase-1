import {test, expect } from '@playwright/test';

test('testing flow', async({page})=>{
    await page.goto("http://localhost:3000/")
    // await page.pause()

    await expect(page).toHaveTitle(/CashTracker/);

    // -------------- login test
    await page.getByRole('button', { name: 'Get Started' }).first().click()
    await page.waitForTimeout(1000)

    await expect(page).toHaveURL("http://localhost:3000/sign-in")
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: 'Sign in with Google Continue' }).click()
    // await expect(page).toHaveURL("http://localhost:3000/")
    
    // await page.pause()

    await page.getByRole('textbox', { name: 'Email or phone' }).fill("sayujtestingproject@gmail.com")
    await page.getByRole('button', { name: 'Next' }).click()
    
    await page.getByRole('textbox', { name: 'Enter your password' }).fill("Trinity.123")

    
    await page.getByRole('button', { name: 'Next' }).click()

    // ------------ Dashboard

    // await page.pause()
    await page.waitForTimeout(7000)

    await page.getByRole('button', { name: 'Go To Dashboard' }).click()

    // await page.waitForTimeout(3000)
    await expect(page).toHaveURL("http://localhost:3000/dashboard")
    await page.waitForTimeout(5000)

    // -------------- Budget checking

    await page.getByRole('link', { name: 'Budgets' }).click()
    await expect(page).toHaveURL("http://localhost:3000/dashboard/budgets")


    await page.getByText('+Create New Budget').click()
    await page.getByRole('textbox', { name: 'e.g. Food' }).fill("Playwright Test")
    await page.getByPlaceholder('e.g. Rs.5000').fill('5000')
    await page.locator('div').filter({ hasText: /^Create Budget$/ }).click()
    

    await page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(page).toHaveURL("http://localhost:3000/dashboard")
    // await page.pause()

    // click on the element
    await page.getByRole('link', { name: '😀 Playwright Test 0 Item Rs.' }).first().click()
    // await page.pause()

    // ---------------- adding new expense 

    await page.getByRole('textbox', { name: 'e.g. Expense Name' }).fill("Playwright test expect")
    await page.getByRole('textbox', { name: 'e.g. 1000' }).fill("1000")
    await page.getByRole('button', { name: 'Add New Expense' }).click()

    // await page.pause();
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(page).toHaveURL("http://localhost:3000/dashboard")


    // ----------------- scroll to graph part:
    let toscroll_here = await page.getByText('ActivityPlaywright')
    await toscroll_here.scrollIntoViewIfNeeded()

    await page.pause();

    // ------------------ delete the expense:
    await page.getByRole('heading', { name: 'Delete' }).first().click()

    await page.pause()

    await page.getByRole('link', { name: 'Budgets' }).click()
    await expect(page).toHaveURL("http://localhost:3000/dashboard/budgets")
    await page.getByRole('link', { name: '😀 Playwright Test 0 Item Rs.' }).first().click()
    await page.getByRole('button', { name: 'Delete' }).click()

    await page.getByRole('button', { name: 'Continue' }).click()

    await page.pause();



})




