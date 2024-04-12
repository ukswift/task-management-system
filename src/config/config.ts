import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfig: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.number().optional().default(3000),
    GLOBAL_ROUTING_PREFIX: Joi.string().optional().default('api'),
    MONGODB_URI: Joi.string().required(),
  }),
};
