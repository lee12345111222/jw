import React, { useState, Suspense, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import { message, Tabs } from 'antd';
import { isAllowed } from '@/api/user';
import useApi from '@/hooks/useApi';

import MainPage from '@/components/MainPage/index';
import { Tabbar } from '@/components/Tabbar';

import useLoginToken from '@/hooks/useLoginToken';

import { useDispatch } from 'react-redux';
import { setStatus } from '@/store/reducer/user';
import { useSelector } from 'react-redux';
// import { isTest } from '@/utils/common';

// const Space = React.lazy(() => import('./tabs/Space'));
const Land = React.lazy(() => import('./tabs/Land'));
const VoxelMan = React.lazy(() => import('./tabs/VoxelRole'));
const VoxelPart = React.lazy(() => import('./tabs/VoxelPart'));
// const Treasure = React.lazy(() => import('./tabs/Treasure'));
const Blueprint = React.lazy(() => import('./tabs/Blueprint'));
const Aircraft = React.lazy(() => import('./tabs/Aircraft'));

const { TabPane } = Tabs;

const tabList = [
  '',
  'parcel',
  'voxelrole',
  'voxelpart',
  'blueprint',
  'jetpack',
  'name'
];

export default function Assets() {
  const [activeKey, setActiveKey] = useState('-1');
  const { account } = useWallet();
  const [getToken] = useLoginToken();
  const { t } = useTranslation();
  const { tab } = useParams();

  const history = useHistory();
  const { run } = useApi(isAllowed, { manual: true });
  const dispatch = useDispatch();

  const userStatus = useSelector(({ user: { status } }) => status);

  const jump = useCallback(async () => {
    if (userStatus) {
      return setActiveKey('1');
    }
    const token = await getToken();

    if (!token) {
      return history.goBack();
    }
    const { code } = await run({ login_token: token });
    if (code !== 200) {
      message.info(
        'You are not eligible for internal testing, please contact the platform to apply'
      );
      return history.goBack();
    }

    dispatch(setStatus(true));
    setActiveKey('1');
  }, [dispatch, getToken, history, run, userStatus]);

  useEffect(() => {
    const i = tabList.findIndex((t) => t === tab);

    if (process.env.REACT_APP_ENV !== 'test') {
      if (i === 1) {
        if (!account) {
          return;
        }
        return jump();
      }
      if (i !== 2 && i !== 3 && i !== 4 && i !== 5) {
        message.info(t('app.message.coming'));
        return history.goBack();
      }
    }

    setActiveKey(i.toString());
  }, [account, history, jump, t, tab]);

  return (
    <MainPage title="My Assets">
      <Tabbar
        onTabClick={(index) => history.push(`/assets/${tabList[index]}`)}
        activeKey={activeKey}>
        {/* <TabPane tab={t('create.space')} key="1">
          <Suspense fallback={''}>
            <Space getToken={getToken} account={account} />
          </Suspense>
        </TabPane> */}

        <TabPane tab="Parcel" key="1">
          <Suspense fallback={''}>
            <Land getToken={getToken} account={account} />
          </Suspense>
        </TabPane>

        <TabPane tab={t('create.role')} key="2">
          <Suspense fallback={''}>
            <VoxelMan getToken={getToken} account={account} />
          </Suspense>
        </TabPane>
        <TabPane tab={t('create.part')} key="3">
          <Suspense fallback={''}>
            <VoxelPart account={account} />
          </Suspense>
        </TabPane>
        <TabPane tab="Blueprint" key="4">
          <Suspense fallback={''}>
            <Blueprint account={account} />
          </Suspense>
        </TabPane>
        <TabPane tab={'Jetpack'} key="5">
          <Suspense fallback={''}>
            <Aircraft account={account} getToken={getToken} />
          </Suspense>
        </TabPane>
        <TabPane tab={t('create.name')} key="6"></TabPane>
        {/* <TabPane tab="Treasure Chest" key="6">
          <Suspense fallback={''}>
            <Treasure account={account} />
          </Suspense>
        </TabPane> */}
      </Tabbar>
    </MainPage>
  );
}
