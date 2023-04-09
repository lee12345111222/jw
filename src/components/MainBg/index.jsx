import { Sky, Land } from './components';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function MainBg() {
  return (
    <div className={cx('bg')}>
      <Sky />
      <Land />
    </div>
  );
}
