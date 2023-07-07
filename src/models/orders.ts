import mongoose, { Schema, Document } from 'mongoose';
import { IPizzaModel, modelName as pizzasModelName } from './pizzas';
import { IExtraModel, modelName as extrasModelName } from './extras';
import { IUserModel } from './users';
import { PaymentMethod, Status } from './enums';

export interface IOrder {
  customer: IUserModel;
  address: string;
  total: number;
  status: keyof typeof Status;
  paymentMethod: keyof typeof PaymentMethod;
  entries: {
    pizza: IPizzaModel;
    extras: IExtraModel[];
  }[];
}

export interface IOrderModel extends IOrder, Document {}

const OrderSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
      required: true,
    },
    entries: [
      {
        type: {
          pizza: {
            type: Schema.Types.ObjectId,
            ref: pizzasModelName,
            required: true,
          },
          extras: [{ type: Schema.Types.ObjectId, ref: extrasModelName }],
        },
        validate: [validateEntries, 'Must order at least 1 pizza!'],
      },
    ],
  },
  { timestamps: true },
);

export const modelName = 'Order';
export default mongoose.models[modelName] ||
  mongoose.model('Order', OrderSchema);

function validateEntries(
  entries: {
    pizza: IPizzaModel;
    extras: IExtraModel[];
  }[],
) {
  return entries.length > 0;
}
