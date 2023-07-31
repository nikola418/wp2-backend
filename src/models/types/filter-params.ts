import { SortOrder } from 'mongoose';

export interface IFilterParams {
  sortOrder: SortOrder;
  skip: number;
  take: number;
}
