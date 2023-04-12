import React, { useState, useMemo } from 'react';

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
import { useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './index.module.css';
const cx = classNames.bind(styles);

const createData = [
  {
    title: 'Ethereum',
    number: 3.12344,
    type: 'ETH',
    bottomNumber: '3.75 USD',
    leftImg: a1,
    rightImg: a,
    theme: 'blue',
  },
  {
    title: 'Polygon',
    number: 3.0217,
    type: 'POLYGON',
    bottomNumber: '3.75 USD',
    leftImg: b1,
    rightImg: b,
    theme: 'purple',
  },
  {
    title: 'MG Token',
    number: 3.0233,
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

  const displayBalance = useMemo(
    () => getDisplayBalance2ETH(getDisplayBalance, true),
    [getDisplayBalance]
  );

  const [data, setData] = useState(createData);

  useEffect(() => {
    if (status === 'connected') {
      setData(state => {
        let arr = [...createData];
        arr[0].number = displayBalance;
        arr[2].number = balance;
        return arr;
      });
    }
  }, [balance, displayBalance, status]);

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
