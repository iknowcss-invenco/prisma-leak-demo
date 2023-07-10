# Prisma Jest Leak Demo

This is a simple repo which demonstrates that initializing a `PrismaClient` inside a Jest run causes Jest to report a memory leak.

## How to run the demo

### 1. Clone the repo, install deps and generate the client

```bash
# Clone
git clone git@github.com:iknowcss-invenco/prisma-leak-demo.git

# Install deps
yarn

# Generate the prisma client
npx prisma generate
```

### 2. Run jest with `--detectLeaks`

Run this command

```bash
npx jest --detectLeaks
```

You should get output like this:

```plaintext
 FAIL  src/__test__/main.test.js
  ● Test suite failed to run

    EXPERIMENTAL FEATURE!
    Your test suite is leaking memory. Please ensure all references are cleaned.

    There is a number of things that can leak memory:
      - Async operations that have not finished (e.g. fs.readFile).
      - Timers not properly mocked (e.g. setInterval, setTimeout).
      - Keeping references to the global scope.

      at onResult (node_modules/@jest/core/build/TestScheduler.js:150:18)
      at node_modules/@jest/core/build/TestScheduler.js:254:19
      at node_modules/emittery/index.js:363:13
          at Array.map (<anonymous>)
      at Emittery.emit (node_modules/emittery/index.js:361:23)
```

### 3. Comment out the `PrismaClient` init and run jest again

Comment out this line from main.test.js

```
const prisma = new PrismaClient();
```

Run this command

```bash
npx jest --detectLeaks
```

You should get output like this:

```
 PASS  src/__test__/main.test.js
  main
    ✓ has a greeting (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.166 s, estimated 1 s
Ran all test suites.
```
