import styled, { keyframes } from 'styled-components';

import { Box } from '../Box';

import { ReactComponent as LoadingIcon } from '../icons/loading.svg';

const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

const Loading = styled(LoadingIcon)`
  display: block;
  & circle {
    stroke: currentcolor;
    stroke-dasharray: 80px, 200px px;
    stroke-dashoffset: 0;
    animation: 1.4s ease-in-out 0s infinite normal none running
      ${circularRotateKeyframe};
  }
`;

export default function Button({ children, disabled, loading, ...res }) {
  return (
    <div>
      <CustomButton
        disabled={disabled || loading}
        css={{
          cursor: disabled ? 'not-allowed' : loading ? 'wait' : 'pointer'
        }}
        component="button"
        {...res}
      >
        {children}
        {/* <Box
          component="span"
          css={`
            display: inline-block;
            width: 16px;
            height: 16px;
            ${circularDashKeyframe} 1.4s linear infinite
          `}>
          <Loading />
        </Box> */}
      </CustomButton>

      {/* <button>hello</button> */}
    </div>
  );
}

const CustomButton = styled(Box)`
  //   background-color: rgba(0, 0, 0, 0);
  //   border: none;
`;
