import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/logging';
import { IAuthor } from '../models/author';
import { IBook } from '../models/book';
import { IUser } from '../models/users';
import { HttpStatus } from '../library/enums';
import { IPizza } from '../models/pizzas';
import { PizzaDimension } from '../models/enums';

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
    create: Joi.object<IUser>({
      email: Joi.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .required(),
      password: Joi.string()
        .required()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
      address: Joi.string().optional(),
      name: Joi.string().optional(),
      surname: Joi.string().optional(),
      phoneNumber: Joi.string().optional(),
      paymentMethod: Joi.string().optional(),
    }),
    update: Joi.object<IUser>({}),
  },
  pizza: {
    create: Joi.object<IPizza>({
      desc: Joi.string().optional(),
      extraOptions: Joi.array().items({
        text: Joi.string().required(),
        price: Joi.number().required(),
      }),
      img: Joi.string().uri().optional(),
      sizes: Joi.array()
        .items({
          dimension: Joi.string()
            .required()
            .valid(...Object.keys(PizzaDimension)),
          price: Joi.number().required().min(0),
        })
        .min(1)
        .required(),
      title: Joi.string().required(),
    }),
    update: Joi.object<IPizza>({}),
  },
};
