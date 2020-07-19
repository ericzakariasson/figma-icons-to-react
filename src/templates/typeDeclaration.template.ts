import { TypeDeclarationTemplateParameters } from "../types";
import { defaultIconTypesTemplate } from "./types.template";

export const defaultTypeDeclarationTemplate = async ({
  propTypes,
  icons,
  config
}: TypeDeclarationTemplateParameters) => {
  return `
    ${defaultIconTypesTemplate({ propTypes, config })}
    
    type Icon = React.FC<IconProps>;

    ${icons.map(icon => `export const ${icon.name}: Icon;`).join("\r\n")}
  `;
};
