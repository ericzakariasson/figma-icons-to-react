import path from "path";
import { GeneratorConfig, GeneratedIconData } from "../types";
import { writeFormattedFile } from "../utils";

export const generateIndex = async (
  icons: GeneratedIconData[],
  config: GeneratorConfig
): Promise<string> => {
  const componentExports = icons.map(
    icon => `export { ${icon.name} } from './${icon.name}'`
  );
  const filePath = path.resolve(
    config.output,
    `./index.${config.typescript ? "ts" : "js"}`
  );
  const fileContent = componentExports.join("\r\n");

  writeFormattedFile(filePath, fileContent, { ...config });

  return filePath;
};
