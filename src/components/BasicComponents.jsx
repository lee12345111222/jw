import { useMemo, forwardRef } from 'react';

import styled from 'styled-components';

import { Container, Flex } from './Basic';

import { Select } from 'antd';

const { Option } = Select;

export const Title = ({ title, children, bb }) => (
  <Flex
    ai="center"
    jc="space-between"
    h="60px"
    p="0 24px"
    bb={bb || '1px solid #323232'}
    style={{ flexShrink: 0 }}
  >
    <div>{title}</div>
    {children}
  </Flex>
);

const StyledSelect = styled(Select)`
  width: 100%;
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 4px;
    transition: all 0.24s ease-in;
    &:hover {
      border: 1px solid rgba(133, 195, 250, 0.72);
    }
  }
  &.ant-select-focused:not(.ant-select-disabled) .ant-select-selector {
    border-color: #85c3fa !important;
  }
`;

export const Selection2 = forwardRef(
  ({ options, defaultValue, onChange, className }, ref) => {
    const list = useMemo(
      () =>
        options.map((option) => (
          <Option value={option.value} key={option.value}>
            {option.name}
          </Option>
        )),
      [options]
    );
    return (
      <StyledSelect
        ref={ref}
        onChange={(val) => onChange(val)}
        defaultValue={defaultValue}
        className={className}
      >
        {list}
      </StyledSelect>
    );
  }
);

const StyledBtnBox = styled.div`
  position: relative;
  background-color: ${(props) => props.bgcolor || '#06c4ff'};
  height: 100%;
  width: 100%;
  border: solid 2px ${(props) => props.bc || props.bgcolor || '#06c4ff'};
  box-sizing: border-box;
  padding-top: 2px;
  padding-bottom: 2px;
  &::before {
    content: ' ';
    position: absolute;
    width: 4px;
    top: 0;
    left: -4px;
    bottom: 0;
    background-color: ${(props) => props.bc || props.bgcolor || '#06c4ff'};
  }
  &::after {
    content: ' ';
    position: absolute;
    width: 4px;
    top: 0;
    right: -4px;
    bottom: 0;
    background-color: ${(props) => props.bc || props.bgcolor || '#06c4ff'};
  }
`;
const StyledBtnText = styled.div`
  position: relative;
  height: 100%;
  width: calc(100% + 4px);
  margin-left: -2px;
  background-color: ${(props) => props.bgcolor || '#06c4ff'};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.c || '#fff'};
`;

export const Btn2 = ({ children, bgcolor, bc, c, ...props }) => (
  <Container {...props} p="0 2px" style={{ cursor: 'pointer' }}>
    <StyledBtnBox bgcolor={bgcolor} bc={bc}>
      <StyledBtnText bgcolor={bgcolor} bc={bc} c={c}>
        {children}
      </StyledBtnText>
    </StyledBtnBox>
  </Container>
);

export const Selection = ({
  selection,
  dropdownClassName,
  onChange,
  style,
  className,
  default: defaultValue
}) => {
  const list = useMemo(
    () =>
      selection.map((option) => {
        return (
          <Option value={option} key={option}>
            {option}
          </Option>
        );
      }),
    [selection]
  );

  return (
    <Select
      dropdownClassName={dropdownClassName}
      onChange={(val) => onChange(val)}
      style={{
        width: '100%',
        margin: '10px 0',
        ...style
      }}
      className={className}
      defaultValue={defaultValue}
    >
      {list}
    </Select>
  );
};

const Image = ({ src }) => <img src={src} alt="" />;

const ImgBox = styled.div`
  flex-shrink: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Img = (props) => (
  <ImgBox
    width={props.width || '100%'}
    height={props.height || 'auto'}
    style={props.style}
    className={props.className}
  >
    <Image src={props.src} />
  </ImgBox>
);

export const Btn = (props) => {
  return (
    <div
      {...props}
      style={{
        color: '#fff',
        cursor: 'pointer',
        background: '#06C4FF',
        ...props.style,
        padding: '2px 0',
        boxSizing: 'content-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: '1px',
        borderColor: props?.style?.border,
        borderStyle: props?.style?.border ? 'solid' : 'none',
        '&:hover': {
          backgroundColor: 'red',
          height: '200px'
        }
      }}
    >
      <div
        style={{
          width: '2px',
          marginLeft: props?.style?.border ? '-3px' : '-2px',
          height: '100%',
          boxSizing: 'content-box',
          borderWidth: '1px',
          borderColor: props?.style?.border,
          borderStyle: props?.style?.border ? 'solid none solid solid' : 'none',
          background: props?.style?.background || '#06C4FF'
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: props?.style?.justifyContent || 'center',
          background: props?.style?.background || '#06C4FF',
          height: '100%',
          width: '100%',
          padding: props?.style?.padding,
          '&:hover': {
            backgroundColor: 'red',
            height: '200px'
          }
        }}
      >
        {props.children}
      </div>
      <div
        style={{
          width: '2px',
          marginRight: props?.style?.border ? '-3px' : '-2px',
          height: '100%',
          boxSizing: 'content-box',
          borderWidth: '1px',
          borderColor: props?.style?.border,
          borderStyle: props?.style?.border ? 'solid solid solid none' : 'none',
          background: props?.style?.background || '#06C4FF'
        }}
      ></div>
    </div>
  );
};
