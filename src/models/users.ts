import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod } from './enums';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  address?: string;
  paymentMethod?: keyof typeof PaymentMethod;
}

export interface IUserModel extends IUser, Document {}

const UsersSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      maxLength: 512,
      unique: true,
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
    paymentMethod: { type: String, enum: PaymentMethod },
  },
  {
    timestamps: true,
  },
);

export const modelName = 'User';
export default mongoose.model<IUserModel>(modelName, UsersSchema);
