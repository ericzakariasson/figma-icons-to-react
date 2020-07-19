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
