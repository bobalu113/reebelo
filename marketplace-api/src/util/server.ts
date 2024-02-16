import express from "express";
import * as http from "http";
import { ApolloServer } from "apollo-server-express";
import { Backend } from "../Backend";
import { Context, buildSchema } from "../graphql";

const WEBPACK_DEV_SERVER = "http://localhost:3000";

export const spawnServer = async (backend: Backend) => {
  const app = express();

  app.use(express.json());

  // if (process.env.NODE_ENV == "development") {
  //   app.use(
  //     cors({
  //       origin: WEBPACK_DEV_SERVER,
  //       credentials: true,
  //     })
  //   );

  //   app.use(referrerPolicy({ policy: "no-referrer-when-downgrade" }));
  // }

  const context = async ({ req }: any): Promise<Context> => {
    return {
      backend: backend,
    };
  };
  const schema = await buildSchema();
  const apolloServer = new ApolloServer({ schema, context });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: {
      origin: "*",
      credentials: true
    } 
  });

  const server = http.createServer(app);

  server.listen("4000", () => {
    console.info(`Server started on ${server.address()} :)`);
  });

  return server;
};
