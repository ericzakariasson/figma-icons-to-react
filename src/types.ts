export interface IconData {
  id: string;
  name: string;
}

export interface IconExportData extends IconData {
  url: string;
}

export interface GeneratedIconData {
  name: string;
}

export interface ComponentTemplateParameters {
  name: string;
  props: Record<string, any>;
  attributes: Record<string, string>;
  innerContent: string;
  size: number;
  raw: string;
  typesFilePath: string;
  config: GeneratorConfig;
}

type InterfacePrimitiveType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "unknown"
  | "any";

export interface PropType {
  name: string;
  types: (InterfacePrimitiveType | string)[];
  optional?: boolean;
}

export interface TypeDeclarationTemplateParameters {
  icons: GeneratedIconData[];
  propTypes: PropType[];
  config: GeneratorConfig;
}

export interface ComponentTypesTemplateParameters {
  propTypes: PropType[];
  config: GeneratorConfig;
}

interface FigmaConfig {
  fileId: string;
  frames: string[];
  token: string;
}

interface SwitchComponentOptions {
  /**
   * Defaults to "Icon"
   */
  name?: string;
  /**
   * Defaults to `{config.output}/{name}.tsx`
   */
  path?: string;
  props?: Record<string, any>;
}

interface ComponentOptions {
  /**
   * Defaults to `pascalCase(name)`
   */
  name?: (name: string) => Promise<string>;
  size?: number;
  namePrefix?: string;
  nameSuffix?: string;
  template?: (parameters: ComponentTemplateParameters) => Promise<string>;
  /**
   * Defaults to
   * ```
   * size?: string | number;
   * color?: string;
   * ```
   */
  props?: Record<string, any>;
  propTypes?: PropType[];
  /**
   * Defaults to `Icon.types.ts`
   */
  typesFile?: string;
  attributes?: Record<string, any>;
  /**
   * Default to `24`
   */
  beforeTemplate?: (svgContent: string) => Promise<string>;
  beforeWrite?: (svgContent: string) => Promise<string>;
}

export interface GeneratorConfig {
  output: string;
  figma: FigmaConfig;
  component?: ComponentOptions;
  /**
   * Preferrably used with `jsx`
   */
  typeDeclaration?: boolean | "force";
  switchComponent?: SwitchComponentOptions;
  /**
   * Defaults to `true`
   */
  typescript?: boolean;
  prettierConfig?: string;
  eslintConfig?: string;
}

export interface InvalidGeneratorConfig
  extends Omit<GeneratorConfig, "output" | "figma"> {
  output: undefined;
  figma: undefined;
}

export interface CliGeneratorConfig
  extends Pick<
      GeneratorConfig,
      "output" | "prettierConfig" | "eslintConfig" | "typescript"
    >,
    FigmaConfig {}
