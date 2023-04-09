import { useState, useCallback, useMemo } from 'react';

import { Container, ClickAwayListener } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 *
 * @param {object} props
 * @param {string} props.className
 * @param {Array} props.options
 * @param {function} props.onSelect
 * @returns
 */
export const Dropdown = ({
  children,
  className,
  options = [],
  onSelect,
  showOnHover = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (val) => {
      onSelect?.(val);
      setOpen(false);
    },
    [onSelect]
  );

  const itemList = useMemo(
    () =>
      options.map((item, index) => {
        const { component = null } =
          typeof item === 'object' ? item : { component: null };
        return (
          <li key={index} onClick={() => handleSelect(item)}>
            {component || item}
          </li>
        );
      }),
    [handleSelect, options]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <Container position="relative" className={cx('dropdown-container')}>
      <div onClick={handleOpen}>{children}</div>

      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Container
            as="ul"
            w="100"
            p="0px"
            position="absolute"
            className={cx('dropdown', className)}
          >
            {itemList}
          </Container>
        </ClickAwayListener>
      )}
    </Container>
  );
};
