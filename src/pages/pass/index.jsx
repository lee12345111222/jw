import { useState, useEffect, useMemo, useCallback } from 'react';

import styled from 'styled-components';

import titlebg from './assets/title-bg.svg';
import beforeIcon from './assets/before-icon.svg';
import BoxSvg from './assets/box.svg';
import mountain from './assets/mountain.png';

import { geteventinfo, shareogpasscard, sharestatus } from '@/api/event';
import useApi from '@/hooks/useApi';

import { Tag } from '@/custom-ui/index';

import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';

import load from '@/utils/load';

import styles from './event.module.css';
import classNames from 'classnames/bind';

import tweetIcon from '@/assets/icon/tweet-icon.svg';
import lockIcon from '@/assets/icon/lock-icon.svg';
import sharedIcon from '@/assets/icon/shared-icon.svg';
import notSharedIcon from '@/assets/icon/not-shared-icon.svg';
import rightArrow from '@/assets/icon/right-arrow.svg';
import passcards from '@/assets/img/passcards.png';
import rewardImg from '@/assets/img/reward.png';
import rewardImgDisable from '@/assets/img/reward-disable.png';

import clockIcon from '@/assets/icon/clock-icon.svg';

import { Button } from '@/custom-ui/index';
import Dialog from '@/ui/dialog/index';

import * as Add2Calendar from 'add2calendar';
import dayjs from 'dayjs';
import { message } from 'antd';

import { Menu, Dropdown } from 'antd';

const { Item } = Menu;

const duration = require('dayjs/plugin/duration');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

dayjs.extend(duration);

const duplicateNumber = (num) => (num > 9 ? num : `0${num}`);

const cx = classNames.bind(styles);

const { stars1, stars2, stars3, stars4, bg_svg: bgSvg } = load('img/index');

export default function Pass() {
  const [openDialog, setOpenDialog] = useState(false);
  const { data } = useApi(() => geteventinfo({ event_name: 'og_passcard_d1' }));

  const deadLine = useMemo(() => {
    if (data) {
      return dayjs.utc(data.data.end_at).format('YYYY.MM.DD HH:mm');
    }
    return 0;
  }, [data]);

  const singleEventArgs = useMemo(() => {
    if (!data) {
      return;
    }
    const start = dayjs(data.data.end_at);
    const end = dayjs(data.data.end_at + 24 * 60 * 60 * 1000);
    return {
      title: 'PlayerOne MintPass Sale',
      start,
      end,
      location: 'Metaverse',
      description: 'https://www.playerone.world',
      isAllDay: false
    };
  }, [data]);

  const singleEvent = useMemo(
    () => (singleEventArgs ? new Add2Calendar(singleEventArgs) : null),
    [singleEventArgs]
  );

  const handleCalendarClick = useCallback(
    (k) => {
      if (k === 'google') {
        window.open(singleEvent.getGoogleUrl());
      }

      if (k === 'icloud') {
        window.location.href = singleEvent.getICalUrl();
      }
    },
    [singleEvent]
  );

  const menu = useMemo(
    () => (
      <Menu>
        <Item key="1">
          <div onClick={() => handleCalendarClick('google')}>
            Google calendar
          </div>
        </Item>
        <Item key="2">
          <div onClick={() => handleCalendarClick('icloud')}>
            iCloud Calendar
          </div>
        </Item>
      </Menu>
    ),
    [handleCalendarClick]
  );

  return (
    <Page
      style={{
        background:
          'linear-gradient(180deg, #2B1850 26.24%, #6341AA 64.97%, #B561D9 108.18%)'
      }}
    >
      <Layer
        style={{
          backgroundImage: `url(${bgSvg})`,
          opacity: 0.75
        }}
      >
        <Stars
          style={{ animationDelay: '-0.8s' }}
          className="starts"
          src={stars1}
        />
        <Stars
          style={{ animationDelay: '1.6s' }}
          className="starts"
          src={stars2}
        />
        <Stars
          style={{ animationDelay: '0.8s' }}
          className="starts"
          src={stars3}
        />
        <Stars className="starts" src={stars4} />
      </Layer>

      <Layer className={cx('layer')}>
        <div className={cx('top')} id="pass">
          <div className={cx('share')}>
            <div>
              Retweet this event to win <span>MG token</span>
            </div>
            <Button onClick={() => setOpenDialog(true)}>
              <div className={cx('tweet-btn')}>
                <img src={tweetIcon} alt="" />
                Tweet
                <img src={rightArrow} alt="" />
              </div>
            </Button>
          </div>

          <h2 className={cx('title')}>PlayerOne Parcel Mint Pass</h2>

          <div className={cx('title2-contaner')}>
            <div className={cx('title2')}>
              <div className={cx('title2-bg-container')}>
                <img src={titlebg} alt="" />
              </div>
              <div className={cx('start-time-container')}>
                <div className={cx('time')}>
                  Start Time: <span>{deadLine} UTC</span>
                </div>
                <div className={cx('calendar')}>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <img onClick={handleCalendarClick} src={clockIcon} alt="" />
                  </Dropdown>
                  <div className={cx('reminder-container')}>
                    <div className={cx('reminder-arrow')}></div>
                    <Tag borderWidth="1px" bgColor="red" borderColor="red">
                      <div className={cx('reminder')}>Add reminder</div>
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className={cx('reward')}>
              <img src={beforeIcon} alt="" />
              <div>TIME LEFT</div>
              <img src={beforeIcon} alt="" />
            </div>
          </div>

          <LeftTime data={data} />
        </div>

        <div className={cx('foot')}>
          <div
            className={cx('mountain')}
            style={{ backgroundImage: `url(${mountain})` }}
          ></div>
          <div className={cx('foot-title')}>Event Terms & Conditions</div>
          <div>
            <ul>
              <li>
                In order to acquire land in PlayerOne, you need to own a
                PlayerOne MintPass and you must be whitelisted for this event.
              </li>
              <li>
                After ensuring that you are eligible to purchase. You could also
                share this event to win a large number of MG tokens.
              </li>
            </ul>
          </div>
        </div>
      </Layer>

      <ShareDialog
        open={openDialog}
        data={data}
        onCancel={() => setOpenDialog(false)}
      />
    </Page>
  );
}

const ShareDialog = ({ open, data, onCancel }) => {
  const { account } = useWallet();
  const [getToken] = useLoginToken();

  const leftDays = useMemo(
    () =>
      data
        ? (((data.data.end_at - data.data.now) / 1000 / 60 / 60 / 24) >> 0) + 1
        : 4,
    [data]
  );

  const { run } = useApi(shareogpasscard, { manual: true });
  const { data: shareData, run: getShareStatus } = useApi(sharestatus, {
    manual: true
  });

  useEffect(() => {
    if (!account) {
      return;
    }
    getShareStatus({ address: account });
  }, [account, getShareStatus]);

  const handleShare = useCallback(
    async (days) => {
      if (!account) {
        return message.error('Please connect your Wallet');
      }
      const token = await getToken();
      const { code, data, msg } = await run({
        login_token: token,
        address: account,
        event_name: `og_passcard_d${days}`
      });

      if (code !== 200) {
        return message.error(msg || 'Share faild, Please try agian');
      }

      window.open(`/redirect.html#${data.url}`);
    },
    [account, getToken, run]
  );

  return (
    <Dialog
      onCancel={onCancel}
      open={open}
      backdrop={false}
      footer=""
      title="Share & Win Rewards"
    >
      <div className={cx('dialog')}>
        <div className={cx('share-meta')}>
          <div className={cx('passcards')}>
            <img src={passcards} alt="" />
          </div>
          <div>
            <div className={cx('share-title')}>Event Terms & Conditions</div>
            <div className={cx('share-info')}>
              In order to acquire land in PlayerOne, you need to own a PlayerOne
              MintPass and you must be whitelisted for this event. After
              ensuring that you are eligible to purchase. You could also share
              this event to win a large numberof MG tokens.
            </div>
          </div>
        </div>
        <div className={cx('share-items')}>
          <ShareItem
            days={3}
            left={leftDays}
            reward={1000}
            onShare={handleShare}
            shared={shareData?.data?.og_passcard_d3}
          />
          <ShareItem
            days={2}
            left={leftDays}
            reward={2000}
            onShare={handleShare}
            shared={shareData?.data?.og_passcard_d2}
          />
          <ShareItem
            days={1}
            left={leftDays}
            reward={3000}
            onShare={handleShare}
            shared={shareData?.data?.og_passcard_d1}
          />
        </div>
      </div>
    </Dialog>
  );
};

const ShareItem = ({ days, left, reward, onShare, shared }) => {
  const disable = useMemo(() => days !== left, [days, left]);

  const src = useMemo(() => {
    if (left > days) {
      return lockIcon;
    }

    return shared ? sharedIcon : notSharedIcon;
  }, [days, left, shared]);

  return (
    <div className={cx('item-box')}>
      <div className={cx('share-item')}>
        <div className={cx('share-item-title')}>
          <span className={cx('share-days')}>{days} </span>
          <span>Days</span>
        </div>
        <div className={cx('img-box')}>
          <div>MG TOKENS</div>
          <img src={disable ? rewardImgDisable : rewardImg} alt="" />
          <div className={cx('share-reward', { disable })}>× {reward}</div>
        </div>

        {disable && (
          <div className={cx('mask')}>
            <img src={src} alt="" />
          </div>
        )}
      </div>
      <Button gray={disable} disabled={disable} onClick={() => onShare(days)}>
        <div className={cx('share-btn')}>Share & Win MG</div>
      </Button>
    </div>
  );
};

export const Timer = ({ time, name, className }) => {
  return (
    <div className={cx('timer', className)}>
      <div className={cx('timer-time')}>{time}</div>
      <div className={cx('timer-name')}>{name}</div>
    </div>
  );
};

const LeftTime = ({ data }) => {
  const { end_at, start_at } = useMemo(() => data?.data || {}, [data]);

  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    console.log('data >>>', data);

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

    // if (now < start_at) {
    //   return setLeftTime(start_at - now);
    // }
    if (now < end_at) {
      return setLeftTime(end_at - now);
    }
    setLeftTime(0);
  }, [end_at, now, start_at]);

  const [days, hours, minutes, seconds] = useMemo(() => {
    if (!leftTime) {
      return [0, 0, 0, 0];
    }

    const left = (leftTime / 1000) >> 0;

    const leftMinutes = (left / 60) >> 0;
    const leftHours = (leftMinutes / 60) >> 0;

    const days = (leftHours / 24) >> 0;
    const hours = leftHours % 24;
    const minutes = duplicateNumber(leftMinutes % 60);
    const seconds = duplicateNumber(left % 60);

    return [days, hours, minutes, seconds];
  }, [leftTime]);

  return (
    <div className={cx('time-left')}>
      <img src={BoxSvg} alt="" />
      <div className={cx('times')}>
        <Timer name="DAYS" time={days} />
        <span>:</span>
        <Timer name="HOURS" time={hours} />
        <span>:</span>
        <Timer name="MINUTES" time={minutes} />
        <span>:</span>
        <Timer name="SECONDS" time={seconds} />
      </div>
    </div>
  );
};

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Light = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Stars = styled(Light)`
  top: calc(8vh - 100px);
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  min-width: 750px;
  min-height: 960px;
  max-height: {80}vw;
  overflow-y: hidden;
  position: relative;
`;
