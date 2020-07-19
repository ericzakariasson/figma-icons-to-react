import "core-js";
import { defaultConfig } from "./config";
import { flatten } from "lodash";
import chalk from "chalk";
import fs from "fs";
import { getConfig } from "./getConfig";
import { FigmaClient } from "./figma/figma.client";
import { exportAndGenerateIcon } from "./exportAndGenerateIcon";
import { IconData, IconExportData } from "./types";

const main = async () => {
  const config = getConfig(defaultConfig);

  if (!fs.existsSync(config.iconsPath)) {
    throw new Error(
      `The specified output "${config.iconsPath}" does not exist`
    );
  }

  const figma = new FigmaClient(config.figmaToken);

  const { nodes } = await figma.getFileNodes(config.fileId, {
    ids: config.frames
  });

  const iconData = flatten(
    Object.values(nodes).map(node => node?.document.children)
  )
    .filter(Boolean)
    .map<IconData | null>(child =>
      child ? { id: child.id, name: child.name, exportUrl: "" } : null
    )
    .filter<IconData>((value): value is IconData => Boolean(value));

  const { images } = await figma.getImage(config.fileId, {
    ids: iconData.map(icon => icon.id),
    format: "svg"
  });

  const iconExportData = iconData
    .map<IconExportData>(icon => ({
      ...icon,
      url: images[icon.id] ?? ""
    }))
    .slice(0, 1);

  console.log(
    chalk.green(`Successfully fetched ${iconExportData.length} icons`)
  );

  await Promise.all(
    iconExportData.map(icon => exportAndGenerateIcon(icon, config))
  );
};

main();
