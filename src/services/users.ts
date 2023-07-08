import User, { IUser } from '../models/users';
import { hashPassword } from '../library/hash';

const create = (dto: IUser) => {
  // #swagger.tags = ['Users']
  const {
    email,
    password,
    address,
    name,
    paymentMethod,
    phoneNumber,
    surname,
  } = dto;

  const user = new User({
    email,
    password: hashPassword(password),
    name,
    surname,
    address,
    phoneNumber,
    paymentMethod,
  });

  return user.save();
};

const readAll = async () => {
  // #swagger.tags = ['Users']
  return await User.find({});
};

const readById = async (_id: string) => {
  // #swagger.tags = ['Users']
  return await User.findById(_id);
};

const updateById = () => {
  // #swagger.tags = ['Users']
  return;
};

const deleteById = () => {
  // #swagger.tags = ['Users']
  return;
};

const usersService = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
};

export default usersService;
