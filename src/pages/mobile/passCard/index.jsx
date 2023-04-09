import { H2 } from '@/pages/index/ParcelSale';

import PassCard from '@/pages/passCard/Mobile';

import styles from './index.module.css';
import classNames from 'classnames/bind';

import bgSvg from '@/assets/img/index/bg.svg';

const cx = classNames.bind(styles);

export default function Passcard() {
  return (
    <div className={cx('passcard')}>
      <div
        className={cx('bg-web')}
        style={{ backgroundImage: `url(${bgSvg})` }}
      ></div>
      <H2 className={cx('h2')}>PARCEL MINT PASS</H2>
      <PassCard />
    </div>
  );
}
