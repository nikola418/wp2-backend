import mongoose, { Schema, Document } from 'mongoose';
import { IExtra, modelName as extrasModelName } from './extras';
import { PizzaDimension } from './enums/';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { Enum } from './types';

export interface IPizza {
  title: string;
  desc: string;
  img?: string;
  sizes: {
    dimension: number & { name: string; value: number };
    price: number;
  }[];
  extraOptions: IExtra[];
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
            type: Number,
            required: true,
            get: (dimension: number) => {
              return {
                name: PizzaDimension[dimension],
                value: dimension,
              };
            },
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
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
      transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
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
