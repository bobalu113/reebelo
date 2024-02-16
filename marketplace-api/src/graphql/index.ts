import { buildSchema as build } from "type-graphql";
import { ProductResolver } from "./resolvers/Product";
import { Backend } from "../Backend";

export interface Context {
  backend: Backend;
}

export const buildSchema = async () => {
  const schema = await build({
    resolvers: [ProductResolver],
    orphanedTypes: [],
  });
  return schema;
};


