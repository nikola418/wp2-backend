import Joi from 'joi';
import users, { IUser } from '../../models/users';

const userSchema = Joi.object<IUser>({
  email: Joi.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: Joi.string().regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  ),
  address: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
  phoneNumber: Joi.string(),
  paymentMethod: Joi.string(),
});

export const createUserSchema = userSchema.fork(['email', 'password'], (x) =>
  x.required(),
);

export const updateUserSchema = userSchema.fork([], (x) => x.optional());
