import { useMemo, useState, useCallback, useRef, useEffect } from 'react';

import { Modal, Input, message } from 'antd';
import styled from 'styled-components';
import { Title } from '@/components/BasicComponents';
import drag from '@/assets/icon/drag.png';

import BorderedBtn from '@/components/BorderedBtn2/index';

import { Flex } from '@/components/Basic';

import { BasicCard } from '@/components/Cards/index';

import { InfoBox1, InfoBox2 } from '@/components/Cards/index';

import airdropBg from '@/assets/img/airdrop-bg.png';
import wenhao from '@/assets/img/wenhao.png';
import rewardImg from '@/assets/img/reward.gif';
import rewardImg2 from '@/assets/img/reward2.gif';
import rewardImg3 from '@/assets/img/reward3.gif';

import { showShortAddress, fillAddress, isTest } from '@/utils/common';

import union from '@/assets/icon/union.png';
import area from '@/assets/icon/area_name.png';
import location from '@/assets/icon/location.png';
import cooperation from '@/assets/icon/cooperation.png';
import cooperationIcon from '@/assets/icon/cooperation-icon.png';
import successIcon from '@/assets/icon/finish.png';

import { ArrowDownIcon, CheckMarkIcon } from '@/components/BorderedBtn2/index';

import Empty from '@/components/CardList/components/Empty/index';

import Loading from '@/components/CardList/components/Loading/index';

import temp from '@/assets/img/author.png';

import { Dropdown } from '@/custom-ui/dropdown/index';

import edit from '@/assets/icon/edit.png';

import sellIcon from '@/assets/icon/bitcoin.png';
import settleIcon from '@/assets/icon/settle-icon.svg';

import { NftList2 } from '@/components/CardList/NftList';

import { useTranslation } from 'react-i18next';

import { upFile } from '@/api/file';
import {
  getSettleStatus,
  setSettleStatus,
  claimSettleReward
} from '@/api/parcel';

import usePersonalSign from '@/hooks/usePersonalSign';
import {
  setLandInfo,
  myParcels,
  addCollaborator,
  removeCollaborator,
  getMyCollaborator
} from '@/api/user';

import useApi from '@/hooks/useApi';

import Tooltip from '@/ui/tooltip/index';

import { redirect_url, PlayerOneParcelAddress } from '@/constant/env/index';

import Dialog from '@/ui/dialog/index';
import { Button } from '@/custom-ui/index';

import { Swiper } from '@/pages/airdrop/index';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import styles from './land.module.css';
import classNames from 'classnames/bind';
import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';
// import useHistory from '@/hooks/useHistory';
import { useHistory } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Land() {
  // { account, getToken }
  const { account } = useWallet();
  const [getToken] = useLoginToken();
  const [showCooperations, setShowCooperations] = useState(false);

  const { data, run } = useApi(myParcels, { manual: true });

  const [collaborators, setCollaborator] = useState();

  useEffect(() => {
    if (!account) {
      return;
    }
    run(account);
  }, [account, run]);

  const [selectedTokenId, setSelectedTokenId] = useState();

  const selectedLand = useMemo(
    () =>
      data
        ? [...data.data.parcels, ...(data.data?.collaborations || [])].find(
            ({ token_id }) => token_id === selectedTokenId
          )
        : undefined,
    [data, selectedTokenId]
  );

  const width = useMemo(
    () => (selectedLand ? selectedLand.x2 - selectedLand.x1 : 0),
    [selectedLand]
  );

  const { run: setLand, loading: loading2 } = useApi(setLandInfo, {
    manual: true,
    onSuccess: async ({ code }) => {
      if (code === 200) {
        message.success('Success');
        setSelectedTokenId();
      } else {
        message.error('Save failed');
      }
    }
  });

  const { run: upload, loading } = useApi(upFile, {
    manual: true,
    onSuccess: async ({ code, data: { location = undefined } }) => {
      if (code === 200) {
        const token = await getToken();
        await setLand({
          custom_img: location,
          custom_name: nameInput.current.state.value,
          login_token: token,
          token_id: selectedTokenId,
          address: account
        });

        run(account);
      } else {
        message.error(t('app.message.upload_fail'));
      }
    }
  });

  const { run: addCooperator } = useApi(addCollaborator, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        getMyCooperatorCallback();
      }
    }
  });

  const addCooperatorCallback = useCallback(
    async ({ collaborator }) => {
      const token = await getToken();
      if (!token || !account) return;
      let params = {
        login_token: token,
        address: account,
        collaborator
      };
      addCooperator(params);
    },
    [getToken, addCooperator, account]
  );

  const { run: removeCooperator } = useApi(removeCollaborator, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        getMyCooperatorCallback();
      }
    }
  });

  const removeCooperatorCallback = useCallback(
    async ({ collaborator }) => {
      const token = await getToken();
      if (!token || !account) return;
      let params = {
        login_token: token,
        address: account,
        collaborator
      };
      removeCooperator(params);
    },
    [getToken, account, removeCooperator]
  );

  // const { run: getMyCooperator, loading: loadingCooperator } = useApi(
  //   getMyCollaborator,
  //   {
  //     manual: true,
  //     onSuccess: (res) => {
  //       if (res.code === 200) {
  //         const { collaborators } = res.data;
  //         setCollaborator(() => collaborators);
  //       }
  //       return;
  //     }
  //   }
  // );

  const getMyCooperator = useCallback(() => {}, []);
  const [loadingCooperator] = useState(false);

  const getMyCooperatorCallback = useCallback(async () => {
    if (!account) return;
    let params = {
      address: account
    };
    getMyCooperator(params);
  }, [getMyCooperator, account]);

  useEffect(() => {
    getMyCooperatorCallback();
  }, [getMyCooperatorCallback]);

  const { t } = useTranslation();
  const [uploadedImg, setUploadedImg] = useState(null);
  const [imgData, setImgData] = useState(null);

  const fileInput = useRef();
  const nameInput = useRef();
  const cropperRef = useRef();

  const [settleId, setSettleId] = useState();
  const [settleName, setSettleName] = useState('');

  useEffect(() => {
    if (!selectedTokenId) {
      setUploadedImg(null);
      setImgData(null);
    }
  }, [selectedLand, selectedTokenId]);

  const unloadImage = useCallback(async () => {
    if (!uploadedImg && !selectedLand?.custom_img) {
      return message.info(t('app.message.image_needed'));
    }

    if (!nameInput.current.state.value) {
      return message.info(t('app.message.space_name_needed'));
    }

    if (
      !/^[0-9A-z_ ]*$/.test(nameInput.current.state.value) ||
      nameInput.current.state.value.length > 15
    ) {
      return message.info(t('Invalid Parcel Name'));
    }

    const token = await getToken();

    if (!uploadedImg && selectedLand?.custom_img) {
      await setLand({
        custom_img: selectedLand?.custom_img,
        custom_name: nameInput.current.state.value,
        login_token: token,
        token_id: selectedTokenId,
        address: account
      });

      run(account);
    } else {
      const imageElement = cropperRef?.current;
      const cropper = imageElement?.cropper;

      cropper
        .getCroppedCanvas({
          fillColor: '#fff',
          imageSmoothingQuality: 'high'
        })
        .toBlob((blob) => {
          const params = {
            upfile: blob,
            login_token: token,
            address: account,
            thumb_size: width * 6.4
          };
          // if (isTest) {
          //   params.thumb_size = width * 6.4;
          // }
          upload(params);
        }, 'image/jpeg');
    }
  }, [
    account,
    getToken,
    run,
    selectedLand?.custom_img,
    selectedTokenId,
    setLand,
    t,
    upload,
    uploadedImg,
    width
  ]);

  const dropFile = useCallback(
    (e) => {
      e.stopPropagation();
      const files = e.target?.files || e?.dataTransfer.files;
      const file = files[0];
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        return message.error(t('app.message.wrong_file_type'));
      }
      setUploadedImg(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => setImgData(e.target.result);
    },
    [t]
  );

  const Footer = useMemo(
    () => (
      <div
        style={{
          display: 'flex',
          gap: '16px',
          width: '100%'
        }}
      >
        <BorderedBtn
          loading={loading || loading2}
          onClick={unloadImage}
          width="170px"
          height="22px"
        >
          {t('create.confirm')}
        </BorderedBtn>
        <BorderedBtn
          width="170px"
          height="22px"
          bgColor="rgba(0,0,0,0)"
          borderWidth="1px"
          onClick={() => setSelectedTokenId()}
        >
          {t('create.cancel')}
        </BorderedBtn>
      </div>
    ),
    [loading, loading2, t, unloadImage]
  );

  const [settleWidth, setSettleWidth] = useState(0);
  const handleOnSettle = useCallback((id, name, width) => {
    setSettleWidth(width);
    setSettleId(id);
    setSettleName(name);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <StatusBar
        count={data?.data?.parcels?.length || 0}
        onClick={() => setShowCooperations(true)}
      />

      {isTest && (
        <NftList2
          owner={account || false}
          ChildCard={PartItem}
          ChildCard2={PartItem2}
          partList={data?.data?.parcels || []}
          partList2={data?.data?.collaborations || []}
          onEdit={setSelectedTokenId}
          onSettle={handleOnSettle}
        />
      )}

      {!isTest && (
        <NftList2
          owner={account || false}
          ChildCard={PartItem}
          partList={data?.data?.parcels || []}
          partList2={[]}
          onEdit={setSelectedTokenId}
          onSettle={handleOnSettle}
        />
      )}

      {!!selectedTokenId && (
        <StyledModal
          title={t('create.edit')}
          visible={!!selectedTokenId}
          width="392px"
          footer={Footer}
          maskClosable={false}
          // afterClose={resetUpload}
          onCancel={() => {
            setSelectedTokenId();
          }}
        >
          <div
            style={{
              width: '360px',
              height: !imgData ? '360px' : 'auto',
              border: '2px dashed #2C3742',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div>
              {!!imgData && (
                <Cropper
                  src={imgData}
                  viewMode={1}
                  dragMode="none"
                  initialAspectRatio={1 / 1}
                  aspectRatio={1}
                  zoomable={false}
                  guides={false}
                  ref={cropperRef}
                />
              )}
              {!imgData && !!selectedLand?.custom_img && (
                <img
                  style={{
                    width: '100%'
                  }}
                  src={selectedLand?.custom_img}
                  alt=""
                />
              )}
            </div>

            <div
              style={{
                display: imgData || selectedLand?.custom_img ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <img style={{ width: '70px' }} src={drag} alt="" />
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                {t('create.drag')}
              </span>
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255, .2)',
                lineHeight: '16px',
                display: imgData || selectedLand?.custom_img ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '16px'
              }}
            >
              <span>
                <span>{t('create.uploader_text1')}, </span>
                <span>{t('create.uploader_text2')} </span>
                <span style={{ color: '#177ddc' }}>
                  {t('create.uploader_text3')}
                  {width} × {width}
                </span>
              </span>

              <span>{t('create.uploader_text4')}</span>
            </div>
            {!imgData && (
              <input
                className={styles['file-input']}
                onChange={dropFile}
                onDrop={dropFile}
                ref={fileInput}
                type="file"
                accept="image/png, image/jpeg"
              />
            )}
          </div>
          <Input
            style={{
              marginTop: '16px',
              borderColor: '#2C3742',
              borderRadius: '4px'
            }}
            defaultValue={selectedLand?.custom_name}
            ref={nameInput}
            type="text"
            placeholder={t('create.input_place2')}
          />
        </StyledModal>
      )}

      {settleId && (
        <SettleDialog
          id={settleId}
          onClose={setSettleId}
          name={settleName}
          account={account}
          getToken={getToken}
          width={settleWidth}
        />
      )}

      {showCooperations && (
        <CooperationDialog
          open={showCooperations}
          onCancel={() => setShowCooperations(false)}
          addCooperator={addCooperatorCallback}
          removeCooperator={removeCooperatorCallback}
          getMyCooperator={getMyCooperatorCallback}
          collaborators={collaborators}
          loadingCooperator={loadingCooperator}
        />
      )}
    </div>
  );
}

const StatusBar = ({ count, onClick }) => {
  const { t } = useTranslation();

  return (
    <Title title={count + ' ' + t('statusbar.results')}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {isTest && (
          <Tooltip title="cooperation">
            <img
              src={cooperation}
              className={cx('cooperation-img')}
              alt=""
              onClick={onClick}
            />
          </Tooltip>
        )}
      </div>
    </Title>
  );
};

const PartItem = ({ part, onEdit, onSettle }) => {
  const {
    token_id: tokenId,
    name,
    custom_name,
    image,
    x1,
    x2,
    suburb
  } = useMemo(() => part, [part]);
  const width = useMemo(() => x2 - x1, [x1, x2]);

  const handleSell = useCallback(() => {
    window.open(`${redirect_url}/${PlayerOneParcelAddress}/${tokenId}`);
  }, [tokenId]);

  return (
    <BasicCard pointer={false} title={custom_name || name} img={image}>
      <Flex ai="center" jc="space-between">
        <Flex ai="center" gap="8px">
          <img height="16" src={union} alt="" />
          <span style={{ fontSize: '16px' }}>
            {width} × {width}
          </span>
        </Flex>
      </Flex>

      <Flex gap="16px">
        <InfoBox1>
          <img src={location} alt="" />
          {name.split(' ')[1]}
        </InfoBox1>
        <InfoBox2>
          <img src={area} alt="" />
          <span style={{ whiteSpace: 'nowrap' }}>{suburb || '-'}</span>
        </InfoBox2>
      </Flex>

      <div className={styles['action-list']}>
        <Tooltip title="Edit">
          <img src={edit} onClick={() => onEdit(tokenId)} alt="" />
        </Tooltip>
        <Tooltip title="Sell">
          <img onClick={handleSell} src={sellIcon} alt="" />
        </Tooltip>
        <Tooltip title="Settle Down">
          <img
            onClick={() => onSettle(tokenId, name, width)}
            src={settleIcon}
            alt=""
          />
        </Tooltip>
      </div>
    </BasicCard>
  );
};

const SettleDialog = ({ id, name, onClose, account, getToken, width }) => {
  const { data, run: getStatus } = useApi(() => getSettleStatus(id));

  const {
    status,
    total_sec,
    settle_rewards: rewardStatus
  } = useMemo(() => data?.data || { status: 2, total_sec: 0 }, [data]);

  const [showRewards, setShowRewards] = useState(false);

  const levels = useMemo(() => {
    const timeBasic = 20 * 24 * 60 * 60;
    return [
      {
        title: 'New Awaken',
        seconds: timeBasic * 0
      },
      {
        title: 'Genesis',
        seconds: timeBasic
      },
      {
        title: 'Exodus',
        seconds: 50 * 24 * 60 * 60
      },
      {
        title: 'LV 3',
        seconds: timeBasic * 3 ** 3
      },
      {
        title: 'LV 4',
        seconds: timeBasic * 4 ** 4
      },
      {
        title: 'LV 5',
        seconds: timeBasic * 5 ** 5
      },
      {
        title: 'LV 6',
        seconds: timeBasic * 6 ** 6
      },
      {
        title: 'LV 7',
        seconds: timeBasic * 7 ** 7
      }
    ];
  }, []);

  const [currentLevel, currentLevelSeconds, nextLevel, nextLevelSeconds] =
    useMemo(() => {
      const index = levels.findIndex(({ seconds }) => seconds > total_sec);

      return index !== -1
        ? [
            levels[index - 1].title,
            levels[index - 1].seconds,
            levels[index].title,
            levels[index].seconds
          ]
        : ['-', '-', 0];
    }, [levels, total_sec]);

  const days = useMemo(() => (total_sec / (60 * 60 * 24)) >> 0, [total_sec]);

  const { getPersonalSign } = usePersonalSign();

  const { run: settle } = useApi(setSettleStatus, { manual: true });

  const [loading, setLoading] = useState(false);

  const handleSettle = useCallback(async () => {
    setLoading(true);

    let sign;
    const signStr = `Click "Sign" to confirm ${
      status === 1 ? 'unsettle' : 'settle'
    } parcel.\nThis request will not trigger a blockchain transaction or cost any gas fees.\nTOKENID ${id}\n${name}\nADDRESS ${account}`;

    try {
      sign = await getPersonalSign(signStr);
    } catch (error) {
      if (error?.code !== 4001) {
        message.error('Sign Faild');
      }
      return setLoading(false);
    }

    const token = await getToken();
    const { code, msg } = await settle({
      sign,
      address: account,
      login_token: token,
      token_id: id,
      act: status === 1 ? 'unsettle' : 'settle'
    });

    if (code !== 200) {
      message.error(msg);
    } else {
      message.success(`${status === 1 ? 'Unsettle' : 'Settle'} success!`);
      getStatus();
    }
    setLoading(false);
  }, [account, getPersonalSign, getStatus, getToken, id, name, settle, status]);

  return (
    <Dialog
      className={cx('settle-dialog')}
      style={{ background: `url(${airdropBg})` }}
      open={!!id}
      onCancel={() => onClose()}
      title="SETTLE DOWN"
      footer=""
      animate={false}
    >
      <div className={cx('settle-dialog-container')}>
        <div style={{ width: '306px' }}>
          {data && currentLevel === 'New Awaken' && (
            <img width="306px" src={rewardImg} alt="" />
          )}
          {data && currentLevel === 'Genesis' && (
            <img width="306px" src={rewardImg3} alt="" />
          )}
        </div>
        <div>
          <div className={cx('settle-dialog-title')}>
            <span>{data ? nextLevel : '-'}</span>
          </div>
          <div>
            <img width="436px" src="/event_static/mBoxLine.png" alt="" />
          </div>
          <div className={cx('settle-desc-list')}>
            <div>
              <span>Settle Level:</span>
              <span>{data ? currentLevel : '-'}</span>
            </div>
            <div>
              <span>Until Next Level:</span>
              <span>{data ? nextLevel : '-'}</span>
            </div>
            <div>
              <span>Accumulative Time:</span>
              <span>
                <span>{days} Days </span>
              </span>
            </div>
            <div>
              <span>Current Progress:</span>
              <div>
                {data ? (
                  <span>
                    {((((total_sec - currentLevelSeconds) /
                      (nextLevelSeconds - currentLevelSeconds)) *
                      10000) >>
                      0) /
                      100}
                    %
                  </span>
                ) : (
                  '-'
                )}
                <progress
                  className={cx('progress')}
                  max={data ? nextLevelSeconds - currentLevelSeconds : 1}
                  value={data ? total_sec - currentLevelSeconds : 0}
                />
              </div>
            </div>

            {/* <LeftTime data={{ data: { now: 0 } }} /> */}
          </div>
          <div className={cx('settle-action-container')}>
            <Button
              onClick={() => setShowRewards(true)}
              disabled={!data}
              type=""
              width="198px"
            >
              <div className={cx('settle-action', 'blue-text')}>
                Claim Reward
              </div>
            </Button>
            {status === 1 && (
              <Button
                loading={loading}
                onClick={handleSettle}
                disabled={!data}
                danger
                type=""
                width="198px"
              >
                <div className={cx('settle-action')}>Unsettle Parcel</div>
              </Button>
            )}

            {(!status || status !== 1) && (
              <Button
                loading={loading}
                onClick={handleSettle}
                disabled={!data}
                width="198px"
              >
                <div className={cx('settle-action')}>Settle Parcel</div>
              </Button>
            )}
          </div>
        </div>
      </div>

      {showRewards && (
        <RewardDialog
          open={true}
          id={id}
          onCancel={() => setShowRewards(false)}
          onClaim={getStatus}
          status={rewardStatus}
          width={width}
        />
      )}
    </Dialog>
  );
};

const PartItem2 = ({ part, onEdit }) => {
  const {
    token_id: tokenId,
    name,
    custom_name,
    image,
    x1,
    x2,
    suburb
  } = useMemo(() => part, [part]);
  const width = useMemo(() => x2 - x1, [x1, x2]);

  const handleSell = useCallback(() => {
    window.open(`${redirect_url}/${PlayerOneParcelAddress}/${tokenId}`);
  }, [tokenId]);

  return (
    <BasicCard
      pointer={false}
      title={custom_name || name}
      img={image}
      imgIcon={
        <div className={cx('basic-card-image')}>
          <img className={cx('basic-card-icon')} src={cooperation} alt="" />
        </div>
      }
    >
      <Flex ai="center" jc="space-between">
        <Flex ai="center" gap="8px">
          <img height="16" src={union} alt="" />
          <span style={{ fontSize: '16px' }}>
            {width} × {width}
          </span>
        </Flex>
      </Flex>

      <Flex gap="16px">
        <InfoBox1>
          <img src={location} alt="" />
          {name.split(' ')[1]}
        </InfoBox1>
        <InfoBox2>
          <img src={area} alt="" />
          <span style={{ whiteSpace: 'nowrap' }}>{suburb || '-'}</span>
        </InfoBox2>
      </Flex>

      <div className={styles['action-list']}>
        <Tooltip title="Edit">
          <img src={edit} onClick={() => onEdit(tokenId)} alt="" />
        </Tooltip>
        <Tooltip title="Sell">
          <img onClick={handleSell} src={sellIcon} alt="" />
        </Tooltip>
        {/* {process.env.REACT_APP_ENV === 'test' && (
          <Tooltip title="Settle Down">
            <img onClick={() => onSettle(tokenId)} src={settleIcon} alt="" />
          </Tooltip>
        )} */}
      </div>
    </BasicCard>
  );
};

const RewardDialog = ({ open, onCancel, status, id, onClaim, width }) => {
  const [getToken] = useLoginToken();
  const { account } = useWallet();

  const { run } = useApi(claimSettleReward, {
    manual: true
  });

  const [loading, setClaimLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClaim = useCallback(
    async (rewardIndex) => {
      if (!account) {
        return message.info('Connect Wallet first');
      }
      const token = await getToken();
      setClaimLoading(true);
      const { code } = await run({
        address: account,
        login_token: token,
        token_id: id,
        reward_index: rewardIndex
      });

      if (code === 200) {
        await onClaim();
        setSuccess(true);
      }
      setClaimLoading(false);
    },
    [account, getToken, id, onClaim, run]
  );

  return (
    <Dialog
      title="Claim Reward"
      footer=""
      onCancel={onCancel}
      open={open}
      animate={false}
      style={{ background: `url(${airdropBg})` }}
      className={cx('settle-dialog')}
    >
      <Swiper>
        <Box
          title="PlayerOne Reward 1"
          disable={false}
          status={status?.[0]}
          onClaim={() => handleClaim(1)}
          loading={loading}
          img={rewardImg}
          width={width}
        />
        <Box
          title="PlayerOne Reward 2"
          disable={false}
          status={status?.[1]}
          onClaim={() => handleClaim(2)}
          loading={loading}
          // width={width}
          img={rewardImg2}
        />
        <Box
          title="PlayerOne Reward 3"
          status={status?.[2]}
          onClaim={() => handleClaim(3)}
          loading={loading}
        />
        <Box
          title="PlayerOne Reward 4"
          status={status?.[3]}
          onClaim={() => handleClaim(4)}
          loading={loading}
        />
        <Box
          title="PlayerOne Reward 5"
          status={status?.[4]}
          onClaim={() => handleClaim(5)}
          loading={loading}
        />
        <Box
          title="PlayerOne Reward 6"
          status={status?.[5]}
          onClaim={() => handleClaim(6)}
          loading={loading}
        />
        <Box
          title="PlayerOne Reward 7"
          status={status?.[6]}
          onClaim={() => handleClaim(7)}
          loading={loading}
        />
        <Box
          title="PlayerOne Reward 8"
          status={status?.[7]}
          onClaim={() => handleClaim(8)}
          loading={loading}
        />
      </Swiper>

      {success && (
        <SuccessDialog open={success} onConfirm={() => setSuccess(false)} />
      )}
    </Dialog>
  );
};

const Box = ({
  title,
  disable = true,
  img,
  status = -1,
  onClaim,
  loading,
  width
}) => {
  const history = useHistory();
  const handleOpen = useCallback(() => {
    const boxId = [10, 20, 30, 40].findIndex((w) => w === width) + 5;
    history.push(`/mysterybox/detail/${boxId}`);
  }, [history, width]);

  const action = useMemo(() => {
    switch (+status) {
      case -1:
        return (
          <Button gray disabled>
            <div className={cx('btn')}>Unavailable</div>
          </Button>
        );

      case 0: {
        return (
          <Button onClick={onClaim} loading={loading} yellow>
            <div className={cx('btn')}>Available</div>
          </Button>
        );
      }
      case 1:
      case 2: {
        return (
          <Button yellow disabled>
            <div className={cx('btn')}>On the way</div>
          </Button>
        );
      }
      case 3: {
        return (
          <Button onClick={handleOpen}>
            <div className={cx('btn')}>Next</div>
          </Button>
        );
      }
      default:
        break;
    }
  }, [handleOpen, loading, onClaim, status]);

  return (
    <div className={cx('box')}>
      <div className={cx('poster-container')}>
        <img src={img || wenhao} alt="" />
        {/* <img src={airdropPoster} alt="" /> */}
      </div>
      <div className={cx('action')}>
        <div>{title}</div>
        {/* {disable2 && (
          <Button gray>
            <div className={cx('btn')}>Unavailable</div>
          </Button>
        )}
        {!disable2 && (
          <Button pink>
            <div className={cx('btn')}>Open</div>
          </Button>
        )} */}
        {action}
      </div>
      <div className={cx({ mask: disable })}></div>
    </div>
  );
};

const SuccessDialog = ({ open, onConfirm }) => {
  return (
    <Dialog backdrop={false} open={open} header="" footer="">
      <div className={cx('success-dialog')}>
        <img src={successIcon} alt="" />
        <div>
          The Mystery box will be distributed to your address within 24h
        </div>
        <Button onClick={onConfirm}>
          <div className={cx('confirm-btn')}>Confirm</div>
        </Button>
      </div>
    </Dialog>
  );
};

const CooperationDialog = ({
  open,
  onCancel,
  addCooperator,
  removeCooperator,
  collaborators,
  loadingCooperator
}) => {
  const cooperationRef = useRef();
  const currentRemoveRef = useRef();
  const [showDoubleConfirm, setDoubleConfirm] = useState(false);
  const handleClick = () => {
    const inputValue = cooperationRef?.current?.state?.value ?? '';
    if (!inputValue) {
      return;
    }
    addCooperator({
      collaborator: inputValue
    });
  };
  const LinkItem = ({ collaborator }) => {
    const collaboratorRef = useRef(collaborator);
    const handleRemove = () => {
      currentRemoveRef.current = collaboratorRef.current;
      setDoubleConfirm(true);
    };

    const createComponent = (name, onClick = () => {}, className = '') => {
      let flag = name !== 'Remove';
      return (
        <div
          className={cx('cooperation-remove', { TextCenter: !flag }, className)}
          onClick={onClick}
        >
          {flag ? <CheckMarkIcon /> : null}
          {name}
        </div>
      );
    };
    return (
      <Flex ai="center" jc="space-between">
        <Flex ai="center" jc="center" gap="0 16px">
          <img src={temp} alt="" style={{ width: '28px', height: '28px' }} />
          <div className={cx('cooperation-desc')}>
            {showShortAddress(collaborator)}
          </div>
        </Flex>
        <Dropdown
          options={[
            {
              component: createComponent('Editor'),
              name: 'Editor'
            },
            {
              component: createComponent(
                'Remove',
                handleRemove,
                'cooperation-remove-color'
              ),
              name: 'Remove'
            }
          ]}
          className={cx('dropdown')}
          onSelect={(e) => {
            const { name } = e;
            if (name !== 'Remove') {
            }
            return;
          }}
        >
          <div
            style={{
              width: '120px'
            }}
          >
            <Flex
              ai="center"
              jc="flex-end"
              gap="0px 8px"
              className={cx('cooperation-hover')}
            >
              <div>Editor</div>
              <ArrowDownIcon />
            </Flex>
          </div>
        </Dropdown>
      </Flex>
    );
  };
  const handleConfirm = () => {
    removeCooperator({ collaborator: fillAddress(currentRemoveRef.current) });
    setDoubleConfirm(false);
  };

  const DoubleConfirmDialog = ({ open }) => {
    return (
      <Dialog
        open={open}
        title="Are you sure?"
        onCancel={() => setDoubleConfirm(false)}
        onConfirm={handleConfirm}
      >
        <div style={{ width: '400px' }}>
          {`Are you sure you want to remove ${showShortAddress(
            currentRemoveRef.current
          )} ? They may not be able toaccess this parcel anymore.`}
        </div>
      </Dialog>
    );
  };
  const LinkList = useMemo(
    () => () => {
      return (
        <Flex fd="column" gap="16px 0px">
          {collaborators?.map((item) => (
            <LinkItem
              key={item?.address}
              collaborator={item?.address}
            ></LinkItem>
          ))}
        </Flex>
      );
    },
    [collaborators]
  );

  return (
    <Dialog
      title="Invite"
      footer=""
      open={open}
      onCancel={onCancel}
      className={cx('dialogChange')}
      animate={false}
    >
      <div className={cx('cooperation-container')}>
        <Flex ai="center" jc="center" gap="0 10px">
          <Input
            style={{
              borderColor: '#2C3742',
              borderRadius: '4px'
            }}
            ref={cooperationRef}
            placeholder="Enter the wallet address here"
            type="text"
          />
          <Button width="88px" onClick={handleClick}>
            Invite
          </Button>
        </Flex>
        <div className={cx('cooperation-text')}>
          Everyone at VisionTeam can access this file.
        </div>
        <Flex ai="center" gap="0 8px" style={{ margin: '20px 0px' }}>
          <img
            src={cooperationIcon}
            alt=""
            style={{ width: '14px', height: '14px' }}
          />
          <div className="cooperation-title">Anyone with the link：</div>
        </Flex>
        {loadingCooperator ? (
          <Loading loading={loadingCooperator} />
        ) : !loadingCooperator && collaborators?.length ? (
          <LinkList />
        ) : (
          <Empty show={!collaborators?.length} emptyMsg="no collaborators" />
        )}
      </div>
      {showDoubleConfirm && <DoubleConfirmDialog open={showDoubleConfirm} />}
    </Dialog>
  );
};

const StyledModal = styled(Modal)`
  user-select: none;
  & .ant-modal-header {
    background-color: #1a2026;
  }
  & .ant-modal-content {
    background-color: #1a2026;
    & .ant-modal-close {
      color: #fff;
    }
  }
  & .ant-modal-body {
    padding: 16px;
  }
  & .ant-modal-footer {
    border-top: none !important;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 16px;
    padding: 0 16px 16px 16px;
    & button {
      flex-grow: 1;
      margin: 0 !important;
      border-radius: 4px;
    }
    & .ant-btn-primary {
      background: linear-gradient(154.56deg, #4db7f5 14.1%, #8771ff 91.75%);
      box-shadow: inset -1.48438px -1.48438px 2.96875px #6699fa,
        inset 2.96875px 2.96875px 11.1328px #b8d7ff;
      border: none;
    }
  }
`;
