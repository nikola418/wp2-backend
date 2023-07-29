import Joi from 'joi';
import { IUser } from '../../models/users';

const userSchema = Joi.object<IUser>({
  email: Joi.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: Joi.string().regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  ),
  address: Joi.string().allow(''),
  name: Joi.string().allow(''),
  surname: Joi.string().allow(''),
  phoneNumber: Joi.string().allow(''),
  paymentMethod: Joi.string().allow(''),
});

export const createUserSchema = userSchema.fork(['email', 'password'], (x) =>
  x.required(),
);

export const updateUserSchema = userSchema.fork([], (x) => x.optional());
