import { Types } from "mongoose";
import { Field, Float, ID, InputType, Int, ObjectType } from "type-graphql";

export interface IProduct {
  _id: Types.ObjectId;
  price: number;
  stock: number;
}

@ObjectType()
export class Product implements IProduct {

  @Field((type) => ID)
  _id: Types.ObjectId;

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  stock: number;

}

@InputType()
export class CreateProductInput implements Partial<IProduct> {

  @Field((type) => Float, { nullable: true })
  price?: number;

  @Field((type) => Int, { nullable: true })
  stock?: number;

}

@InputType()
export class UpdateProductInput extends CreateProductInput {

  @Field((type) => ID)
  _id: Types.ObjectId;

}
