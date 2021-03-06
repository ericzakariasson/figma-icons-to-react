import path from "path";
import { GeneratedIconData } from "../types";
import { writeFormattedFile } from "../utils";
import { defaultTypeDeclarationTemplate, defaultPropTypes } from "../templates";
import { GeneratorConfig } from "../config.types";

export const generateTypeDeclaration = async (
  icons: GeneratedIconData[],
  config: GeneratorConfig
): Promise<string> => {
  const filePath = path.resolve(config.output, `./index.d.ts`);

  const template = defaultTypeDeclarationTemplate;
  const fileContent = await template({
    icons,
    propTypes: config.componentTypes?.propTypes ?? defaultPropTypes,
    config,
  });

  writeFormattedFile(filePath, fileContent, { ...config });

  return filePath;
};
