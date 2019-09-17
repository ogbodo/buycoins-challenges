import joi from '@hapi/joi';

const validatorSchema = {
  type: joi.string().required(),
  margin: joi.number().required(),
  exchangeRate: joi.number().required(),
};

export function doValidation(object: any) {
  return joi.validate(object, validatorSchema, {
    abortEarly: false,
    stripUnknown: true,
  });
}
