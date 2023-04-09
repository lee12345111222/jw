import { useState, useCallback, useEffect, useMemo } from 'react';

import airdropBg from '@/assets/img/airdrop-bg.png';
// import airdropPoster from '@/assets/img/airdrop-poster.png';
import bigHOuseImg from '@/assets/img/big-house.png';
import wenhao from '@/assets/img/wenhao.png';
import nextIcon from '@/assets/icon/next-icon.svg';
import lastIcon from '@/assets/icon/last-icon.svg';
import calendarIcon from '@/assets/icon/calendar-icon.svg';

import rewardImg from '@/assets/img/reward.gif';
import rewardImg2 from '@/assets/img/reward2.gif';
// import rewardImg3 from '@/assets/img/reward3.gif';

import { geteventinfo } from '@/api/event';
import useApi from '@/hooks/useApi';

import styles from './index.module.css';
import classNames from 'classnames/bind';

import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const cx = classNames.bind(styles);

const duplicateNumber = (num) => (num > 9 ? num : `0${num}`);

export default function Airdrop() {
  const { data } = useApi(() =>
    geteventinfo({ event_name: 'parcel_settle_stage1' })
  );

  const startTime = useMemo(
    () => (data ? dayjs.utc(data.data.start_at).format('YYYY.MM.DD HH:mm') : 0),
    [data]
  );

  const { start_at = 0, now = 0 } = useMemo(() => data?.data || {}, [data]);

  return (
    <div className={cx('airdrop')} style={{ background: `url(${airdropBg})` }}>
      <div className={cx('top-container')}>
        <div className={cx('top-texts')}>
          <div className={cx('title')}>Parcel Holder Reward</div>
          <div className={cx('sub-title')}>
            <span>START TIME:&nbsp;</span>
            <span className={cx('event-time')}>{startTime} UTC</span>
            <div className={cx('exclusive')}>
              <div className={cx('arrow-top')}></div>
              <span>Exclusive</span>
            </div>
          </div>
          <img width="695px" src="/event_static/mBoxLine.png" alt="" />
          <div className={cx('p')}>
            If you own a plot of parcel, you will be qualified for the PlayerOne
            SETTLE DOWN Campaign. You will have one week to receive the reward
            after each successful setting upgrade. You will not be able to claim
            it if the time limit is over.
          </div>
        </div>
        <div className={cx('wenhao')}>
          <img src={bigHOuseImg} alt="" />
        </div>
      </div>
      <div className={cx('box-container')}>
        {now <= start_at ? (
          <div className={cx('countdown')}>
            <div className={cx('countdown-title')}>
              <img src={calendarIcon} alt="" />
              <span>SETTLE COUNTDOWN</span>
            </div>
            <LeftTime data={data} />
          </div>
        ) : (
          <div className={cx('countdown')}>
            <div className={cx('countdown-title')}>
              <span>SETTLE CAMPAIGN</span>
            </div>
            <div className={cx('colorfull-text')}>HOT NOW</div>
          </div>
        )}
        <Swiper>
          <Box title="PlayerOne Reward 1" disable={false} img={rewardImg} />
          <Box title="PlayerOne Reward 2" disable={false} img={rewardImg2} />
          <Box title="PlayerOne Reward 3" disable={false} />
          <Box title="PlayerOne Reward 4" disable={false} />
          <Box title="PlayerOne Reward 5" disable={false} />
          <Box title="PlayerOne Reward 6" disable={false} />
          <Box title="PlayerOne Reward 7" disable={false} />
          <Box title="PlayerOne Reward 8" disable={false} />
        </Swiper>
      </div>
    </div>
  );
}

export const Swiper = ({ children }) => {
  const [leftIndex, setLeftIndex] = useState(-1);
  const [type, setType] = useState('next');

  const handleLast = useCallback(() => {
    setType('last');
    setLeftIndex((v) => (v > 0 ? v - 1 : v));
  }, []);

  const handleNext = useCallback(() => {
    setType('next');
    const index = document.body.clientWidth >= 1580 ? 4 : 5;
    setLeftIndex((v) => (v === -1 ? 1 : v < index ? v + 1 : index));
  }, []);

  return (
    <div className={cx('item-list')}>
      <img
        onClick={handleLast}
        className={cx('arrow', 'last-arrow')}
        src={lastIcon}
        alt=""
      />
      <div className={cx('container')}>
        <div className={cx('container-flex', type, `leftIndex${leftIndex}`)}>
          {children}
        </div>
      </div>
      <img
        onClick={handleNext}
        className={cx('arrow', 'next-arrow')}
        src={nextIcon}
        alt=""
      />
    </div>
  );
};

const Box = ({ title, disable = true, img }) => {
  return (
    <div className={cx('box')}>
      <div className={cx('poster-container')}>
        <img src={img || wenhao} alt="" />
        {/* <img src={airdropPoster} alt="" /> */}
      </div>
      <div className={cx('action')}>
        <div>{title}</div>
        {/* <Button pink>
          <div className={cx('btn')}>Claim</div>
        </Button> */}
      </div>
      <div className={cx({ mask: disable })}></div>
    </div>
  );
};

export const LeftTime = ({ data }) => {
  const { start_at } = useMemo(() => data?.data || [], [data?.data]);

  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    setNow(data.data.now);
  }, [data]);

  useEffect(() => {
    if (!now) {
      return;
    }

    const timer = setInterval(() => {
      setNow((v) => v + 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [now]);

  const [leftTime, setLeftTime] = useState(0);

  useEffect(() => {
    if (!now) {
      return;
    }

    if (now < start_at) {
      return setLeftTime(start_at - now);
    }
    setLeftTime(0);
  }, [now, start_at]);

  const [hours, minutes, seconds] = useMemo(() => {
    if (!leftTime) {
      return [0, 0, 0, 0];
    }

    const left = (leftTime / 1000) >> 0;

    const leftMinutes = (left / 60) >> 0;
    const leftHours = (leftMinutes / 60) >> 0;

    // const days = (leftHours / 24) >> 0;
    // const hours = leftHours % 24;
    const hours = leftHours;
    const minutes = duplicateNumber(leftMinutes % 60);
    const seconds = duplicateNumber(left % 60);

    return [hours, minutes, seconds];
  }, [leftTime]);

  return (
    <div className={cx('time-left')}>
      <div className={cx('times')}>
        {/* <Timer name="DAYS" time={days} />
        <span>:</span> */}
        <Timer name="HOURS" time={hours} />
        <span>:</span>
        <Timer name="MINUTES" time={minutes} />
        <span>:</span>
        <Timer name="SECONDS" time={seconds} />
      </div>
    </div>
  );
};

export const Timer = ({ time, name }) => {
  return (
    <div className={cx('timer')}>
      <div className={cx('timer-time')}>{time}</div>
      <div className={cx('timer-name')}>{name}</div>
    </div>
  );
};
