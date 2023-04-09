import { Suspense, useState, useCallback, useRef } from 'react';

import styled from 'styled-components';

import ModelViewer from '../index/ModelViewer';

import load from '@/utils/load';

import styles from './index.module.css';

import classNames from 'classnames/bind';

import { static_server } from '@/constant/env/index';

import { useTranslation } from 'react-i18next';

import { version } from '@/../package.json';

import MysteryBox from './MysteryBox';

import BorderedBtn from '@/components/BorderedBtn2/index';

import Dialog from '@/components/proto-ui/dialog/index';

import logoIcon from '@/assets/icon/logo.png';

//import Passcard from './passCard/index';
import Partners from './partners/index';

import tlColorIcon from '@/assets/icon/telegramColorIcon.png';
import dColorIcon from '@/assets/icon/discordColorIcon.png';
import twColorIcon from '@/assets/icon/twitterColorIcon.png';
import yColorIcon from '@/assets/icon/youtubeColorIcon.png';

import leftMan from '@/assets/img/mobile/left-man.png';
import rightMan from '@/assets/img/mobile/right-man.png';

import SideBar from '@/components/Sidebar/index';

//import SlideShow from './components/SlideShow';

import Footer from '@/components/Mobile/Footer';

import Investors from './investers/index';

//import Partners from '../index/Partners';

// import { Text } from '@/components/Basic';

// import { MBox } from '../index/MysteryBox';

// import { VoxelRole } from '../index/Index';

import menuIcon from './menu.svg';

import { debounce } from 'lodash-es';

import ClickAwayListener from '@/components/proto-ui/clickAwayListener/index';

import Banner from './components/Banner/index';

const cx = classNames.bind(styles);

const {
  logo,
  title2,
  tv,
  // play,
  bg_svg: bgSvg,
  // giant1,
  // giant2,
  // mountain,
  water,
  // torch1,
  // torch1Light: torch1light,
  // torch2,
  // torch2Light: torch2light,
  desk,
  // stars1,
  // stars2,
  // stars3,
  // stars4,
  // ufo,
  // ufoLight,
  voxelIcon1,
  voxelIcon2,
  voxelIcon3
  // stand,
  // standSelected,
  // dance1: danceSelected,
  // dance1Selected: dance,
  // contactIcon,
  // docsIcon
} = load('img/index');

const {
  sP1,
  nP1,
  sP2,
  nP2,
  sP3,
  nP3,
  voIcon,
  voText,
  voLine,
  vo1,
  vo2,
  vo3
  //footIcon
} = load('img/mobile/index');

const Mobile = () => {
  const { t } = useTranslation();
  const [showSidebar, setShowSidebar] = useState();
  const [actionIndex, setActionIndex] = useState(1);
  const [hasScroll, setHasScroll] = useState(false);
  const [rolling, setRolling] = useState(2);
  const [current, setCurrent] = useState(0);

  const bannerElement = useRef();

  const next = useCallback(() => {
    const nextEl = document.querySelector('.next');

    setRolling(1);

    setTimeout(() => {
      if (current < 2) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
      setRolling(2);
      if (nextEl) nextEl.click();
    }, 460);
  }, [current]);

  const prev = useCallback(() => {
    const nextEl = document.querySelector('.prev');

    setRolling(-1);

    setTimeout(() => {
      if (current > 0) {
        setCurrent(current - 1);
      } else {
        setCurrent(2);
      }
      setRolling(-2);
      if (nextEl) nextEl.click();
    }, 460);
  }, [current]);

  const bannerIntoView = useCallback(() => {
    if (hasScroll) return;
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    const rect = bannerElement.current.getBoundingClientRect();

    if (rect.top > vHeight) {
      setHasScroll(true);
      next();
    }
  }, [next, hasScroll]);
  const handleScroll = debounce(bannerIntoView, 100);

  const [
    animationName
    // , setAnimationName
  ] = useState('dance1');

  return (
    <div className={cx('root')} onScroll={handleScroll}>
      <div className={cx('mobile')}>
        <div className={cx('header')}>
          <img
            onMouseDown={(e) => {
              e.stopPropagation();
              setShowSidebar((val) => !val);
            }}
            className={cx('logo', {
              'show-icon': showSidebar,
              'hide-icon': !showSidebar
            })}
            src={menuIcon}
            alt=""
          />
          <div>PLAYER ONE</div>
          <img id="logo-img" className={cx('logo')} src={logoIcon} alt="" />
        </div>

        <ClickAwayListener
          onClickAway={() => (showSidebar ? setShowSidebar(false) : '')}>
          <div
            className={cx('sidebar', {
              'show-sidebar': showSidebar,
              'hide-sidebar': showSidebar === false
            })}>
            <SideBar />
          </div>
        </ClickAwayListener>

        {/* <Passcard /> */}

        <div className={cx('page')}>
          <BgWeb />
          <div className={cx('page1')}>
            <img className={cx('title-logo')} src={logo} alt="" />
            <img className={cx('title-img')} src={title2} alt="" />
            <p>{t('start.intro')}</p>
            <MetaData />
            <img className={cx('tv')} src={tv} alt="" />
          </div>

          <img
            style={{
              height: '52rem',
              position: 'absolute',
              bottom: '82rem',
              left: 0
            }}
            src={water}
            alt=""
          />
          <div className={cx('bottom-box')}>
            <img style={{ width: '180rem' }} src={desk} alt="" />
          </div>

          <img className={cx('left-man')} src={leftMan} alt="" />
          <img className={cx('right-man')} src={rightMan} alt="" />
        </div>
      </div>

      <MysteryBox />

      {/* <VoxelRole /> */}

      <div className={cx('role_box')}>
        <div className={cx('role_box')}>
          <Suspense fallback={''}>
            <ModelViewer animationName={animationName} />
          </Suspense>
        </div>
        <div className={cx('role_action_box')}>
          <div
            onClick={() => {
              setActionIndex(1);
            }}>
            {actionIndex === 1 ? (
              <img src={sP1} alt="" />
            ) : (
              <img src={nP1} alt="" />
            )}
          </div>
          <div
            onClick={() => {
              setActionIndex(2);
            }}>
            {actionIndex === 2 ? (
              <img src={sP2} alt="" />
            ) : (
              <img src={nP2} alt="" />
            )}
          </div>
          <div
            onClick={() => {
              setActionIndex(3);
            }}>
            {actionIndex === 3 ? (
              <img src={sP3} alt="" />
            ) : (
              <img src={nP3} alt="" />
            )}
          </div>
        </div>
      </div>

      <div className={cx('voxel-role-box')}>
        <div className={cx('vo-head-box')}>
          <div className={cx('vo-head')}>
            <img className={cx('vo-head-img1')} src={voIcon} alt="" />
            <img src={voText} alt="" />
          </div>
          <div className={cx('vo-head-text')}>{t('start.voxel_title')}</div>
          <img src={voLine} alt="" />
        </div>
        <div className={cx('vo-content-box')}>
          <div className={cx('vo-con-line')}>
            <img src={vo1} alt="" />
            <div>{t('start.voxel_p1')}</div>
          </div>
          <div className={cx('vo-con-line')}>
            <img src={vo2} alt="" />
            <div>{t('start.vo_2')}</div>
          </div>
          <div className={cx('vo-con-line')}>
            <img src={vo3} alt="" />
            <div>{t('start.voxel_p3')}</div>
          </div>
        </div>
        <div className={cx('vo-btn-box')}>
          <BorderedBtn
            bgColor="#00c4fc"
            borderColor="#00c4fc"
            height="48px"
            style={{
              fontSize: '20px',
              fontWeight: '600',
              width: '40vw'
            }}>
            {t('start.voxel_btn1')}
          </BorderedBtn>
          <BorderedBtn
            height="48px"
            bgColor="rgba(0,0,0,0)"
            borderColor="#00c4fc"
            borderWidth="1px"
            style={{
              fontSize: '20px',
              fontWeight: '600',
              width: '40vw'
            }}>
            {t('start.voxel_btn2')}
          </BorderedBtn>
        </div>
      </div>
      <Partners />
      <Investors />
      <div
        style={{ height: '507px', position: 'relative' }}
        ref={bannerElement}>
        <Banner rolling={rolling} prev={prev} current={current} next={next} />
      </div>
      {/* <SlideShow /> */}

      <Footer />

      <Video />
    </div>
  );
};

export default Mobile;

const Flex = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0;
  }
`;

const H2 = styled.h2`
  font-weight: 900;
  font-size: 48px;
  text-shadow: 5px 5px 0px #000000;
  color: #fff;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-left: 12px;
  color: rgba(255, 255, 255, 0.65);
`;

const H3 = styled.h3`
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  padding: 36px 0;
  margin: 12px 0 0 0;
  color: #fff;
`;

const BgWeb = () => (
  <div
    className={cx('bg-web')}
    style={{ backgroundImage: `url(${bgSvg})` }}></div>
);

const MetaData = () => {
  return (
    <div className={cx('meta-data')}>
      <img src={tlColorIcon} alt="" />
      <img src={dColorIcon} alt="" />
      <img src={twColorIcon} alt="" />
      <img src={yColorIcon} alt="" />
    </div>
  );
};

const Video = () => {
  return (
    <Dialog open={false}>
      <div>
        <video
          width="100%"
          controls
          src={`${static_server}/pubs/PlayerOne_Trailer_v5.mp4?ver=${version}`}></video>
      </div>
    </Dialog>
  );
};
