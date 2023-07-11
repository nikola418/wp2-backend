import Extra, { IExtra } from '../models/extras';

const create = (dto: IExtra) => {
  const extra = new Extra(dto);
  return extra.save();
};

const deleteById = (_id: string) => {
  return Extra.findByIdAndDelete(_id);
};

const extrasService = { create, deleteById };
export default extrasService;
