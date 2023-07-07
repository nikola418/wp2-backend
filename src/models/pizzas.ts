import mongoose, { Schema, Document } from 'mongoose';
import { ExtrasSchema, IExtraModel } from './extras';
import { PizzaDimension } from './enums/';

export interface IPizza {
  title: string;
  desc: string;
  img?: string;
  sizes: {
    dimension: keyof typeof PizzaDimension;
    price: number;
  }[];
  extraOptions: IExtraModel[];
}

export interface IPizzaModel extends IPizza, Document {}

const PizzasSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    img: {
      type: String,
    },
    sizes: {
      type: [
        {
          dimension: {
            type: String,
            enum: PizzaDimension,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: [validateSizes, 'Must have at least 1 size'],
    },
    extraOptions: [ExtrasSchema],
  },
  { timestamps: true },
);

export const modelName = 'Pizza';
export default mongoose.model<IPizzaModel>(modelName, PizzasSchema);

function validateSizes(
  sizes: {
    dimension: keyof typeof PizzaDimension;
    price: number;
  }[],
) {
  return sizes.length > 0;
}
