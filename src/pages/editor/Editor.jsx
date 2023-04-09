import { useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';

import useLoginToken from '@/hooks/useLoginToken';

import styled from 'styled-components';

import LoadingAnimation from './LoadingAnimation';

import { useTranslation } from 'react-i18next';

import { Progress, notification } from 'antd';

import MyUnity from './Unity';

import Help from './Help';

export default function Editor() {
  const { account, status } = useWallet();

  const [progression, setProgression] = useState(0);

  const [loadingMsg, setLoadingMsg] = useState('');

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
    const getMyToken = async () => {
      const token = await getToken();
      console.log('token >>>', token);
      setToken(token);
    };

    getMyToken();
  }, [account, getToken, user_token]);

  useEffect(() => {
    window.ongamenotify = function (type, msg) {
      if (type === 'download_building') {
        setLoadingMsg('downloading building data');
      }
      if (type === 'building_done') {
        setProgression(1.1);
      }
    };
  }, []);

  const [showHelp, setShowHelp] = useState(true);

  // useEffect(() => {
  //   window.showHelp = () => setShowHelp(true);

  //   return () => {
  //     delete window.showHelp;
  //   };
  // }, []);

  return (
    <>
      {progression - 0.1 < 1 ? (
        <Loading duration={(progression - 0.1) * 100} msg={loadingMsg} />
      ) : (
        showHelp && (
          <Help
            onClick={() => {
              setShowHelp(false);
            }}
          />
        )
      )}

      {user_token ? (
        <MyUnity
          onHelp={setShowHelp}
          user_token={user_token}
          onProgress={(val) => setProgression(val)}
        />
      ) : (
        ''
      )}
    </>
  );
}

const Pr = styled(Progress)`
  & .ant-progress-inner {
    background-color: #374350;
  }
`;

const Loading = ({ duration, msg }) => {
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
          {msg || t('editor.loading')}
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
