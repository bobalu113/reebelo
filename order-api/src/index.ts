import "reflect-metadata";
import * as AWS from "aws-sdk";
import { Backend } from "./Backend";
import { spawnServer } from "./util/server";
import config from "./util/config";

AWS.config.update({ region: process.env.AWS_REGION || config.region });

const start = async () => {
  const backend = new Backend();
  await backend.initialize();

  const server = await spawnServer(backend);
}

if (require.main === module) {
  start().then(() => {
    console.debug("Started.");
  });
}
