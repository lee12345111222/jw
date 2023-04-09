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

import { opensea } from '@/constant/env/index';

import { InfoBox2 } from '@/components/Cards/index';

import styles from './AircraftDetail.module.css';

import { useElementGoodDetail } from '@/api/elementApi/graphqlHooks';

import BNBIcon from '@/assets/icon/usdt-icon.png';

export default function AircraftDetail({ id }) {
  const { data, loading } = useElementGoodDetail('jetpack', id);

  const { account } = useWallet();

  const match = useRouteMatch('/market/:tab/detail/:id');

  const parentPage = useMemo(
    () => (match?.isExact ? 'market' : 'assets'),
    [match]
  );

  const {
    name,
    contractAddress,
    price,
    type,
    rarity,
    altitude,
    owner,
    poster
  } = useMemo(() => {
    if (!data) {
      return {};
    }
    const price = data?.tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2);
    // const type = data?.properties?.[0]?.value;
    const type = 'Jetpack';
    const rarity = data?.properties?.[0]?.value;
    const altitude = data?.stats?.[0]?.value || 0;
    const poster = data?.imagePreviewUrl;

    // const rarity = data?.properties?.[1]?.value;
    const owner = data?.assetOwners?.edges?.[0]?.node?.owner;

    return { ...data, price, type, rarity, altitude, owner, poster };
  }, [data]);

  const { t } = useTranslation();

  const handleOnAction = useCallback(async () => {
    data && window.open(`${opensea.ethereum}/${contractAddress}/${id}`);
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
        img={poster}
        action={actionText}
        onAction={handleOnAction}
        detailTitle="Jetpack info"
        tableTitle={t('detail.history')}
        details={
          <Details
            t={t}
            type={type}
            name={name}
            rarity={rarity}
            altitude={altitude}
            address={contractAddress}
          />
        }
        table={<HistoryList slug="jetpack" id={id} />}
      />
    </>
  );
}

const Details = ({
  type = '-',
  address = '-',
  t,
  name = '-',
  rarity = '-',
  altitude = '-'
}) => (
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

      <Info title="Rarity">
        <ColorfulText1>{rarity}</ColorfulText1>
      </Info>

      <Info title="Altitude">
        <ColorfulText1>{altitude}</ColorfulText1>
      </Info>

      <Info title={t('detail.address')}>
        <Address href={address}>{address}</Address>
      </Info>
    </div>
  </>
);
