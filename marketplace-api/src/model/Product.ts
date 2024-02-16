import { model, Schema } from "mongoose";
import { IProduct } from "../graphql/types/Product";

const schema = new Schema<IProduct>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", schema);
