import Pizza, { IPizza } from '../models/pizzas';
import Order from '../models/orders';
import Extra from '../models/extras';

export const pizzasService = {
  create: async (dto: IPizza) => {
    const { desc, extras, sizes, title, img } = dto;

    await Extra.create([...extras]).catch((err) => {
      return;
    });

    const resExtras = await Extra.find({
      $or: extras.map((extra) => ({ text: extra.text })),
    });

    const pizza = new Pizza({
      desc,
      extras: resExtras.map((extra) => extra._id),
      sizes,
      title,
      img,
    });
    return pizza.save();
  },

  readAll: () => {
    return Pizza.find({});
  },
  readById: (_id: string) => {
    return Pizza.findById(_id);
  },
  readPizzasOfTheDay: () => {
    return Pizza.find().limit(8);
  },

  updateById: (_id: string, dto: Partial<IPizza>) => {
    return Pizza.findByIdAndUpdate(_id, dto, { new: true });
  },

  deleteById: (_id: string) => {
    return Pizza.findByIdAndDelete(_id);
  },
};
