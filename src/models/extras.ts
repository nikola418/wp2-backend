import mongoose, { Schema, Document } from 'mongoose';

export interface IExtra {
  text: string;
  price: number;
}

export interface IExtraModel extends IExtra, Document {}

export const ExtrasSchema = new Schema(
  {
    text: {
      type: String,
      unique: true,
      required: true,
      maxLength: 60,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true, toJSON: { getters: true, virtuals: false } },
);

export const modelName = 'Extra';
export default mongoose.model<IExtraModel>(modelName, ExtrasSchema);
