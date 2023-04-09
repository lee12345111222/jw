import { useCallback, useRef, forwardRef, useMemo, useEffect } from 'react';

import { Input, Dropdown, Icon, Flex } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

import selectIcon from './assets/select-icon.svg';

const cx = classNames.bind(styles);

function CustomSelect(
  { onSelect, placeholder, defaultValue = '', options, error, ...props },
  ref
) {
  const inputRef = useRef();

  const refEl = useMemo(() => ref || inputRef, [ref]);

  useEffect(() => {
    refEl.current.value = defaultValue;
  }, [defaultValue, refEl]);

  const handleSelect = useCallback(
    (val) => {
      refEl.current.value = val;
      onSelect?.(val);
    },
    [onSelect, refEl]
  );

  return (
    <Dropdown
      onSelect={handleSelect}
      options={options}
      className={cx('dropdown')}
    >
      <Flex ai="center">
        <Input
          className={cx('input')}
          placeholder={placeholder}
          ref={refEl}
          error={error}
          readOnly
        />
        <Icon className={cx('icon')} icon={selectIcon} />
      </Flex>
    </Dropdown>
  );
}

export const Select = forwardRef(CustomSelect);
