import { useMemo, useCallback } from 'react';

import MainPage from '@/components/MainPage/index';
import { Tabbar } from '@/components/Tabbar';

import { Tabs } from 'antd';

import Account from './Account';
import Share from './Share';

import { useWallet } from 'use-wallet';

import { getDisplayBalance2ETH } from '@/utils/common';

import useLoginToken from '@/hooks/useLoginToken';

const { TabPane } = Tabs;

export default function Profile() {
  const { account, balance } = useWallet();

  const [getToken] = useLoginToken();
  const getLoginToken = useCallback(() => {
    if (!account) {
      return;
    }
    const token = getToken();
    return token;
  }, [account, getToken]);

  const displayBalance = useMemo(
    () => getDisplayBalance2ETH(balance, true),
    [balance]
  );

  return (
    <MainPage title="Profile">
      <Tabbar>
        <TabPane tab="Account" key="1">
          <Account account={account} balance={displayBalance} />
        </TabPane>

        {/* <TabPane tab="角色" key="2"></TabPane> */}

        <TabPane tab="Share" key="3">
          <Share account={account} getToken={getLoginToken} />
        </TabPane>
      </Tabbar>
    </MainPage>
  );
}
