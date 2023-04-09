import React, { useMemo, useCallback, useEffect } from 'react';

import { showShortAddress } from '@/utils/common';

import useApi from '@/hooks/useApi';
import { getDetail } from '@/api/opensea';
import { Blueprint as BlueprintAddress } from '@/constant/env';

import { getrecommandedblueprint } from '@/api/blueprint';

import { Child } from '@/pages/market/Blueprint';

import { useHistory } from 'react-router-dom';

import Detail, {
  Info,
  Address,
  ColorfulText1
} from '@/components/Detail/index';

import { InfoBox2 } from '@/components/Cards/index';

import styles from './blueprint.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function BlueprintDetail({ id }) {
  const { data, loading, run } = useApi(getDetail, { manual: true });

  useEffect(() => {
    run({ address: BlueprintAddress, tokenId: id });
  }, [id, run]);

  const {
    name,
    style,
    width,
    total,
    permalink,
    contractAddress,
    description,
    creator,
    img
  } = useMemo(() => {
    if (!data) {
      return [];
    }

    const {
      name,
      image_preview_url: img,
      traits,
      permalink,
      top_ownerships,
      asset_contract: { address: contractAddress },
      creator: { address: creator },
      description
    } = data;

    return {
      name,
      style: traits.find(({ trait_type }) => trait_type === 'style').value,
      width: traits.find(({ trait_type }) => trait_type === 'width').value,
      total: top_ownerships.reduce((a, { quantity }) => a + +quantity, 0),
      permalink,
      contractAddress,
      description,
      creator,
      img
    };
  }, [data]);

  const handleOnAction = useCallback(async () => {
    permalink && window.open(`${permalink}`);
  }, [permalink]);

  const actionText = useMemo(
    () => {
      return 'Make Offer';
      // if (loading) return 'Loading';
      // if (account && owner && account.toLowerCase() === owner.toLowerCase()) {
      //   return price ? 'Check' : 'Sell';
      // }
      // return price ? t('detail.buy') : t('detail.makeOffer');
    },
    [
      // account, loading, owner, price, t
    ]
  );

  return (
    <>
      <Detail
        pageTitle="Market"
        title={name || '-'}
        msg=""
        loading={loading}
        img={img}
        action={actionText}
        onAction={handleOnAction}
        detailTitle="Parcel Info"
        tableTitle="Series"
        details={
          <Details
            // t={t}
            name={name}
            creator={creator}
            total={total}
            style={style}
            width={width}
            description={description}
            contractAddress={contractAddress}
          />
        }
        table={<Recommand id={id} />}
      />
    </>
  );
}

const Details = ({
  creator,
  style,
  width = '-',
  total,
  contractAddress,
  description
}) => (
  <>
    <div>
      <Info title="Creator">
        <Address href={creator}>{showShortAddress(creator)}</Address>
      </Info>
    </div>

    <div className={styles['info-list']}>
      <Info title="Style">
        <InfoBox2>
          <span style={{ fontSize: '16px' }}>{style}</span>
        </InfoBox2>
      </Info>

      <Info title="Size">
        <div>
          {width} × {width} × {width}
        </div>
      </Info>

      <Info title="Quantity">
        <ColorfulText1>{total}</ColorfulText1>
      </Info>

      <Info title="Contract">
        <Address href={contractAddress}>{contractAddress}</Address>
      </Info>
    </div>

    <div>
      <Info title="Description">
        <Address>{description}</Address>
      </Info>
    </div>
  </>
);

const Recommand = ({ id }) => {
  const { data, run } = useApi(getrecommandedblueprint, { manual: true });

  useEffect(() => {
    run(id);
  }, [id, run]);

  const history = useHistory();

  const handleOpenDetail = useCallback(
    (id) => {
      history.replace(`/market/blueprint/detail/${id}`);
    },
    [history]
  );

  const recommands = data?.data?.temp_list?.map(
    ({ creator, name, image, style, token_id }) => (
      <div key={token_id} style={{ width: '340px' }}>
        <Child
          onOpenDetail={() => handleOpenDetail(token_id)}
          name={name}
          img={image}
          style={style}
        >
          {name}
        </Child>
      </div>
    )
  );

  return <div className={cx('recommands')}>{recommands}</div>;
};
