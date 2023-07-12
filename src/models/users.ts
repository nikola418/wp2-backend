import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod, UserRole } from './enums';
import { Enum } from './types';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  address?: string;
  paymentMethod?: Enum<PaymentMethod>;
  role?: Enum<UserRole>;
}

export interface IUserModel extends IUser, Document {}

const UsersSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      maxLength: 512,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 512,
    },
    name: {
      type: String,
      maxLength: 50,
    },
    surname: { type: String, maxLength: 50 },
    phoneNumber: { type: String, maxLength: 20 },
    address: { type: String, maxLength: 200 },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
      get: (method: number) => {
        return {
          name: PaymentMethod[method],
          value: method,
        };
      },
    },
    role: {
      type: Number,
      default: UserRole.Customer,
      get: (role: number) => {
        return {
          name: UserRole[role],
          value: role,
        };
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: false },
  },
);

export const modelName = 'User';
export default mongoose.model<IUserModel>(modelName, UsersSchema);
