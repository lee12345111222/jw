import { useState, useCallback, useEffect, useMemo } from 'react';

// import MainPage from '@/components/MainPage/index';
import { Button } from '@/custom-ui/index';
import Dialog from '@/ui/dialog/index';
import Loading from '@/components/CardList/components/Loading/index';
import { H2 } from '../index/ParcelSale';

import { Flex } from '@/custom-ui/index';
import { message } from 'antd';

// import { isog, ogbuypasscard } from '@/api/map';
import useApi from '@/hooks/useApi';

import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';
import useSwitchNetwork from '@/hooks/useSwitchNetwork';
import { confirmTransaction } from '@/utils/common';
import Web3 from 'web3';

import isMobile from 'is-mobile';

import { supported_chains } from '@/constant/env/index';

import usePlayerOneMintPass from '@/hooks/usePlayerOneMintPass';
import { getDisplayBalance2ETH } from '@/utils/common';

import passcard1 from '@/assets/map/passcard1.png';
import passcard2 from '@/assets/map/passcard2.png';
import passcard3 from '@/assets/map/passcard3.png';
import passcard4 from '@/assets/map/passcard4.png';
import ethIcon from '@/assets/icon/eth-icon.svg';
import sellIcon from '@/assets/icon/selltag-icon.svg';
import cardInfo from '@/assets/img/card-info.svg';
import poster from '@/assets/img/pass-poster.png';

import sharedIcon from '@/assets/icon/shared-icon.svg';
import notSharedIcon from '@/assets/icon/not-shared-icon.svg';

import { geteventinfo } from '@/api/event';

// import passGif from '@/assets/pass.gif';

import styles from './index.module.css';
import classNames from 'classnames/bind';

import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const cx = classNames.bind(styles);

export default function PassCard() {
  const { account, balance, connect, status } = useWallet();

  const { data } = useApi(() => geteventinfo({ event_name: 'og_passcard_d1' }));

  const wtDate = useMemo(
    () => (data ? dayjs.utc(data.data.end_at).format('YYYY.MM.DD HH:mm') : 0),
    [data]
  );

  const publicDate = useMemo(
    () =>
      data
        ? dayjs
            .utc(data.data.end_at + 24 * 60 * 60 * 1000)
            .format('YYYY.MM.DD HH:mm')
        : 0,
    [data]
  );

  const displayBalance = useMemo(
    () => getDisplayBalance2ETH(balance, true),
    [balance]
  );

  const [getToken, , token] = useLoginToken();

  const { getMintedPerAddress, getCurrentSupply } = usePlayerOneMintPass();

  const [currentSupply, setcurrentSupply] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!account) {
      return;
    }
    (async () => {
      const res = await getCurrentSupply();
      setcurrentSupply(res);
    })();
  }, [account, getCurrentSupply]);

  // const { run } = useApi(isog, { manual: true });

  const [isOg] = useState(true);
  const [mintedCount, setMintedCount] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);

  const switchNetwork = useSwitchNetwork();

  const [success, setSuccess] = useState(false);
  const [finish, setFinish] = useState(false);

  // useEffect(() => {
  //   if (!token || !account) {
  //     return;
  //   }

  //   const asyncFn = async () => {
  //     const { code, data } = await run({
  //       address: account,
  //       login_token: token
  //     });
  //     if (code !== 200) {
  //       setIsOg();
  //     } else {
  //       setIsOg(!!data?.exists);
  //     }
  //   };

  //   asyncFn();
  // }, [account, run, token]);

  const handleOpenDialog = useCallback(async () => {
    if (!account) {
      return message.info('Please connect to wallet first');
    }

    await switchNetwork(supported_chains.ethereum);
    await getToken();

    setDialogOpen(true);

    const mintedCount = await getMintedPerAddress(account);
    setMintedCount(mintedCount);
  }, [account, getMintedPerAddress, getToken, switchNetwork]);

  const handleSuccess = useCallback(async () => {
    const mintedCount = await getMintedPerAddress(account);
    setMintedCount(mintedCount);
    setLoading(false);
    setSuccess(true);
    setFinish(true);
    const res = await getCurrentSupply();
    setcurrentSupply(res);
  }, [account, getCurrentSupply, getMintedPerAddress]);

  const [loading, setLoading] = useState(false);

  const handleBuy = useCallback(() => {
    setLoading(true);
  }, []);

  const handleFail = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setFinish(true);
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!account) {
      return message.info('Please connect to wallet first');
    }

    if (!token) {
      await getToken();
    }
  }, [account, getToken, token]);

  const mobile = useMemo(() => isMobile(), []);

  useEffect(() => {
    let timer;

    if (mobile) {
      timer = setInterval(async () => {
        await switchNetwork(supported_chains.ethereum);
      }, 2000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [mobile, switchNetwork]);

  useEffect(() => {
    let timer;

    if (mobile && status !== 'connected') {
      timer = setInterval(async () => {
        connect('injected');
      }, 2000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [connect, mobile, status]);

  useEffect(() => {
    const tokenGetter = async () => {
      if (mobile && !token) {
        let t;
        try {
          t = await getToken();
        } catch (e) {
          t = undefined;
        }

        if (!t) {
          setTimeout(async () => {
            await tokenGetter();
          }, 3000);
        }
      }
    };

    tokenGetter();
  }, [connect, getToken, mobile, switchNetwork, token]);

  useEffect(() => {
    if (mobile && token) {
      (async () => {
        const mintedCount = await getMintedPerAddress(account);
        setMintedCount(mintedCount);
      })();
    }
  }, [account, getMintedPerAddress, mobile, token]);

  if (mobile) {
    return (
      <DialogContainer
        isOg={isOg}
        data={data}
        mintedCount={mintedCount}
        account={account}
        handleBuy={handleBuy}
        loading={loading}
        handleSuccess={handleSuccess}
        handleFail={handleFail}
        currentSupply={currentSupply}
        displayBalance={displayBalance}
        mobile
      />
    );
  }

  return (
    <div className={cx('page')}>
      <Flex jc="center" gap="56px">
        <Flex fd="column" gap="16px">
          <H2 className={cx('h2')}>PARCEL MINT PASS</H2>
          <Flex ai="center" gap="56px">
            <Tag title="WL SALE" text={`${wtDate} UTC`} />
            <Tag title="PUBLIC" text={`${publicDate} UTC`} />
          </Flex>
          <div className={cx('intro')}>
            The MintPass is required to buy land in PlayerOne. To qualify for
            the appropriate size of land, purchase a MintPass of the relevant
            area. To avoid problems, each whitelisted address may only purchase
            up to two MintPasses.
          </div>

          <div className={cx('buy-btn-container')}>
            <Button onClick={handleOpenDialog}>
              <div className={cx('buy-btn')}>BUY NOW</div>
            </Button>

            <div>
              {account && token && isOg && (
                <span style={{ color: '#06c4ff' }}>
                  You are on the whitelist
                </span>
              )}
              {account && token && isOg === false && (
                <span style={{ color: '#ea4372' }}>
                  You are not on the whitelist
                </span>
              )}
              {(!account || !token || isOg === undefined) && (
                <span onClick={handleCheckout} className={cx('check-out')}>
                  Click to verify address &gt;&gt;
                </span>
              )}
            </div>
          </div>
        </Flex>

        <div className={cx('poster')}>
          <img src={poster} alt="" />
        </div>
      </Flex>

      <Flex className={cx('cards')} fd="column" gap="24px" ai="center">
        <Flex fw="wrap" gap="24px">
          <Card2 img={passcard1} size={10} />
          <Card2 img={passcard2} size={20} />
        </Flex>
        <Flex fw="wrap" gap="24px">
          <Card2 img={passcard3} size={30} />
          <Card2 img={passcard4} size={40} />
        </Flex>
      </Flex>

      <Dialog
        onCancel={() => setDialogOpen(false)}
        open={dialogOpen}
        backdrop={false}
        footer=""
        title="Qualify for Mint Pass">
        <DialogContainer
          isOg={isOg}
          data={data}
          mintedCount={mintedCount}
          account={account}
          handleBuy={handleBuy}
          loading={loading}
          handleSuccess={handleSuccess}
          handleFail={handleFail}
          currentSupply={currentSupply}
          displayBalance={displayBalance}
        />
      </Dialog>

      <LoadingDialog
        className={cx('loading')}
        open={loading}
        text="In the purchase, please later"
      />
      <ResultDialog
        open={finish}
        success={success}
        onConfirm={() => setFinish(false)}
      />
    </div>
  );
}

const DialogContainer = ({
  isOg,
  data,
  mintedCount,
  account,
  handleBuy,
  loading,
  handleSuccess,
  handleFail,
  currentSupply,
  displayBalance,
  mobile
}) => {
  return (
    <div className={cx('dialog', { mobile })}>
      <p className={cx('dialog-p')}>
        Each address can purchase up to two Mint Pass
      </p>
      <Flex gap="24px" className={cx({ 'mobile-container': mobile })}>
        <Card
          size={10}
          img={passcard1}
          isOg={isOg}
          startTime={data?.data?.end_at}
          mintedCount={mintedCount}
          account={account}
          onBuy={handleBuy}
          loading={loading}
          onSuccess={handleSuccess}
          onFail={handleFail}
          maxCount={720}
          supply={currentSupply[0]}
          balance={displayBalance}
          mobile={mobile}
        />
        <Card
          size={20}
          img={passcard2}
          isOg={isOg}
          startTime={data?.data?.end_at}
          mintedCount={mintedCount}
          account={account}
          onBuy={handleBuy}
          loading={loading}
          onSuccess={handleSuccess}
          onFail={handleFail}
          maxCount={200}
          supply={currentSupply[1]}
          balance={displayBalance}
          mobile={mobile}
        />
        <Card
          size={30}
          img={passcard3}
          isOg={isOg}
          startTime={data?.data?.end_at}
          mintedCount={mintedCount}
          account={account}
          onBuy={handleBuy}
          loading={loading}
          onSuccess={handleSuccess}
          onFail={handleFail}
          maxCount={60}
          supply={currentSupply[2]}
          balance={displayBalance}
          mobile={mobile}
        />
        <Card
          size={40}
          img={passcard4}
          isOg={isOg}
          startTime={data?.data?.end_at}
          mintedCount={mintedCount}
          account={account}
          onBuy={handleBuy}
          loading={loading}
          onSuccess={handleSuccess}
          onFail={handleFail}
          maxCount={20}
          supply={currentSupply[3]}
          balance={displayBalance}
          mobile={mobile}
        />
      </Flex>
    </div>
  );
};

const Card = ({
  size,
  img,
  isOg,
  startTime,
  mintedCount,
  account,
  onSuccess,
  onFail,
  onBuy,
  loading,
  maxCount,
  supply,
  balance,
  mobile
}) => {
  const [count, setCount] = useState(0);

  const { ethereum } = useWallet();

  // const [getToken] = useLoginToken();

  // const { run: buy } = useApi(ogbuypasscard, { manual: true });

  const { mintPass } = usePlayerOneMintPass();

  const type = useMemo(
    () => [10, 20, 30, 40].findIndex((v) => v === size),
    [size]
  );

  const price = useMemo(() => 0.2 * (type + 1) ** 2, [type]);

  const Text = useMemo(
    () =>
      !count
        ? 'Select Quantity'
        : price * count > balance
        ? 'Insufficient balance'
        : 'BUY NOW',
    [balance, count, price]
  );

  const disable = useMemo(
    () =>
      !count ||
      price * count > balance ||
      !startTime ||
      startTime > new Date().getTime(),
    [balance, count, price, startTime]
  );

  const handleBuy = useCallback(async () => {
    onBuy();

    // const token = await getToken();
    // const { code, data } = await buy({ address: account, login_token: token });
    // if (code !== 200) {
    //   onFail();
    //   return message.error('Network Error');
    // }

    try {
      const { transactionHash } = await mintPass(count, type, []);
      const web3 = new Web3(ethereum);
      await confirmTransaction(web3, transactionHash);
      onSuccess();
    } catch (error) {
      onFail();
      message.info('no enough money');
    }
  }, [count, ethereum, mintPass, onBuy, onFail, onSuccess, type]);

  return (
    <Flex fd="column" ai="center" className={cx({ 'card-mobile': mobile })}>
      <div className={cx('card')}>
        <div className={cx('img')}>
          <img src={img} alt="" />
        </div>
        <h2>
          {size}*{size} Mint Pass
        </h2>
        <p className={cx('dialog-p')}>
          After purchase you will get mint right of {size}*{size} Parcel. And be
          eligible to receive airdrops
        </p>
      </div>
      <Flex fd="column" gap="16px" className={cx('card', 'card2')}>
        <Flex jc="space-between">
          <div className={cx('price')}>{price}0 ETH /Unit</div>
          <Counter
            onChange={setCount}
            isOg={isOg}
            startTime={startTime}
            mintedCount={mintedCount}
          />
        </Flex>

        <div className={cx('remaining')}>
          {maxCount - supply} of {maxCount} Remaining
        </div>

        <Flex className={cx('all-price')} ai="center" jc="center" gap="4px">
          <img src={ethIcon} alt="" />
          <span className={cx('price')}>ETH {price * count || '0.0'}</span>
        </Flex>
      </Flex>
      <div className={cx('dialog-btn-container')}>
        <Button
          disabled={disable}
          className={cx('dialog-btn')}
          onClick={handleBuy}
          loading={loading}>
          {Text}
        </Button>
      </div>
    </Flex>
  );
};

const Counter = ({ isOg, onChange, mintedCount, startTime }) => {
  const [val, setVal] = useState(0);

  console.log('mintedCount >>>', mintedCount);

  useEffect(() => {
    onChange(val);
  }, [onChange, val]);

  useEffect(() => {
    if (mintedCount) {
      console.log('mintedCount >>>', mintedCount);
      setVal(0);
    }
  }, [mintedCount]);

  const isMax = useMemo(
    () => !isOg || val >= 2 - mintedCount || startTime > new Date().getTime(),
    [isOg, mintedCount, startTime, val]
  );

  return (
    <Flex ai="center">
      <MiniBtn disabled={val <= 0} onClick={() => setVal((val) => val - 1)}>
        -
      </MiniBtn>
      <input
        readOnly
        onChange={(val) => setVal(val)}
        value={val}
        className={cx('input')}
        type="text"
      />
      <MiniBtn disabled={isMax} onClick={() => setVal((val) => val + 1)}>
        +
      </MiniBtn>
    </Flex>
  );
};

const MiniBtn = ({ children, disabled, onClick }) => {
  return (
    <div
      onClick={disabled ? (v) => v : onClick}
      className={cx('btn', { disabled })}>
      {children}
    </div>
  );
};

export const LoadingDialog = ({ open, text }) => (
  <Dialog open={open} header="" footer="">
    <div className={styles['loading-dialog']}>
      <div>{text}</div>
      <Loading loading={true} />
    </div>
  </Dialog>
);

export const ResultDialog = ({ open, success = false, onConfirm, text }) => (
  <Dialog open={open} header="" footer="">
    <Flex className={cx('result-dialog')} fd="column" ai="center" gap="24px">
      <img width="42px" src={success ? sharedIcon : notSharedIcon} alt="" />
      <div className={cx('result-text')}>
        {text ||
          (success
            ? 'Congratulations, the purchase is successful,  You can view it on the map page'
            : 'Sorry, purchase failed, please try again')}
      </div>
      <Button onClick={onConfirm}>
        <div className={cx('confirm-btn')}>confirm</div>
      </Button>
    </Flex>
  </Dialog>
);

const Tag = ({ title, text }) => (
  <Flex ai="center" gap="8px">
    <img src={sellIcon} alt="" />
    <span className={cx('tag-title')}>{title} :</span>
    <span>{text}</span>
  </Flex>
);

const Card2 = ({ size, img }) => (
  <Flex className={cx('card2')} gap="24px">
    <img src={img} alt="" />
    <div className={cx('card2-text')}>
      <img src={cardInfo} alt="" />
      <div>
        <div>
          size {size}*{size}
        </div>
        <p>
          Following your purchase, you will be authorized to mint a {size}*
          {size} land plot.
        </p>
      </div>
    </div>
  </Flex>
);
