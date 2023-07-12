import Pizza, { IPizza } from '../models/pizzas';

export const pizzasService = {
  create: (dto: IPizza) => {
    const { desc, extraOptions, sizes, title, img } = dto;
    const pizza = new Pizza({ desc, extraOptions, sizes, title, img });
    return pizza.save();
  },

  readAll: () => {
    return Pizza.find({});
  },
  readById: (_id: string) => {
    return Pizza.findById(_id);
  },

  updateById: (_id: string, dto: Partial<IPizza>) => {
    return Pizza.findByIdAndUpdate(_id, dto, { new: true });
  },

  deleteById: (_id: string) => {
    return Pizza.findByIdAndDelete(_id);
  },
};
