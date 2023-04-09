import { useMemo, useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { mycharacterparts } from '@/api/nft';
import useApi from '@/hooks/useApi';

import { Flex } from '@/components/Basic';

import { Dropdown, Menu } from 'antd';

import { BasicCard } from '@/components/Cards/index';

import { Title } from '@/components/BasicComponents';

import { InfoBox2 } from '@/components/Cards/index';

import NftList from '@/components/CardList/NftList';

import { useTranslation } from 'react-i18next';

import {
  // redirect_url,
  // OPENSEA_URL,
  opensea,
  VoxelRolePartsAddress
} from '@/constant/env/index';

import showMore from '@/assets/icon/show-more.png';

import styles from './voxelRole.module.css';

const { Item } = Menu;

export default function VoxelPart({ account }) {
  const [count, setCount] = useState(0);
  const [selectedTag, setSelectedTag] = useState(1);

  const {
    data: { data: { part_list } } = { data: { part_list: [] } },
    run: getMyParts
  } = useApi(mycharacterparts, {
    manual: true
  });

  useEffect(() => {
    if (!account) {
      return;
    }
    getMyParts({ address: account });
  }, [account, getMyParts]);

  const handleCount = useCallback(
    (val) => {
      if (val === count) {
        return;
      }
      setCount(val);
    },
    [count]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <StatusBar
        count={count}
        selectedTag={selectedTag}
        onChange={(val) => setSelectedTag(val)}
      />
      <NftList
        // slug="roleParts"
        owner={account || false}
        ChildCard={PartItem}
        partList={part_list}
        onSuccess={({
          data: {
            search: { totalCount }
          }
        }) => {
          handleCount(totalCount);
        }}
      />
    </div>
  );
}

const StatusBar = ({ count }) => {
  return <Title title={count + ' results'}></Title>;
};

const PartItem = ({
  node: {
    asset: { name, properties, tokenId, tradeSummary }
  }
}) => {
  const price = useMemo(
    () => tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2),
    [tradeSummary]
  );

  const history = useHistory();
  const { t } = useTranslation();

  const menu = useMemo(
    () => (
      <Menu>
        <Item key="0">
          <div
            onClick={() => history.push(`/assets/voxelpart/detail/${tokenId}`)}
          >
            {t('statusbar.detail')}
          </div>
        </Item>
        {!price && (
          <Item key="1">
            <a
              target="_blank"
              href={`${opensea.polygon}/${VoxelRolePartsAddress}/${tokenId}`}
              rel="noreferrer"
            >
              {t('statusbar.sell')}
            </a>
          </Item>
        )}
      </Menu>
    ),
    [history, price, t, tokenId]
  );

  return (
    <BasicCard
      pointer={false}
      title={
        <div className={styles['card-title']}>
          <span>{name}</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <img src={showMore} alt="" />
          </Dropdown>
        </div>
      }
      img={`/voxel-parts/${tokenId}.png`}
    >
      <Flex ai="center" jc="space-between">
        <InfoBox2>{properties?.[0]?.value || '-'}</InfoBox2>
        <Flex ai="center" gap="4px">
          {price ? (
            <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>On sale</span>
          ) : (
            <span>Not on sale</span>
          )}
        </Flex>
      </Flex>
    </BasicCard>
  );
};
