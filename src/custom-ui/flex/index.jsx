import styles from './index.module.css';
import classNames from 'classnames/bind';

import { Container } from '../index';

const cx = classNames.bind(styles);

/**
 *
 * @param {object} props
 * @param {'0' | '1'} props.shrink
 * @param {'0' | '1'} props.grow
 * @param {string} props.className
 * @returns
 */
export const FlexItem = ({ shrink, grow, className, ...props }) => (
  <Container
    className={cx(
      shrink !== undefined && `shrink${shrink}`,
      grow !== undefined && `grow${grow}`,
      className
    )}
    {...props}
  />
);

/**
 * @param {object} props
 * @param {string} props.className - className
 * @param {"column" | "row" | "column-reverse" | "row-reverse"} props.fd
 * @param {"wrap" | "nowrap" | "wrap-reverse"} props.fw
 * @param {"baseline" | "center" | "flex-end" | "flex-start" | "stretch"} props.ai
 * @param {'baseline' | 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch'} props.jc
 * @param {'4px' | '8px' | '12px' | '16px' | '24px' | '32px' | '56px' } props.gap
 * @returns
 */
export const Flex = ({ className, fd, fw, ai, jc, gap, ...props }) => (
  <FlexItem
    className={cx(
      'flex',
      fd,
      fw,
      ai && `ai-${ai}`,
      jc && `jc-${jc}`,
      gap && `gap${gap}`,
      className
    )}
    {...props}
  />
);
