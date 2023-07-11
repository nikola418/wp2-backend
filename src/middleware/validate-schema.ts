import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/logging';
import { IAuthor } from '../models/author';
import { IBook } from '../models/book';
import { HttpStatus } from '../library/enums';
import { createUserSchema, updateUserSchema } from './schemas/user';
import { createPizzaSchema, updatePizzaSchema } from './schemas/pizza';
import { createExtraSchema } from './schemas/extra';

export const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    if (result.error) {
      Logging.error(result.error);
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: result.error.message });
    }

    next();
  };
};

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required(),
    }),
    update: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required(),
    }),
  },
  user: {
    create: createUserSchema,
    update: updateUserSchema,
  },
  pizza: {
    create: createPizzaSchema,
    update: updatePizzaSchema,
  },
  extra: { create: createExtraSchema },
};
