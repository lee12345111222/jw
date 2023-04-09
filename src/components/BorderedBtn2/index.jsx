import { useState } from 'react';

import BorderedBox from '../BorderedBox2/index';

import styles from './BorderedBtn.module.css';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function BorderedBtn({
  style,
  loading,
  children,
  width,
  height,
  borderWidth = '2px',
  bgColor = '#06C4FF',
  borderColor = '#06C4FF',
  borderWeight = '2px',
  onClick,
  disabled,
  ...props
}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      disabled={disabled || loading}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onClick={!loading ? onClick : () => {}}
      className={cx('btn', { loading: loading })}
      {...props}>
      <BorderedBox
        width={width}
        height={height}
        borderWidth={borderWidth || '2px'}
        bgColor={bgColor}
        borderColor={borderColor}
        borderWeight={borderWeight || '2px'}>
        <div className={cx('container')} style={style}>
          {children}
          {loading && <LoadingIcon />}
        </div>
      </BorderedBox>
      <div
        className={cx('hover-box', { 'hover-box_clicked': isClicked })}
        style={{
          top: `-${borderWeight}`,
          left: `-${borderWeight}`,
          width: `calc(100% + ${borderWeight} * 2)`,
          height: `calc(100% + ${borderWeight} * 2)`
        }}></div>
    </button>
  );
}

export const LoadingIcon = () => (
  <div className={cx('loading-icon')}>
    <svg
      viewBox="0 0 1024 1024"
      focusable="false"
      data-icon="loading"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true">
      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
    </svg>
  </div>
);

export const CheckMarkIcon = () => (
  <div>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M6.32578 12.4803C6.18316 12.4803 6.04053 12.426 5.93203 12.3167L2.16341 8.5489C1.94553 8.33103 1.94553 7.97928 2.16341 7.7614C2.38041 7.5444 2.73303 7.5444 2.95003 7.7614L6.32578 11.1363L13.2995 4.16341C13.5165 3.94553 13.8692 3.94553 14.0862 4.16341C14.304 4.38128 14.304 4.73303 14.0862 4.95091L6.71953 12.3175C6.61103 12.426 6.4684 12.4803 6.32578 12.4803Z" />
    </svg>
  </div>
);

export const ArrowDownIcon = () => (
  <div>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
      <g clipPath="url(#clip0_2492_59922)">
        <path
          d="M4.00152 5.46678L7.42905 1.8443C7.55897 1.71778 7.7726 1.71778 7.90253 1.8443C8.03245 1.97082 8.03245 2.1763 7.90253 2.30222L4.255 6.15789C4.18493 6.22544 4.09145 6.25433 4.00152 6.24944C3.90849 6.25448 3.81501 6.22544 3.74508 6.15789L0.0975614 2.30237C-0.0325117 2.17645 -0.0325117 1.97082 0.0975614 1.84445C0.231041 1.71793 0.441114 1.71793 0.571038 1.84445L4.00152 5.46678Z"
          fill="currentColor"
          strokeWidth="0.2"
        />
      </g>
      <defs>
        <clipPath id="clip0_2492_59922">
          <rect
            width="8"
            height="8"
            fill="currentColor"
            transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
);
