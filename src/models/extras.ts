import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IExtra {
  text: string;
  price: number;
}

export interface IExtraModel extends IExtra, Document {}

export const ExtrasSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 60,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export const modelName = 'Extra';
export default mongoose.model<IExtraModel>(modelName, ExtrasSchema);
