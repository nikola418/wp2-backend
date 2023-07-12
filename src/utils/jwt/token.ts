/* eslint-disable @typescript-eslint/no-empty-interface */
import { config } from '../../config/config';
import { IUserModel } from '../../models/users';
import jwt from 'jsonwebtoken';

export interface IJwtPayload
  extends Pick<
    IUserModel,
    | 'email'
    | 'name'
    | 'surname'
    | 'paymentMethod'
    | 'phoneNumber'
    | 'address'
    | '_id'
    | '__v'
    | 'role'
  > {}

export const generateAuthToken = (payload: IJwtPayload) => {
  return jwt.sign(payload, config.server.apiSecret, {
    expiresIn: '2h',
  });
};

export const verifyToken = (token: string) => {
  const tokenPayload = jwt.verify(token, config.server.apiSecret);
  return tokenPayload as IJwtPayload;
};
