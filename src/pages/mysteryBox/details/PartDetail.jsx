import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// import useApi from '@/hooks/useApi';

import Web3 from 'web3';

import { message } from 'antd';

import { useTranslation } from 'react-i18next';

import { useWallet } from 'use-wallet';

import { confirmTransaction, parsingBuyMysteryBoxEvtIds } from '@/utils/common';

import useQueryFreeWhiteExist from '@/hooks/useQueryFreeWhiteExist';
import useBuyMysteryBoxWhiteBUSD from '@/hooks/useBuyMysteryBoxWhiteBUSD';

import Dialog from '@/components/proto-ui/dialog/index';

import Loading from '@/components/CardList/components/Loading/index';

import BorderedBtn from '@/components/BorderedBtn2/index';

import confetti from 'canvas-confetti';

import {
  MysteryBoxConf,
  VoxelRolePartsAddress as address
} from '@/constant/env/index';

import usdtIcon from '@/assets/icon/usdt-icon.svg';
import whiteListIcon from '@/assets/icon/white-list-icon.png';

import SSR from '../assets/SSR.png';
import SR from '../assets/SR.png';
import R from '../assets/R.png';
import N from '../assets/N.png';

import countIcon from '@/assets/icon/parts-count-icon.png';
import closeIcon from '@/assets/icon/closeIcon.png';

import Detail, { Info, Content, Address } from '@/components/Detail/index';

import { InfoBox2 } from '@/components/Cards/index';

import styles from './MysteryBoxDetail.module.css';

import partList from '../partsList.json';

import useSetState from '@/hooks/useSetState';
import { useHistory } from 'react-router-dom';

import useChainShouldChange from '@/hooks/useChainShouldChange';

import { part } from '../boxList.js';

// import gmb1Img from '@/assets/img/gmb1.png';
// import gmb2Img from '@/assets/img/gmb2.png';
// import gmb3Img from '@/assets/img/gmb3.png';
// import gmb4Img from '@/assets/img/gmb4.png';

// import boxtype1Icon from '@/assets/icon/boxtype1-icon.svg';
// import boxtype2Icon from '@/assets/icon/boxtype2-icon.svg';
// import boxtype3Icon from '@/assets/icon/boxtype3-icon.svg';
// import boxtype4Icon from '@/assets/icon/boxtype4-icon.svg';

const { priceMap } = MysteryBoxConf;

const partsNameList = {
  0: 'Body',
  1: 'Hair',
  2: 'Beard',
  3: 'Glasses',
  4: 'Shirt',
  5: 'Necklace',
  6: 'Shoes',
  7: 'Pants',
  8: 'hat',
  9: 'Earrings',
  10: 'Coat'
};

// const detailPro = {
//   5: {
//     img: gmb1Img,
//     icon: boxtype1Icon,
//     desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.'
//   },
//   6: {
//     img: gmb2Img,
//     icon: boxtype2Icon,
//     desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.'
//   },
//   7: {
//     img: gmb3Img,
//     icon: boxtype3Icon,
//     desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.'
//   },
//   8: {
//     img: gmb4Img,
//     icon: boxtype4Icon,
//     desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.'
//   }
// };

export const iconList = { SSR, SR, R, N };

export const congratulationAnimate = () => {
  var count = 250;
  var defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55
  });
  fire(0.2, {
    spread: 60
  });
  fire(0.35, {
    spread: 150,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 200,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 200,
    startVelocity: 45
  });
};

export default function PartDetail() {
  const { id } = useParams();
  return <MysteryBox id={id} />; // : <MysteryBoxPro id={id} />;
}

function MysteryBox({ id }) {
  const [canBuy, setCanBuy] = useState(null);
  const [ids, setIds] = useState([]);

  const chainShouldChange = useChainShouldChange();

  // const { data } = useApi(
  //   async () =>
  //     new Promise((resolve) => {
  //       fetch('/event_static/event.json').then((response) => {
  //         resolve(response.json());
  //       });
  //     })
  // );

  const detail = useMemo(() => part.find((item) => +item.id === +id), [id]);

  const [{ dialogLoading, showDialog }, setState] = useSetState({
    dialogLoading: false,
    showDialog: false
  });

  const queryFreeWhiteExist = useQueryFreeWhiteExist();

  const buyMysteryBoxWhiteBUSD = useBuyMysteryBoxWhiteBUSD();

  const { account, ethereum } = useWallet();

  const { t } = useTranslation();

  const history = useHistory();

  const handleOnAction = useCallback(async () => {
    if (!canBuy) {
      return;
    }

    await chainShouldChange();

    setState({ dialogLoading: true });

    try {
      const res = await buyMysteryBoxWhiteBUSD(detail.count, true);
      const web3 = new Web3(ethereum);
      const txHash = res.transactionHash;

      // need try catch here
      try {
        const receipt = await confirmTransaction(web3, txHash);
        const ids = parsingBuyMysteryBoxEvtIds(receipt.logs);

        const idsNum = ids.map((v) => ({
          id: web3.utils.hexToNumber(v.id),
          quantity: web3.utils.hexToNumber(v.quantity)
        }));

        setIds(idsNum);
        setState({ dialogLoading: false });
        setState({ showDialog: true });
        congratulationAnimate();
        if (canBuy > 0) {
          setCanBuy(canBuy - 1);
        }
      } catch (e) {
        setState({ dialogLoading: false });
        message.error('Open failed');
      }
    } catch (e) {
      setState({ dialogLoading: false });
      message.error('Open failed');
    }
  }, [
    buyMysteryBoxWhiteBUSD,
    canBuy,
    detail,
    ethereum,
    setState,
    chainShouldChange
  ]);

  const result = useMemo(
    () =>
      ids.map(({ id, quantity }) => {
        let mapList = [];
        for (let i = 0; i < quantity; i++) {
          mapList.push(
            <img key={`${id}-${i}`} src={`/voxel-parts/${id}.png`} alt="" />
          );
        }
        return mapList;
      }),
    [ids]
  );

  useEffect(() => {
    if (!account || !detail) {
      return;
    }

    queryFreeWhiteExist(account, detail.count).then((res) => {
      if (res > 0) {
        setCanBuy(res);
      } else {
        setCanBuy(0);
      }
    });
  }, [account, detail, queryFreeWhiteExist]);

  const handleGoBack = useCallback(() => {
    history.push('/mysterybox');
  }, [history]);

  return (
    <>
      <Detail
        onGoBack={handleGoBack}
        pageTitle={t('event.tab1')}
        title={detail?.title || '-'}
        msg={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {canBuy !== null && (
              <span style={{ color: 'rgba(255, 255, 255, .45)' }}>
                {+canBuy} times remaining
              </span>
            )}
            <img
              style={{ marginLeft: '8px' }}
              height="18px"
              src={whiteListIcon}
              alt=""
            />
            <img height="18px" src={usdtIcon} alt="" />
            <span style={{ color: '#9A8CB8', textDecoration: 'line-through' }}>
              {priceMap[(id - 1) * 3 || 1]}
            </span>
          </div>
        }
        img={detail?.img}
        action={!!detail?.free ? 'Open Now' : t('detail.buy')}
        onAction={handleOnAction}
        detailTitle={t('detail.mystery_box_info')}
        tableTitle={t('detail.series_content')}
        disable={!canBuy}
        details={
          <Details
            address={address}
            t={t}
            count={detail?.count}
            desc={t('app.lang') === 'en' ? detail?.desc : detail?.desc_cn}
          />
        }
        table={<Table />}
      />

      <CongratulationDialog
        showDialog={showDialog}
        ids={ids}
        result={result}
        setState={setState}
      />

      {/* <Dialog open={dialogLoading}>
        <div className={styles.dialog}>
          <div className={styles['loading-dialog']}>
            <div>{t('detail.opening')}</div>
            <Loading loading />
          </div>
        </div>
      </Dialog> */}

      <LoadingDialog open={dialogLoading} text={t('detail.opening')} />
    </>
  );
}

export const CongratulationDialog = ({ showDialog, result, ids, setState }) => {
  const history = useHistory();

  const handleJump = useCallback(
    (e) => {
      e.preventDefault();
      history.push('/assets/voxelpart');
    },
    [history]
  );

  return (
    <Dialog open={showDialog}>
      <div className={styles.dialog}>
        <div className={styles['dialog-header']}>
          <div
            className="colorfull-text"
            style={{
              fontSize: '24px',
              margin: 0,
              marginLeft: '24px',
              flexGrow: 1,
              textAlign: 'center'
            }}
          >
            CONGRATULATIONS
          </div>
          <img
            onClick={() => setState({ showDialog: false })}
            src={closeIcon}
            alt=""
          />
        </div>

        <div
          className={styles['dialog-body']}
          style={{
            justifyContent: ids.length > 5 ? 'flex-start' : 'center'
          }}
        >
          {result}
        </div>
        <div className={styles['dialog-action']}>
          <BorderedBtn
            onClick={() => setState({ showDialog: false })}
            height="26px"
            width="92px"
          >
            Confirm
          </BorderedBtn>

          <div>
            <a onClick={handleJump} href="/create/voxelpart">
              View My VoxelParts &gt;&gt;
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export const LoadingDialog = ({ open, text, className = '' }) => (
  <Dialog open={open}>
    <div className={`${styles.dialog} ${className}`}>
      <div className={styles['loading-dialog']}>
        <div>{text}</div>
        <Loading loading={true} />
      </div>
    </div>
  </Dialog>
);

export const LoadingDialog2 = ({
  open,
  text,
  className = '',
  url,
  net = 'Polygon'
}) => (
  <Dialog open={open}>
    <div className={`${styles.dialog} ${className}`}>
      <div className={styles['loading-dialog']}>
        <Loading loading={true} />
        <div>{text}</div>
        {/* {!url && ( */}
        <div className={styles['opening-text']}>
          {url && (
            <>
              <span>Mystery Box open request submitted, </span>
              <a href={url} target="_blank" rel="noreferrer">
                View on {net} &gt;&gt;
              </a>
            </>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  </Dialog>
);

export const Details = ({ count, desc, t, icon, address }) => {
  return (
    <>
      <div className={styles['info-list']}>
        <Info title="status">
          <InfoBox2>
            <div style={{ width: '84px', textAlign: 'center' }}>
              In Progress
            </div>
          </InfoBox2>
        </Info>
      </div>

      <div className={styles['info-list']}>
        <Info title={t('detail.quantity')}>
          <div className={styles.counts}>
            <img width="22px" src={icon || countIcon} alt="" />
            {count || 0}
          </div>
        </Info>

        <Info title={t('detail.address')}>
          <Address href={`${address}`}>{address}</Address>
        </Info>
      </div>

      <div>
        <Info title={t('detail.desc')}>
          <Content>{desc}</Content>
        </Info>
      </div>
    </>
  );
};

const Table = () => {
  const [selectedTab, setSelectedTab] = useState('0');

  const titleList = useMemo(
    () =>
      Object.keys(partsNameList).map((key) => (
        <li
          key={key}
          className={key === selectedTab ? styles['selected-title'] : ''}
        >
          <span onClick={() => setSelectedTab(key)}>{partsNameList[key]}</span>
        </li>
      )),
    [selectedTab]
  );

  const partsList = useMemo(
    () =>
      Object.keys(partList).map((key) =>
        partList[key].map(({ name, rarity, ratio }) => (
          <React.Fragment key={name}>
            <div>{name}</div>
            <div className={styles['center-item']}>
              <img height="10px" src={iconList[rarity]} alt="" />
            </div>
            <div className={styles['last-item']}>
              {((ratio * 10000) >> 0) / 100}%
            </div>
          </React.Fragment>
        ))
      ),
    []
  );

  return (
    <div className={styles.table}>
      <ul className={styles['title-list']}>
        <li>
          <span>Type</span>
        </li>
        {titleList}
      </ul>
      <div className={styles.grid}>
        <span>Name</span>
        <span className={styles['center-item']}>Rarity</span>
        <span className={styles['last-item']}>Probability</span>
        {partsList[selectedTab]}
      </div>
    </div>
  );
};
