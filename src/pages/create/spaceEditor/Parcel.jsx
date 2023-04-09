import { useState, useCallback, useMemo, useEffect } from 'react';

import { StatusBar } from './index';

import { useWallet } from 'use-wallet';

import Loading from '@/components/CardList/components/Loading/index';
import Empty from '@/components/CardList/components/Empty/index';
import { NftList2 } from '@/components/CardList/NftList';

import { InfoBox1, InfoBox2 } from '@/components/Cards/index';
import Tooltip from '@/ui/tooltip/index';
import { Card, Image } from '@/custom-ui/index';
import Dialog from '@/ui/dialog/index';

import { UserInfo } from '@/pages/discover/DiscoverItem';

import useApi from '@/hooks/useApi';
import { blueprintbyparcel } from '@/api/blueprint';
import { myParcels } from '@/api/user';

import classes from './Parcel.module.css';
import classNames from 'classnames/bind';

import union from '@/assets/icon/union.png';
import area from '@/assets/icon/area_name.png';
import location from '@/assets/icon/location.png';
import edit from '@/assets/icon/edit.png';
import blueprintIcon from '@/assets/icon/blueprint-icon.svg';
import parcelTemp from '@/assets/img/create-temp.png';
import cooperation from '@/assets/icon/cooperation.png';

// import CooperationDialogImg from '@/pages/myAssets/tabs/cooperationDialog';

// import { isTest } from '@/utils/common';

// import { useHistory } from 'react-router-dom';

const cx = classNames.bind(classes);

export default function Parcel() {
  const { account } = useWallet();

  const { data, run, loading } = useApi(myParcels, { manual: true });

  const [selectedTokenId, setSelectedTokenId] = useState();
  const [showBlueprint, setShowBlueprint] = useState(false);

  useEffect(() => {
    if (!account) {
      return;
    }
    run(account);
  }, [account, run]);

  const handleShowBlueprint = useCallback((tokenId) => {
    setSelectedTokenId(tokenId);
    setShowBlueprint(true);
  }, []);

  const handleCloseBlueprintDialog = useCallback(() => {
    setSelectedTokenId();
    setShowBlueprint(false);
  }, []);

  return (
    <div className={cx('parcel')}>
      <StatusBar count={(data?.data?.parcels || []).length} />
      <div className={cx('list')}>
        {/* {!isTest && (
          <NftList2
            owner={account || false}
            ChildCard={ParcelCard}
            partList={data?.data?.parcels || []}
            onShowBlueprint={handleShowBlueprint}
            loading={loading}
          />
        )} */}
        {/* {isTest && ( */}
        <NftList2
          owner={account || false}
          ChildCard={ParcelCard}
          ChildCard2={ParcelCard2}
          partList={data?.data?.parcels || []}
          partList2={data?.data?.collaborations || []}
          onShowBlueprint={handleShowBlueprint}
          loading={loading}
        />
        {/* )} */}
      </div>
      <BlueprintDialog
        open={showBlueprint}
        tokenId={selectedTokenId}
        onClose={handleCloseBlueprintDialog}
      />
    </div>
  );
}

const BlueprintDialog = ({ open, tokenId, onClose }) => {
  const {
    data: { data: { blueprints } } = { data: { blueprints: [] } },
    run,
    loading
  } = useApi(blueprintbyparcel, {
    manual: true
  });

  useEffect(() => {
    if (tokenId) {
      run({ parcel_id: tokenId });
    }
  }, [run, tokenId]);

  const itemList = blueprints.map((blueprint) => (
    <div key={blueprint.token_id} className={cx('discover-item')}>
      <BlueprintCard {...blueprint} />
    </div>
  ));

  return (
    <Dialog
      onCancel={onClose}
      title={
        <div className={cx('blueprint-dialog-title')}>
          <span>Bound Blueprint</span>
        </div>
      }
      footer=""
      className={cx('blueprint-dialog')}
      open={open}>
      <div className={cx('blueprint-count')}>{blueprints.length} result</div>
      <div className={cx('blueprint-list')}>
        {loading ? (
          <div className={cx('loading')}>
            <Loading loading={loading} />
          </div>
        ) : (
          itemList
        )}
        {!loading && !blueprints.length && (
          <div className={cx('blueprint-empty')}>
            <Empty show />
          </div>
        )}
      </div>
    </Dialog>
  );
};

export const BlueprintCard = ({ name, image, style, creator }) => {
  return (
    <Card className={cx('blueprint-card')}>
      <Image ar="7 / 4" src={image} />
      <div className={cx('card-details')}>
        <div className={cx('blueprint-title')}>{name || '-'}</div>

        <div className={cx('blueprint-tags')}>
          <UserInfo owner={creator} />
          <InfoBox2>{style}</InfoBox2>
        </div>
      </div>
    </Card>
  );
};

const ParcelCard = ({ part, onShowBlueprint }) => {
  const { building_image, custom_name, width, name, suburb, token_id } =
    useMemo(() => {
      const { x1, x2, ...res } = part;
      const width = x2 - x1;
      return { ...res, width };
    }, [part]);

  const handleShowBlueprint = useCallback(() => {
    onShowBlueprint?.(token_id);
  }, [onShowBlueprint, token_id]);

  // const history = useHistory();

  const handleEdit = useCallback(() => {
    // window.open(`/editor/parcel/${token_id}`);
    window.open(`https://editor-test.beboldcap.com/p/${token_id}`);
    // history.push(`/editor/parcel/${token_id}`);
  }, [token_id]);

  return (
    <Card className={cx('card')}>
      <Image src={building_image || parcelTemp} />
      <div className={cx('card-details')}>
        <div className={cx('card-title')}>{custom_name || name}</div>
        <div className={cx('size')}>
          <img src={union} alt="" />
          <span>
            {width} ×{width} ×{width}
          </span>
        </div>

        <div className={cx('tags')}>
          <InfoBox1>
            <img src={location} alt="" />
            {name.split(' ')[1]}
          </InfoBox1>
          <InfoBox2>
            <img src={area} alt="" />
            <span style={{ whiteSpace: 'nowrap' }}>{suburb || '-'}</span>
          </InfoBox2>
        </div>

        <div className={cx('actions')}>
          <Tooltip title="Edit">
            <img onClick={handleEdit} src={edit} alt="" />
          </Tooltip>
          <Tooltip title="Blueprints">
            <img onClick={handleShowBlueprint} src={blueprintIcon} alt="" />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

const ParcelCard2 = ({ part, onShowBlueprint }) => {
  const { building_image, custom_name, width, name, suburb, token_id } =
    useMemo(() => {
      const { x1, x2, ...res } = part;
      const width = x2 - x1;
      return { ...res, width };
    }, [part]);

  const handleShowBlueprint = useCallback(() => {
    onShowBlueprint?.(token_id);
  }, [onShowBlueprint, token_id]);

  const handleEdit = useCallback(() => {
    window.open(`/editor/parcel/${token_id}`);
  }, [token_id]);

  return (
    <Card className={cx('card')}>
      <div style={{ position: 'relative' }}>
        <Image src={building_image || parcelTemp} />
        <div className={cx('basic-card-image')}>
          <img className={cx('basic-card-icon')} src={cooperation} alt="" />
        </div>
      </div>
      <div className={cx('card-details')}>
        <div className={cx('card-title')}>{custom_name || name}</div>
        <div className={cx('size')}>
          <img src={union} alt="" />
          <span>
            {width} ×{width} ×{width}
          </span>
        </div>

        <div className={cx('tags')}>
          <InfoBox1>
            <img src={location} alt="" />
            {name.split(' ')[1]}
          </InfoBox1>
          <InfoBox2>
            <img src={area} alt="" />
            <span style={{ whiteSpace: 'nowrap' }}>{suburb || '-'}</span>
          </InfoBox2>
        </div>

        <div className={cx('actions')}>
          <Tooltip title="Edit">
            <img onClick={handleEdit} src={edit} alt="" />
          </Tooltip>
          <Tooltip title="Blueprints">
            <img onClick={handleShowBlueprint} src={blueprintIcon} alt="" />
          </Tooltip>
          <Tooltip title="">
            <img src="" alt="" />
          </Tooltip>
          <Tooltip title="cooperation">
            <img src="" alt="" />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};
