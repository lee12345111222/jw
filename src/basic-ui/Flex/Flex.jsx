import styled from 'styled-components';
import { Box } from '../Box/index';

import { flexStyle, flexItemStyle } from '../styles';

const Flex = styled(Box)`
  ${flexStyle}
`;

export default Flex;

export const FlexItem = styled(Flex)`
  ${flexItemStyle}
`;
