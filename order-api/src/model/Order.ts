import { model, Schema } from "mongoose";
import { IOrder } from "../graphql/types/Order";

const schema = new Schema<IOrder>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    carrier: {
      type: String,
      required: false
    },
    trackingNumber: {
      type: String
    },
    orderStatus: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const OrderModel = model<IOrder>("Order", schema);

