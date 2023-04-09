import { useState } from 'react';

import BorderedBox from '../borderedBox/index';

import './style.css';

export default function BorderedBtn({
  children,
  border,
  width,
  height,
  bgColor,
  color,
  onClick,
  disabled,
  borderWidth,
  style
}) {
  const [isOnClick, setIsOnClick] = useState(false);
  return (
    <button
      onClick={disabled ? null : onClick}
      onMouseDown={() => setIsOnClick(true)}
      onMouseUp={() => setIsOnClick(false)}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <BorderedBox
        className="bordered-btn-content"
        borderWidth={borderWidth || '2px'}
        style={{
          ...style,
          border: border || 'solid 2px #06c4ff',
          width: width || 'auto',
          height: height || '24px',
          backgroundColor: bgColor || '#06c4ff',
          color: color || '#fff'
        }}
      >
        {children}
        <div
          className="bordered-btn-mask"
          style={{
            backgroundColor:
              !disabled && isOnClick ? 'rgba(0, 0, 0, 0.08)' : null
          }}
        ></div>
      </BorderedBox>
    </button>
  );
}
