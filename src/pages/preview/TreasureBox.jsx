import { useEffect, useState, useCallback, useMemo } from 'react';

import Dialog from '@/ui/dialog/index';

import useTreasureBoxClaim from '@/hooks/useTreasureBoxClaim';
import useTreasureBox from '@/hooks/useTreasureBox';

import { Duration } from '../create/tabs/Treasure';
import styles from './treasureBox.module.css';

import { getDisplayBalance2ETH } from '@/utils/common';

import Button from '@/ui/button/index';

import { Loading } from '../create/tabs/Treasure';

import { message } from 'antd';

import { confirmTransaction } from '@/utils/common';
import Web3 from 'web3';
import { useWallet } from 'use-wallet';

import gold from '@/assets/img/gold.png';
import successIcon from '@/assets/icon/success-icon.png';

import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);

const TreasureBox = ({ account }) => {
  const openBox = useTreasureBoxClaim();
  const { getBoxInfo, getReceivingRecord } = useTreasureBox();

  const [
    { startTime, endTime, maxCount, perRewardAmount, duration: coolingHour },
    setBoxInfo
  ] = useState({});

  const coolingTime = useMemo(() => coolingHour * 60 * 60, [coolingHour]);
  const [now, setNow] = useState(new Date().getTime() / 1000);

  const [boxId, setBoxId] = useState();
  const [showDetail, setShowDetail] = useState();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  const [leftTime, setLeftTime] = useState(0);
  const [chestStatus, setChestStatus] = useState([]);
  const [, setTimer] = useState();

  const durationTime = useMemo(
    () => (now - startTime) / (endTime - startTime),
    [endTime, now, startTime]
  );

  const getDate = useCallback(
    (time) => dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss'),
    []
  );

  const [isNotStartOrEnd, setIsNotStartOrEnd] = useState(false);

  useEffect(() => {
    if (!boxId || !endTime) {
      return;
    }

    if (now > endTime) {
      setIsNotStartOrEnd(true);
    }
  }, [boxId, endTime, now]);

  useEffect(() => {
    if (!boxId || !startTime) {
      return;
    }

    const now = new Date().getTime() / 1000;

    if (now > startTime) {
      return setIsNotStartOrEnd(false);
    }

    setIsNotStartOrEnd(true);

    const timer = setInterval(() => {
      const now = new Date().getTime() / 1000;
      setNow(now);

      if (now > startTime) {
        setLeftTime(0);
        setTimer((val) => {
          clearInterval(val);
          return undefined;
        });
        return setIsNotStartOrEnd(false);
      }

      setLeftTime(startTime - now);
    }, 1000);

    setTimer((val) => {
      clearInterval(val);
      return timer;
    });

    return () => {
      setTimer((val) => {
        clearInterval(val);
        return undefined;
      });
    };
  }, [boxId, startTime]);

  useEffect(() => {
    window.opentreasurechest = (pid) => {
      setBoxId(pid);
    };

    return () => {
      delete window.opentreasurechest;
    };
  }, [openBox]);

  const { ethereum } = useWallet();
  const handleSubmit = useCallback(async () => {
    const pid = boxId;
    setBoxId();
    setLoading(true);
    try {
      const web3 = new Web3(ethereum);
      const { transactionHash } = await openBox(pid);
      await confirmTransaction(web3, transactionHash);
      setLoading();
      setSuccess(true);
      window.onfire();
    } catch (error) {
      setLoading();
      message.error('Open faild');
    }
  }, [boxId, ethereum, openBox]);

  useEffect(() => {
    if (!boxId) {
      return;
    }

    if (isNotStartOrEnd) {
      return;
    }

    const fn = async () => {
      // [当前周期总次数，最后一次领取时间节点，当前用户上次领取时间]
      const result = await getReceivingRecord(+boxId, account.toLowerCase());
      const { 0: claimedCount, 1: startTime, 2: lastClaimTime } = result;

      const chestStatus = (() => {
        if (+startTime + coolingTime < new Date().getTime() / 1000) {
          const emptyTimes = Math.floor(
            (new Date().getTime() / 1000 - startTime) / coolingTime
          );
          return {
            claimedCount: 0,
            startTime: +startTime + emptyTimes * coolingTime,
            lastClaimTime: +lastClaimTime
          };
        }
        return {
          claimedCount: +claimedCount,
          startTime: +startTime,
          lastClaimTime: +lastClaimTime
        };
      })();

      setChestStatus(chestStatus);

      if (chestStatus.lastClaimTime < chestStatus.startTime) {
        return setLeftTime(0);
      }

      const timer = setInterval(() => {
        if (chestStatus.lastClaimTime < chestStatus.startTime) {
          clearInterval(timer);
          return setLeftTime(0);
        }

        const now = new Date().getTime() / 1000;
        setNow(now);

        const leftTime = chestStatus.startTime + coolingTime - now;

        setLeftTime(leftTime);
      }, 1000);

      setTimer((val) => {
        clearInterval(val);
        return timer;
      });
    };

    fn();

    return () => {
      setTimer((val) => {
        clearInterval(val);
        return undefined;
      });
    };
  }, [account, boxId, coolingTime, getReceivingRecord, isNotStartOrEnd]);

  const myLeftTime = useMemo(() => {
    if (!leftTime) {
      return '00:00';
    }

    return dayjs.duration(leftTime * 1000).format('HH:mm:ss');
  }, [leftTime]);

  useEffect(() => {
    const fn = async () => {
      if (!boxId) return;
      const boxInfo = await getBoxInfo(+boxId);

      window.localStorage.setItem('reward-amount', boxInfo.perRewardAmount);
      setBoxInfo(boxInfo);
    };
    fn();
  }, [boxId, getBoxInfo]);

  const isDisable = useMemo(
    () => durationTime >= 1 || leftTime || chestStatus.claimedCount >= maxCount,
    [chestStatus.claimedCount, durationTime, leftTime, maxCount]
  );

  return (
    <>
      <Dialog
        title="Chest Details"
        onCancel={() => setShowDetail()}
        open={showDetail}
        footer={
          <div className={styles.claim}>
            <Button onClick={() => setShowDetail()} width="96px">
              Confirm
            </Button>
          </div>
        }
      >
        <div className={styles.dialog}>
          <div className={styles['time-container']}>
            <Duration
              color={isNotStartOrEnd ? '#FF069B' : undefined}
              duration={durationTime}
            />
            <div className={styles['dialog-time']}>
              <div>{getDate(startTime)}</div>
              <div>{getDate(endTime)}</div>
            </div>
          </div>
          <DialogItem
            title="Reward/Each time:"
            val1={getDisplayBalance2ETH(perRewardAmount)}
          />
          <DialogItem title="Cooldown:" val1={myLeftTime} err={leftTime} />
          {/* <DialogItem
          title="Per address Times/24h："
          val1={myData[2]}
          val2={perMaxCount}
        /> */}

          <DialogItem
            title="max count:"
            val1={chestStatus.claimedCount}
            val2={maxCount}
          />
          {/* <DialogItem title="Event total awards：" val1={allAwards} /> */}
        </div>
      </Dialog>

      <Loading
        text="Please wait. The treasure chest is being opened"
        open={loading}
      />

      <Finish open={success} onCancel={() => setSuccess()} />

      <Dialog
        open={boxId && !showDetail}
        onCancel={() => setBoxId()}
        title={
          <div className={styles['congratulation-header']}>CONGRATULATIONS</div>
        }
        footer={
          <div className={styles['congratulation-footer']}>
            <Button disabled={isDisable} onClick={handleSubmit}>
              Claim
            </Button>
          </div>
        }
      >
        <div className={styles.congratulations}>
          <img width="280px" src={gold} alt="" />
          {/* <div>
          Congratulations, number of tokens obtained:{' '}
          {getDisplayBalance2ETH(window.localStorage.getItem('reward-amount'))}
        </div> */}
          <div
            onClick={() => setShowDetail(true)}
            className={styles['view-detail-btn']}
          >
            View event details &gt;&gt;
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TreasureBox;

const DialogItem = ({ title, val1 = '', val2, err }) => {
  return (
    <div className={styles['dialog-item']}>
      <div>{title}</div>
      <div>
        <span className={err || +val1 >= +val2 ? styles.err : styles.suc}>
          {val1}
        </span>
        {val1 !== '' && val2 && <span> / </span>}
        <span>{val2}</span>
      </div>
    </div>
  );
};

export const Finish = ({ open, onCancel }) => (
  <Dialog title="Success" open={open} footer="" onCancel={onCancel}>
    <div className={styles.success}>
      <img src={successIcon} alt="" />
      <div>
        <span>Claimed successfully!</span>
      </div>
    </div>
  </Dialog>
);
