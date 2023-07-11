import Extra, { IExtra } from '../models/extras';

const create = (dto: IExtra) => {
  const extra = new Extra(dto);
  return extra.save();
};

const extrasService = { create };
export default extrasService;
