import { forwardRef } from 'react';

/**
 *
 * @param {string} as
 * @returns
 */
function CustomBox({ as = 'div', width, ...props }, ref) {
  const TagName = as;

  return <TagName ref={ref} {...props} style={{ width }} />;
}

export const Box = forwardRef(CustomBox);

// export default Box;
