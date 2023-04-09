import { useMemo, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// import useHistory from '@/hooks/useHistory';
import { useHistory } from 'react-router-dom';

import styles from './Sidebar.module.css';

import { useTranslation } from 'react-i18next';

import BorderedBtn from '../BorderedBtn2/index';

import logo from '@/assets/icon/logo.png';

import iconList from './assets/assets.js';

import { menuList } from './menuList.js';

import { migrate_url } from '@/constant/env/index';

import ClickAwayListener from '../proto-ui/clickAwayListener/index';

import AirdropContainer from '@/pages/airdropDaily/basic';
// import { isTest } from '@/utils/common';
import { message } from 'antd';

import isMobile from 'is-mobile';
import { isTest } from '@/utils/common';

const selectedUrl = `url(${iconList.sidebarSelectedIcon})`;

/**
 * @export SideBar
 * @return {JSX.Element} Header
 */
export default function SideBar() {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleClick = useCallback(
    (url) => {
      if (isMobile()) {
        message.info('Coming soon');
      } else {
        history.push(url);
      }
    },
    [history]
  );

  const ItemList = useMemo(
    () =>
      menuList.map(({ url, title, isHot }, index) => {
        return index < 5 ? (
          <MenuItem
            onClick={() => handleClick(url)}
            key={title}
            hot={isHot}
            selected={url.split('/')[1] === pathname.split('/')[1]}
            title={title}
          />
        ) : (
          ''
        );
      }),
    [handleClick, pathname]
  );

  // const ItemList2 = useMemo(
  //   () =>
  //     menuList.map(({ url, title, isHot }, index) => {
  //       return index >= 5 ? (
  //         <MenuItem
  //           onClick={() => history.push(url)}
  //           key={title}
  //           hot={isHot}
  //           selected={url.split('/')[1] === pathname.split('/')[1]}
  //           title={title}
  //         />
  //       ) : (
  //         ''
  //       );
  //     }),
  //   [history, pathname]
  // );

  // const changeLang = useCallback(() => {
  //   const lan = lang === 'en' ? 'cn' : 'en';
  //   i18n.changeLanguage(lan);
  //   setLang(lan);
  // }, [lang, setLang, i18n]);

  // const [airdropClickStatus, setAirdropClickStatus] = useState(false);

  // const clickAirdrop = useCallback(() => {
  //   if (!isTest) {
  //     message.info('Coming soon');
  //   }
  //   setAirdropClickStatus(true);
  // }, []);

  return (
    <div className={styles.sidebar}>
      <img
        onClick={() => history.push('/')}
        className={styles.logo}
        src={logo}
        alt=""
      />
      <Menu>
        {ItemList}

        {isTest && (
          <MenuItem
            onClick={() => {
              history.push('/airdrop');
            }}
            title="airdrop"
            selected={'/airdrop'.split('/')[1] === pathname.split('/')[1]}
          />
        )}

        {/* <ClickAwayListener
          onClickAway={() => {
            setShowMore(false);
          }}>
          <MenuItem onClick={() => setShowMore(true)} title="more" />

          {menuList.length > 5 && showMore && (
            <div className={styles['more-container']}>
              <div className={styles['more-arrow']}></div>
              {ItemList2}
              <MenuItem onClick={clickAirdrop} title="airdrop" />
              <MenuItem
                onClick={() => {
                  window.open(migrate_url);
                  setShowMore(false);
                }}
                title="migrate"
              />
            </div>
          )}
        </ClickAwayListener> */}
      </Menu>

      {/* {isTest && (
        <AirdropContainer
          onClose={() => setAirdropClickStatus(false)}
          clickStatus={airdropClickStatus}
        />
      )} */}
    </div>
  );
}

const Menu = ({ children }) => {
  return <ul className={styles.menu}>{children}</ul>;
};

const MenuItem = ({ onClick, selected, title, hot }) => {
  const { t } = useTranslation();
  return (
    <li
      onClick={onClick}
      style={{
        backgroundImage: selected ? selectedUrl : null,
        position: 'relative'
      }}
      className={`${styles.item} ${selected ? styles['item-selected'] : ''}`}>
      <img
        className={styles.icon}
        src={iconList[`${title}Icon${selected ? 'Selected' : ''}`]}
        alt=""
      />
      {hot && (
        <div
          style={{
            position: 'absolute',
            right: '-9px',
            top: '-4px',
            transform: 'scale(0.5)'
          }}>
          <BorderedBtn
            height="20px"
            width="44px"
            borderWeight="4px"
            borderColor="#f34273"
            bgColor="#f34273">
            <span style={{ fontSize: '18px', color: '#fff' }}>HOT</span>
          </BorderedBtn>
        </div>
      )}
      <span>{t(`nav.${title}`)}</span>
    </li>
  );
};
