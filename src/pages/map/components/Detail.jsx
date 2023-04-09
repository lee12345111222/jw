import { useState, useEffect, useMemo, useCallback } from 'react';

import L from 'leaflet';

import { useLocalStorageState } from 'ahooks';

// import BorderedBtn from '@/components/BorderedBtn2/index';

import ClickAwayListener from '@/components/proto-ui/clickAwayListener/index';

import ToolContainer from './ToolContainer';
import styles from './index.module.css';

import ImageBox from '@/components/ImageBox/index';
import usePersonalSign from '@/hooks/usePersonalSign';

import pendingIcon from '@/assets/icon/warning-icon.svg';

import { Loading } from '@/pages/create/tabs/Treasure';

import {
  video_server,
  redirect_url,
  PlayerOneParcelAddress
} from '@/constant/env/index';

import usePlayerOneMintPass from '@/hooks/usePlayerOneMintPass';

// import { LoadingDialog } from '@/pages/event/MysteryBoxDetail';

import { getogparcelproof, regetogparcelproof } from '@/api/map';
import useApi from '@/hooks/useApi';

import Web3 from 'web3';
import { confirmTransaction } from '@/utils/common';

import {
  ColorfulText1,
  ColorfulText2,
  Label,
  Address
} from '@/components/Detail/index';

import mapShareIcon from '@/assets/icon/map-share-icon.svg';
import errorIcon from '@/assets/icon/error-icon.png';

import { showShortAddress } from '@/utils/common';
import { message } from 'antd';
import Dialog from '@/ui/dialog/index';
import Button from '@/ui/button/index';
import { Button as MyButton } from '@/custom-ui/index'; // '@/ui/button/index';

const Detail = ({
  building,
  search,
  map,
  onOpen,
  account,
  getToken,
  getPassCards,
  ethereum,
  passcards,
  specialUrl
}) => {
  const { exchangeParcel } = usePlayerOneMintPass();

  const [txs, setTxs] = useLocalStorageState('tx-list', {
    defaultValue: {}
  });

  const { run: getProof } = useApi(getogparcelproof, {
    manual: true
  });

  const { run: regetProof } = useApi(regetogparcelproof, {
    manual: true
  });

  const [, setSelectedRectangle] = useState();
  const [show, setShow] = useState();

  const selected = useMemo(() => building || search, [building, search]);

  const {
    name,
    owner,
    startX,
    startY,
    endX,
    endY,
    isMain,
    status,
    buyer,
    tokenId
  } = useMemo(() => selected || {}, [selected]);

  const width = useMemo(() => endX - startX, [endX, startX]);

  const [loading2, setLoading2] = useState(true);

  const [isTxConfirmable, setIsTxConfirmable] = useState(true);

  useEffect(() => {
    if (!status) {
      return;
    }

    if (
      status !== 2 ||
      `0x${buyer?.toLowerCase()}` !== account?.toLowerCase() ||
      !txs?.[tokenId]
    ) {
      return setLoading2(false);
    } else {
      setLoading2(true);
    }

    const asyncFn = async () => {
      const web3 = new Web3(ethereum);
      try {
        await confirmTransaction(web3, txs[tokenId]);
      } catch (e) {
        return setLoading2(false);
      }
    };

    if (isTxConfirmable) {
      asyncFn();
    }
  }, [account, buyer, ethereum, isTxConfirmable, status, tokenId, txs]);

  // const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   const supplyIndex = [10, 20, 30, 40, 50].findIndex((i) => i === width);

  //   if (status === 1 && passcards.find(({ ptype }) => ptype === supplyIndex)) {
  //     return; // setDisabled(false);
  //   }
  //   if (
  //     status === 2 &&
  //     buyer &&
  //     account &&
  //     `0x${buyer?.toLowerCase()}` === account?.toLowerCase()
  //   ) {
  //     return; // setDisabled(false);
  //   }

  //   if (status > 2) {
  //     return; // setDisabled(false);
  //   }

  //   // setDisabled(true);
  // }, [account, buyer, passcards, status, width]);

  const buyText = useMemo(() => {
    if (status === 1) {
      return 'Mint Now';
    }

    if (status === 3) {
      if (account && owner?.toLowerCase() === account?.toLowerCase()) {
        return 'Sell Now';
      }
      return 'Buy Now';
    }

    if (status === 2) {
      if (`0x${buyer?.toLowerCase()}` === account?.toLowerCase()) {
        return 'Mint Again';
      }
      return 'Processing';
    }

    if (status === 4) {
      return 'Jump';
    }
  }, [account, buyer, owner, status]);

  useEffect(() => {
    if (selected) {
      setShow(true);
    }
  }, [selected]);

  const selectedLayer = useMemo(() => L.layerGroup(), []);

  useEffect(() => {
    map.on('zoom', () => {
      if (map.getZoom() > 0) {
        selectedLayer.addTo(map);
      } else {
        selectedLayer.remove();
      }
    });
  }, [map, selectedLayer]);

  useEffect(() => {
    if (!selected) {
      return setSelectedRectangle((val) => {
        if (val) {
          selectedLayer.removeLayer(val);
        }
        return undefined;
      });
    }

    let rect;
    if (isMain) {
      const bounds = [
        [startX, startY],
        [endX, endY]
      ];
      rect = L.rectangle(bounds, {
        color: '#87c4f8',
        fill: false,
        weight: 4,
        lineJoin: 'clip'
      });
    } else {
      const bounds = [
        [startX + 0.5, startY + 0.5],
        [endX - 0.5, endY - 0.5]
      ];
      rect = L.rectangle(bounds, {
        stroke: false,
        fillColor: '#87c4f8',
        fillOpacity: 1
      });
    }
    selectedLayer.addLayer(rect);

    setSelectedRectangle((val) => {
      if (val) {
        selectedLayer.removeLayer(val);
      }
      return rect;
    });
  }, [endX, endY, isMain, selected, selectedLayer, startX, startY]);

  useEffect(() => {
    if (!search) {
      return;
    }

    map.setView([startX, startY], 2);
  }, [map, search, startX, startY]);

  const [loading, setLoading] = useState(false);

  const { getPersonalSign } = usePersonalSign();
  const [showError, setShowError] = useState(false);

  const [needConfirm, setNeedConfirm] = useState(false);

  const handleBuy = useCallback(async () => {
    setNeedConfirm(false);
    setLoading(true);

    const sign =
      status === 1
        ? await getPersonalSign(
            `Click "Sign" to confirm mint.\n${name}\nADDRESS ${account}`
          )
        : undefined;

    const token = await getToken();

    const params = {
      login_token: token,
      address: account,
      token_id: tokenId
    };

    const { code, msg, data } =
      status === 1
        ? await getProof({ ...params, sign })
        : await regetProof(params);

    if (msg === 'insufficient passcard') {
      message.error('Insufficient Mint Pass');
      return setLoading(false);
    }

    if (code !== 200) {
      message.error(msg || 'Buy faild, Please try again');
      return setLoading(false);
    }

    getPassCards({
      address: account
    });

    const { coordinate, parel_proof, passcard_tid, token_id } = data;
    const { x1, x2, y1, y2, z1, z2 } = coordinate;

    let exchangeRes;
    try {
      exchangeRes = await exchangeParcel(
        passcard_tid,
        token_id,
        [x1, y1, z1, x2, y2, z2],
        parel_proof
      );
    } catch (error) {
      if (error?.code === 4001) {
        return setLoading(false);
      }
      setShowError(true);
    }

    if (!exchangeRes?.transactionHash) {
      setShowError(true);
    } else {
      setIsTxConfirmable(false);
      setLoading2(true);
      setTxs((val) => ({ ...val, [tokenId]: exchangeRes.transactionHash }));
      onOpen({ ...building, tx: exchangeRes.transactionHash });
      setTimeout(() => {
        setIsTxConfirmable(true);
      }, 3000);
    }

    setLoading(false);
  }, [
    account,
    building,
    exchangeParcel,
    getPassCards,
    getPersonalSign,
    getProof,
    getToken,
    name,
    onOpen,
    regetProof,
    setTxs,
    status,
    tokenId
  ]);

  const handleMint = useCallback(() => {
    if (status === 3) {
      return window.open(
        `${redirect_url}/${PlayerOneParcelAddress}/${tokenId}`
      );
    }

    if (status === 4) {
      return window.open(specialUrl);
    }

    if (status === 2) {
      return handleBuy();
    }

    setNeedConfirm(true);
  }, [handleBuy, specialUrl, status, tokenId]);

  const shareable = useMemo(
    () =>
      owner?.toLowerCase() === account?.toLowerCase() ||
      `0x${buyer?.toLowerCase()}` === account?.toLowerCase(),
    [account, buyer, owner]
  );

  const handleShare = useCallback(() => {
    if (shareable) {
      onOpen({ ...building, tx: txs?.[tokenId] });
    }
  }, [building, onOpen, shareable, tokenId, txs]);

  const imgSrc = useMemo(
    () =>
      startX
        ? `${video_server}/parcelres/${startX + width / 2}_${
            startY + width / 2
          }.png`
        : '',
    [startX, startY, width]
  );

  const handlePlay = useCallback(() => {
    return window.open(`/preview/parcel/${tokenId}`);
  }, [tokenId]);

  return (
    <div>
      <ClickAwayListener onClickAway={() => setShow()}>
        <ToolContainer
          className={`${styles.detail} ${show ? styles['show-detail'] : ''}`}>
          <div style={{ width: '268px' }}>
            {show && (
              <ImageBox
                src={
                  status === 4
                    ? 'https://playeroneworld.s3.ap-southeast-1.amazonaws.com/pubs/yk-parcel-temp.png'
                    : imgSrc
                }
                alt=""
              />
            )}
          </div>

          <div className={styles.flex}>
            <div className={styles['detail-title']}>{name}</div>
            {/* <BorderedBtn
              onClick={handleEnter}
              width="80px"
              height="22px"
              borderWidth="1px"
              bgColor="rgba(0, 0, 0, 0)">
              <span>Enter</span>
            </BorderedBtn> */}
            <div>
              <img
                onClick={handleShare}
                style={{
                  cursor: shareable ? 'pointer' : 'not-allowed'
                }}
                width="18px"
                src={mapShareIcon}
                alt=""
              />
            </div>
          </div>

          <div className={styles['detail-info']}>
            <div className={styles.flex}>
              <div className={styles['info-box']}>
                <Label>Coordinate</Label>
                <ColorfulText2>
                  <span>
                    {startX + width / 2},{startY + width / 2}
                  </span>
                </ColorfulText2>
              </div>
              <div className={styles['info-box']}>
                <Label>Size</Label>
                <ColorfulText1>
                  {width} × {width}
                </ColorfulText1>
              </div>
            </div>

            <div className={styles.flex}>
              <div>
                <Label>Owner</Label>
                <div>
                  <Address>
                    {status === 2 ||
                    owner === '0x7396b47027f2751e3353f942c1bff99751f9f0c8'
                      ? 'PlayerOne'
                      : showShortAddress(owner)}
                  </Address>
                </div>
              </div>

              {txs?.[tokenId] &&
                (owner?.toLowerCase() === account?.toLowerCase() ||
                  `0x${buyer?.toLowerCase()}` === account?.toLowerCase()) && (
                  <div>
                    <Label>Hash</Label>
                    <div>
                      <a
                        href={`/redirect.html#https://etherscan.io/tx/${txs?.[tokenId]}`}
                        target="_blank"
                        rel="noreferrer">
                        {showShortAddress(txs?.[tokenId])}
                      </a>
                    </div>
                  </div>
                )}
            </div>

            <div className={styles.flex}>
              <MyButton loading={loading || loading2} onClick={handleMint}>
                <div style={{ width: '112px', height: '20px' }}>{buyText}</div>
              </MyButton>
              {status !== 3 && (
                <MyButton onClick={() => setShow(false)}>
                  <div style={{ width: '108px', height: '20px' }}>Cancel</div>
                </MyButton>
              )}
              {status === 3 && (
                <MyButton onClick={handlePlay} purple>
                  <div style={{ width: '108px', height: '20px' }}>Play</div>
                </MyButton>
              )}
            </div>
          </div>
        </ToolContainer>
      </ClickAwayListener>
      <Loading open={loading} text="Submitting request, please wait" />

      <Dialog header="" footer="" open={needConfirm}>
        <div className={styles['confirm-dialog']}>
          <div>
            <img src={pendingIcon} alt="" />
          </div>
          <div>
            <div>Are you sure to mint this parcel?</div>
            <div>
              After signing, Mint Pass will be consumed to lock the parcel
            </div>
          </div>
          <div className={styles['confirm-dialog-actions']}>
            <Button onClick={handleBuy}>
              <div className={styles.action}>Confirm</div>
            </Button>
            <Button onClick={() => setNeedConfirm(false)} outline>
              <div className={styles.action}>Cancel</div>
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={showError} header="" footer="">
        <div className={styles['error-dialog-container']}>
          <img src={errorIcon} alt="" />
          <div>Encounter some errors! Please check your Metamask wallet</div>
        </div>
        <Button onClick={() => setShowError(false)}>Confirm</Button>
      </Dialog>
    </div>
  );
};

export default Detail;
