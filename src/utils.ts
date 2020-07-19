import { flow, camelCase, upperFirst } from "lodash";
import fs from "fs";
import { GeneratorConfig } from "./types";

const format = require("prettier-eslint");

export const pascalCase = flow(camelCase, upperFirst);

interface WriteFormattedFileOptions {
  prettierConfig?: string;
  eslintConfig?: string;
}

export const writeFormattedFile = (
  filePath: string,
  fileContent: string,
  options: WriteFormattedFileOptions = {}
) => {
  const formatted = format({
    text: fileContent,
    filePath,
    prettierPath: options.prettierConfig,
    eslintPath: options.eslintConfig
  });

  fs.writeFileSync(filePath, formatted);
};

export const ifTypescript = (config: GeneratorConfig) => (value: string) =>
  config.typescript ? value : "";
