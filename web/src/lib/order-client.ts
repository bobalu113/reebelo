import { ApolloClient, InMemoryCache } from "@apollo/client";

const createOrderClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4100/graphql",
    cache: new InMemoryCache(),
  });
};

export default createOrderClient;
