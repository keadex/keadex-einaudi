<p align="center">
  <a href="https://keadex.io/kealab#keadex-einaudi" target="blank"><img src="https://keadex.io:2053/uploads/keadex_einaudi_dark_d9e36ea5c6.png" width="350" alt="Keadex Einaudi Logo" /></a>
</p>
<p align="center">The backend module built with <a href="https://nestjs.com/" target="_blank">NestJS</a> and <a href="https://graphql.org/" target="_blank">GraphQL</a>.</p>
</br>

# Description

**Keadex Einaudi** represents the backend module of Keadex. It is based on microservices built with NestJS, Apollo and GraphQL.</br>
</br>
Keadex Einaudi workspace is a [NestJS Monorepo](https://docs.nestjs.com/cli/monorepo#monorepo-mode), made up of different apps, one for each microservice.</br>
For further details about the architecture, check the [documentation](https://keadex.io/kealab#keadex-einaudi).

## Features
- Microservice architecture &amp; GraphQL
- Database per service pattern
- Event sourcing pattern
- NestJS
- Apollo Federation
- Apollo GraphQL Gateway
- Managed Federation
- Mongoose
- Apache Kafka
- Winston
- Winston Daily Rotate File
- Quotable - Thanks to the open source project https://github.com/lukePeavey/quotable
- Passport (Authentication Middleware)
- JWT
- GitHub Actions
- PM2 - Advanced process manager for production Node.js applications https://pm2.keymetrics.io/
</br>

# Getting started

1. install and run [Apache Kafka](https://kafka.apache.org/)
2. install and run [MongoDB](https://www.mongodb.com/)
3. install [Apollo Studio Rover CLI](https://www.apollographql.com/docs/rover/getting-started#installation-methods)
4. clone the repo: `git clone https://github.com/keadex/keadex-einaudi.git`
5. run `yarn install` under the root folder
6. check your environment variables under each microservice folder (`/apps/*`)
7. build all the microservices by running the following command under the root folder: `nest build MICROSERVICE_NAME_HERE` (e.g. `nest build gateway`)
8. publish the GraphQL schemas into your [Apollo Studio](https://www.apollographql.com/docs/studio/) account by running the following command under the root folder: `yarn publish-graph --name MICROSERVICE_NAME_HERE --port MICROSERVICE_PORT_HERE` (e.g. `yarn publish-graph --name gateway --port 3000`).</br>
For further details about the publish schema script, check the `/scripts/publish-graph.ts` file.</br>
Microservices configurations (e.g. port number) are defined in the environment variables.
</br>

# Warning
Nest.js has a bug when using code-first approach in building Microservices with GraphQL and Apollo Federation.
Check the following issue and PR for the solution:
  - https://github.com/nestjs/graphql/issues/1597
  - https://github.com/nestjs/graphql/pull/1780

