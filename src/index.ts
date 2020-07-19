import "core-js";
import { flatten } from "lodash";
import chalk from "chalk";
import { FigmaClient } from "./figma/figma.client";
import {
  IconData,
  IconExportData,
  GeneratorConfig,
  InvalidGeneratorConfig,
} from "./types";
import { defaultConfig, validateConfig } from "./config";
import {
  generateIcon,
  generateIndex,
  generateTypeDeclaration,
  generateTypes,
} from "./generators";

export const generate = async (
  initialConfig: GeneratorConfig | InvalidGeneratorConfig
) => {
  const { validationMessages, isValid } = validateConfig(initialConfig);

  if (!isValid) {
    validationMessages.forEach((msg) => console.log(chalk.red.bold(msg)));
    process.exit(1);
  }

  const config: GeneratorConfig = {
    ...defaultConfig,
    ...(initialConfig as GeneratorConfig),
  };

  try {
    const figma = new FigmaClient(config.figma.token);

    const { nodes } = await figma.getFileNodes(config.figma.fileId, {
      ids: config.figma.frames,
    });

    const iconData = flatten(
      Object.values(nodes).map((node) => node?.document.children)
    )
      .filter(Boolean)
      .map<IconData | null>((child) =>
        child ? { id: child.id, name: child.name, exportUrl: "" } : null
      )
      .filter<IconData>((value): value is IconData => Boolean(value));

    const { images } = await figma.getImage(config.figma.fileId, {
      ids: iconData.map((icon) => icon.id),
      format: "svg",
    });

    const iconExportData = iconData.map<IconExportData>((icon) => ({
      ...icon,
      url: images[icon.id] ?? "",
    }));

    console.log(
      chalk.green(
        `Successfully fetched ${iconExportData.length} icon${
          iconExportData.length === 1 ? "" : "s"
        } from Figma`
      )
    );

    const writtenIcons = await Promise.all(
      iconExportData.map((icon) => generateIcon(icon, config))
    );
    console.log(
      chalk.bold.green(
        `Successfully generated ${writtenIcons.length} icon${
          writtenIcons.length === 1 ? "" : "s"
        }`
      )
    );

    const indexFilePath = await generateIndex(writtenIcons, config);
    console.log(
      chalk.bold.green(
        `Successfully generated index file at "${indexFilePath}"`
      )
    );

    if (config.typescript) {
      const typesFilePath = await generateTypes(config);
      console.log(
        chalk.bold.green(
          `Successfully generated types file at "${typesFilePath}"`
        )
      );
    }

    if (config.typeDeclaration) {
      if (config.typescript && config.typeDeclaration !== "force") {
        console.log(
          chalk.yellow(
            "Do you really want to generate a declaration file (index.d.ts) when using typescript? If yes, set `typeDeclaration` to `force`."
          )
        );
        process.exit(1);
      }
      const typeDeclarationFilePath = await generateTypeDeclaration(
        writtenIcons,
        config
      );
      console.log(
        chalk.bold.green(
          `Successfully generated index.d.ts file at "${typeDeclarationFilePath}"`
        )
      );
    }
  } catch (e) {
    console.log(chalk.red("An error occured, see details below"));
    console.error(e);
  }
};

generate({
  output: "icons",
  figma: {
    fileId: "27uD8MSTL7eqo9pQYSIYnM",
    frames: ["1:2"],
    token: "54345-c3b182db-cb1e-4264-b607-38fb3ca0e50e",
  },
});
