import { forwardRef } from 'react';

import { Box } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CustomInput(
  { className, type = 'text', textarea = false, value, error, ...props },
  ref
) {
  return (
    <Box
      as={textarea ? 'textarea' : 'input'}
      className={cx('input', className, { error })}
      {...props}
      type={type}
      defaultValue={value}
      ref={ref}
    />
  );
}

export const Input = forwardRef(CustomInput);
