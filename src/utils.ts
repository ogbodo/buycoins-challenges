import joi from '@hapi/joi';

const validatorSchema = {
  exchangeType: joi
    .string()
    .regex(/^(BUY|SELL)$/i)
    .required(),

  margin: joi.number().required(),
  exchangeRate: joi.number().required(),
};

export function doValidation(object: any) {
  return joi.validate(object, validatorSchema, {
    abortEarly: false,
    stripUnknown: true,
  });
}
