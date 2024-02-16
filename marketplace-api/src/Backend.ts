import { connect } from "mongoose";
import { Secrets, Parameters, getParameters, getSecrets } from "./util/aws";

export class Backend {
  secrets!: Secrets;
  parameters!: Parameters;

  constructor() {
  }

  async initialize() {
    this.secrets = await getSecrets();
    this.parameters = await getParameters();

    await this.initModel();
  }

  async initModel() {
    const MONGO_URI = `mongodb+srv://${encodeURIComponent(this.parameters.mongo_username)}:${encodeURIComponent(this.secrets.mongo_password)}@${encodeURIComponent(this.parameters.mongo_host)}/`;
    const result = await Promise.all([]);

    await connect(MONGO_URI, {});

    return result;
  }

}
