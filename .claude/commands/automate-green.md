# BDD Automate (Green Phase)

Implement the minimal functionality to make failing tests pass.

**Critical:** This phase implements only what's needed to satisfy the tests. Follow architectural constraints strictly.

## Phase 1: Gather Context

1. Read `CLAUDE.md` for architectural constraints
2. Read `DISCOVERY.yml` for business rules and decisions
3. Read the step definition files in `test/steps/*.steps.ts` to understand:
   - What `testIds` are exported (these MUST be imported and used)
   - What behaviors the tests expect

## Phase 2: Plan Implementation

If the implementation is non-trivial, enter plan mode to:

- Identify which files need changes
- Break down implementation into small, testable increments
- Ensure plan adheres to all constraints from CLAUDE.md and DISCOVERY.yml

## Phase 3: Implement

### Key Architectural Rules

1. **Import testIds from testIds file** - Never hardcode test IDs:

   ```typescript
   import { testIds } from '../test/steps/feature.testIds'
   ```

2. **Use data-testid attributes** - Apply imported testIds to elements:

   ```typescript
   <div data-testid={testIds.value}>{count}</div>
   ```

3. **Minimal implementation** - Only implement what tests require:
   - No extra features beyond DISCOVERY.yml scope
   - No over-engineering or premature abstractions
   - Basic styling only (Tailwind)

4. **Follow existing patterns** - Match the codebase's style and conventions

### Implementation Loop

Repeat until all tests pass:

1. **Run tests**: `npm run test`
2. **Analyze failures**: Identify the specific assertion or action failing
3. **Implement fix**: Make the minimal change to address the failure
4. **Verify**: Run tests again

## Phase 4: Verify Green State

1. Run `npm run test` - all tests should pass
2. Run `npm run all` - ensure no lint/type/format errors
3. If any checks fail, fix them before completing

## Output

Show:

1. Files created/modified
2. Final test run output confirming green state (all tests passing)
3. Output of `npm run all` confirming code quality checks pass

**Success:** All tests pass and code quality checks are green.
