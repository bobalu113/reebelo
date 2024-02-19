import { buildSchema as build } from "type-graphql";
import { OrderResolver } from "./resolvers/Order";
import { Backend } from "../Backend";
import { GraphQLClient } from "graphql-request";

export interface Context {
  backend: Backend;
  marketplaceClient: GraphQLClient;
}

export const buildSchema = async () => {
  const schema = await build({
    resolvers: [OrderResolver],
    orphanedTypes: [],
  });
  return schema;
};


