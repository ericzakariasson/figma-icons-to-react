export interface IconGeneratorConfig {
  figmaToken: string;
  configFile: string;
  fileId: string;
  fileNodeIds: string[];
  iconsPath: string;
  prettierConfig?: string;
}

export type IconGeneratorConfigKey = keyof IconGeneratorConfig;

export const defaultConfig: IconGeneratorConfig = {
  figmaToken: "",
  fileId: "",
  fileNodeIds: [],
  iconsPath: "",
  configFile: "icon-generator-config.json"
};
