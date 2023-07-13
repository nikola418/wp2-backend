import Extra, { IExtra } from '../models/extras';

export const extrasService = {
  create: (dto: IExtra) => {
    const extra = new Extra(dto);
    return extra.save();
  },

  deleteById: (_id: string) => {
    return Extra.findByIdAndDelete(_id);
  },

  readAll: () => {
    return Extra.find();
  },
};
