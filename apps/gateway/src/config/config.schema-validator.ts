import * as Joi from 'joi';

export default Joi.object({
  GATEWAY_MS_TCP_PORT: Joi.number(),
  GRAPHQL_ROUTING_URL: Joi.string(),
  APOLLO_KEY: Joi.string(),
  APOLLO_GRAPH_VARIANT: Joi.string(),
  DATABASE_URL: Joi.string(),
  DATABASE_CLIENT: Joi.string(),
  LOG_LEVEL: Joi.string(),
  LOG_DATE_PATTERN: Joi.string(),
  LOG_DIR_NAME: Joi.string(),
  LOG_FILE_NAME: Joi.string(),
  LOG_FILE_NAME_DATE_PATTERN: Joi.string(),
  JWT_SECRET_KEY: Joi.string(),
  JWT_EXPIRES_IN: Joi.string(),
});
