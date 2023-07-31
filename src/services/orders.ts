import { TOrder } from '../middleware/schemas/order';
import { UserRole } from '../models/enums';
import Order, { IOrder, IOrderModel } from '../models/orders';
import { IFilterParams } from '../models/types/filter-params';
import { HttpStatus } from '../utils/enums';
import { Exception } from '../utils/error/server-exception';
import { IJwtPayload } from '../utils/jwt';

export const ordersService = {
  create: (user: IJwtPayload, dto: TOrder) => {
    const { address, entries, paymentMethod, total } = dto;
    const order = new Order({ address, entries, paymentMethod, total });
    return order.save();
  },

  readAll: async (
    { skip = 0, take = 10, sortOrder = 'desc' }: IFilterParams,
    user: IJwtPayload,
  ) => {
    const orders: IOrderModel[] = [];

    if (user.role === UserRole.Admin) {
      orders.push(
        ...(await Order.find({})
          .sort({ createdAt: sortOrder })
          .skip(skip)
          .limit(take)),
      );
    }

    if (user.role === UserRole.Customer) {
      orders.push(
        ...(await Order.find({ customer: user.id })
          .sort({ createdAt: sortOrder })
          .skip(skip)
          .limit(take)),
      );
    }

    return orders;
  },

  updateById: async (
    dto: Partial<TOrder & { status: number }>,
    id: string,
    user: IJwtPayload,
  ) => {
    if (!(user.role === UserRole.Admin))
      throw new Exception(HttpStatus.UNAUTHORIZED);

    const order = await Order.findByIdAndUpdate(id, { ...dto });
    return order;
  },
};
