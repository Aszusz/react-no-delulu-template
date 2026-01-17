import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './snake.testIds'
import { setupDefault, getState } from './harness'

const { Given, When, Then } = createBdd()

export { testIds }

// Game speed for tests - used for timing calculations
const GAME_TICK_MS = 200

// =============================================================================
// GIVEN steps - Set up preconditions
// =============================================================================

Given('the game has not started', async ({ page }) => {
  await setupDefault(page)
  // Verify start button is visible (game not started)
  await expect(page.getByTestId(testIds.startButton)).toBeVisible()
})

Given('the game is running', async ({ page }) => {
  await setupDefault(page)
  await page.getByTestId(testIds.startButton).click()
  // Wait for game to start (state shows running)
  await expect(async () => {
    const state = await getState(page)
    expect(state?.game.gameStatus).toBe('running')
  }).toPass({ timeout: 2000 })
})

Given('the snake is moving right', async ({ page }) => {
  await setupDefault(page)
  await page.getByTestId(testIds.startButton).click()
  // Snake starts moving right by default - verify game is running
  await expect(async () => {
    const state = await getState(page)
    expect(state?.game.gameStatus).toBe('running')
    expect(state?.game.direction).toBe('right')
  }).toPass({ timeout: 2000 })
})

Given('the snake is long enough to collide with itself', async ({ page }) => {
  await setupDefault(page)
  await page.getByTestId(testIds.startButton).click()
  // For testing, we need a snake that can collide with itself
  // Verify game is running - snake starts with 3 segments
  await expect(async () => {
    const state = await getState(page)
    expect(state?.game.gameStatus).toBe('running')
  }).toPass({ timeout: 2000 })
})

Given('the game has ended', async ({ page }) => {
  await setupDefault(page)
  await page.getByTestId(testIds.startButton).click()
  // Wait for game over by moving snake into wall
  // Move up to hit the top wall quickly
  await page.keyboard.press('ArrowUp')
  // Wait for game over screen to appear
  await expect(page.getByTestId(testIds.gameOver)).toBeVisible({
    timeout: 5000,
  })
})

// =============================================================================
// WHEN steps - Perform actions
// =============================================================================

When('I start the game', async ({ page }) => {
  await page.getByTestId(testIds.startButton).click()
})

When('I change direction', async ({ page }) => {
  // Press up arrow to change from default right direction
  await page.keyboard.press('ArrowUp')
})

When('I press the left arrow key', async ({ page }) => {
  await page.keyboard.press('ArrowLeft')
})

When('the snake eats food', async ({ page }) => {
  // This step requires the snake to reach and eat food
  // We wait for score to increase as proof of eating
  const initialScore = await page.getByTestId(testIds.score).textContent()
  // Wait for score to change (food eaten)
  await expect(async () => {
    const currentScore = await page.getByTestId(testIds.score).textContent()
    expect(currentScore).not.toBe(initialScore)
  }).toPass({ timeout: 10000 })
})

When('the snake hits a wall', async ({ page }) => {
  // Move up repeatedly to hit top wall
  await page.keyboard.press('ArrowUp')
  // Wait for game over
  await expect(page.getByTestId(testIds.gameOver)).toBeVisible({
    timeout: 5000,
  })
})

When('the snake hits itself', async ({ page }) => {
  // Create a collision by moving in a tight circle
  // This requires the snake to be long enough (from eating food)
  // Sequence: right -> down -> left -> up (tries to reverse into itself)
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(GAME_TICK_MS * 2)
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(GAME_TICK_MS * 2)
  await page.keyboard.press('ArrowUp')
  // Wait for game over
  await expect(page.getByTestId(testIds.gameOver)).toBeVisible({
    timeout: 5000,
  })
})

When('I restart the game', async ({ page }) => {
  await page.getByTestId(testIds.restartButton).click()
})

// =============================================================================
// THEN steps - Verify outcomes
// =============================================================================

Then('the snake begins moving', async ({ page }) => {
  // Get initial position of snake head from state
  const initialState = await getState(page)
  const initialHead = initialState?.game.snake[0]
  expect(initialHead).toBeDefined()

  // Wait a tick and verify position changed
  await page.waitForTimeout(GAME_TICK_MS * 2)
  const newState = await getState(page)
  const newHead = newState?.game.snake[0]

  expect(newHead).toBeDefined()
  // Position should have changed (snake moved)
  expect(newHead!.x !== initialHead!.x || newHead!.y !== initialHead!.y).toBe(
    true
  )
})

Then('the snake moves in the new direction', async ({ page }) => {
  // Get position from state after direction change
  const initialState = await getState(page)
  const initialHead = initialState?.game.snake[0]
  expect(initialHead).toBeDefined()

  await page.waitForTimeout(GAME_TICK_MS * 2)
  const newState = await getState(page)
  const newHead = newState?.game.snake[0]

  expect(newHead).toBeDefined()
  // Snake should be moving up (y decreasing) after pressing ArrowUp
  expect(newHead!.y).toBeLessThan(initialHead!.y)
})

Then('the snake continues moving right', async ({ page }) => {
  // Get position from state
  const initialState = await getState(page)
  const initialHead = initialState?.game.snake[0]
  expect(initialHead).toBeDefined()

  await page.waitForTimeout(GAME_TICK_MS * 2)
  const newState = await getState(page)
  const newHead = newState?.game.snake[0]

  expect(newHead).toBeDefined()
  // Snake should still be moving right (x increasing)
  expect(newHead!.x).toBeGreaterThan(initialHead!.x)
})

Then('the snake grows by one segment', async ({ page }) => {
  // Count snake segments from state - should be more than initial
  const state = await getState(page)
  const count = state?.game.snake.length ?? 0
  // Initial snake length is typically 3, after eating it should be > 3
  expect(count).toBeGreaterThan(3)
})

Then('the score increases', async ({ page }) => {
  const scoreText = await page.getByTestId(testIds.score).textContent()
  const score = parseInt(scoreText || '0', 10)
  expect(score).toBeGreaterThan(0)
})

Then('new food appears', async ({ page }) => {
  // Verify food exists in state
  const state = await getState(page)
  expect(state?.game.food).toBeDefined()
  expect(state?.game.food.x).toBeGreaterThanOrEqual(0)
  expect(state?.game.food.y).toBeGreaterThanOrEqual(0)
})

Then('the game ends', async ({ page }) => {
  // Game over should be displayed
  await expect(page.getByTestId(testIds.gameOver)).toBeVisible()
})

Then('I see the game over screen', async ({ page }) => {
  await expect(page.getByTestId(testIds.gameOver)).toBeVisible()
  // Restart button should also be visible
  await expect(page.getByTestId(testIds.restartButton)).toBeVisible()
})

Then('a new game begins', async ({ page }) => {
  // Game should be running and game over should be hidden
  await expect(async () => {
    const state = await getState(page)
    expect(state?.game.gameStatus).toBe('running')
  }).toPass({ timeout: 2000 })
  await expect(page.getByTestId(testIds.gameOver)).not.toBeVisible()
})

Then('the score resets to zero', async ({ page }) => {
  const scoreText = await page.getByTestId(testIds.score).textContent()
  expect(scoreText).toBe('0')
})
