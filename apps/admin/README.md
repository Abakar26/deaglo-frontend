# Deaglo Admin

This is a React base project that is set up with a custom JWT auth system, authenticated routing, and API interactions.

## Setup

```bash
bun install
bun run dev
```

## Environment

You can define an API base to specify where queryAPI and mutateAPI should send requests, this value is also configurable in src/core/utilities/constants.ts

```sh
VITE_API_BASE=http://yourapi.com/v1
```
