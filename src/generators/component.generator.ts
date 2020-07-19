import path from "path";
import fetch from "node-fetch";
import { parse } from "node-html-parser";
import {
  IconExportData,
  GeneratorConfig,
  ComponentTemplateParameters,
  GeneratedIconData
} from "../types";
import {
  defaultIconTemplate,
  defaultAttributes,
  defaultProps
} from "../templates";
import { pascalCase, writeFormattedFile } from "../utils";

export const generateIcon = async (
  icon: IconExportData,
  config: GeneratorConfig
): Promise<GeneratedIconData> => {
  const iconName = `${config.component?.namePrefix ?? ""}${
    config.component?.name?.(icon.name) ?? pascalCase(icon.name)
  }${config.component?.nameSuffix ?? ""}`;

  const filePath = path.resolve(
    config.output,
    `${iconName}.${config.typescript ? "tsx" : "jsx"}`
  );

  const response = await fetch(icon.url, {
    headers: { "Content-Type": "stream" }
  });

  const html = await response.text();
  const innerSvgContent = parse(html).querySelector("svg").innerHTML;

  const beforeTemplateUpdate =
    (await config.component?.beforeTemplate?.(innerSvgContent)) ??
    innerSvgContent;

  const templateOptions: ComponentTemplateParameters = {
    name: (await config.component?.name?.(icon.name)) ?? pascalCase(icon.name),
    innerContent: beforeTemplateUpdate,
    attributes: config.component?.attributes ?? defaultAttributes,
    props: config.component?.props ?? defaultProps,
    size: config.component?.size ?? 24,
    raw: html,
    config
  };

  const template = config.component?.template ?? defaultIconTemplate;
  const fileContent = await template(templateOptions);

  const beforeWriteUpdate =
    (await config.component?.beforeWrite?.(fileContent)) ?? fileContent;

  writeFormattedFile(filePath, beforeWriteUpdate, { ...config });

  return {
    name: templateOptions.name
  };
};
