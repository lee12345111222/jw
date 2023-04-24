import React, { useState, useMemo, useEffect } from 'react';
//import Web3 from 'web3';
import a from './img/a.png';
import b from './img/b.png';
import c from './img/c.png';

import a1 from './img/a1.png';
import b1 from './img/b1.png';
import c1 from './img/c1.png';

import Card from '../components/index';

import { useWallet } from 'use-wallet';
import { useApi2 } from '@/hooks/useApi';
import { getmgbalance } from '@/api/event';
import { getDisplayBalance2ETH } from '@/utils/common';

import classNames from 'classnames/bind';
import styles from './index.module.css';
const cx = classNames.bind(styles);

const createData = [
  {
    title: 'Ethereum',
    number: 0,
    type: 'ETH',
    bottomNumber: '0 USD',
    leftImg: a1,
    rightImg: a,
    theme: 'blue',
  },
  {
    title: 'Polygon',
    number: 0,
    type: 'POLYGON',
    bottomNumber: '0 USD',
    leftImg: b1,
    rightImg: b,
    theme: 'purple',
  },
  {
    title: 'MG Token',
    number: 0.0,
    type: 'MG',
    bottomNumber: '',
    leftImg: c1,
    rightImg: c,
    theme: 'pink',
  },
];

const WalletCard = () => {
  const { account, status, balance: getDisplayBalance } = useWallet();
  const { data: { data: { balance } } = { data: { balance: 0 } } } = useApi2(
    () => getmgbalance({ address: account }),
    {},
    [account]
  );

  //获取polygon余额
  const Web3 = require('web3');
  const provider = new Web3.providers.HttpProvider(
    'https://rpc-mainnet.maticvigil.com/'
  ); // 主网rpc节点
  const web3 = new Web3(provider);

  const [polygenBalance, setPolygenBalance] = useState(null);

  const [usdAmountPolygon, setusdAmountPolygon] = useState();

  const [usdAmountMatic, setusdAmountMatic] = useState();

  useEffect(() => {
    const getPolygenBalance = async () => {
      if (account != null) {
        const balanceResult = await web3.eth.getBalance(account);
        setPolygenBalance(Web3.utils.fromWei(balanceResult, 'ether'));
      }
    };
    getPolygenBalance();
  }, [account, web3]);

  const displayBalance = useMemo(
    () => getDisplayBalance2ETH(getDisplayBalance, true),
    [getDisplayBalance]
  );

  const [data, setData] = useState(createData);

  //get eth转usd余额
  //let usdAmount;
  async function ethToUsd(displayBalance) {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    const response = await fetch(url);
    const data = await response.json();
    const ethUsdRate = data['ethereum'].usd;
    console.log(data);

    console.log(data['ethereum'].usd);

    // 计算转换后的USD
    const usdAmount = displayBalance * ethUsdRate;

    return parseFloat(usdAmount);
  }

  // console.log(data['ethereum']?.USD);
  // console.log(data['ethereum'].USD);

  //console.log(data['ethereum']?.USD);

  useEffect(() => {
    const getusdAmountPolygon = async () => {
      if (account != null) {
        const usdResult = await ethToUsd(displayBalance);
        setusdAmountPolygon(usdResult.toFixed(2));
      }
    };
    getusdAmountPolygon();
  }, [account, displayBalance]);

  // console.log(data['ethereum'].USD);

  //get polygon转usd余额
  async function maticToUsd(amount) {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd';
    const response = await fetch(url);
    const data = await response.json();
    const maticUsdRate = data['matic-network'].usd;
    // 计算转换后的USD
    const usdAmount = amount * maticUsdRate;

    return parseFloat(usdAmount);
  }

  useEffect(() => {
    const getusdAmountMatic = async () => {
      if (account != null) {
        const usdResult = await maticToUsd(polygenBalance);
        setusdAmountMatic(usdResult.toFixed(2));
      }
    };
    getusdAmountMatic();
  }, [account, polygenBalance]);

  useEffect(() => {
    if (status === 'connected') {
      setData(state => {
        let arr = [...createData];

        arr[0].number = displayBalance;
        arr[0].bottomNumber = usdAmountPolygon + ' USD';
        console.log(arr[0].bottomNumber, 'eth bal');
        arr[1].number = polygenBalance || 0;
        arr[1].bottomNumber = usdAmountMatic + ' USD';

        arr[2].number = balance;
        return arr;
      });
    }
  }, [
    balance,
    displayBalance,
    polygenBalance,
    usdAmountPolygon,
    usdAmountMatic,
    status,
  ]);

  return (
    <div className="mydiv">
      <div className={cx('cardContainer')}>
        {data.map(item => {
          return <Card data={item} theme={item.theme} />;
        })}
      </div>
    </div>
  );
};

export default WalletCard;
