import { Flex } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Icon = ({ icon, w = '16px', className, ...props }) => (
  <Flex w={w} className={cx(className)} ai="center" jc="center">
    <img className={cx('icon')} src={icon} alt="" />
  </Flex>
);
