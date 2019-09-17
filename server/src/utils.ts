import joi from '@hapi/joi';

export function doValidation(object: any, schema: joi.SchemaLike) {
  return joi.validate(object, schema, {
    abortEarly: false,
    stripUnknown: true,
  });
}
