import * as Joi from 'joi';

export default Joi.object({
  COMPANY_MS_TCP_PORT: Joi.number(),
  COMPANY_MS_KAFKA_HOST: Joi.string(),
  COMPANY_MS_KAFKA_PORT: Joi.number(),
  DATABASE_URL: Joi.string(),
  DATABASE_COMPANY: Joi.string(),
  LOG_LEVEL: Joi.string(),
  LOG_DATE_PATTERN: Joi.string(),
  LOG_DIR_NAME: Joi.string(),
  LOG_FILE_NAME: Joi.string(),
  LOG_FILE_NAME_DATE_PATTERN: Joi.string(),
});
