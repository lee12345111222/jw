import React, { useMemo, useCallback, useEffect, useState } from 'react';

import { showShortAddress } from '@/utils/common';

import useApi from '@/hooks/useApi';
import { getDetail } from '@/api/opensea';
import { Blueprint as BlueprintAddress } from '@/constant/env';

import { getrecommandedblueprint } from '@/api/blueprint';

import { Child } from '@/pages/market/Blueprint';

import { useHistory, useRouteMatch } from 'react-router-dom';

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

  const match = useRouteMatch('/market/:tab/detail/:id');

  const parentPage = useMemo(
    () => (match?.isExact ? 'market' : 'assets'),
    [match]
  );

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
    metadataUrl
  } = useMemo(() => {
    if (!data || data?.success !== true) {
      return [];
    }

    const {
      name,
      traits,
      permalink,
      top_ownerships,
      asset_contract: { address: contractAddress },
      creator: { address: creator },
      description,
      token_metadata: metadataUrl
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
      metadataUrl
    };
  }, [data]);

  const [{ image, animation_url }, setMetaData] = useState({});

  useEffect(() => {
    if (!metadataUrl) {
      return;
    }
    fetch(metadataUrl)
      .then((response) => response.json())
      .then((res) => setMetaData(res));
  }, [metadataUrl]);

  const handleOnAction = useCallback(async () => {
    permalink && window.open(`${permalink}`);
  }, [permalink]);

  const actionText = useMemo(() => {
    return 'Make Offer';
  }, []);

  return (
    <>
      <Detail
        pageTitle={parentPage}
        title={name || '-'}
        msg=""
        loading={loading}
        poster={image}
        video={animation_url || '-'}
        videoWidth="500px"
        action={actionText}
        onAction={handleOnAction}
        detailTitle="Blueprint Info"
        tableTitle="Series"
        details={
          <Details
            name={name}
            creator={creator}
            total={total}
            style={style}
            width={width}
            description={description}
            contractAddress={contractAddress}
          />
        }
        table={<Recommand id={id} parentPage={parentPage} />}
      />
    </>
  );
}

const Details = ({
  creator,
  style,
  width,
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
        <div>{width ? `${width} × ${width} × ${width}` : '-'}</div>
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

const Recommand = ({ id, parentPage }) => {
  const { data, run } = useApi(getrecommandedblueprint, { manual: true });

  useEffect(() => {
    run(id);
  }, [id, run]);

  const history = useHistory();

  const handleOpenDetail = useCallback(
    (id) => {
      history.replace(`/${parentPage}/blueprint/detail/${id}`);
    },
    [history, parentPage]
  );

  const recommands = data?.data?.temp_list?.map(
    ({ creator, name, image, style, token_id }) => (
      <div key={token_id} style={{ width: '340px', flexShrink: 0 }}>
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
