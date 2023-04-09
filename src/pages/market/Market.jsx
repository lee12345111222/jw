import React, { useState, Suspense, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { message, Tabs } from 'antd';

import MainPage from '@/components/MainPage/index';
import { Tabbar } from '@/components/Tabbar';
import { isTest } from '@/utils/common';

const Land = React.lazy(() => import('./Land'));
const VoxelMan = React.lazy(() => import('./VoxelRole'));
const VoxelPart = React.lazy(() => import('./VoxelPart'));
const Blueprint = React.lazy(() => import('./Blueprint'));
const Aircraft = React.lazy(() => import('./Aircraft'));

const { TabPane } = Tabs;

const tabList = [
  '',
  'parcel',
  'voxelrole',
  'voxelpart',
  'blueprint',
  'jetpack',
  'name',
  'asset',
  'pet'
];

export default function Market() {
  const [activeKey, setActiveKey] = useState('-1');

  const { t } = useTranslation();

  const { tab } = useParams();
  const history = useHistory();

  useEffect(() => {
    const i = tabList.findIndex((t) => t === tab);

    // if (process.env.REACT_APP_ENV !== 'test' && i !== 1 && i !== 3) {
    //   message.info(t('app.message.coming'));
    //   return history.push('/market/voxelpart');
    // }

    if (isTest && i === 99) {
      setActiveKey(i.toString());
    } else if (i <= 5) {
      setActiveKey(i.toString());
    } else {
      message.info(t('app.message.not_open'));
      history.goBack();
    }
  }, [tab, history, t]);

  return (
    <MainPage title={t('market.title')}>
      <Tabbar
        onTabClick={(index) => history.push(`/market/${tabList[index]}`)}
        activeKey={activeKey}
      >
        <TabPane tab="Parcel" key="1">
          <Suspense fallback={''}>
            <Land />
          </Suspense>
        </TabPane>

        <TabPane tab={t('market.tab2')} key="2">
          <Suspense fallback={''}>
            <VoxelMan />
          </Suspense>
        </TabPane>

        <TabPane tab="VoxelPart" key="3">
          <Suspense fallback={''}>
            <VoxelPart />
          </Suspense>
        </TabPane>
        <TabPane tab="Blueprint" key="4">
          <Suspense fallback={''}>
            <Blueprint />
          </Suspense>
        </TabPane>
        <TabPane tab={'Jetpack'} key="5">
          <Suspense fallback={''}>
            <Aircraft />
          </Suspense>
        </TabPane>
        <TabPane tab={t('market.tab3')} key="6"></TabPane>
        <TabPane tab={t('market.tab4')} key="7"></TabPane>
        <TabPane tab={t('market.tab5')} key="8"></TabPane>
      </Tabbar>
    </MainPage>
  );
}
