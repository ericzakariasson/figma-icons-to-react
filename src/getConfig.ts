import path from "path";
import fs from "fs";

import { IconGeneratorConfig, IconGeneratorConfigKey } from "./config";

import { program } from "commander";

export const getConfig = (defaultConfig: IconGeneratorConfig) => {
  const hasConfigFile = fs.existsSync(path.resolve(defaultConfig.configFile));

  if (hasConfigFile) {
    const configFile: IconGeneratorConfig = JSON.parse(
      fs.readFileSync(path.resolve(defaultConfig.configFile)).toString()
    );
    if (!configFile.figmaToken) {
      program
        .requiredOption(
          "-t --token <string>",
          "Your personal access token from Figma",
          token => token.trim()
        )
        .parse(process.argv);
      configFile.figmaToken = program.token;
    }

    const requiredKeys: IconGeneratorConfigKey[] = [
      "fileId",
      "fileNodeIds",
      "iconsPath"
    ];
    const validKeys = Object.keys(defaultConfig);
    Object.entries(configFile).forEach(([key, value]) => {
      if (!validKeys.includes(key)) {
        throw new Error(`"${key}" is not valid key`);
      }

      if (!value) {
        throw new Error(`"${key}" has no value`);
      }

      if (
        (key as IconGeneratorConfigKey) === "fileNodeIds" &&
        (!Array.isArray(value) || value.length === 0)
      ) {
        throw new Error(`"${key}" is not a valid array`);
      }
    });

    return configFile;
  }

  program
    .description(
      `Generate React components from your Figma icons\n\nYou can also create a config file called "${defaultConfig.configFile}" instead of using the CLI`
    )
    .requiredOption(
      "-t, --token <string>",
      "Your personal access token from Figma",
      token => token.trim()
    )
    .requiredOption("-fid, --file-id <string>", "The Figma file id", id =>
      id.trim()
    )
    .requiredOption(
      "-o, --output <string>",
      "The path where icons will be generated"
    )
    .requiredOption(
      "-fnids, --file-node-ids <strings>",
      "Comma separated file node ids",
      value => value.replace(/\s/g, "").split(",")
    )
    .parse(process.argv);

  const options = program.opts();
  return Object.entries(options).reduce<IconGeneratorConfig>(
    (config, [key, value]) => {
      switch (key) {
        case "fileId":
          return {
            ...config,
            fileId: value
          };
        case "output":
          if (!fs.existsSync(path.resolve(value))) {
            throw new Error("Specified output does not exist");
          }

          return {
            ...config,
            iconsPath: value
          };
        case "fileNodeIds":
          return {
            ...config,
            fileNodeIds: value
          };
        case "token":
          return {
            ...config,
            figmaToken: value
          };
        default:
          return config;
      }
    },
    { ...defaultConfig }
  );
};
