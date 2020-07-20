import path from "path";
import { writeFormattedFile } from "../utils";
import { defaultPropTypes, defaultIconTypesTemplate } from "../templates";
import { GeneratorConfig } from "../config.types";

export const defaultTypesFileName = "Icon.types";

export const generateTypes = async (
  config: GeneratorConfig
): Promise<string> => {
  const fileName = config.componentTypes?.fileName ?? defaultTypesFileName;
  const filePath = path.resolve(config.output, `${fileName}.ts`);

  const template = defaultIconTypesTemplate;

  const fileContent = await template({
    propTypes: config.componentTypes?.propTypes ?? defaultPropTypes,
    config,
  });

  writeFormattedFile(filePath, fileContent, { ...config });

  return filePath;
};
