# Contributing

Thanks for taking the time to look at PM Signal Lab.

## Before opening an issue or pull request

1. Read the [README](./README.md) and the [product contract](./docs/product/pm-signal-lab/00-contract.md).
2. Reproduce the behavior with the smallest possible evidence pack.
3. Do not include private customer data, API keys, tokens, credentials, or raw confidential evidence.
4. Run the local checks:

```bash
npm install
npm test
npm run lint
npm run build
```

## Pull requests

Keep changes narrow and explain the user job, expected behavior, evidence used, and what remains unverified. User-facing changes should include the affected state, recovery path, and responsive or accessibility impact.

This project currently has no declared license. Opening a pull request does not grant permission to reuse the code outside the contribution review process.
