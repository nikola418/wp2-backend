import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserInfoSchema = new mongoose.Schema(
  {
    name: {},
    surname: {},
    phoneNumber: {},
    address: {},
    paymentMethod: {},
  },
  { timestamps: true },
);

export default mongoose.models.UserInfo ||
  mongoose.model('UserInfo', UserInfoSchema);
