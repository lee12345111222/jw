import { useMemo } from 'react';

import styles from './index.module.css';
import classNames from 'classnames/bind';

import logo1 from '@/assets/img/index/investor_01.png';
import logo2 from '@/assets/img/index/investor_02.png';
import logo3 from '@/assets/img/index/investor_03.png';
import logo4 from '@/assets/img/index/investor_04.png';
import logo5 from '@/assets/img/index/investor_05.png';
import logo6 from '@/assets/img/index/investor_06.png';
import logo7 from '@/assets/img/index/investor_07.png';
import logo8 from '@/assets/img/index/investor_08.png';
import logo9 from '@/assets/img/index/investor_09.png';
import logo10 from '@/assets/img/index/investor_10.png';
import logo11 from '@/assets/img/index/investor_11.png';
import logo12 from '@/assets/img/index/investor_12.png';
import logo13 from '@/assets/img/index/investor_13.png';
import logo14 from '@/assets/img/index/investor_14.png';
import logo15 from '@/assets/img/index/investor_15.png';
import logo16 from '@/assets/img/index/investor_16.png';

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
  logo16
];

const cx = classNames.bind(styles);

export default function Investors() {
  const images = useMemo(() => {
    return logos.map((src, index) => {
      return (
        <div key={index}>
          <img src={src} alt="" />
        </div>
      );
    });
  }, []);
  return (
    <div className={cx('investors')}>
      <div className={cx('investors-title')}>INVESTORS</div>
      <div className={cx('investors-list')}>{images}</div>
    </div>
  );
}
