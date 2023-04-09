import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import FirstBgImg from 'src/assets/img/box/first-bg-img.png';

import { useWallet } from 'use-wallet';

import useApi from '@/hooks/useApi';

import {
  getDiscordUserInfo,
  getTwitterUserInfo,
  postAuthDiscordBind,
  postAuthTwitterBind
} from '@/api/user';

import { BindDiscordDialog } from '../index/bindDiscordDialog';
import { message } from 'antd';

export default function BindPage() {
  const { type, address, status } = useParams();

  const { account } = useWallet();

  const [userInfo, setUserInfo] = useState();

  const [buttonStatus, setbuttonStatus] = useState(true);

  const [userInfoError, setUserInfoError] = useState(false);

  const [bindError, setBindError] = useState(false);

  const onClose = useCallback(() => {
    window.close();
  }, []);

  useEffect(() => {
    if (status === '1') {
      onClose();
    }
    return () => {
      localStorage.setItem('twitterBindStatus', false);
    };
  }, [onClose, status, type]);

  const { run: getInfo, loading } = useApi(
    (params) => {
      if (type === 'binddiscord')
        return getDiscordUserInfo({ code: address, ...params });
      if (type === 'bindtwitter')
        return getTwitterUserInfo({ code: address, ...params });
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code !== 200) {
          setUserInfoError(true);
        } else {
          setUserInfo(res.data);
        }
      },
      onError: () => {
        setUserInfoError(true);
      }
    }
  );

  const { run: bind, loading: bindLoading } = useApi(
    (params) => {
      if (type === 'binddiscord')
        return postAuthDiscordBind({ name: userInfo.username, ...params });
      if (type === 'bindtwitter')
        return postAuthTwitterBind({ username: userInfo.username, ...params });
    },
    {
      manual: true,
      onSuccess(res) {
        if (res.code === 200) {
          localStorage.setItem('twitterBindStatus', true);
          onClose();
        }
        if (res.code === 10026) {
          setBindError(true);
          return;
        }
      }
    }
  );

  useEffect(() => {
    if (!!address) {
      getInfo();
    }
  }, [address, getInfo]);

  useEffect(() => {
    if (account) {
      setbuttonStatus(false);
    }
  }, [account]);

  const onConfirm = useCallback(
    (params) => {
      bind(params);
    },
    [bind]
  );

  return (
    <Page>
      <BindDiscordDialog
        open={true}
        userInfo={userInfo}
        account={account}
        loading={loading || bindLoading}
        onClose={onClose}
        onConfirm={onConfirm}
        type={type}
        status={buttonStatus}
        userInfoError={userInfoError}
        bindError={bindError}
      />
    </Page>
  );
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(${FirstBgImg});
  background-repeat: no-repeat;
  background-size: cover;
  & img {
    width: 100%;
    height: 100%;
  }
`;
