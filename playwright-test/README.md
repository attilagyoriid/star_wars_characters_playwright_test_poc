This is a [Playwright](https://nextjs.org) project to cover api, front-end and e2e test levels.

# Getting Started

### Execute e2e tests:

```bash
npm run test:bdd:e2e --baseurl=http://localhost:3000 --project='chrome' --headless=true
# or
npm run test:bdd:e2e --project='chrome' --headless=true
# or
npm run test:bdd:e2e --project='chrome' --headless=false
# or
...
```

Open generated report in playwright-test\test-results\cucumber-report.html with your browser to see the result.

### Execute front-end tests:

```bash
npm run test:bdd:frontend --baseurl=http://localhost:3000 --project='chrome' --headless=true
# or
npm run test:bdd:frontend --project='chrome' --headless=true
# or
npm run test:bdd:frontend --project='chrome' --headless=false
# or
...
```

Open generated report in playwright-test\test-results\cucumber-report.html with your browser to see the result.

### Execute api tests:

```bash
npm run test:api
```

Open generated report in playwright-test\playwright-report\index.html with your browser to see the result.
