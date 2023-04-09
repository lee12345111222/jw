import load from '@/utils/load';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import SwiperCom from '../Swiper';
import BorderedBtn from '@/components/BorderedBtn2/index';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import TweenOne from 'rc-tween-one';
const cx = classNames.bind(styles);

const {
  voIcon,
  voLine,
  sjText,
  sjIcon1,
  sjIcon2,
  jyText,
  jyIcon1,
  jyIcon3,
  zpText,
  zpIcon1,
  zpIcon2
} = load('img/mobile/index');

export const One = ({ rolling }) => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState(1);
  const [type, setType] = useState('from');
  const [speed, setSpeed] = useState(1);

  useMemo(() => {
    if (rolling === 1 || rolling === -2) {
      setDuration(1);
    } else {
      setDuration(-1);
    }

    if (rolling ** 2 === 1) {
      setType('to');
      setSpeed(0.8);
    } else {
      setType('from');
      setSpeed(1);
    }
  }, [rolling]);

  return (
    <div className={cx('lunbo-box')}>
      <TweenOne
        className="banner-user-title"
        animation={{
          x: duration * 320,
          opacity: 0,
          type
        }}>
        <div className={cx('lb-head-box')}>
          <div className={cx('lb-head')}>
            <img className={cx('lb-icon')} src={voIcon} alt="" />
            <img src={sjText} alt="" />
          </div>
          <div className={cx('lb-head-title')}>{t('start.world_title')}</div>
          <img className={cx('lb-line')} src={voLine} alt="" />
        </div>
      </TweenOne>
      <TweenOne
        className="banner-user-title"
        animation={{
          x: duration * 320,
          opacity: 0,
          type,
          delay: speed * 140
        }}>
        <div className={cx('lb-content')}>
          <div className={cx('lb-con-line')}>
            <img src={sjIcon1} alt="" />
            <div className={cx('lb-line-text')}>{t('start.world_p1')}</div>
          </div>
          <div className={cx('lb-con-line')}>
            <img src={sjIcon2} alt="" />
            <div className={cx('lb-line-text')}>{t('start.world_p2')}</div>
          </div>
        </div>
      </TweenOne>

      <div className={cx('lb-btn')}>
        <TweenOne
          className="banner-user-title"
          animation={{
            x: duration * 320,
            opacity: 0,
            type,
            delay: speed * 280
          }}>
          <BorderedBtn
            bgColor="#5500AD"
            borderColor="#5500AD"
            height="40px"
            style={{
              fontSize: '14px',
              fontWeight: '600',
              width: '40vw'
            }}>
            {t('start.world_btn')}
          </BorderedBtn>
        </TweenOne>
      </div>
    </div>
  );
};
export const Two = ({ rolling }) => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState(1);
  const [type, setType] = useState('from');
  const [speed, setSpeed] = useState(1);

  useMemo(() => {
    if (rolling === 1 || rolling === -2) {
      setDuration(1);
    } else {
      setDuration(-1);
    }

    if (rolling ** 2 === 1) {
      setType('to');
      setSpeed(0.8);
    } else {
      setType('from');
      setSpeed(1);
    }
  }, [rolling]);
  return (
    <div className={cx('lunbo-box')}>
      <TweenOne
        className="banner-user-title"
        animation={{
          x: duration * 320,
          opacity: 0,
          type
        }}>
        <div className={cx('lb-head-box')}>
          <div className={cx('lb-head')}>
            <img className={cx('lb-icon')} src={voIcon} alt="" />
            <img src={jyText} alt="" />
          </div>
          <div className={cx('lb-head-title')}>{t('start.trade_title')}</div>
          <img className={cx('lb-line')} src={voLine} alt="" />
        </div>
      </TweenOne>
      <TweenOne
        className="banner-user-title"
        animation={{
          x: duration * 320,
          opacity: 0,
          type,
          delay: speed * 140
        }}>
        <div className={cx('lb-content')}>
          <div className={cx('lb-con-line')}>
            <img src={jyIcon1} alt="" />
            <div className={cx('lb-line-text')}>{t('start.trade_p1')}</div>
          </div>
          <div className={cx('lb-con-line')}>
            <img src={jyIcon3} alt="" />
            <div className={cx('lb-line-text')}>{t('start.trade_p2')}</div>
          </div>
        </div>
      </TweenOne>

      <div className={cx('lb-btn')}>
        <TweenOne
          className="banner-user-title"
          animation={{
            x: duration * 320,
            opacity: 0,
            type,
            delay: speed * 280
          }}>
          <BorderedBtn
            bgColor="#5500AD"
            borderColor="#5500AD"
            height="40px"
            style={{
              fontSize: '14px',
              fontWeight: '600',
              width: '40vw'
            }}>
            {t('start.trade_btn')}
          </BorderedBtn>
        </TweenOne>
      </div>
    </div>
  );
};
export const Three = ({ rolling }) => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState(1);
  const [type, setType] = useState('from');
  const [speed, setSpeed] = useState(1);

  useMemo(() => {
    if (rolling === 1 || rolling === -2) {
      setDuration(1);
    } else {
      setDuration(-1);
    }

    if (rolling ** 2 === 1) {
      setType('to');
      setSpeed(0.8);
    } else {
      setType('from');
      setSpeed(1);
    }
  }, [rolling]);
  return (
    <div className={cx('lunbo-box')}>
      <TweenOne
        className="banner-user-title"
        animation={{
          x: duration * 320,
          opacity: 0,
          type
        }}>
        <div className={cx('lb-head-box')}>
          <div className={cx('lb-head')}>
            <img className={cx('lb-icon')} src={voIcon} alt="" />
            <img src={zpText} alt="" />
          </div>
          <div className={cx('lb-head-title')}>{t('start.create_title')}</div>
          <img className={cx('lb-line')} src={voLine} alt="" />
        </div>
      </TweenOne>
      <TweenOne
        className="banner-user-title"
        animation={{
          x: duration * 320,
          opacity: 0,
          type,
          delay: speed * 140
        }}>
        <div className={cx('lb-content')}>
          <div className={cx('lb-con-line')}>
            <img src={zpIcon1} alt="" />
            <div className={cx('lb-line-text')}>{t('start.create_p1')}</div>
          </div>
          <div className={cx('lb-con-line')}>
            <img src={zpIcon2} alt="" />
            <div className={cx('lb-line-text')}>{t('start.create_p2')}</div>
          </div>
        </div>
      </TweenOne>

      <div className={cx('lb-btn')}>
        <TweenOne
          className="banner-user-title"
          animation={{
            x: duration * 320,
            opacity: 0,
            type,
            delay: speed * 280
          }}>
          <BorderedBtn
            bgColor="#5500AD"
            borderColor="#5500AD"
            height="40px"
            style={{
              fontSize: '14px',
              fontWeight: '600',
              width: '40vw'
            }}>
            {t('start.voxel_btn1')}
          </BorderedBtn>
        </TweenOne>
      </div>
    </div>
  );
};

const SlideShow = () => {
  return (
    <SwiperCom>
      <One />
      <Two />
      <Three />
    </SwiperCom>
  );
};
export default SlideShow;
