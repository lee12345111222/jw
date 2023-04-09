import React, { useMemo, useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/Basic';

import { useWallet } from 'use-wallet';

import Detail, {
  Info,
  Address,
  ColorfulText1,
  HistoryList
} from '@/components/Detail/index';

import {
  // redirect_url,
  // OPENSEA_URL
  opensea
} from '@/constant/env/index';

import { InfoBox2 } from '@/components/Cards/index';

import styles from './VoxelPart.module.css';

import { useElementGoodDetail } from '@/api/elementApi/graphqlHooks';

import BNBIcon from '@/assets/icon/usdt-icon.png';

export default function VoxelPart({ id }) {
  const { data, loading } = useElementGoodDetail('rolePart', id);

  const { account } = useWallet();

  const match = useRouteMatch('/market/:tab/detail/:id');

  const parentPage = useMemo(
    () => (match?.isExact ? 'market' : 'assets'),
    [match]
  );

  const { name, contractAddress, price, type, rarity, owner } = useMemo(() => {
    if (!data) {
      return {};
    }
    const price = data?.tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2);
    const type = data?.properties?.[0]?.value;
    const rarity = data?.properties?.[1]?.value;
    const owner = data?.assetOwners?.edges?.[0]?.node?.owner;

    return { ...data, price, type, rarity, owner };
  }, [data]);

  const { t } = useTranslation();

  const handleOnAction = useCallback(async () => {
    data && window.open(`${opensea.polygon}/${contractAddress}/${id}`);
  }, [contractAddress, data, id]);

  const msg = useMemo(
    () =>
      loading ? (
        ''
      ) : price ? (
        <Flex ai="center" gap="6px">
          <img
            src={BNBIcon}
            style={{
              width: '22px'
            }}
            width="9"
            alt=""
          />
          <span style={{ fontSize: '24px' }}>{price}</span>
        </Flex>
      ) : (
        'Not on sale'
      ),
    [loading, price]
  );

  const actionText = useMemo(() => {
    if (loading) return 'Loading';
    if (account && owner && account.toLowerCase() === owner.toLowerCase()) {
      return price ? 'Check' : 'Sell';
    }
    return price ? t('detail.buy') : t('detail.makeOffer');
  }, [account, loading, owner, price, t]);

  return (
    <>
      <Detail
        pageTitle={parentPage}
        title={name || '-'}
        msg={msg}
        loading={loading}
        img={`/voxel-parts/${id}.png`}
        action={actionText}
        onAction={handleOnAction}
        detailTitle={t('detail.voxelpart_info')}
        tableTitle={t('detail.history')}
        details={
          <Details
            t={t}
            type={type}
            name={name}
            rarity={rarity}
            address={contractAddress}
          />
        }
        table={<HistoryList slug="rolePart" id={id} />}
      />
    </>
  );
}

const Details = ({ type, address, t, name, rarity }) => (
  <>
    <div>
      <Info title={t('detail.type')}>
        <InfoBox2>
          <span style={{ fontSize: '16px' }}>{type || '-'}</span>
        </InfoBox2>
      </Info>
    </div>

    <div className={styles['info-list']}>
      <Info title={t('detail.name')}>
        <ColorfulText1>{name || '-'}</ColorfulText1>
      </Info>

      <Info title="rarity">
        <ColorfulText1>{rarity}</ColorfulText1>
      </Info>

      <Info title={t('detail.address')}>
        <Address href={address}>{address}</Address>
      </Info>
    </div>
  </>
);
