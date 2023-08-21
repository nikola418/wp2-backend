import Joi from 'joi';
import { PizzaDimension } from '../../models/enums';
import { IPizza } from '../../models/pizzas';

const pizzaSchema = Joi.object<IPizza>({
  desc: Joi.string(),
  extras: Joi.array().items({
    text: Joi.string().required(),
    price: Joi.number().required(),
  }),
  img: Joi.string().uri(),
  sizes: Joi.array()
    .items({
      dimension: {
        value: Joi.number()
          .required()
          .valid(...Object.values(PizzaDimension)),
        name: Joi.string()
          .required()
          .valid(...Object.keys(PizzaDimension)),
      },
      price: Joi.number().required().min(0),
    })
    .min(1),
  title: Joi.string(),
});

export const createPizzaSchema = pizzaSchema
  .fork(['sizes', 'title'], (x) => x.required())
  .fork(['desc', 'img', 'extras'], (x) => x.optional());

export const updatePizzaSchema = pizzaSchema.fork([], (x) => x.optional());
