import Joi from 'joi';
import { PizzaDimension } from '../../models/enums';
import { IPizza } from '../../models/pizzas';

const pizzaSchema = Joi.object<IPizza>({
  desc: Joi.string(),
  extraOptions: Joi.array().items(Joi.string()),
  img: Joi.string().uri(),
  sizes: Joi.array()
    .items({
      dimension: Joi.string()
        .required()
        .valid(...Object.keys(PizzaDimension)),
      price: Joi.number().required().min(0),
    })
    .min(1),
  title: Joi.string(),
});

export const createPizzaSchema = pizzaSchema
  .fork(['sizes', 'title'], (x) => x.required())
  .fork(['desc', 'img', 'extraOptions'], (x) => x.optional());

export const updatePizzaSchema = pizzaSchema.fork([], (x) => x.optional());
