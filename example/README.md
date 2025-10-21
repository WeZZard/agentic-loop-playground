# Example Project

This is a sample project that demonstrates the automated TODO/FIXME cleanup workflow.

## Contents

This example project contains intentional TODOs and FIXMEs in the code:

- `src/index.js` - Main application file with various TODOs and FIXMEs
- `src/utils.js` - Utility functions with cleanup opportunities

## Running the Example

```bash
# Install dependencies (if any)
npm install

# Run the application
npm start

# Run tests
npm test
```

## Testing the Cleanup Workflow

After deploying the agents and commands from the parent directory, you can use the `/cleanup` command in Claude Code to automatically process and fix the TODOs and FIXMEs in this project.

The cleanup workflow will:
1. Find all documented TODOs and FIXMEs
2. Evaluate dependencies and proper execution order
3. Execute fixes one by one
4. Verify each fix
5. Remove completed TODO/FIXME comments

## Example TODOs and FIXMEs

The code contains examples of:
- Input validation issues (TODO)
- Error handling needs (FIXME)
- Documentation gaps (TODO)
- Code quality improvements (TODO)
- Bug fixes (FIXME)
