import { Flex } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 *
 * @param {object} props
 * @param {'1px' | '2px' | '4px'} props.borderWidth
 * @returns
 */
export const Tag = ({
  children,
  className,
  filled = false,
  borderWidth = '2px',
  bg = 'blue',
  borderWeight = '2px',
  h
}) => (
  <Flex
    fd="column"
    ai="stretch"
    jc="stretch"
    h={h}
    className={cx(
      'container',
      `bw${borderWidth}`,
      `bh${borderWeight}`,
      bg,
      { filled },
      className
    )}
  >
    <Border className={cx('top')} />
    <Flex grow="1">
      <Border className={cx('left')} />
      <Flex className={cx('center')} ai="center" jc="center" grow="1">
        {children}
      </Flex>
      <Border className={cx('right')} />
    </Flex>
    <Border className={cx('bottom')} />
  </Flex>
);

const Border = ({ className }) => (
  <div className={cx('border', className)}></div>
);
