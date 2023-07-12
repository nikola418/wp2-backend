import Joi from 'joi';
import { IUser } from '../../models/users';

type UserLogin = Pick<IUser, 'email' | 'password'>;

const userAuthSchema = Joi.object<UserLogin>({
  email: Joi.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: Joi.string().regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  ),
});

export const userLoginSchema = userAuthSchema.fork(['email', 'password'], (x) =>
  x.required(),
);
