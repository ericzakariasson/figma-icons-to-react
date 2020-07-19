import { InvalidGeneratorConfig, GeneratorConfig } from "./types";
import fs from "fs";

export const defaultConfig: Partial<GeneratorConfig> = {
  typescript: true,
};

export const validateConfig = (
  config: GeneratorConfig | InvalidGeneratorConfig
) => {
  const validationMessages: string[] = [];
  if (config.figma === undefined) {
    validationMessages.push(`Configuration for Figma must not be empty`);
  }

  if (config.figma !== undefined && config.figma.token === undefined) {
    validationMessages.push(`No Figma token provided`);
  }

  if (config.output === undefined) {
    validationMessages.push(`Configuration for output must not be empty`);
  }

  if (config.output && !fs.existsSync(config.output)) {
    validationMessages.push(`The specified output directory does not exists`);
  }

  return {
    validationMessages,
    isValid: validationMessages.length === 0,
  };
};
