import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Progress, notification } from 'antd';

import { useWallet } from 'use-wallet';
import styled from 'styled-components';

import useLoginToken from '@/hooks/useLoginToken';

import MyUnity from './Unity';

import LoadingAnimation from './LoadingAnimation';

export default function Preview() {
  const wallet = useWallet();

  console.log('wallet >>>', wallet);

  const { account, status } = useWallet();

  const [getToken] = useLoginToken();
  const [user_token, setToken] = useState();

  useEffect(() => {
    if (status === 'error') {
      notification.error({
        duration: null,
        key: 'connect_err',
        message: 'Connect Wallet Error',
        description: 'You need to connect your wallet and try again'
      });
    } else if (status === 'connected') {
      notification.close('connect_err');
    } else {
      notification.info({
        duration: null,
        key: 'connect_err',
        message: 'Wallet Disconnected',
        description: 'You need to connect your wallet first'
      });
    }
  }, [status]);

  useEffect(() => {
    if (user_token || !account) return;
    const getToken = async () => {
      const token = await getToken();
      setToken(token);
    };

    getToken();
  }, [account, getToken, user_token]);

  return user_token ? (
    <MyUnity user_token={user_token} />
  ) : (
    <Loading duration={0} />
  );
}

const Pr = styled(Progress)`
  & .ant-progress-inner {
    background-color: #374350;
  }
`;

const Loading = ({ duration, loadingMsg }) => {
  const [dots, setDots] = useState('.');
  const { t } = useTranslation();

  useEffect(() => {
    if (dots === '...') {
      setTimeout(() => {
        setDots('');
      }, 500);
    } else {
      setTimeout(() => {
        setDots(dots + '.');
      }, 500);
    }
  }, [dots]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '70px'
      }}
    >
      <LoadingAnimation />
      <div>
        <Pr
          strokeColor="#00C9FF"
          percent={duration}
          showInfo={false}
          style={{ width: '25vw' }}
        />

        <p
          style={{
            padding: '16px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, .65)'
          }}
        >
          {loadingMsg || t('editor.loading')}
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              textAlign: 'left'
            }}
          >
            {dots}
          </span>
        </p>
      </div>
    </div>
  );
};
