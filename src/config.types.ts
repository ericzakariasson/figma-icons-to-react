import { ComponentTemplateParameters, PropType } from "./types";

interface FigmaConfig {
  /**
   * @description The file id of you Figma document, also knows as `key`.
   * Read more at https://www.figma.com/developers/api#get-files-endpoint
   */
  fileId: string;
  /**
   * @description The frames of you Figma document, also knows as `fileNodeId`.
   * Read more at https://www.figma.com/developers/api#get-file-nodes-endpoint
   */
  frames: string[];
  /**
   * @description The personal access token from Figma
   * Read more at https://www.figma.com/developers/api#access-tokens
   */
  token: string;
}

/**
 * @private Not yet implemented
 */
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

interface ComponentConfiguration {
  /**
   * @description Name of the component
   * @returns Should return the name
   * @default name => pascalCase(name)
   */
  name?: (name: string) => Promise<string>;
  /**
   * @description Default size for the icon
   * @default 24
   */
  size?: number;
  /**
   * @description Prefix for name
   * @default undefined
   */
  namePrefix?: string;
  /**
   * @description Suffix for name
   * @default undefined
   */
  nameSuffix?: string;
  /**
   * @description Template which will be used to generate the component file.
   * @default templates/component.template.ts
   */
  template?: (parameters: ComponentTemplateParameters) => Promise<string>;
  /**
   * @description Props for the component. Dictionary that will be joined with `key={value}`
   * @default
   * ```
   * stroke: "color",
   * width: "size",
   * height: "size"
   * ```
   */
  props?: Record<string, any>;
  /**
   * @description Attributes for the component. Dictionary that will be joined with `key="value"`
   * @default
   * ```
   * xmlns: "http://www.w3.org/2000/svg",
   * viewBox: "0 0 24 24",
   * sfill: "none"
   * ```
   */
  attributes?: Record<string, any>;
  /**
   * @description Function that will run before the component is generated from the template.
   * Can be useful if you want to optimize the inner svg content or do some other manipulation.
   * @returns Should return the new svg contents
   */
  beforeTemplate?: (svgContent: string) => Promise<string>;
  /**
   * @description Function that will run before the file is written.
   * Can be useful if you want to optimize the inner svg content or do some other manipulation.
   * @returns Should return the new files content
   */
  beforeWrite?: (fileContent: string) => Promise<string>;
}

interface ComponentTypesConfiguration {
  /**
   * @description Name of file which will include all component types
   * @default Icon.types.ts
   */
  fileName?: string;
  /**
   * @description The name of the interface the component will use.
   * @default IconProps
   */
  interfaceName?: string;
  /**
   * @description Prop types that will be used for generating the interface
   * @default
   * ```
   * size?: string | number;
   * color?: string;
   * ```
   */
  propTypes?: PropType[];
}

export interface GeneratorConfig {
  /**
   * @description Output directory for generated filess
   */
  output: string;
  /**
   * @description Figma configuration
   */
  figma: FigmaConfig;
  /**
   * @description Generated component configuration
   */
  component?: ComponentConfiguration;
  componentTypes?: ComponentTypesConfiguration;
  /**
   * @description Wether to generate a type declaration file (`index.d.ts`). Shouldn't be used with `typescript`
   * @default false
   */
  typeDeclaration?: boolean | "force";
  /**
   * @description Controls if it should generate TypeScript components
   * @default true
   */
  typescript?: boolean;
  /**
   * @description Path to existing prettier config
   */
  prettierConfig?: string;
  /**
   * @description Path to existing eslint config
   */
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
