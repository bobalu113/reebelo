import { Types } from "mongoose";
import { Field, Float, ID, InputType, Int, ObjectType } from "type-graphql";

export enum OrderStatus {
  Placed = "Placed",
  Shipped = "Shipped"
}

export interface IOrder {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
  carrier?: string;
  trackingNumber?: string;
  orderStatus: OrderStatus;
}

@ObjectType()
export class Order implements IOrder {

  @Field((type) => ID)
  _id: Types.ObjectId;

  @Field((type) => ID)
  productId: Types.ObjectId;

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  quantity: number;

  @Field((type) => String, { nullable: true })
  carrier?: string;

  @Field((type) => String, { nullable: true })
  trackingNumber?: string;

  @Field((type) => String)
  orderStatus: OrderStatus;

}

@InputType()
export class CreateOrderInput {

  @Field((type) => ID)
  productId: Types.ObjectId;

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  quantity: number;

}

@InputType()
export class ShipOrderInput {

  @Field((type) => ID)
  _id: Types.ObjectId;

  @Field((type) => String)
  carrier: string;

  @Field((type) => String)
  trackingNumber: string;

}

@InputType()
export class UpdateOrderStatusInput {

  @Field((type) => ID)
  _id: Types.ObjectId;

  @Field((type) => String)
  orderStatus: OrderStatus;

}
