import { css } from 'styled-components';

export const positionStyle = css`
  position: ${({ position }) => position};
`;

export const displayStyle = css`
  display: ${({ display }) => display};
`;

export const containerStyle = css`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin: ${({ m }) => m};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: ${({ p }) => p};
  padding-top: ${({ pt }) => pt};
  padding-right: ${({ pr }) => pr};
  padding-bottom: ${({ pb }) => pb};
  padding-left: ${({ pl }) => pl};
  background-color: ${({ bgColor }) => bgColor};
`;

export const borderStyle = css`
  border: ${({ b }) => b};
  border-radius: ${({ br }) => br};
`;

export const flexStyle = css`
  display: flex;
  flex-direction: ${({ fd }) => fd};
  flex-wrap: ${({ fw }) => fw};
  align-items: ${({ ai }) => ai};
  justify-content: ${({ jc }) => jc};
  gap: ${({ gap }) => gap};
`;

export const flexItemStyle = css`
  align-self: ${({ as }) => as};
  flex: ${({ flex }) => flex};
  flex-grow: ${({ grow }) => grow};
  flex-shrink: ${({ shrink }) => shrink};
`;
