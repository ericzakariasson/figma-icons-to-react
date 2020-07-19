import path from "path";
import { GeneratorConfig } from "../types";
import { writeFormattedFile } from "../utils";
import { defaultPropTypes, defaultIconTypesTemplate } from "../templates";

export const defaultTypesFile = "Icon.types.ts";

export const generateTypes = async (
  config: GeneratorConfig
): Promise<string> => {
  const filePath = path.resolve(
    config.output,
    config.component?.typesFile ?? defaultTypesFile
  );

  const template = defaultIconTypesTemplate;

  const fileContent = await template({
    propTypes: config.component?.propTypes ?? defaultPropTypes,
    config
  });

  writeFormattedFile(filePath, fileContent, { ...config });

  return filePath;
};
