# BDD Automate (Red Phase)

Implement step definitions for Gherkin scenarios. Tests should fail (red) because the functionality doesn't exist yet.

**Critical:** This phase creates test automation only. Do NOT implement any application functionality.

## Phase 1: Run Tests

1. Run `npm run test` to see which steps are undefined
2. Parse the output to identify:
   - Missing step definitions
   - Which feature files need automation

## Phase 2: Analyze Existing Patterns

1. Read existing step definition files in `test/steps/*.steps.ts`
2. Note patterns for:
   - How `createBdd()` is used
   - How test IDs are defined and exported
   - How page interactions are structured

## Phase 3: Create Step Definitions

For each feature file needing automation:

### 3a. Create Test IDs File

Create a separate `*.testIds.ts` file with no Node.js dependencies (so frontend can import it):

```typescript
// test/steps/feature.testIds.ts
export const testIds = {
  elementName: 'feature-element-name',
}
```

Naming convention: `{feature}-{element}-{type}` (e.g., `counter-increment-button`)

### 3b. Implement Steps

Create step definitions that import from the testIds file:

```typescript
// test/steps/feature.steps.ts
import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './feature.testIds'

const { Given, When, Then } = createBdd()

export { testIds }

Given('some precondition', async ({ page }) => {
  // Setup code
})

When('some action', async ({ page }) => {
  // Interaction code using testIds
  await page.getByTestId(testIds.button).click()
})

Then('some outcome', async ({ page }) => {
  // Assertion code
  await expect(page.getByTestId(testIds.value)).toHaveText('expected')
})
```

### Guidelines

- **Reuse existing steps** - Check if a step already exists before creating a new one
- **Use `getByTestId()`** - All element selection should use test IDs
- **Keep steps declarative** - Implementation details stay in step definitions
- **One file per feature** - Match step file names to feature file names

## Phase 4: Verify Red State

1. Run `npm run test` again
2. Confirm tests fail because:
   - Test IDs don't exist in the DOM yet (expected)
   - Application functionality doesn't exist yet (expected)
3. If tests fail for other reasons (syntax errors, import issues), fix those

## Output

Show:

1. Created/modified step definition files
2. The exported `testIds` that the implementation will need
3. Test run output confirming red state (tests failing as expected)

**Remember:** Success in this phase means failing tests. The `/automate-green` phase implements the functionality to make them pass.
