import * as AWS from "aws-sdk";
import config from "./config";

export type Secrets = { [key: string]: string };
export type Parameters = { [key: string]: string | undefined };

process.env.AWS_SDK_LOAD_CONFIG = "true";

const SECRET_PARAM = "secret_id";
const DEFAULT_PARAM = `/${config.appname}/default/`;
const ENVIRONMENT_PARAM = `/${config.appname}/${process.env.NODE_ENV}/`;

const secretsManager = new AWS.SecretsManager({
  region: process.env.AWS_REGION || config.region,
});

const ssm = new AWS.SSM();

export const getSecrets = async (): Promise<Secrets> => {
  const secretId = await getParameter(SECRET_PARAM);
  if (secretId) {
    const result = await secretsManager
      .getSecretValue({ SecretId: secretId })
      .promise();
    if (result.SecretString != null) {
      return JSON.parse(result.SecretString);
    }
  }
  throw new Error("Unable to load secrets");
};

const _getParameter = async (param: string): Promise<string | undefined> => {
  try {
    const result = await ssm.getParameter({ Name: param }).promise();
    return result.Parameter?.Value;
  } catch (err) {
    return undefined;
  }
};

export const getParameter = async (
  param: string
): Promise<string | undefined> => {
  const result = await _getParameter(ENVIRONMENT_PARAM + param);
  if (!result) {
    return await _getParameter(DEFAULT_PARAM + param);
  }
};

const getParametersByPath = async (
  request: AWS.SSM.GetParametersByPathRequest
): Promise<AWS.SSM.ParameterList> => {
  const response = await ssm.getParametersByPath(request).promise();
  const result = response.Parameters || [];

  if (response.NextToken) {
    request.NextToken = response.NextToken;
    result.push(...((await getParametersByPath(request)) || []));
    return result;
  }
  return result || [];
};

export const getParameters = async (): Promise<Parameters> => {
  const defaultParams = await getParametersByPath({
    Path: DEFAULT_PARAM,
    Recursive: true,
  });
  const envParams = await getParametersByPath({
    Path: ENVIRONMENT_PARAM,
    Recursive: true,
  });
  const result: Parameters = {};
  const defaultRegex = new RegExp(`^${DEFAULT_PARAM}`);
  defaultParams.forEach((param) => {
    if (param.Name) {
      const name = param.Name.replace(defaultRegex, "");
      result[name] = param.Value;
    }
  });
  const envRegex = new RegExp(`^${ENVIRONMENT_PARAM}`);
  envParams.forEach((param) => {
    if (param.Name) {
      const name = param.Name.replace(envRegex, "");
      if (param.Value) {
        result[name] = param.Value;
      } else {
        if (!(name in result)) {
          // don't overwrite default with undefined
          result[name] = param.Value;
        }
      }
    }
  });
  return result;
};
