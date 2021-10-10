import * as Joi from 'joi';

export default Joi.object({
  EXPERIENCE_MS_TCP_PORT: Joi.number(),
  EXPERIENCE_MS_KAFKA_HOST: Joi.string(),
  EXPERIENCE_MS_KAFKA_PORT: Joi.number(),
  DATABASE_URL: Joi.string(),
  DATABASE_EXPERIENCE: Joi.string(),
  LOG_LEVEL: Joi.string(),
  LOG_DATE_PATTERN: Joi.string(),
  LOG_DIR_NAME: Joi.string(),
  LOG_FILE_NAME: Joi.string(),
  LOG_FILE_NAME_DATE_PATTERN: Joi.string(),
});
