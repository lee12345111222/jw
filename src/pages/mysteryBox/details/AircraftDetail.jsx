import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import { useTranslation } from 'react-i18next';
import {
  MysteryBoxesJetpack as address
  // Jetpack as jetpackAddress
} from '@/constant/env/index';

import classes from './BlueprintDetail.module.css';
import classNames from 'classnames/bind';

import closeIcon from '@/assets/icon/closeIcon.png';

import useMysteryBoxesJetpack from '@/hooks/useMysteryBoxesJetpack';
import useChainShouldChange from '@/hooks/useChainShouldChange';

import { etherscan } from '@/constant/env/index';

import Web3 from 'web3';

import {
  congratulationAnimate,
  LoadingDialog2,
  Details,
  iconList
} from './PartDetail';

import Dialog from '@/components/proto-ui/dialog/index';
import { Button } from '@/custom-ui/index';

import Detail from '@/components/Detail/index';

// import boxSize10Icon from '@/assets/icon/box-size-10.svg';
// import boxSize20Icon from '@/assets/icon/box-size-20.svg';
// import boxSize30Icon from '@/assets/icon/box-size-30.svg';
// import boxSize40Icon from '@/assets/icon/box-size-40.svg';

import aircraftIcon1 from '@/assets/icon/aircraft-icon1.svg';
import aircraftIcon2 from '@/assets/icon/aircraft-icon2.svg';
import aircraftIcon3 from '@/assets/icon/aircraft-icon3.svg';
import aircraftIcon4 from '@/assets/icon/aircraft-icon4.svg';

import {
  confirmTransaction,
  parsingByMysteryBoxBlueprintId,
  sleep
} from '@/utils/common';

import { message } from 'antd';
import { aircraft } from '../boxList.js';

import { jetpackinfo } from '@/api/jetpack';
import useApi from '@/hooks/useApi';

const cx = classNames.bind(classes);

// const sizes = [boxSize10Icon, boxSize20Icon, boxSize30Icon, boxSize40Icon];

const aircraftIcons = [
  aircraftIcon1,
  aircraftIcon2,
  aircraftIcon3,
  aircraftIcon4
];

export default function AircraftDetail() {
  const { id } = useParams();
  const history = useHistory();

  const { t } = useTranslation();

  const { account, ethereum } = useWallet();
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const { freeWhiteList, claim } = useMysteryBoxesJetpack();

  const { data, run } = useApi(jetpackinfo, { manual: true });

  useEffect(() => {
    if (!account) {
      return;
    }
    (async () => {
      setLoading(true);
      const count = await freeWhiteList(account, id - 1);
      setCount(+count);
      setLoading(false);
    })();
  }, [account, freeWhiteList, id]);

  const handleGoBack = useCallback(() => {
    history.push('/mysterybox');
  }, [history]);

  const detail = useMemo(() => aircraft[id - 1], [id]);

  const chainShouldChange = useChainShouldChange();

  const [dialogLoading, setDialogLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    if (!tokenId) {
      return;
    }

    const asyncFn = async () => {
      const res = await run({ token_id: tokenId });

      console.log('res >>>', res);

      const { code } = res;

      if (code === 200) {
        setShowDialog(true);
      }
    };

    asyncFn();
  }, [run, tokenId]);

  const [txHash, setTxHash] = useState();

  const handleOpen = useCallback(async () => {
    if (!count) {
      return;
    }

    const changeStatus = await chainShouldChange('ethereum');
    if (!changeStatus) {
      return;
    }

    setDialogLoading(true);
    setTxHash();

    const web3 = new Web3(ethereum);
    let txHash;

    try {
      const res = await claim(id - 1);
      txHash = res.transactionHash;
    } catch (e) {
      setDialogLoading(false);
      return message.error('Open faild');
    }

    setTxHash(txHash);

    sleep(2000);
    try {
      const receipt = await confirmTransaction(web3, txHash);

      const tokenId = parsingByMysteryBoxBlueprintId(receipt.logs);
      setTokenId(tokenId);

      setDialogLoading(false);
      congratulationAnimate();
      setCount((count) => (count > 0 ? count - 1 : count));
    } catch (e) {
      setDialogLoading(false);
      message.error('Open faild');
    }
  }, [chainShouldChange, claim, count, ethereum, id]);

  return (
    <>
      <Detail
        onGoBack={handleGoBack}
        pageTitle={`Mystery Box`}
        title={
          <span style={{ color: '#faff00' }}>Jetpack Mystery Box {id}</span>
        }
        loading={loading}
        msg={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {count !== null && (
              <span style={{ color: 'rgba(255, 255, 255, .45)' }}>
                {count} times remaining
              </span>
            )}
          </div>
        }
        img={detail.img}
        action="Open Now"
        onAction={handleOpen}
        detailTitle={'Mystery Box Info'}
        tableTitle={''}
        disable={!count}
        details={
          <Details
            t={t}
            count={1}
            address={address}
            icon={aircraftIcons[id - 1]}
            desc={detail.desc}
          />
        }
        table={<TablePro />}
      />

      <CongratulationDialog2 open={showDialog} onClose={() => setShowDialog()}>
        <img src={data?.data?.image} alt="" />
      </CongratulationDialog2>

      <LoadingDialog2
        open={dialogLoading}
        url={txHash ? `${etherscan}/tx/${txHash}` : undefined}
        text="Opening the Jetpack Mystery box"
        net="Etherscan"
      />
    </>
  );
}

const CongratulationDialog2 = ({ open, children, onClose }) => {
  const history = useHistory();

  const handleJump = useCallback(
    (e) => {
      e.preventDefault();
      history.push('/assets/jetpack');
    },
    [history]
  );

  return (
    <Dialog open={open}>
      <div className={cx('congratulation-dialog')}>
        <div className={cx('congratulation-dialog-header')}>
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
          <img onClick={onClose} src={closeIcon} alt="" />
        </div>

        <div className={cx('congratulation-dialog-body')}>{children}</div>
        <div className={cx('congratulation-dialog-action')}>
          <div></div>
          <div className={cx('congratulation-dialog-btn')}>
            <Button onClick={onClose}>
              <div className={cx('congratulation-dialog-btn-box')}>Confirm</div>
            </Button>
          </div>
          <div className={cx('congratulation-dialog-jump')}>
            <a onClick={handleJump} href="/assets/jetpack">
              View My Jetpacks &gt;&gt;
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const partsNameList = {
  0: '10 × 10',
  1: '20 × 20',
  2: '30 × 30',
  3: '40 × 40'
};

const partList = {
  0: [
    {
      name: 'Base',
      rarity: 'N',
      ratio: '0.65'
    },
    {
      name: 'Warha Mmer',
      rarity: 'N',
      ratio: '0.25'
    },
    {
      name: 'Cute chicken',
      rarity: 'N',
      ratio: '0.10'
    }
  ],
  1: [
    {
      rarity: 'R',
      name: 'Warha Mmer',
      ratio: '0.65'
    },
    {
      name: 'Cute Chicken',
      rarity: 'R',
      ratio: '0.25'
    },
    {
      name: 'Burning Hot',
      rarity: 'R',
      ratio: '0.10'
    }
  ],
  2: [
    {
      name: 'Cute Chicken',
      rarity: 'SR',
      ratio: '0.65'
    },
    {
      name: 'Burning Hot',
      rarity: 'SR',
      ratio: '0.25'
    },
    {
      name: 'Street Style',
      rarity: 'SR',
      ratio: '0.10'
    }
  ],
  3: [
    {
      name: 'Burning Hot',
      rarity: 'SSR',
      ratio: '0.65'
    },
    {
      name: 'Street Style',
      rarity: 'SSR',
      ratio: '0.25'
    },
    {
      name: 'Golden Key',
      rarity: 'SSR',
      ratio: '0.10'
    }
  ]
};

const TablePro = () => {
  const [selectedTab, setSelectedTab] = useState('0');

  useEffect(() => {
    console.log('selectedTab >>>', selectedTab);
  }, [selectedTab]);

  const titleList = useMemo(
    () =>
      Object.keys(partsNameList).map((key) => (
        <li key={key} className={cx({ 'selected-title': selectedTab === key })}>
          <span onClick={() => setSelectedTab(key)}>{partsNameList[key]}</span>
        </li>
      )),
    [selectedTab]
  );

  const partsList = useMemo(
    () =>
      Object.keys(partList).map((key) =>
        partList[key].map(({ name, ratio, rarity }) => (
          <Fragment key={name}>
            <div>{name}</div>
            <div className={cx('center-item')}>
              <img height="18px" src={iconList[rarity]} alt="" />
            </div>
            <div className={cx('last-item')}>
              {((ratio * 10000) >> 0) / 100}%
            </div>
          </Fragment>
        ))
      ),
    []
  );

  return (
    <div className={cx('table')}>
      <ul className={cx('title-list')}>
        <li>
          <span>Type</span>
        </li>
        {titleList}
      </ul>
      <div className={cx('grid')}>
        <span>Name</span>
        <span className={cx('center-item')}>Rarity</span>
        <span className={cx('last-item')}>Probability</span>
        {partsList[selectedTab]}
      </div>
    </div>
  );
};
