import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'; // 引入js
import classNames from 'classnames/bind';
import styles from './index.module.css';
import load from '@/utils/load';
import 'swiper/swiper.min.css'; // 引入样式
import 'swiper/swiper-bundle.min.css';

const LbBottom = (props) => {
  const { swiperRef } = props;
  const [swiperIndex, setSwiperIndex] = useState(0);
  const cx = classNames.bind(styles);
  const { notAc, ac, larrow, rarrow } = load('img/mobile/index');
  return (
    <div className={cx('lb_bottom')}>
      <img
        src={larrow}
        onClick={() => {
          if (swiperIndex === 0) return;
          let index = swiperIndex - 1;
          setSwiperIndex(index);
          swiperRef.slidePrev();
        }}
      />
      {swiperIndex === 0 ? <img src={ac} /> : <img src={notAc} />}
      {swiperIndex === 1 ? <img src={ac} /> : <img src={notAc} />}
      {swiperIndex === 2 ? <img src={ac} /> : <img src={notAc} />}
      <img
        src={rarrow}
        onClick={() => {
          if (swiperIndex === 2) return;
          let index = swiperIndex + 1;
          setSwiperIndex(index);
          swiperRef.slideNext();
        }}
      />
    </div>
  );
};

export default (props) => {
  const [swiperRef, setSwiperRef] = useState(null);
  return (
    <Swiper style={{ width: '100%' }} onSwiper={setSwiperRef}>
      {props.children.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>;
      })}
      <LbBottom swiperRef={swiperRef} />
    </Swiper>
  );
};
