import { forwardRef } from 'react';
import { Box } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 *
 * @param {object} props
 * @param {'8px'} props.m - margin
 * @param {'0px' | '8px', | '16px', '64px'} props.p - padding
 * @param {'16px' | '100' | '100vw'} props.w - width
 * @param {'100vh' | '100'} props.h - height
 * @param {'relative' | 'absolute' | 'fixed' | 'static' | 'sticky'} props.position - position
 * @param {'0'} props.top - top
 * @param {'0'} props.left - left
 * @returns
 */
function CustomContainer(
  { m, p, w, h, position, top, left, className, ...props },
  ref
) {
  return (
    <Box
      className={cx(
        m && `m${m}`,
        p && `p${p}`,
        w && `w${w}`,
        h && `h${h}`,
        top && `top${top}`,
        left && `left${left}`,
        position,
        className
      )}
      {...props}
      ref={ref}
    />
  );
}

export const Container = forwardRef(CustomContainer);
