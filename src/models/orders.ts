import mongoose, { Schema, Document } from 'mongoose';
import { IPizza, IPizzaModel, modelName as pizzasModelName } from './pizzas';
import { IExtra, IExtraModel, modelName as extrasModelName } from './extras';
import { PaymentMethod, OrderStatus, PizzaDimension } from './enums';
import { IUser } from './users';
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface IOrder {
  customer: IUser | string;
  address: string;
  total: number;
  status: number & { name: string; value: number };
  paymentMethod: number;
  entries: {
    pizza: IPizza | string;
    dimension: number & { name: string; value: number };
    count: number;
    extras: IExtra[] | string[];
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
      type: Number,
      default: 0,
      get: (status: number) => {
        return {
          name: OrderStatus[status],
          value: status,
        };
      },
    },
    paymentMethod: {
      type: Number,
      default: 0,
      get: (method: number) => {
        return {
          name: PaymentMethod[method],
          value: method,
        };
      },
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
          dimension: {
            type: Number,
            required: true,
            get: (dimension: number) => {
              return {
                name: PizzaDimension[dimension],
                value: dimension,
              };
            },
            set: ({ name, value }: { name: string; value: number }) => {
              return value;
            },
          },
          count: { type: Number, required: true },
          extras: [{ type: Schema.Types.ObjectId, ref: extrasModelName }],
        },
        validate: [validateEntries, 'Must order at least 1 pizza!'],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
      transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
).plugin(mongooseAutopopulate);

export const modelName = 'Order';
export default mongoose.model<IOrderModel>(modelName, OrderSchema);

function validateEntries(
  entries: {
    pizza: IPizzaModel;
    extras: IExtraModel[];
  }[],
) {
  return entries.length > 0;
}
