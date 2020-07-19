export interface IconGeneratorConfig {
  figmaToken: string;
  configFile: string;
  fileId: string;
  frames: string[];
  iconsPath: string;
  prettierConfig?: string;
}

export type IconGeneratorConfigKey = keyof IconGeneratorConfig;

export const defaultConfig: IconGeneratorConfig = {
  figmaToken: "",
  fileId: "",
  frames: [],
  iconsPath: "",
  configFile: "icon-generator-config.json"
};
