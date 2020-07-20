import { GeneratorConfig } from "./config.types";

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
  typesFileName: string;
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
  /**
   * @description Name of the prop
   */
  name: string;
  /**
   * @description Type associated to `name`.
   */
  types: (InterfacePrimitiveType | string)[];
  /**
   * @description Wether to make the prop optional and adding the suffix `?`.
   */
  optional?: boolean;
}

export interface TypeDeclarationTemplateParameters {
  /**
   * @description Array of icons that were generated
   */
  icons: GeneratedIconData[];
  /**
   * @description Prop types specified in `componentPropTypes`
   */
  propTypes: PropType[];
  /**
   * @description Configuration
   */
  config: GeneratorConfig;
}

export interface ComponentTypesTemplateParameters {
  /**
   * @description Prop types specified in `componentPropTypes`
   */
  propTypes: PropType[];
  /**
   * @description Configuration
   */
  config: GeneratorConfig;
}
