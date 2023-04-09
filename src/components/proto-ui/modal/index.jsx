import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import './index.css';

export default function Modal({
  children,
  open,
  onEscape = () => {},
  ...props
}) {
  const domNode = useMemo(() => {
    let modalRoot = document.querySelector('#pui-modal-root');
    if (modalRoot) {
      return modalRoot;
    }

    const div = document.createElement('div');
    div.setAttribute('id', 'pui-modal-root');

    document.body.appendChild(div);

    return div;
  }, []);

  const modal = useMemo(() => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('tabindex', 0);
    return dialog;
  }, []);

  useEffect(() => {
    if (!modal) {
      return;
    }
    modal.addEventListener('keydown', ({ key }) => {
      key === 'Escape' && onEscape();
    });
  }, [modal, onEscape]);

  useEffect(() => {
    domNode.appendChild(modal);
    return () => {
      domNode.removeChild(modal);
    };
  }, [domNode, modal]);

  useEffect(() => {
    if (open) {
      modal.setAttribute('open', true);
      modal.focus();
    } else {
      modal.removeAttribute('open');
    }
  }, [modal, open]);

  return createPortal(
    <main onMouseDown={(e) => e.stopPropagation()} {...props}>
      {children}
    </main>,
    modal
  );
}
