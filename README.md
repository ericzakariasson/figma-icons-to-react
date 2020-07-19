# figma-icons-to-react

This package will turn your svg icons from Figma into React components, just in a few seconds. Use the default settings or customize it to your need.

## Installation

> Not yet available

## Usage example

_See the Figma file used in the example [here](https://www.figma.com/file/27uD8MSTL7eqo9pQYSIYnM/Example-Icons?node-id=0%3A1)_

### Using the API

```ts
import { generate } from "figma-icons-to-react";

const report = await generate({
  output: "packages/components/icon",
  figma: {
    fileId: "27uD8MSTL7eqo9pQYSIYnM",
    frames: ["1:2"],
    token: process.env.FIGMA_TOKEN,
  },
});
```

### Using the CLI

The CLI does not provide as exhaustive configuration options as the API. You would use the CLI like this

```sh
generate-icons --output "packages/components/icon" --token "<your-figma-token>" --file-id "27uD8MSTL7eqo9pQYSIYnM" --frames "1:2"
```

### Result

Both the API and CLI will in these exmples produce `Alert.tsx`, `DotMenu.tsx`, `Icon.types.ts` and `index.ts` in `packages/components/icon`

If we look closer at the generated files, they look like this:

#### `DotMenu.tsx`

```tsx
import * as React from "react";

import { IconProps } from "./Icon.types";

export const DotMenu = React.forwardRef<IconProps, React.SVGElement>(
  ({ color = "currentColor", size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        width={size}
        height={size}
        {...props}
      >
        <circle cx="12" cy="12" r="8.5" stroke="#4F4F4F"></circle>
        <circle cx="8" cy="12" r="1" fill="#4F4F4F"></circle>
        <circle cx="12" cy="12" r="1" fill="#4F4F4F"></circle>
        <circle cx="16" cy="12" r="1" fill="#4F4F4F"></circle>
      </svg>
    );
  }
);

DotMenu.displayName = "DotMenu";
```

#### `Icon.types.tsx`

```tsx
import * as React from "react";

export interface IconProps extends React.SVGAttributes<React.SVGElement> {
  color?: string;
  size?: string | number;
}
```

#### `index.ts`

```tsx
export { DotMenu } from "./DotMenu";
export { Alert } from "./Alert";
```

## Documentation

### API

The API takes an object as configuration which looks like this

````ts
output: string;
figma: {
  fileId: string;
  frames: string[];
  token: string;
};
component?: {
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
};
/**
 * Preferrably used with `jsx`
 */
typeDeclaration?: boolean | "force";
/**
 * Defaults to `true`
 */
typescript?: boolean;
prettierConfig?: string;
eslintConfig?: string;
````

| Option            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `output`          | The directory which files will be outputted to                |
| `figma`           | See Figma configuration                                       |
| `component`       | See component configuration                                   |
| `typeDeclaration` | Flag whether to generate an `index.d.ts` file or not.         |
| `typescript`      | Flag whether to generate TypeScript files or not              |
| `prettierConfig`  | Path to prettier config. Will be used in formatting the files |
| `eslintConfig`    | Path to eslint config. Will be used in formatting the files   |

### Figma configuration

| Option   | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| `fileId` | The Figma file id you want to generate from                          |
| `frames` | The Figma frames, also known as a "file node ids"                    |
| `token`  | You personal access token from Figma. Preferably saved in your `env` |

### Component configuration

| Option           | Description                                                                                                                                                                   | Default                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `name`           | Name generator function for the name of the icon component                                                                                                                    | PascalCase                                                   |
| `size`           | The default size of the icon                                                                                                                                                  | 24                                                           |
| `namePrefix`     | Will be added as a prefix to the name. Use the `name` function for more control                                                                                               |
| `nameSuffix`     | Same as `namePrefix`, except it will be added as a suffix to the name                                                                                                         |
| `template`       | A template generator function when you need more control over the generated component.                                                                                        | See `templates/component.template.ts`                        |
| `props`          | An object of props that will be used for the component                                                                                                                        | See `defaultProps` in `templates/component.template.ts`      |
| `propTypes`      | An array of types that will be generated when using TypeScript                                                                                                                | See `defaultPropTypes` in `templates/types.template.ts`      |
| `typesFile`      | The file which interfaces will be generated                                                                                                                                   | See `Icon.types.ts`                                          |
| `attributes`     | An object of attributes                                                                                                                                                       | See `defaultAttributes` in `templates/component.template.ts` |
| `beforeTemplate` | A function that will be invoked before the component is generated from the template                                                                                           |                                                              |
| `beforeTemplate` | A function that will be invoked before the file is written. Can be useful if you want to optimize the svg before generating the component. Should return the new file content |                                                              |
| `beforeWrite`    | A function that will be invoked before the file is written. Should return the new file content                                                                                |                                                              |

### Component template function parameters

| Option          | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `name`          | Name of the component                                                                           |
| `props`         | Component props                                                                                 |
| `attributes`    | Component attributes                                                                            |
| `innerContent`  | This is the inner content of the `<svg>`. Useful when you want to define the svg tag explicitly |
| `size`          | The specified default icon size                                                                 |
| `raw`           | Raw HTML from Figma                                                                             |
| `typesFilePath` | The file for types. Used for import component interface                                         |
| `config`        | The config file you've specified                                                                |

### Type declaration template function parameters

| Option      | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `icons`     | Array of icons with their name                                      |
| `propTypes` | An array of prop types. See `templates/types.template.ts` for usage |
| `config`    | The config file you've specified                                    |

### Component types template function parameters

| Option      | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `propTypes` | An array of prop types. See `templates/types.template.ts` for usage |
| `config`    | The config file you've specified                                    |
