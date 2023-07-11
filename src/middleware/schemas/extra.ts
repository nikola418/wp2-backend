import Joi from 'joi';
import { IExtra } from '../../models/extras';

const extraSchema = Joi.object<IExtra>({
  text: Joi.string(),
  price: Joi.number(),
});

export const createExtraSchema = extraSchema.fork(['text', 'price'], (x) =>
  x.required(),
);
