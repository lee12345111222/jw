import { useState, useCallback, useEffect, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import { BasicCard } from '@/components/Cards/index';

import { Title } from '@/components/BasicComponents';

import CardList from '@/components/CardList/index';

import Tooltip from '@/ui/tooltip/index';

import { getAssets } from '@/api/opensea';
import useApi from '@/hooks/useApi';

import { Blueprint as BlueprintAddress } from '@/constant/env';

import detailIcon from './../assets/detail-icon.svg';
import editIcon from './../assets/edit-icon.svg';
import resetIcon from './../assets/reset-icon.svg';
import takeoffIcon from './../assets/takeoff-icon.svg';

import styles from './blueprint.module.css';

export default function Blueprint({ account }) {
  const {
    data = { next: null, assets: [] },
    run,
    loading
  } = useApi(getAssets, {
    manual: true
  });

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (!account) {
      return;
    }

    run({
      owner: account,
      address: BlueprintAddress
    });
  }, [account, run]);

  const handlegetNextPage = useCallback(() => {
    if (!account || !data.next) {
      return;
    }

    run({
      owner: account,
      cursor: data.next,
      address: BlueprintAddress
    });
  }, [account, data.next, run]);

  useEffect(() => {
    if (!data?.assets) {
      return;
    }
    setAssets((assets) => [...assets, ...data?.assets]);
  }, [data]);

  const ChildList = useMemo(
    () =>
      assets.map(({ token_id, name, image_preview_url, traits }) => (
        <PartItem
          tokenId={token_id}
          imagePreviewUrl={image_preview_url}
          name={name}
          key={token_id}
          traits={traits}
        />
      )),
    [assets]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <StatusBar count={assets.length} />

      <CardList onScrollToBottom={handlegetNextPage} loading={loading}>
        {ChildList}
      </CardList>
    </div>
  );
}

const StatusBar = ({ count }) => {
  return <Title title={count + ' results'}></Title>;
};

const PartItem = ({ imagePreviewUrl, name, traits, tokenId }) => {
  const history = useHistory();

  const [width, depth, height] = useMemo(
    () => [
      traits.find(({ trait_type }) => trait_type === 'width').value,
      traits.find(({ trait_type }) => trait_type === 'depth').value,
      traits.find(({ trait_type }) => trait_type === 'height').value
    ],
    [traits]
  );

  const stopClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleOpenDetail = useCallback(() => {
    history.push(`/market/blueprint/detail/${tokenId}`);
  }, [history, tokenId]);

  return (
    <BasicCard
      img={imagePreviewUrl}
      title={<span className={styles['card-title']}>{name}</span>}
      pointer={false}
    >
      <div className={styles['space-size']}>
        <img src={''} alt="" />
        <span>
          {width || 0} × {depth || 0} × {height || 0}
        </span>

        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        ></div>
      </div>
      <div onClick={stopClick} className={styles['action-list']}>
        <div onClick={handleOpenDetail}>
          <Tooltip title="Detail">
            <img src={detailIcon} alt="" />
          </Tooltip>
        </div>
        <Tooltip title="Edit">
          <img src={editIcon} alt="" />
        </Tooltip>
        <Tooltip title="Reset Price">
          <img src={resetIcon} alt="" />
        </Tooltip>
        <Tooltip title="Take Down">
          <img src={takeoffIcon} alt="" />
        </Tooltip>
      </div>
    </BasicCard>
  );
};
