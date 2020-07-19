import path from "path";
import fetch from "node-fetch";
import { camelCase, upperFirst, flow } from "lodash";
import { parse } from "node-html-parser";
import fs from "fs";
import { IconExportData } from "./types";
import { IconGeneratorConfig, defaultConfig } from "./config";
import { iconTemplate } from "./templates/Icon.template";

const format = require("prettier-eslint");
const pascalCase = flow(camelCase, upperFirst);

const defaultAttributes: Record<string, string> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "size",
  height: "size",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "color"
};

const reactAttributeValues = ["size"];

const generateAttributes = (attributes: Record<string, string>): string =>
  Object.entries(attributes)
    .map<string>(([key, value]) => {
      if (reactAttributeValues.includes(value)) {
        return `${key}={${value}}`;
      }

      return `${key}="${value}"`;
    })
    .join(" ");

const writeFormattedFile = (filePath: string, fileContent: string) => {
  const formatted = format({ text: fileContent, filePath });
  console.log(filePath);

  fs.writeFileSync(filePath, formatted);
};

export const exportAndGenerateIcon = async (
  icon: IconExportData,
  config: IconGeneratorConfig
) => {
  const iconName = `Icon${pascalCase(icon.name)}`;

  const filePath = path.resolve(config.iconsPath, `${iconName}.tsx`);
  const response = await fetch(icon.url, {
    headers: { "Content-Type": "stream" }
  });

  const html = await response.text();
  const innerSvgContent = parse(html).querySelector("svg").innerHTML;

  const attributes = {
    ...defaultAttributes
  };

  const fileContent = iconTemplate(
    iconName,
    generateAttributes(attributes),
    innerSvgContent
  );

  writeFormattedFile(filePath, fileContent);

  return true;
};
