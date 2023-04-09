import { useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import { Modal, Checkbox, Progress } from 'antd';

import { Selection } from '@/components/BasicComponents';

import MyModal from '@/components/proto-ui/dialog/index';

import BorderedBtn from '@/components/borderedBtn/index';
import LoadingAnimation from '@/pages/editor/LoadingAnimation';

import useRoleMint2 from '@/hooks/useRoleMint2';

import load from '@/utils/load';

const { loadingIcon, buyIcon, closeIcon } = load('icon');

const Pr = styled(Progress)`
  & .ant-progress-inner {
    background-color: #374350;
  }
`;

export const Box = ({ src, onClick, onBuy, selected, count, item }) => {
  const handleBuy = useCallback(
    (e) => {
      e.stopPropagation();
      onBuy();
    },
    [onBuy]
  );

  return (
    <BasicBox
      onClick={onClick}
      className={`${selected ? 'selected-box' : ''} ${
        count ? 'select-box-enable' : ''
      }`}
      style={{
        width: '96px',
        height: '136px'
        // pointerEvents: 'auto'
      }}
    >
      <img
        style={{
          height: 'body' === item ? 'calc(100% - 20px)' : 'auto',
          marginTop: 'body' === item ? '-16px' : '-12px'
        }}
        src={src}
        alt=""
      />
      <div>
        {'action' !== item ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              padding: '2px 4px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span
              style={{
                color: '#06C4FF',
                fontSize: '12px',
                lineHeight: 1
              }}
            >
              Own: {count || 0}
            </span>
            <img
              onClick={handleBuy}
              style={{ width: '16px' }}
              src={buyIcon}
              alt=""
            />
          </div>
        ) : (
          ''
        )}
      </div>
      {count === 0 && (
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 4px)',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,.4)',
            // userSelect: 'none'
            pointerEvents: 'none'
          }}
        ></div>
      )}
    </BasicBox>
  );
};

export const Loading = ({ duration = 0 }) => {
  const [dots, setDots] = useState('.');

  const { t } = useTranslation();

  useEffect(() => {
    if (dots === '...') {
      setTimeout(() => {
        setDots('');
      }, 500);
    } else {
      setTimeout(() => {
        setDots(dots + '.');
      }, 500);
    }

    return () => {};
  }, [dots]);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '9',
        backgroundColor: '#000',
        width: '100vw',
        height: '100vh',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '70px'
      }}
    >
      <LoadingAnimation />
      <div>
        <Pr
          strokeColor="#00C9FF"
          percent={duration}
          showInfo={false}
          style={{ width: '25vw' }}
        />

        <p
          style={{
            padding: '16px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, .65)'
          }}
        >
          {t('editor.loading')}
          <Dot>{dots}</Dot>
        </p>
      </div>
    </div>
  );
};

export const Loading2 = ({ text }) => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    if (dots === '...') {
      setTimeout(() => {
        setDots('');
      }, 500);
    } else {
      setTimeout(() => {
        setDots(dots + '.');
      }, 500);
    }

    return () => {};
  }, [dots]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img className="loading-icon" src={loadingIcon} alt="" />
      <P2 style={{ marginTop: '20px' }}>
        <span>{text}</span>
        <Dot>{dots}</Dot>
      </P2>
    </div>
  );
};

export const Page = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Between = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BasicBox = styled.div`
  position: relative;
  background-color: rgba(71, 71, 164, 0.5);
  width: ${(props) => props?.style?.width}; //  || '96px'
  height: ${(props) => props?.style?.height}; // || '136px'
  margin: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  & img {
    max-width: calc(100% - 4px);
    max-height: calc(100% - 4px);
  }
  &::before {
    content: ' ';
    position: absolute;
    width: 2px;
    height: calc(100% - 4px);
    background-color: rgba(71, 71, 164, 0.5);
    left: -2px;
    top: 2px;
  }
  &::after {
    content: ' ';
    position: absolute;
    width: 2px;
    height: calc(100% - 4px);
    background-color: rgba(71, 71, 164, 0.5);
    right: -2px;
    top: 2px;
  }
  &.select-box-enable {
    background-color: #4747a4;
    &::before {
      background-color: #4747a4;
    }
    &::after {
      background-color: #4747a4;
    }
  }
  &:hover {
    border-top: 2px solid #6771c4;
    border-bottom: 2px solid #6771c4;
    & img {
      max-width: 100%;
      max-height: 100%;
    }
    &::before {
      width: 4px;
      height: 100%;
      top: 0;
      left: -2px;
      background-color: rgba(255, 255, 255, 0);
      border-left: 2px solid #6771c4;
      border-top: 2px solid #6771c4;
      border-bottom: 2px solid #6771c4;
    }
    &::after {
      width: 4px;
      height: 100%;
      top: 0;
      right: -2px;
      background-color: rgba(255, 255, 255, 0);
      border-right: 2px solid #6771c4;
      border-top: 2px solid #6771c4;
      border-bottom: 2px solid #6771c4;
    }
  }
  &.selected-box {
    border-top: 2px solid #a2aefc;
    border-bottom: 2px solid #a2aefc;
    & img {
      max-width: 100%;
      max-height: 100%;
    }
    &::before {
      width: 4px;
      height: 100%;
      top: 0;
      left: -2px;
      background-color: rgba(255, 255, 255, 0);
      border-left: 2px solid #a2aefc;
      border-top: 2px solid #a2aefc;
      border-bottom: 2px solid #a2aefc;
    }
    &::after {
      width: 4px;
      height: 100%;
      top: 0;
      right: -2px;
      background-color: rgba(255, 255, 255, 0);
      border-right: 2px solid #a2aefc;
      border-top: 2px solid #a2aefc;
      border-bottom: 2px solid #a2aefc;
    }
  }
`;

export const Box2 = ({ type, name, persent }) => (
  <BasicBox style={{ width: '122px', height: '65px', cursor: 'auto' }}>
    <div
      style={{
        color: '#06C4FF',
        fontSize: '14px',
        fontWeight: '600'
      }}
    >
      {type}
    </div>
    <div
      style={{
        maxWidth: '88%',
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: '700',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {name || '-'}
    </div>
    <div
      style={{
        color: 'rgba(255, 255, 255, .45)',
        fontSize: '12px'
      }}
    >
      {persent || 0}% have this trait
    </div>
  </BasicBox>
);

export const Icon = ({ src, title, selected, onClick, disable }) => {
  return (
    <div
      onClick={onClick}
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: selected ? '1' : '.65',
        cursor: !disable ? 'pointer' : 'not-allowed'
      }}
    >
      <img style={{ width: '20px' }} src={src} alt="" />
      <span
        style={{
          fontSize: '12px',
          color: '#06C4FF',
          marginTop: '5px'
        }}
      >
        {title}
      </span>
    </div>
  );
};

export const P = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
`;

const Dot = styled.span`
  display: inline-block;
  width: 20px;
  text-align: left;
`;

export const P2 = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
  text-align: center;
`;

export const Title = styled.h3`
  color: #06c4ff;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 2px solid #4747a4;
  line-height: 42px;
  margin-top: 30px;
`;

export const TitleBox = styled.div`
  & div:first-child h3 {
    margin-top: 0;
  }
`;

export const StyledModal = (props) => (
  <Modal
    width="600px"
    className="role-editor-modal"
    bodyStyle={{
      backgroundColor: '#4747A4'
    }}
    footer={null}
    {...props}
  />
);

export const MintModal = (props) => (
  <Modal
    maskClosable={false}
    closable={!props?.noHeader}
    className="role-editor-modal-border"
    title={
      !props?.noHeader ? (
        <div
          style={{
            color: '#fff',
            fontSize: '22px',
            fontWeight: '600'
          }}
        >
          {props?.head}
        </div>
      ) : null
    }
    bodyStyle={{
      backgroundColor: '#4747A4'
    }}
    footer={null}
    {...props}
  />
);

export const StyledCheckbox = styled(Checkbox)`
  /* height: 20px; */
`;

export const CheckList = styled.div`
  font-size: 14px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  & img {
    width: 20px;
  }
`;

export const CheckListTitle = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-grow: 1;
  position: relative;
  margin-bottom: 8px;
  color: #06c4ff;
  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #06c4ff;
    bottom: -8px;
    left: 0;
    transform: scale(1, 0.6);
  }
`;

export const Grow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  width: 100px;
  /* flex-grow: 1; */
  & .ant-checkbox .ant-checkbox-inner {
    border: 2px solid #fff;
    border-radius: 3px;
    transform: scale(0.75);
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: inherit;
    border-color: #fff !important;
  }
  & .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border-color: #fff !important;
  }
  & .ant-checkbox-checked::after {
    border: none;
  }
  & .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin: 0;
  }
`;

export const StyledSelection = styled(Selection)`
  width: 100px !important;
  padding: 0;
  background-color: #5656ba;
  margin: 0 !important;
  & .ant-select-selector {
    border: none !important;
  }
`;

export const OutLink = styled.a`
  color: #06c4ff;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
    color: #06c4ff;
  }
`;

export const MintDIalog = ({
  open,
  onClose,
  data,
  parts,
  hasAllparts,
  isRoleExist,
  onStart,
  onFinish,
  onFail
}) => {
  const roleMint2 = useRoleMint2();

  const handleMint = useCallback(async () => {
    onStart();

    try {
      const { transactionHash } = await roleMint2(parts);
      onFinish(transactionHash);
    } catch (e) {
      onFail(e);
    }
  }, [onFail, onFinish, onStart, parts, roleMint2]);

  return (
    <MyModal open={open}>
      <div
        style={{
          backgroundColor: '#4348a1',
          borderRadius: '4px',
          color: '#fff',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            padding: '24px',
            fontSize: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, .1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>Review parts match</div>
          <img
            onClick={onClose}
            style={{ width: '24px', cursor: 'pointer' }}
            src={closeIcon}
            alt=""
          />
        </div>
        <div
          style={{
            maxWidth: '586px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '16px'
          }}
        >
          {data}
        </div>
        <div
          style={{
            color: 'rgba(255, 255, 255, .65)',
            fontSize: '14px',
            padding: '0 16px',
            textAlign: 'center'
          }}
        >
          <span>Once the review is finished and the parts are complete, </span>
          <br />
          <span>the role can be cast by clicking the button</span>
          {/* {!hasAllparts
            ? 'Review finish, there are still missing parts, you need to go to purchase to make up'
            : isRoleExist
            ? 'The match already exists, please rematch'
            : 'Review finish, the parts are complete, and the role can be cast by clicking the button'} */}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <BorderedBtn
            onClick={handleMint}
            disabled={!hasAllparts || isRoleExist}
            width="108px"
            height="32px"
          >
            Mint now
          </BorderedBtn>
        </div>
      </div>
    </MyModal>
  );
};
