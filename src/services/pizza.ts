import Pizza, { IPizza } from '../models/pizzas';

const create = (dto: IPizza) => {
  const { desc, extraOptions, sizes, title, img } = dto;
  const pizza = new Pizza({ desc, extraOptions, sizes, title, img });
  return pizza.save();
};

const readAll = () => {
  return Pizza.find({});
};
const readById = (_id: string) => {
  return Pizza.findById(_id);
};

const updateById = (_id: string, dto: Partial<IPizza>) => {
  return Pizza.findByIdAndUpdate(_id, dto, { new: true });
};

const deleteById = (_id: string) => {
  return Pizza.findByIdAndDelete(_id);
};

const pizzasService = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
};

export default pizzasService;
