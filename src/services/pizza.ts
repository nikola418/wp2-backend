import Pizza, { IPizza } from '../models/pizzas';

const create = (dto: IPizza) => {
  // #swagger.tags = ['Pizzas']
  const { desc, extraOptions, sizes, title, img } = dto;
  const pizza = new Pizza({ desc, extraOptions, sizes, title, img });
  return pizza.save();
};

const readAll = () => {
  // #swagger.tags = ['Pizzas']
  return Pizza.find({});
};
const readById = () => {
  return;
};

const updateById = () => {
  return;
};

const deleteById = () => {
  return;
};

const pizzasService = {
  create,
  readAll,
};

export default pizzasService;
