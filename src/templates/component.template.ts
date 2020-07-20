import { ComponentTemplateParameters } from "../types";
import { ifTypescript } from "../utils";
import path from "path";

type Attributes = ComponentTemplateParameters["attributes"];
type Props = ComponentTemplateParameters["props"];

const generateKeyValuePair = (
  attributes: Props,
  valueFormatter: (value: any) => string
): string[] =>
  Object.entries(attributes).map<string>(
    ([key, value]) => `${key}=${valueFormatter(value)}`
  );

const generateAttributes = (attributes: Attributes) =>
  generateKeyValuePair(attributes, (value) => `"${value}"`);

const generateProps = (attributes: Attributes) =>
  generateKeyValuePair(attributes, (value) => `{${value}}`);

export const defaultAttributes: Attributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
};

export const defaultProps: Props = {
  stroke: "color",
  width: "size",
  height: "size",
};

export const defaultIconTemplate = async ({
  name,
  attributes,
  props,
  size,
  innerContent,
  typesFileName,
  config,
}: ComponentTemplateParameters) => {
  const ifTs = ifTypescript(config);
  return `
    import ${ifTs("* as")} React from 'react';

    ${ifTs(
      `import { IconProps } from "./${
        typesFileName.endsWith("ts")
          ? typesFileName.replace(".ts", "")
          : typesFileName
      }";`
    )}
    
    export const ${name} = React.forwardRef${ifTs(
    `<IconProps, React.SVGElement>`
  )}(({ color = 'currentColor', size = ${size}, ...props }, ref) => {
      return (
        <svg ref={ref} 
        ${generateAttributes(attributes).join(" ")} 
        ${generateProps(props).join(" ")} 
        {...props}
        >
          ${innerContent}
        </svg>
      )
    });

    ${name}.displayName = "${name}";
  `;
};
