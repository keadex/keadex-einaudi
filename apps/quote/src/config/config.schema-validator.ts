import * as Joi from 'joi';

export default Joi.object({
  QUOTE_MS_TCP_PORT: Joi.number(),
  QUOTE_MS_KAFKA_HOST: Joi.string(),
  QUOTE_MS_KAFKA_PORT: Joi.number(),
  LOG_LEVEL: Joi.string(),
  LOG_DATE_PATTERN: Joi.string(),
  LOG_DIR_NAME: Joi.string(),
  LOG_FILE_NAME: Joi.string(),
  LOG_FILE_NAME_DATE_PATTERN: Joi.string(),
});
