import React, { useMemo, useCallback, useState } from 'react';

import { Container, Flex } from '@/components/Basic';

import useCountdown from '@/hooks/useCountdown';

import BorderedBtn from '@/components/BorderedBtn2/index';

import useApi from '@/hooks/useApi';

import Dialog from '@/ui/dialog/index';

import { ReceiveDailyAward } from '@/api/user';

import LightBox from 'src/assets/img/box/light-box.png';
import DarkBox from 'src/assets/img/box/dark-box.png';

import scoreIcon from '@/assets/icon/score-icon.png';
import blindBoxIcon from '@/assets/icon/blind-icon.png';
import styles from './AirdropScore.module.css';

import closeIcon from '@/assets/icon/closeIcon.png';
import finishIcon from '@/assets/icon/finish.png';
import { message } from 'antd';

export default function AirdropScore({ scoreObj, refresh, account, token }) {
  const { run } = useApi(ReceiveDailyAward, {
    manual: true,
    onSuccess: () => {
      setSuccessDialog(true);
      refresh();
    },
    onError: () => {
      message.error('Failed to receive, please try again');
    }
  });

  const [successdialog, setSuccessDialog] = useState(false);

  const handleClick = useCallback(() => {
    const params = {
      login_token: token,
      address: account
    };
    run(params);
  }, [account, run, token]);

  const handleClose = useCallback(() => {
    setSuccessDialog(false);
  }, []);

  const Left = ({ totalScore, score }) => (
    <Flex fd="column" gap="26px" className={styles['left-area']}>
      <Flex fd="column" gap="16px">
        <Flex ai="center" gap="8px">
          <img src={scoreIcon} alt="" className={styles['img-icon']} />
          <span className={styles['title']}>Your Score</span>
        </Flex>
        <div className={styles['content']}>
          Score unlocks rewards and increases your chances of getting a Mystery
          box on your next airdrop
        </div>
      </Flex>

      <Flex fd="column" gap="16px">
        <div className={styles['sub-area']}>
          <Flex fd="column" gap="8px">
            <div className={styles['sub-subtitle']}>Total historical score</div>
            <div className={styles['sub-sorce']}>{totalScore ?? 0} </div>
          </Flex>

          <div className={styles['line']}></div>

          <Flex fd="column" gap="8px">
            <div className={styles['sub-subtitle']}>Current score</div>
            <div className={styles['sub-sorce']}> {score ?? 0} </div>
          </Flex>
        </div>
      </Flex>
    </Flex>
  );

  const Right = ({ countdown, airdrop_reward_num }) => {
    const count = useCountdown(countdown);

    const [a, b, c, d, e, f] = useMemo(() => {
      if (count === '-') {
        return [0, 0, 0, 0, 0, 0];
      }
      if (!count.includes(' ')) {
        let string = count.split(':').join('').split('');
        return string;
      }
      return [0, 0, 0, 0, 0, 0];
    }, [count]);

    return (
      <Flex className={styles['right-area']} gap="24px" ai="center">
        <Flex gap="40px" fd="column">
          <Flex fd="column" gap="16px">
            <Flex ai="center" gap="8px">
              <img src={blindBoxIcon} alt="" className={styles['img-icon']} />
              <span className={styles['title']}>The Next Blind Box</span>
            </Flex>
            <div className={styles['content']}>
              The Mystery Box contains valuable in-game items that can be played
              or freely traded on the open market
            </div>
          </Flex>

          <Flex fd="column" gap="16px">
            <Flex gap="0 8px" ai="center" className={styles['time-area']}>
              <div className={styles['time-box']}>{a}</div>
              <div className={styles['time-box']}>{b}</div>
              <span className={styles['time-text']}>:</span>
              <div className={styles['time-box']}>{c}</div>
              <div className={styles['time-box']}>{d}</div>
              <span className={styles['time-text']}>:</span>
              <div className={styles['time-box']}>{e}</div>
              <div className={styles['time-box']}>{f}</div>
            </Flex>
          </Flex>
        </Flex>

        <Flex ai="center" gap="24px" fd="column">
          <div className={styles['box-container']}>
            <img src={DarkBox} alt="" className={styles['box-img']} />
            <img src={LightBox} alt="" className={styles['box-img2']} />
          </div>

          {airdrop_reward_num > 0 ? (
            <BorderedBtn width="120px" height="24px" onClick={handleClick}>
              Receive
            </BorderedBtn>
          ) : (
            <BorderedBtn
              width="120px"
              height="24px"
              bgColor="#555d65"
              borderColor="#555d65"
              disabled>
              Receive
            </BorderedBtn>
          )}
        </Flex>
      </Flex>
    );
  };

  return (
    <Container
      w="100%"
      h="240px"
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <Flex ai="center" jc="center" gap="24px" shrink="0">
        <Left totalScore={scoreObj?.score_total} score={scoreObj?.score} />
        <Right
          countdown={scoreObj?.next_airdrop_at}
          airdrop_reward_num={scoreObj?.airdrop_reward_num}
        />
      </Flex>
      {successdialog && (
        <AwardDialog
          open={successdialog}
          onCancel={handleClose}
          onClick={handleClose}
        />
      )}
    </Container>
  );
}

const AwardDialog = ({ open, onCancel, onClick }) => {
  return (
    <Dialog open={open} footer="" header="">
      <Flex
        fd="column"
        ai="center"
        style={{
          position: 'relative',
          marginTop: 16
        }}>
        <div className={styles['task-dialog-close']} onClick={onCancel}>
          <img src={closeIcon} width="16px" alt="" />
        </div>
        <img src={finishIcon} alt="" width="42px" height="42px" />
        <div
          className={styles['task-dialog-content']}
          style={{ margin: '24px 10px 20px' }}>
          The blind box will be distributed to your address within 24h
        </div>
        <BorderedBtn onClick={onClick}>Confirm</BorderedBtn>
      </Flex>
    </Dialog>
  );
};
