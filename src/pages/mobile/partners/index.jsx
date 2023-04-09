import React, { useMemo } from 'react';

import styles from './index.module.css';

import classNames from 'classnames/bind';

//import UnionLeft from '@/assets/icon/union-left.svg';

//import UnionRight from '@/assets/icon/union-right.svg';

import ParnterBg from '@/assets/img/parnter-bg.png';

import logo1 from '@/assets/img/index/partner_01.svg';
import logo2 from '@/assets/img/index/partner_02.svg';
import logo3 from '@/assets/img/index/partner_03.svg';
import logo4 from '@/assets/img/index/partner_04.svg';
import logo5 from '@/assets/img/index/partner_05.svg';

const cx = classNames.bind(styles);

const logos = [
  { src: logo1, href: '' },
  { src: logo2, href: '' },
  { src: logo3, href: '' },
  { src: logo4, href: '' },
  { src: logo5, href: '' }
];

const Title = () => (
  <div className={cx('partners-title')}>
    {/* <img src={UnionLeft} alt="" /> */}
    <p>PlayerOne Strategic Partners</p>
    {/* <img src={UnionRight} alt="" /> */}
  </div>
);

const SubTitle = () => (
  <div className={cx('partners-subtitle')}>
    Global top virtual land service provider
  </div>
);

export default function Partners() {
  const images = useMemo(() => {
    return logos.map(({ src, href }, index) => {
      return (
        <a href={href} alt="" key={index}>
          <div>
            <img src={src} alt="" />
          </div>
        </a>
      );
    });
  }, []);
  return (
    <div className={cx('parnter-container')}>
      {/* <img src={ParnterBg} alt="" /> */}
      <div className={cx('parnter-area')}>
        <div className={cx('parnter-content')}>
          <Title />
          <SubTitle />
          <div className={cx('partners')}>{images}</div>
        </div>
      </div>
    </div>
  );
}
