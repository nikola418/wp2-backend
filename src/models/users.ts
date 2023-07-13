import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod, UserRole } from './enums';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  address?: string;
  paymentMethod?: number;
  role?: number & { name: string; value: number };
}

export interface IUserModel extends IUser, Document {}

const UsersSchema = new Schema<IUser>(
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
      type: Number,
      get: (value: number) => {
        return {
          name: PaymentMethod[value],
          value,
        };
      },
    },
    role: {
      type: Schema.Types.Number,
      default: UserRole.Customer,
      get: (value: number) => {
        return {
          name: UserRole[value],
          value,
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
