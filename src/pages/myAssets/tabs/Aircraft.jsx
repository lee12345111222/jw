import { useMemo, useState, useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Dropdown, Menu, Modal } from 'antd';

import { Flex } from '@/components/Basic';

import { BasicCard } from '@/components/Cards/index';

import { Title } from '@/components/BasicComponents';

import useApi from '@/hooks/useApi';
import { ownedjetpacks, setmainjetpack } from '@/api/jetpack';

import { InfoBox2 } from '@/components/Cards/index';

import { NftList2 } from '@/components/CardList/NftList';

import showMore from '@/assets/icon/show-more.png';
import humanIcon from '@/assets/icon/human.png';
import checked from '@/assets/icon/checked.png';
import unChecked from '@/assets/icon/unChecked.png';

import styles from './voxelRole.module.css';

import Tooltip from '@/ui/tooltip/index';

const { Item } = Menu;
const { confirm } = Modal;

export default function Aircraft({ getToken, account }) {
  const [count, setCount] = useState(0);

  const { run, data, loading } = useApi(ownedjetpacks, { manual: true });

  useEffect(() => {
    setCount(data?.data?.jetpacks?.length || 0);
  }, [data]);

  useEffect(() => {
    if (account) {
      run({ address: account });
    }
  }, [account, run]);

  const { run: set } = useApi(setmainjetpack, {
    manual: true,
    onSuccess() {
      run({ address: account });
    }
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <StatusBar count={count} />
      <NftList2
        owner={account || false}
        ChildCard={PartItem}
        partList={data?.data?.jetpacks || []}
        loading={loading}
        getToken={getToken}
        account={account}
        set={set}
      />
    </div>
  );
}

const StatusBar = ({ count }) => {
  return <Title title={`${count} results`}></Title>;
};

const PartItem = ({ part, getToken, set, account }) => {
  const { image, is_main: isMain, name, token_id: tokenId } = part;

  const history = useHistory();

  const menu = useMemo(
    () => (
      <Menu>
        <Item key="0">
          <div
            onClick={() => history.push(`/assets/jetpack/detail/${tokenId}`)}
          >
            Detail
          </div>
        </Item>
      </Menu>
    ),
    [history, tokenId]
  );

  const setMainRole = useCallback(
    (status) => {
      confirm({
        title: status
          ? 'Are you sure to reset the main jetpack?'
          : 'Are you sure you want to set this jetpack as the main jetpack?',
        okText: 'Confirm',
        cancelText: 'Cancel',
        async onOk() {
          const token = await getToken();
          await set({
            login_token: token,
            token_id: tokenId,
            address: account
          });
          return 1;
        }
      });
    },
    [account, getToken, set, tokenId]
  );

  return (
    <BasicCard
      title={
        <div className={styles['card-title']}>
          <span>{name}</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <img src={showMore} alt="" />
          </Dropdown>
        </div>
      }
      pointer={false}
      img={image}
    >
      <Flex ai="center" jc="space-between">
        <InfoBox2>
          <img src={humanIcon} alt="" />
          Jetpack
        </InfoBox2>

        <Tooltip title={isMain ? 'Reset' : 'Set Main Role'}>
          <img
            onClick={() => setMainRole(isMain)}
            src={isMain ? checked : unChecked}
            style={{ cursor: 'pointer' }}
            alt=""
          />
        </Tooltip>
      </Flex>
    </BasicCard>
  );
};
