import { PropType, ComponentTypesTemplateParameters } from "../types";
import { ifTypescript } from "../utils";

export const defaultPropTypes: PropType[] = [
  {
    name: "color",
    types: ["string"],
    optional: true,
  },
  {
    name: "size",
    types: ["string", "number"],
    optional: true,
  },
];

export const defaultIconTypesTemplate = async ({
  propTypes,
  config,
}: ComponentTypesTemplateParameters) => {
  const ifTs = ifTypescript(config);
  return `
    import ${ifTs("* as")} React from 'react';

    export interface IconProps extends React.SVGAttributes<React.SVGElement> {
      ${propTypes
        .map(
          (propType) =>
            `${propType.name}${
              propType.optional ? "?" : ""
            }: ${propType.types.join(" | ")};`
        )
        .join("\r\n")}
    }
  `;
};
