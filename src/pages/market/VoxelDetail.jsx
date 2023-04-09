import { useMemo, useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { Flex } from '@/components/Basic';

import { useWallet } from 'use-wallet';

import Detail, {
  Info,
  Address,
  ColorfulText1,
  HistoryList
} from '@/components/Detail/index';

import {
  PlayerOneRoleAddress,
  // redirect_url,
  opensea,
  video_server
} from '@/constant/env/index';

import { useTranslation } from 'react-i18next';

import { useElementGoodDetail } from '@/api/elementApi/graphqlHooks';

import { InfoBox1 } from '@/components/Cards/index';

import styles from './LandDetail.module.css';

import BNBIcon from '@/assets/icon/usdt-icon.png';
import humanIcon from '@/assets/icon/human.png';

export default function VoxelDetail({ id }) {
  const { data, loading } = useElementGoodDetail('role', id);

  const { account } = useWallet();

  const { t } = useTranslation();

  const match = useRouteMatch('/market/:tab/detail/:id');

  const parentPage = useMemo(
    () => (match?.isExact ? 'market' : 'assets'),
    [match]
  );

  const { name, properties, price, owner } = useMemo(() => {
    if (!data) {
      return {};
    }

    const price = data?.tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2);
    const owner = data?.assetOwners?.edges[0]?.node?.owner;
    return { ...data, price, owner };
  }, [data]);

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

  const handleOnAction = useCallback(() => {
    if (!data) {
      return;
    }
    window.open(`${opensea.polygon}/${PlayerOneRoleAddress}/${id}`);
  }, [data, id]);

  return (
    <Detail
      loading={loading}
      pageTitle={parentPage}
      title={name || '-'}
      poster={`${video_server}/images/${id}.png`}
      video={`${video_server}/videos/${id}.mp4`}
      detailTitle={t('voxelDetail.title')}
      msg={msg}
      action={actionText}
      onAction={handleOnAction}
      tableTitle={t('detail.history')}
      details={
        <Details t={t} name={name} properties={properties} owner={owner} />
      }
      table={<HistoryList slug="role" id={id} />}
    />
  );
}

const Details = ({ t, name, properties, owner }) => {
  const partList = useMemo(
    () =>
      properties?.map(({ key, value }) =>
        key === 'body' ? (
          ''
        ) : (
          <Info title={key} key={key}>
            <div className={styles['detail-item']}>
              <ColorfulText1>{value || '-'}</ColorfulText1>
            </div>
          </Info>
        )
      ),
    [properties]
  );
  return (
    <>
      <Info title={t('voxelDetail.type')}>
        <InfoBox1>
          <div className={styles['detail-item']}>
            <img src={humanIcon} alt="" />
            <span style={{ fontSize: '16px' }}>
              {properties?.find(({ key }) => key === 'body')?.value || '-'}
            </span>
          </div>
        </InfoBox1>
      </Info>
      <div className={styles['part-list']}>{partList}</div>

      <Info title={t('detail.owner')}>
        <Address href={owner}>{owner}</Address>
      </Info>
    </>
  );
};
