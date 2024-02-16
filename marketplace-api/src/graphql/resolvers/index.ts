import { Types } from "mongoose";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class ByIdArgs {
  @Field((type) => ID, { nullable: false })
  id: Types.ObjectId;
}

