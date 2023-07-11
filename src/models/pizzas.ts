import mongoose, { Schema, Document } from 'mongoose';
import { modelName as extrasModelName } from './extras';
import { PizzaDimension } from './enums/';
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface IPizza {
  title: string;
  desc: string;
  img?: string;
  sizes: {
    dimension: keyof typeof PizzaDimension;
    price: number;
  }[];
  extraOptions: Schema.Types.ObjectId;
}

export interface IPizzaModel extends IPizza, Document {}

const PizzasSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: false,
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
          _id: false,
        },
      ],
      validate: [validateSizes, 'Must have at least 1 size'],
      required: true,
    },
    extraOptions: [
      {
        type: Schema.Types.ObjectId,
        ref: extrasModelName,
        autopopulate: true,
        required: false,
      },
    ],
  },
  { timestamps: true },
).plugin(mongooseAutopopulate);

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
