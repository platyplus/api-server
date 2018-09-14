# GraphQL Server
[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/plmercereau/platyplus%2Fgraphql-server%2Fgraphql-server?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NWI5M2U0MGQwNTdiOGUwMDAxZmFkMjgx.OXdTB7Vte67YoKtDo9yes3tLkr8usTBnsY7t8HtTkyg&type=cf-1)]( https://g.codefresh.io/repositories/platyplus/graphql-server/builds?filter=trigger:build;branch:master;service:5b9573c4e885213f997ababe~graphql-server)

- https://codefresh.io/docker-tutorial/node_docker_multistage/
- TODO (DOCKER ENTRYPOINT?) prisma deploy, generate, seed... NON car pas idempotent
- TODO https://stackoverflow.com/questions/44140593/kubernetes-run-command-after-initialization
- TODO https://github.com/helm/helm/blob/master/docs/charts_hooks.md

# Local / development
## Requirements
TODO check
You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```

## Install dependencies
```sh
yarn install
```

## Commands

* `yarn start-dev` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

# Production
## Set a Kubernetes environment
TODO see kubernetes-config
## Deploy a Prisma server on Kubernetes
TODO
## CI/CD with CodeFresh
### Create a repository
### Create a pipeline
### Trigger
### Environment variables in Codefresh pipeline
