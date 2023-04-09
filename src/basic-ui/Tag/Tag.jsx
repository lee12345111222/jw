import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';

export default function Tag({
  children,
  borderColor = '#00c4fc',
  borderWidth = '1px',
  borderweight = '2px',
  bgColor = ''
}) {
  const TagBorder = styled(Box)`
  border-style: solid;
    border-${({ location }) => location}: none;
    border-width: ${borderWidth};
    border-color: ${borderColor};
    background-color: ${bgColor};
  `;

  return (
    <Flex fd="column" w="max-content">
      <TagBorder
        h={`calc(${borderWidth} + ${borderweight})`}
        m={`0 calc(${borderWidth} + ${borderweight})`}
        location="bottom"
      />

      <Flex>
        <TagBorder
          w={`calc(${borderWidth} * 2 + ${borderweight})`}
          location="right"
        />
        <Box bgColor={bgColor}>{children}</Box>
        <TagBorder
          w={`calc(${borderWidth} * 2 + ${borderweight})`}
          location="left"
        />
      </Flex>
      <TagBorder
        h={`calc(${borderWidth} + ${borderweight})`}
        m={`0 calc(${borderWidth} + ${borderweight})`}
        location="top"
      />
    </Flex>
  );
}
