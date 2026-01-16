# BDD Automate (Refactor Phase)

Refactor existing code to meet architectural constraints while keeping all tests green.

**Critical:** This phase changes code structure, not behavior. Tests must pass before, during, and after refactoring.

## Input

The user will provide architectural constraints: $ARGUMENTS

If no arguments provided, ask what architectural improvement they want.

## Phase 1: Verify Green State

1. Run the test command (check TESTING.md)
2. **If tests fail** - Stop immediately. Tell the user tests must pass before refactoring. Do not proceed.
3. **If tests pass** - Continue to Phase 2

## Phase 2: Gather Context

1. Read `CLAUDE.md` for existing project architecture and constraints
2. Read `TESTING.md` for test patterns
3. Identify files affected by the requested constraint

**Constraint priority:**

- User-provided constraint takes precedence
- CLAUDE.md constraints apply where they don't conflict
- When in doubt, ask the user

## Phase 3: Plan Refactoring

Enter plan mode to:

1. **Analyze current state** - Identify code that violates the constraint
2. **Design target state** - How should the code look after refactoring?
3. **Break into small steps** - Each step must leave tests green
4. **Identify risks** - What could break? How will you verify?

### Refactoring Principles

- **Small, incremental changes** - Never make a change so large that debugging failures becomes difficult
- **One concept at a time** - Extract a component, then rename, then move. Not all at once.
- **Run tests after each change** - Catch regressions immediately
- **Preserve behavior** - If a test fails, you changed behavior, not just structure

## Phase 4: Execute Refactoring

For each planned step:

1. **Make the change** - Apply one refactoring transformation
2. **Run tests** - Verify all tests still pass
3. **If tests fail:**
   - Revert the change
   - Analyze why it broke
   - Try a smaller step or different approach
4. **If tests pass** - Proceed to next step

## Phase 5: Verify Final State

1. Run full test suite - all tests must pass
2. Run quality checks (`npm run all` or equivalent)
3. Verify the architectural constraint is now satisfied
4. List all files that were modified

## Output

Show:

1. Initial test state (confirming green before starting)
2. Summary of refactoring steps taken
3. Files modified
4. Final test run output (confirming still green)
5. How the code now satisfies the constraint

## Guidelines

- **Never skip the initial green check** - Refactoring broken code creates chaos
- **Never push through failing tests** - Stop, revert, rethink
- **Prefer many small commits over one large change** - If asked to commit
- **Don't add features** - Refactoring changes structure, not behavior
- **Don't fix unrelated issues** - Stay focused on the stated constraint
