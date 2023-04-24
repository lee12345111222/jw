import { Fragment, useState, useMemo, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import { useHistory } from 'react-router-dom';
import useSetState from '@/hooks/useSetState';

import { MysteryBoxesUSDTAddress as address } from '@/constant/env/index';

import styles from './MysteryBoxDetail.module.css';

import useMysteryBoxesUSDTLogicV2 from '@/hooks/useMysteryBoxesUSDTLogicV2';
import useChainShouldChange from '@/hooks/useChainShouldChange';

import Web3 from 'web3';

import {
  congratulationAnimate,
  Details,
  CongratulationDialog,
  LoadingDialog2,
  iconList,
} from './PartDetail';

import Detail from '@/components/Detail/index';

import {
  confirmTransaction,
  parsingBuyMysteryBoxEvtIds,
  sleep,
} from '@/utils/common';

import partListPro from '../partsListPro.json';

import { message } from 'antd';

import { genesis } from '../boxList.js';

const partsNameListPro = {
  0: '10 × 10',
  1: '20 × 20',
  2: '30 × 30',
  3: '40 × 40',
};

export default function GenesisDetail() {
  const { id } = useParams();

  const history = useHistory();
  const { t } = useTranslation();

  const { account, ethereum } = useWallet();
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ids, setIds] = useState([]);

  const result = useMemo(
    () =>
      ids.map(({ id, quantity }) => {
        let mapList = [];
        for (let i = 0; i < quantity; i++) {
          mapList.push(
            <img key={`${id}-${i}`} src={`/voxel-parts/${id - 4}.png`} alt="" />
          );
        }
        return mapList;
      }),
    [ids]
  );

  const { buyMysteryBoxLegend, freeLegendWhiteList } =
    useMysteryBoxesUSDTLogicV2();

  useEffect(() => {
    if (!account) {
      return;
    }
    (async () => {
      setLoading(true);
      const count = await freeLegendWhiteList(account, id - 1);
      setCount(+count);
      setLoading(false);
    })();
  }, [account, freeLegendWhiteList, id]);

  const handleGoBack = useCallback(() => {
    history.push('/mysterybox');
  }, [history]);

  const detail = useMemo(() => genesis[id - 1], [id]);

  const chainShouldChange = useChainShouldChange();

  const [{ dialogLoading, showDialog }, setState] = useSetState({
    dialogLoading: false,
    showDialog: false,
  });

  const [polygonUrl, setPolygonUrl] = useState();

  const handleOpen = useCallback(async () => {
    if (!count) {
      return;
    }

    await chainShouldChange();

    setState({ dialogLoading: true });
    setPolygonUrl();

    const web3 = new Web3(ethereum);
    let txHash;

    try {
      const res = await buyMysteryBoxLegend(id - 1);
      txHash = res.transactionHash;
    } catch (e) {
      setState({ dialogLoading: false });
      return message.error('Open failed');
    }

    setPolygonUrl(`https://polygonscan.com/tx/${txHash}`);

    // need try catch here
    sleep(2000);
    try {
      const receipt = await confirmTransaction(web3, txHash);
      const ids = parsingBuyMysteryBoxEvtIds(receipt.logs);

      const idsNum = ids.map(v => ({
        id: web3.utils.hexToNumber(v.id),
        quantity: web3.utils.hexToNumber(v.quantity),
      }));

      setIds(idsNum);
      setState({ dialogLoading: false });
      setState({ showDialog: true });
      congratulationAnimate();
      setCount(count => (count > 0 ? count - 1 : count));
    } catch (e) {
      setState({ dialogLoading: false });
      message.error('Open failed');
    }
  }, [buyMysteryBoxLegend, chainShouldChange, count, ethereum, id, setState]);

  return (
    <>
      <Detail
        onGoBack={handleGoBack}
        pageTitle={`Mystery Box`}
        title={<span>Genesis Mystery Box {id}</span>}
        loading={loading}
        msg={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
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
        detailTitle={t('detail.mystery_box_info')}
        tableTitle={t('detail.series_content')}
        disable={!count}
        details={
          <Details
            t={t}
            count={1}
            address={address}
            icon={detail.icon}
            desc={detail.desc}
          />
        }
        table={<TablePro />}
      />

      <CongratulationDialog
        showDialog={showDialog}
        ids={ids}
        result={result}
        setState={setState}
      />

      <LoadingDialog2
        open={dialogLoading}
        url={polygonUrl}
        text={t('detail.opening')}
      />
    </>
  );
}

const TablePro = () => {
  const [selectedTab, setSelectedTab] = useState('0');

  const titleList = useMemo(
    () =>
      Object.keys(partsNameListPro).map(key => (
        <li
          key={key}
          className={key === selectedTab ? styles['selected-title'] : ''}
        >
          <span onClick={() => setSelectedTab(key)}>
            {partsNameListPro[key]}
          </span>
        </li>
      )),
    [selectedTab]
  );

  const partsList = useMemo(
    () =>
      Object.keys(partListPro).map(key =>
        partListPro[key].map(({ name, rarity, ratio }) => (
          <Fragment key={name}>
            <div>{name}</div>
            <div className={styles['center-item']}>
              <img height="10px" src={iconList[rarity]} alt="" />
            </div>
            <div className={styles['last-item']}>
              {((ratio * 10000) >> 0) / 100}%
            </div>
          </Fragment>
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
