#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { validateConfig } from "./config";
import { GeneratorConfig, CliGeneratorConfig } from "./types";

import { generate } from "./index";

const convertCliConfig = (cliConfig: CliGeneratorConfig): GeneratorConfig => ({
  figma: {
    fileId: cliConfig.fileId,
    frames: cliConfig.frames,
    token: cliConfig.token
  },
  output: cliConfig.output,
  eslintConfig: cliConfig.eslintConfig,
  prettierConfig: cliConfig.prettierConfig,
  typescript: cliConfig.typescript
});

const cli = async () => {
  program
    .description(`Generate React components from your Figma icons`)
    .requiredOption(
      "-o, --output <string>",
      "The path where icons will be generated"
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
      "-f, --frames <strings>",
      "Comma separated frame ids (file node ids)",
      value => value.replace(/\s/g, "").split(",")
    )
    .parse(process.argv);

  const cliConfig = program.opts() as CliGeneratorConfig;
  const config = convertCliConfig(cliConfig);

  const { isValid, validationMessages } = validateConfig(config);
  if (!isValid) {
    validationMessages.forEach(msg => console.log(chalk.red.bold(msg)));
    process.exit(1);
  }

  generate(config);
};

cli();
