import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import { useTranslation } from 'react-i18next';
import { MysteryBoxesBlueprint as address } from '@/constant/env/index';

import classes from './BlueprintDetail.module.css';
import classNames from 'classnames/bind';

import closeIcon from '@/assets/icon/closeIcon.png';

import useMysteryBoxesBlueprint from '@/hooks/useMysteryBoxesBlueprint';
import useChainShouldChange from '@/hooks/useChainShouldChange';

import { etherscan } from '@/constant/env/index';

import Web3 from 'web3';

import { congratulationAnimate, LoadingDialog2, Details } from './PartDetail';

import Dialog from '@/components/proto-ui/dialog/index';
import { Button } from '@/custom-ui/index';

import Detail from '@/components/Detail/index';

import boxSize10Icon from '@/assets/icon/box-size-10.svg';
import boxSize20Icon from '@/assets/icon/box-size-20.svg';
import boxSize30Icon from '@/assets/icon/box-size-30.svg';
import boxSize40Icon from '@/assets/icon/box-size-40.svg';

import buildingIcon1 from '@/assets/icon/building-icon1.svg';
import buildingIcon2 from '@/assets/icon/building-icon2.svg';
import buildingIcon3 from '@/assets/icon/building-icon3.svg';
import buildingIcon4 from '@/assets/icon/building-icon4.svg';

import {
  confirmTransaction,
  parsingByMysteryBoxBlueprintId,
  sleep
} from '@/utils/common';

// import { BlueprintCard } from '@/pages/create/spaceEditor/Parcel';

import { message } from 'antd';
import { blueprint } from '../boxList.js';

import { blueprintinfo } from '@/api/blueprint';
import useApi from '@/hooks/useApi';

const cx = classNames.bind(classes);

const sizes = [boxSize10Icon, boxSize20Icon, boxSize30Icon, boxSize40Icon];
const buildingIcons = [
  buildingIcon1,
  buildingIcon2,
  buildingIcon3,
  buildingIcon4
];

export default function BlueprintDetail() {
  const { id } = useParams();
  const history = useHistory();

  const { t } = useTranslation();

  const { account, ethereum } = useWallet();
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const { freeWhiteList, claim } = useMysteryBoxesBlueprint();

  const { data, run } = useApi(blueprintinfo, { manual: true });

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

  const detail = useMemo(() => blueprint[id - 1], [id]);

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

      console.log('receipt >>>', receipt);

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
          <span style={{ color: '#faff00' }}>Blueprint Mystery Box {id}</span>
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
            icon={buildingIcons[id - 1]}
            desc={detail.desc}
          />
        }
        table={<TablePro />}
      />

      <CongratulationDialog2 open={showDialog} onClose={() => setShowDialog()}>
        {/* <BlueprintCard {...data?.data} /> */}
        <img src={data?.data?.image} alt="" />
      </CongratulationDialog2>

      <LoadingDialog2
        open={dialogLoading}
        url={txHash ? `${etherscan}/tx/${txHash}` : undefined}
        text="Opening the Blueprint Mystery box"
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
      history.push('/assets/blueprint');
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
            <a onClick={handleJump} href="/assets/blueprint">
              View My Blueprints &gt;&gt;
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
      name: "Rubik's Cube",
      ratio: '0.33'
    },
    {
      name: 'Hylaea',
      ratio: '0.33'
    },
    {
      name: 'Lovely',
      ratio: '0.33'
    },
    {
      name: 'Marble',
      ratio: '0.33'
    }
  ],
  1: [
    {
      name: 'Coffee',
      ratio: '0.33'
    },
    {
      name: 'Bank',
      ratio: '0.33'
    },
    {
      name: 'Restaurant',
      ratio: '0.33'
    },
    {
      name: 'Shop',
      ratio: '0.33'
    }
  ],
  2: [
    {
      name: 'Moon',
      ratio: '0.33'
    },
    {
      name: 'Country Style',
      ratio: '0.33'
    },
    {
      name: 'Ocean',
      ratio: '0.33'
    },
    {
      name: 'Church',
      ratio: '0.33'
    }
  ],
  3: [
    {
      name: 'Water Villa',
      ratio: '0.33'
    },
    {
      name: 'Theater',
      ratio: '0.33'
    },
    {
      name: 'Pizza',
      ratio: '0.33'
    },
    {
      name: 'Hospital',
      ratio: '0.33'
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
        partList[key].map(({ name, ratio }) => (
          <Fragment key={name}>
            <div>{name}</div>
            <div className={cx('center-item')}>
              <img height="18px" src={sizes[key]} alt="" />
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
