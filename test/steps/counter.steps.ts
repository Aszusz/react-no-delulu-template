import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './counter.testIds'

const { Given, When, Then } = createBdd()

export { testIds }

Given('the counter is at {int}', async ({ page }, value: number) => {
  await page.goto('/')
  // Set counter to desired value by clicking increment/decrement
  const counterValue = page.getByTestId(testIds.value)
  const currentValue = parseInt((await counterValue.textContent()) || '0', 10)
  const diff = value - currentValue

  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      await page.getByTestId(testIds.incrementButton).click()
    }
  } else if (diff < 0) {
    for (let i = 0; i < Math.abs(diff); i++) {
      await page.getByTestId(testIds.decrementButton).click()
    }
  }
})

When('I increment the counter', async ({ page }) => {
  await page.getByTestId(testIds.incrementButton).click()
})

When('I decrement the counter', async ({ page }) => {
  await page.getByTestId(testIds.decrementButton).click()
})

When('I reset the counter', async ({ page }) => {
  await page.getByTestId(testIds.resetButton).click()
})

Then('the counter displays {int}', async ({ page }, expected: number) => {
  await expect(page.getByTestId(testIds.value)).toHaveText(String(expected))
})
