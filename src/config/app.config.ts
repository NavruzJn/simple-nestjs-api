import { AppConfig } from "./config.model";
import { readFileSync } from "fs";
import * as yaml from "js-yaml";

const YAML_CONFIG_FILENAME = "config.yaml";

export const appConfig = (): AppConfig => {
  return yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as AppConfig;
};
