import mongoose, { Schema, Document } from 'mongoose';
import { IPizza, IPizzaModel, modelName as pizzasModelName } from './pizzas';
import { IExtra, IExtraModel, modelName as extrasModelName } from './extras';
import { PaymentMethod, Status } from './enums';
import { Enum } from './types';
import { IUser } from './users';

export interface IOrder {
  customer: IUser;
  address: string;
  total: number;
  status: Enum<Status>;
  paymentMethod: Enum<PaymentMethod>;
  entries: {
    pizza: IPizza;
    extras: IExtra[];
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
      get: (status: number) => {
        return {
          name: Status[status],
          value: status,
        };
      },
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
      get: (method: number) => {
        return {
          name: PaymentMethod[method],
          value: method,
        };
      },
      required: true,
    },
    entries: [
      {
        type: {
          pizza: {
            type: Schema.Types.ObjectId,
            ref: pizzasModelName,
            autopopulate: true,
            required: true,
          },
          extras: [{ type: Schema.Types.ObjectId, ref: extrasModelName }],
        },
        validate: [validateEntries, 'Must order at least 1 pizza!'],
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true, virtuals: false } },
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
