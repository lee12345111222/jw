import { useMemo, useCallback, useState } from 'react';
import BorderedBtn from '../BorderedBtn2/index';

import { useWallet } from 'use-wallet';

import { detectMetaMask, isTest } from '@/utils/common';

import { getDisplayBalance2ETH } from '@/utils/common';

import styles from './Header.module.css';

// import useHistory from '@/hooks/useHistory';
import { useHistory } from 'react-router-dom';

import { useApi2 } from '@/hooks/useApi';
import { getmgbalance } from '@/api/event';

import useSwitchNetwork from '@/hooks/useSwitchNetwork';

import { networks, supported_chains } from '@/constant/env/index';

import ClickAwayListener from '../proto-ui/clickAwayListener/index';

import { NoticeDialog } from '@/pages/stationMessage/index';

import { Dropdown } from '@/custom-ui/dropdown/index';

import ethIcon from '@/assets/icon/eth-icon.svg';
import mgIcon from '@/assets/icon/mg-icon.svg';
import opensea from '@/assets/icon/opensea-logo.svg';
import element from '@/assets/icon/element-logo.svg';

import selectIcon from '@/assets/icon/select-icon.svg';
// import messageIcon from '@/assets/icon/header-message.png';
// import quitIcon from '@/assets/icon/header-quit.png';
// import profileIcon from '@/assets/icon/header-profile.png';

/**
 * @export Header
 * @param {object} props { title, goBack }
 * @param {pageTitle} props.title -
 * @param {boolean} props.goBack -
 * @return {JSX.Element} Header
 */
export default function Header({ title, goBack, onGoBack, alpha }) {
  const { account, status, balance } = useWallet();

  const displayBalance = useMemo(
    () => getDisplayBalance2ETH(balance, true),
    [balance]
  );

  return (
    <div className={`${styles.header} ${alpha ? styles.alpha : ''}`}>
      <Title title={title} goBack={goBack} onGoBack={onGoBack} />
      {status === 'connected' ? (
        <User account={account} displayBalance={displayBalance} />
      ) : (
        <Login />
      )}
    </div>
  );
}

const Title = ({ title, goBack, onGoBack }) => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    if (goBack) {
      onGoBack ? onGoBack() : history.goBack();
    }
  }, [goBack, history, onGoBack]);

  return (
    <div
      className={`${styles.title} ${goBack ? styles.goBack : ''}`}
      onClick={handleGoBack}>
      {goBack ? <LeftOutlined /> : ''}
      <div>{title}</div>
    </div>
  );
};

/**
 *
 * @param {object} props { account, displayBalance }
 * @param {string} props.account -
 * @param {number} props.displayBalance -
 */
const User = ({ account, displayBalance }) => {
  const { chainId, reset: walletReset } = useWallet();
  // const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  const [noticeCssClose, setNoticeCssClose] = useState(true);

  const { data: { data: { balance } } = { data: { balance: 0 } } } = useApi2(
    () => getmgbalance({ address: account }),
    {},
    [account]
  );

  const [showProfile, setShowProfile] = useState(false);

  const history = useHistory();

  const elementArray = useMemo(() => {
    return [
      {
        title: 'PlayerOne Parcel',
        url: 'https://element.market/collections/playeroneworld'
      },
      {
        title: 'PlayerOne Blueprint',
        url: 'https://element.market/collections/playerone-blueprint'
      },
      {
        title: 'PlayerOne VoxelRole',
        url: 'https://element.market/collections/playerone-voxelrole'
      },
      {
        title: 'VoxelRole Parts',
        url: 'https://element.market/collections/voxelroleparts'
      },
      {
        title: 'PlayerOne MintPass',
        url: 'https://element.market/collections/playerone-mintpass'
      },
      {
        title: 'PlayerOne Jetpack',
        url: 'https://element.market/collections/playerone-jetpack'
      }
    ];
  }, []);

  const openseaArray = useMemo(() => {
    return [
      {
        title: 'PlayerOne Parcel',
        url: 'https://opensea.io/collection/playeroneworld'
      },
      {
        title: 'PlayerOne Blueprint',
        url: 'https://opensea.io/collection/playerone-blueprint'
      },
      {
        title: 'PlayerOne VoxelRole',
        url: 'https://opensea.io/collection/voxelrole'
      },
      {
        title: 'VoxelRole Parts',
        url: 'https://opensea.io/collection/voxelroleparts'
      },
      {
        title: 'PlayerOne MintPass',
        url: 'https://opensea.io/collection/playerone-mintpass'
      },
      {
        title: 'PlayerOne Jetpack',
        url: 'https://opensea.io/collection/playerone-jetpack'
      }
    ];
  }, []);

  const handleOpenProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const handleOpenAssets = useCallback(() => {
    history.push('/assets');
  }, [history]);

  const handleCloseNoticeDialog = useCallback(() => {
    setShowNoticeDialog(false);
  }, []);

  return (
    <div className={styles['user-container']}>
      {/* <div className={styles.info}>
        <span>
          {displayBalance} {networks[chainId]?.native_currency.symbol ?? 'ETH'}
        </span>
        <span className={styles.address}>{showShortAddress(account)}</span>
      </div> */}

      <Redirect src={opensea} array={openseaArray} />
      <Redirect src={element} array={elementArray} />

      {account && (
        <>
          <Balance
            src={ethIcon}
            balance={displayBalance}
            name={networks[chainId]?.native_currency.symbol ?? 'ETH'}
          />

          <Balance src={mgIcon} balance={balance} name="MG" />
        </>
      )}

      {isTest && (
        <>
          {noticeCssClose ? null : (
            <NoticeDialog
              open={showNoticeDialog}
              setNoticeCssClose={setNoticeCssClose}
              onCancel={handleCloseNoticeDialog}
            />
          )}
          <div
            onClick={() =>
              new Promise((resolve, reject) => {
                setNoticeCssClose(false);
                resolve();
              }).then(() => {
                setShowNoticeDialog(true);
              })
            }>
            占位
          </div>
        </>
      )}
      <ClickAwayListener onClickAway={() => setShowProfile(false)}>
        <div className={styles.avatar} onClick={() => setShowProfile(true)}>
          {showProfile && (
            <ul className={styles.profile}>
              <div onClick={handleOpenProfile} className={styles.liContainer}>
                {/* <img src={profileIcon} className={styles.imgIcon} alt="" /> */}
                Profile
              </div>

              <div onClick={handleOpenAssets} className={styles.liContainer}>
                My Assets
              </div>

              <div
                className={styles.liContainer}
                style={{ color: '#FF069B' }}
                onClick={walletReset}>
                {/* <img src={quitIcon} className={styles.imgIcon} alt="" /> */}
                Disconnect
              </div>
            </ul>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

const Balance = ({ src, balance, name }) => (
  <div className={styles.balance}>
    <img width="14px" src={src} alt="" />
    <span>{balance}</span>
    <span>{name}</span>
  </div>
);

const createElement = (title, url) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#fff' }}>
      <div className={styles['image-option']}>{title}</div>
    </a>
  );
};

const Redirect = ({ src, array }) => {
  const options = array.map((item) => {
    return {
      component: createElement(item.title, item.url)
    };
  });

  // if (isTest) {
  return (
    <div className={styles.balance}>
      <Dropdown className={styles['dropdown']} options={options}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}>
          <img src={src} alt="" />
          <img src={selectIcon} alt="" />
        </div>
      </Dropdown>
    </div>
  );
  // }

  // return (
  //   <div className={styles.balance}>
  //     <a href={array[0].url} target="_blank" rel="noreferrer">
  //       <img src={src} alt="" />
  //     </a>
  //   </div>
  // );
};

/**
 *
 * @description
 */
export const Login = () => {
  const { connect } = useWallet();

  const switchNetwork = useSwitchNetwork();

  const login = useCallback(async () => {
    const currentProvider = detectMetaMask();
    try {
      if (
        typeof currentProvider === 'undefined' ||
        +currentProvider.chainId !== supported_chains.ethereum
      ) {
        await switchNetwork(supported_chains.ethereum);
      }

      connect('injected');
    } catch (err) {
      console.error(err);
    }
  }, [connect, switchNetwork]);

  return <BorderedBtn onClick={login}>Connect Wallet</BorderedBtn>;
};

/**
 * @typedef {string} pageTitle
 */
const LeftOutlined = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true">
    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
  </svg>
);
