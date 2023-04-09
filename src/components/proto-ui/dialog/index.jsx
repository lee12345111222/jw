import Modal from '../modal/index';

import { useMemo } from 'react';

import './dialog.css';

export default function Dialog({
  className = '',
  children,
  open,
  mask = true,
  maskColor = null,
  onClickAway,
  onEscape,
  ...props
}) {
  const classes = useMemo(
    () => `${className} pui-dialog ${mask ? 'pui-dialog-mask' : ''}`.trim(),
    [className, mask]
  );

  return (
    <Modal
      open={open}
      onEscape={onEscape}
      style={{ backgroundColor: mask ? maskColor : null }}
      onClick={onClickAway}
      className={classes}
    >
      <div {...props} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Modal>
  );
}
