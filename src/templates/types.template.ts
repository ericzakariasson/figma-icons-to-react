import { ComponentInterfaceTemplateParameters, PropType } from "../types";

export const defaultPropTypes: PropType[] = [
  {
    name: "color",
    types: ["string"],
    optional: true
  },
  {
    name: "size",
    types: ["string", "number"],
    optional: true
  }
];

export const defaultIconTypesTemplate = async ({
  propTypes,
  icons
}: ComponentInterfaceTemplateParameters) => {
  return `
    import * as React from 'react';

    interface IconProps extends React.SVGAttributes<React.SVGElement> {
      ${propTypes
        .map(
          propType =>
            `${propType.name}${
              propType.optional ? "?" : ""
            }: ${propType.types.join(" | ")};`
        )
        .join("\r\n")}
    }
    
    type Icon = React.FC<IconProps>;
    
    ${icons.map(icon => `export const ${icon.name}: Icon;`).join("\r\n")}
  `;
};
