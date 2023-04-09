import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import dialogPolyfill from 'dialog-polyfill';

import closeIcon from '@/assets/icon/closeIcon.png';

export default function Dialog({ children, show, onCancel }) {
  const dialogEl = useRef();

  useEffect(() => {
    dialogPolyfill.registerDialog(dialogEl.current);
  }, []);

  useEffect(() => {
    if (show && !dialogEl.current.open) {
      dialogEl.current.showModal();
    }
    if (!show && dialogEl.current.open) {
      dialogEl.current.close();
    }
  }, [show]);

  return (
    <StyledDialog
      style={{
        display: show ? 'flex' : 'none'
      }}
      ref={dialogEl}
    >
      {children}
      <div
        onClick={onCancel}
        style={{
          width: '24px',
          position: 'absolute',
          top: '32px',
          right: '32px',
          cursor: 'pointer'
        }}
      >
        <img style={{ width: '100%' }} src={closeIcon} alt="" />
      </div>
    </StyledDialog>
  );
}

const StyledDialog = styled.dialog`
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  background-color: #232227;
  border: none;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
