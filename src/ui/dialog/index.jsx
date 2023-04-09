// import { useCallback } from 'react';

import Modal from '../modal/index';

import CloseIcon from '@/icons/close/index';

import Button from '../button/index';

import loadingIcon from '@/assets/icon/loading.png';
import successIcon from '@/assets/icon/success-icon.png';
import failIcon from '@/assets/icon/not-shared-icon.svg';

import styles from './index.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Dialog({
  open,
  title,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  backdrop = true,
  mask = true,
  onClickAway,
  onEscape,
  children,
  fullscreen,
  animate = true,
  onConfirm,
  onCancel,
  className,
  headerStyle = {},
  style,
  header = (
    <div className={cx('header')} style={{ ...headerStyle }}>
      <div>{title}</div>
      <CloseIcon onClick={onCancel} className={cx('close-icon')} />
    </div>
  ),
  footer = (
    <div className={cx('footer')}>
      <Button height="28px" width="132px" outline onClick={onCancel}>
        {cancelText}
      </Button>
      <Button height="28px" width="132px" onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  )
}) {
  // const handleClick = useCallback((e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }, []);

  return (
    <Modal
      open={open}
      backdrop={backdrop}
      onEscape={onEscape}
      className={cx('modal', { mask })}
      onClick={onClickAway}>
      <div
        className={cx('container', { fullscreen, animate }, className)}
        style={style}
        // onClick={handleClick}
      >
        {header}
        <div className={'content'}>{children}</div>
        {footer}
      </div>
    </Modal>
  );
}

export const Toast = ({ children, open }) => {
  return (
    <Modal open={open}>
      <div className={cx('toast')}>{children}</div>
    </Modal>
  );
};

export const ConfirmDialog = ({ open, msg, onConfirm, onCancel }) => {
  return (
    <>
      {open && (
        <Dialog header="" footer="" animate={false} open>
          <div className={cx('notice-container')}>
            <NoticeIcon className={cx('notice-icon')} />
            <p>{msg}</p>
          </div>

          <div className={cx('notice-actions')}>
            <Button height="28px" width="132px" onClick={onConfirm}>
              Confirm
            </Button>
            <Button height="28px" width="132px" outline onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export const LoadingDialog = ({ msg = 'Loading', open }) => {
  return (
    <>
      {open && (
        <Dialog open header="" footer="">
          <div className={cx('loading-container')}>
            <img className={cx('loading-img')} src={loadingIcon} alt="" />
            <p>{msg}</p>
          </div>
        </Dialog>
      )}
    </>
  );
};

export const SuccessDialog = ({
  open,
  title = 'Success',
  onClose,
  msg = '',
  footer = ''
}) => {
  return (
    <>
      {open && (
        <Dialog open header="" footer={footer}>
          <div className={cx('success-dialog-close')}>
            <CloseIcon onClick={onClose} />
          </div>

          <div className={cx('success-dialog')}>
            <img src={successIcon} alt="" />
            <div className={cx('success-dialog-title')}>{title}</div>
            <div className={cx('p')}>{msg}</div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export const FailDialog = ({
  open,
  title = 'Success',
  onClose,
  msg = '',
  footer = ''
}) => {
  return (
    <>
      {open && (
        <Dialog open header="" footer={footer}>
          <div className={cx('success-dialog-close')}>
            <CloseIcon onClick={onClose} />
          </div>

          <div className={cx('success-dialog')}>
            <img src={failIcon} alt="" />
            <div className={cx('success-dialog-title')}>{title}</div>
            <div className={cx('p')}>{msg}</div>
          </div>
        </Dialog>
      )}
    </>
  );
};

const NoticeIcon = (props) => (
  <svg
    {...props}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        d="M0.983293 7.50038C0.983293 3.90765 3.90714 0.983659 7.50002 0.983659C11.0929 0.983659 14.0167 3.90765 14.0167 7.50038C14.0167 11.0931 11.0929 14.0171 7.50002 14.0171C3.90714 14.0171 0.983293 11.0931 0.983293 7.50038Z"
        stroke="currentColor"
        strokeWidth="1.13333"
      />
      <path
        d="M6.79163 6.79169C6.79163 6.40051 7.10875 6.08339 7.49993 6.08339C7.89112 6.08339 8.20824 6.40051 8.20824 6.79169V11.0417C8.20824 11.4329 7.89112 11.75 7.49993 11.75C7.10875 11.75 6.79163 11.4329 6.79163 11.0417V6.79169ZM6.79163 3.95831C6.79163 3.56712 7.10875 3.25 7.49993 3.25C7.89112 3.25 8.20824 3.56712 8.20824 3.95831C8.20824 4.34949 7.89112 4.66661 7.49993 4.66661C7.10875 4.66661 6.79163 4.34949 6.79163 3.95831Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
