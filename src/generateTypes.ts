import path from "path";
import { GeneratorConfig, GeneratedIconData } from "./types";
import { writeFormattedFile } from "./utils";
import {
  defaultIconTypesTemplate,
  defaultPropTypes
} from "./templates/types.template";

export const generateTypes = async (
  icons: GeneratedIconData[],
  config: GeneratorConfig
): Promise<string> => {
  const filePath = path.resolve(config.output, `./index.d.ts`);

  const template = config.component?.typesTemplate ?? defaultIconTypesTemplate;
  const fileContent = await template({
    icons,
    propTypes: config.component?.propTypes ?? defaultPropTypes,
    config
  });

  writeFormattedFile(filePath, fileContent, { ...config });

  return filePath;
};
