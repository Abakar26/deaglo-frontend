# Deaglo Frontend Monorepo

This monorepo contains all frontend codebases used within Deaglo.

## What's inside?

This monorepo includes the following:

### Apps

- `docs`: design system documented built with [Storybook](https://storybook.js.org/)
- `platform`: our primary offering; application built using [Next.js](https://nextjs.org/)

### Packages

- `ui`: design system
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```sh
cd frontend
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd frontend
yarn dev
```

### Platform Deployment

Platform deployment is done through SST CLI - see example below. Make sure to replace the parameters as needed to specify the stage for deployment and AWS credentials to use.

```sh
cd apps/platform
yarn sst deploy --stage $STAGE --profile $AWS_PROFILE
```

## Useful Links

- [Turborepo Docs](https://turbo.build/repo/docs)
  - [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
  - [Caching](https://turbo.build/repo/docs/core-concepts/caching)
  - [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
  - [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
  - [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
  - [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
- [SST Docs](https://docs.sst.dev/)
  - [SST Configuration](https://docs.sst.dev/configuring-sst)
  - [Resource binding](https://docs.sst.dev/resource-binding)
  - [Stack config and secrets](https://docs.sst.dev/config)
  - [File uploads](https://docs.sst.dev/file-uploads)
  - [CLI Usage](https://docs.sst.dev/packages/sst)
