export const iconTemplate = (
  name: string,
  attributes: string,
  content: string
) => {
  return `
    import React from 'react';
    
    export const ${name} = React.forwardRef(({ color = 'currentColor', size = 24, ...props }, ref) => {
      return (
        <svg ref={ref} ${attributes} {...props}>
          ${content}
        </svg>
      )
    });

    ${name}.displayName = '${name}'
  `;
};
