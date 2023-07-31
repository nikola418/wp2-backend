import Joi from 'joi';
import { IOrder } from '../../models/orders';
import { OrderStatus } from '../../models/enums';

export type TOrder = Omit<IOrder, 'status' | 'customer'>;

const orderSchema = Joi.object<TOrder>({
  address: Joi.string(),
  paymentMethod: Joi.number(),
  total: Joi.number(),
  entries: Joi.array()
    .items({
      pizza: Joi.string().required(),
      extras: Joi.array().items(Joi.string().required()),
    })
    .min(1),
});

export const createOrderSchema = orderSchema.fork([], (x) => x);
export const updateOrderSchema = orderSchema.append({
  status: Joi.number()
    .valid(...Object.values(OrderStatus))
    .required(),
});
