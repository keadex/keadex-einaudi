# Keadex Einaudi

**Keadex Einaudi** represents the backend module of Keadex. It is based on microservices built with Nest.js, Apollo and GraphQL.

## Features
- Microservice architecture with GraphQL
- Database per service pattern
- Event sourcing pattern
- Nestjs
- Apollo GraphQL Gateway
- Apollo Federation / Managed Federation
- Mongoose
- Apache Kafka
- Winston
- Winston Daily Rotate File
- Quotable - Thanks to the open source project https://github.com/lukePeavey/quotable
- Passport (Authentication Middleware)
- JWT
- GitHub Actions
- PM2 - Advanced process manager for production Node.js applications https://pm2.keymetrics.io/

## Warning
Nest.js has a bug when using code-first approach in building Microservices with GraphQL and Apollo Federation.
Check the following issue and PR for the solution:
  - https://github.com/nestjs/graphql/issues/1597
  - https://github.com/nestjs/graphql/pull/1780

