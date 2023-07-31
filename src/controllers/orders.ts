import { NextFunction, Request, Response } from 'express';
import { ordersService } from '../services/orders';
import { TOrder } from '../middleware/schemas/order';
import { HttpStatus } from '../utils/enums';
import { IJwtPayload } from '../utils/jwt';
import { SortOrder } from 'mongoose';
import { IOrder, IOrderModel } from '../models/orders';

export const ordersController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    //swagger.tags = ['Orders']
    const { address, entries, paymentMethod, total }: TOrder = req.body;

    try {
      const order = await ordersService.create(req.user as IJwtPayload, {
        address,
        entries,
        paymentMethod,
        total,
      });

      res.status(HttpStatus.CREATED).json(order);
    } catch (error) {
      next(error);
    }
  },

  readAll: async (req: Request, res: Response, next: NextFunction) => {
    //swagger.tags = ['Orders']
    const skip = req.query.skip ?? 0;
    const take = req.query.take ?? 10;
    const sortOrder = req.query.sortOrder as SortOrder;
    const user = req.user as IJwtPayload;

    try {
      const orders = ordersService.readAll(
        { skip: skip as number, take: take as number, sortOrder },
        user,
      );
      res.status(HttpStatus.OK).json(orders);
    } catch (error) {
      next(error);
    }
  },

  updateById: async (req: Request, res: Response, next: NextFunction) => {
    //swagger.tags = ['Orders']
    const id = req.params.id;
    const user = req.user as IJwtPayload;
    const {
      address,
      entries,
      paymentMethod,
      status,
      total,
    }: TOrder & { status: number } = req.body;

    try {
      const order = await ordersService.updateById(
        {
          address,
          entries,
          paymentMethod,
          status,
          total,
        },
        id,
        user,
      );
      res.status(HttpStatus.OK).json(order);
    } catch (error) {
      next(error);
    }
  },
};
