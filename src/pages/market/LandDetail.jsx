import { Flex } from '@/components/Basic';

import noData from '@/assets/img/noData.png';

import { useMemo, useCallback } from 'react';

import useApi from '@/hooks/useApi';

import Detail, {
  Info,
  Address,
  ColorfulText1,
  ColorfulText2,
  HistoryList
} from '@/components/Detail/index';

import { PlayerOneParcelAddress, redirect_url } from '@/constant/env/index';

import { useTranslation } from 'react-i18next';

import { useElementGoodDetail } from '@/api/elementApi/graphqlHooks';

import { jsonData } from '@/api/map';

import styles from './LandDetail.module.css';

import area from '@/assets/icon/area.png';
import located from '@/assets/icon/located.png';
import union from '@/assets/icon/union.png';
// import BNBIcon from '@/assets/icon/usdt-icon.png';
import ethIcon from '@/assets/icon/eth-icon.svg';

export default function LandDetail({ id }) {
  const { data, loading } = useElementGoodDetail('parcel', id);

  const { data: imgData } = useApi(jsonData);

  const { t } = useTranslation();

  const { name, stats, properties, price, owner } = useMemo(() => {
    if (!data) {
      return {};
    }

    const price = data?.tradeSummary?.bestAsk?.bestAskPrice?.toFixed(2);

    const type = data?.properties?.[0]?.value;

    const rarity = data?.properties?.[1]?.value;

    const owner = data?.assetOwners?.edges[0]?.node?.owner;

    return { ...data, price, type, rarity, owner };
  }, [data]);

  const imgUrl = useMemo(() => imgData?.[id]?.image, [imgData, id]);

  const msg = useMemo(
    () =>
      loading ? (
        ''
      ) : price ? (
        <Flex ai="center" gap="6px">
          <img
            src={ethIcon}
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

  const handleOnAction = useCallback(() => {
    if (!data) {
      return;
    }
    window.open(`${redirect_url}/${PlayerOneParcelAddress}/${id}`);
  }, [data, id]);

  return (
    <Detail
      pageTitle="Market"
      title={name || '-'}
      img={imgUrl}
      detailTitle={t('detail.land_info')}
      msg={msg}
      action={loading ? '-' : price ? t('detail.buy') : t('detail.makeOffer')}
      onAction={handleOnAction}
      tableTitle={t('detail.history')}
      details={
        <Details
          t={t}
          stats={stats}
          name={name}
          properties={properties}
          owner={owner}
        />
      }
      table={<HistoryList slug="parcel" id={id} />}
    />
  );
}

const Details = ({ address, t, name, stats, properties, rarity, owner }) => (
  <>
    <div className={styles['info-list']}>
      <Info title={t('detail.coor')}>
        <div className={styles['detail-item']}>
          <img src={located} alt="" />
          <ColorfulText2>{name?.split(' ')[1] || '-'}</ColorfulText2>
        </div>
      </Info>

      <Info title={t('detail.area')}>
        <div className={styles['detail-item']}>
          <img src={area} alt="" />
          <ColorfulText1>{properties?.[0]?.value || '-'}</ColorfulText1>
        </div>
      </Info>

      <Info title={t('detail.weight')}>
        <div className={styles['detail-item']}>
          <img src={union} alt="" />
          <ColorfulText1>
            {stats ? `${stats?.[1]?.value} × ${stats?.[2]?.value}` : '-'}
          </ColorfulText1>
        </div>
      </Info>
    </div>

    <Info title={t('detail.owner')}>
      <Address href={owner}>{owner}</Address>
    </Info>
  </>
);

export const NoData = () => (
  <Flex fd="column" ai="center" jc="center" p="60px 0">
    <img style={{ width: '210px' }} src={noData} alt="" />
    <span
      style={{
        fontSize: '16px',
        lineHeight: '22px',
        color: 'rgba(108, 167, 209, 0.651)'
      }}
    >
      No Data
    </span>
    <span
      style={{
        fontSize: '12px',
        marginTop: '4px',
        color: 'rgba(108, 167, 209, 0.451)'
      }}
    >
      No transaction data for this production
    </span>
  </Flex>
);
