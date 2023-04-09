import { Box } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 *
 * @param {object} props
 * @param {'04' | '084'} props.opacity
 * @param {'small' | 'mini' | 'big'} props.size
 * @returns
 */
export const Text = ({
  size,
  opacity,
  children,
  className,
  as = 'span',
  ...props
}) => (
  <Box
    as={as}
    className={cx('text', size, opacity && `opacity-${opacity}`, className)}
    {...props}
  >
    {children}
  </Box>
);

export const H1 = ({ ...props }) => <Text as="h1" {...props} />;

export const H2 = ({ ...props }) => <Text as="h2" {...props} />;

export const H3 = ({ ...props }) => <Text as="h3" {...props} />;

export const H4 = ({ className, ...props }) => (
  <Text className={cx('h4', className)} as="h4" {...props} />
);

export const P = ({ ...props }) => <Text as="p" opacity="04" {...props} />;
