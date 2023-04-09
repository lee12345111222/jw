import { useState, useCallback } from 'react';

import { Flex, Tag } from '../index';
import { LoadingIcon } from '../icon/LoadingIcon';

import styles from './index.module.css';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

/**
 *
 * @param {object} props
 * @param {'' | 'primary'} props.type
 * @param {boolean} props.danger
 * @returns
 */
export const Button = ({
  loading,
  children,
  borderWidth = '1px',
  borderWeight = '2px',
  onClick,
  type = 'primary',
  className,
  bg,
  danger = false,
  gray = false,
  pink = false,
  yellow = false,
  purple = false,
  purple2 = false,
  width,
  disabled
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    !loading && onClick?.();
  }, [loading, onClick]);

  return (
    <button
      disabled={disabled}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onClick={handleClick}
      className={cx('btn', { loading, clicked, disabled }, className)}
    >
      <Tag
        h="100"
        filled={type === 'primary'}
        borderWidth={borderWidth}
        borderWeight={borderWeight}
        bg={
          bg ||
          (danger
            ? 'red'
            : gray
            ? 'gray'
            : pink
            ? 'pink'
            : yellow
            ? 'yellow'
            : purple
            ? 'purple'
            : purple2
            ? 'purple2'
            : 'blue')
        }
      >
        <Flex ai="center" jc="center" gap="8px" width={width}>
          {children}
          {loading && <LoadingIcon className={cx('loading-icon')} />}
        </Flex>
      </Tag>
    </button>
  );
};
