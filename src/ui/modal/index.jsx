import { useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';

import './index.css';
import classNames from 'classnames';

export default function Modal({
  children,
  open,
  backdrop,
  onClick = (v) => v,
  onEscape = () => {},
  ...props
}) {
  const domNode = useMemo(() => {
    let modalRoot = document.querySelector('#custom-modal-root');
    if (modalRoot) {
      return modalRoot;
    }

    const div = document.createElement('div');
    div.setAttribute('id', 'custom-modal-root');

    document.body.appendChild(div);

    return div;
  }, []);

  const modal = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const listener = ({ key }) => key === 'Escape' && onEscape();
    modal.addEventListener('keydown', listener);

    return () => {
      modal.removeEventListener('keydown', listener);
    };
  }, [modal, onEscape]);

  useEffect(() => {
    modal.className = classNames(
      'custom-modal-container',
      backdrop === 'bgBlack' ? 'bgBlack' : null,
      { open, backdrop }
    );
  }, [backdrop, modal, open]);

  useEffect(() => {
    domNode.appendChild(modal);
    return () => {
      domNode.removeChild(modal);
    };
  }, [domNode, modal]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  return createPortal(
    <div
      onClick={handleClick}
      // onMouseDown={handleClick}
      {...props}>
      {children}
    </div>,
    modal
  );
}
