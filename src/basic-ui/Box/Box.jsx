import { forwardRef } from 'react';

import styled from 'styled-components';
import {
  positionStyle,
  displayStyle,
  containerStyle,
  borderStyle
} from '../styles';

const Box = forwardRef(({ component = 'div', css, ...props }, ref) => {
  const Box = styled(component)`
    ${positionStyle}
    ${displayStyle}
    ${containerStyle}
    ${borderStyle}
    ${css}
  `;
  return <Box {...props} ref={ref} />;
});

export default Box;
