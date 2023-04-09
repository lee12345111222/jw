import styled from 'styled-components';

import { Flex } from '@/components/Basic';

export const Page = styled(Flex)`
  flex-grow: 1;
  overflow-y: hidden;
  box-sizing: border-box;
`;

export const PageColumn = styled.div`
  flex-grow: 1;
`;

export const PageMain = styled.div`
  height: 100%;
  padding: 20px 24px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: 300px;
  height: 360px;
  margin: 0 40px 40px 0;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #757f8a;
  cursor: pointer;
`;

/**
 * actionsheet
 */
export const ActionSheet = styled.div`
  padding: 16px;
  flex-grow: 1;
  background-color: #303439;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  /* font-size: 16px; */
`;

export const FlexRowCB = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
