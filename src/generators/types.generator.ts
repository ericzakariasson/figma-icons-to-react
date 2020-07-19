import path from "path";
import { GeneratorConfig, GeneratedIconData } from "../types";
import { writeFormattedFile } from "../utils";
import { defaultTypeDeclarationTemplate } from "../templates";
import {
  defaultPropTypes,
  defaultIconTypesTemplate
} from "../templates/types.template";

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
