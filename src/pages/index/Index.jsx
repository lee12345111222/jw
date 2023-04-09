import React, { useCallback, useState, Suspense, useRef } from 'react';

import styled from 'styled-components';

import { debounce, reject } from 'lodash-es';

import { useTranslation } from 'react-i18next';

import useHistory from '@/hooks/useHistory';

import MainPage from '@/components/MainPage/index';
// import BindDiscordDialog from './bindDiscordDialog';
import BorderedBtn from '@/components/BorderedBtn2/index';
// import MysteryBox from './MysteryBox';

// import Airdrop from '../airdrop/index';

// import AirdropContainer from '@/pages/airdropDaily/basic';

// import PassCard from './PassCard';
// import Pass from '../pass/index';
// import Event from './Event';

import Boxes from './Boxes';
import SpaceEditor from './SpaceEditor';

// import ParcelSale from './ParcelSale';

import { Footer } from '@/pages/createFinial/createV3/components/basic-components/index';

import ClickAwayListener from '@/components/proto-ui/clickAwayListener/index';

import { static_server } from '@/constant/env/index';

import { version } from '@/../package.json';

import { isTest } from '@/utils/common';
import Investors from './Investors';
import VideoList from './VideoList';
import Partners from './Partners';

import AirdropIcon from '@/assets/icon/airdrop-icon.png';

// import Pass from '@/pages/pass/index';

import './index.css';

import logoIcon from '@/assets/icon/logo.png';

import MainVideo from '@/components/MainVideo';

import tlColorIcon from '@/assets/icon/telegramColorIcon.png';
import dColorIcon from '@/assets/icon/discordColorIcon.png';
import twColorIcon from '@/assets/icon/twitterColorIcon.png';
import yColorIcon from '@/assets/icon/youtubeColorIcon.png';
import mColorIcon from '@/assets/icon/mirrorColorIcon.png';

import LandPlan from '@/components/landPlan/index';

import styles from './index.module.css';

import load from '@/utils/load';

import Star from './components/star';
import { NoticeDialog } from '../stationMessage/index';
import { useEffect } from 'react';

const {
  logo,
  title2,
  tv,
  play,
  bg_svg: bgSvg,
  giant1,
  giant2,
  mountain,
  water,
  torch1,
  torch1Light: torch1light,
  torch2,
  torch2Light: torch2light,
  desk,
  stars1,
  stars2,
  stars3,
  stars4,
  ufo,
  ufoLight,
  voxelIcon1,
  voxelIcon2,
  voxelIcon3,
  stand,
  standSelected,
  dance1: danceSelected,
  dance1Selected: dance,
  contactIcon,
  docsIcon,
  twitterIcon,
  discordIcon,
  telegramIcon
} = load('img/index');

const ModelViewer = React.lazy(() => import('./ModelViewer'));
const Banner = React.lazy(() => import('./components/Banner'));

const Flex = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0;
  }
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  min-width: 960px;
  min-height: 720px;
  max-height: 80vw;
  overflow-y: hidden;
  position: relative;
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LightBox = styled.div`
  position: relative;
`;

const Light = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

// const Stars = styled(Light)`
//   top: calc(8vh - 100px);
// `;

export const H2 = styled.h2`
  font-family: gilroy;
  font-weight: 900;
  font-size: 64px;
  text-shadow: 5px 5px 0px #000000;
  color: #fff;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  padding: 36px 0;
  margin: 12px 0 0 0;
  color: #fff;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-left: 12px;
  color: rgba(255, 255, 255, 0.65);
`;

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [rolling, setRolling] = useState(2);

  const [hasScroll, setHasScroll] = useState(false);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(true);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeCssClose, setNoticeCssClose] = useState(true);
  // useSessionStorageState('video_state');

  const [showVideo, setShowVideo] = useState(!isVideoModalOpen);

  const { t } = useTranslation();

  const history = useHistory();

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

  const hideVideo = useCallback(() => {
    setIsVideoModalOpen(true);
    setShowVideo(false);
  }, [setIsVideoModalOpen]);

  const [showContact, setShowContact] = useState();

  // const clickAirdrop = useCallback(() => {
  //   if (!isTest) {
  //     console.log('go soon');
  //   }
  //   history.push('/airdrop');
  // }, [history]);

  return (
    <MainPage alpha>
      {noticeCssClose ? null : (
        <NoticeDialog
          open={noticeOpen}
          setNoticeCssClose={setNoticeCssClose}
          onCancel={() => setNoticeOpen(false)}
        />
      )}

      <div
        onScroll={handleScroll}
        style={{
          overflowY: 'auto',
          height: '100%',
          scrollBehavior: 'smooth'
          // marginTop: '-56px'
        }}>
        <button
          style={{ position: 'absolute', zIndex: 999 }}
          onClick={() => {
            new Promise((resolve, reject)=>{
              setNoticeCssClose(false);
              resolve()
            }).then(()=>{
              setNoticeOpen(true);
            })
          }}>
          notice btn
        </button>

        <Page
          style={{
            background:
              'linear-gradient(180deg, #2b1850, #6341aa 23.72%, #b561d9 76.33%)'
          }}>
          <Layer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                height: '88%'
              }}>
              <img style={{ height: '100%' }} src={giant2} alt="" />
              <img style={{ height: '100%' }} src={giant1} alt="" />
            </div>
            <div
              style={{
                height: '48%',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                overflowY: 'hidden'
              }}>
              <img
                style={{ height: '100%', minWidth: '110%', margin: '0 auto' }}
                src={mountain}
                alt=""
              />
            </div>
          </Layer>
          <Layer>
            <Star />
          </Layer>
          {/* <Layer
            style={{
              backgroundImage: `url(${bgSvg})`,
              opacity: 0.75
            }}>
            <Stars
              style={{ animationDelay: '-0.8s', filter: 'brightness(2)' }}
              className="starts"
              src={stars1}
              alt=""
            />
            <Stars
              style={{ animationDelay: '1.6s', filter: 'brightness(2)' }}
              className="starts"
              src={stars2}
              alt=""
            />
            <Stars
              style={{ animationDelay: '0.8s', filter: 'brightness(2)' }}
              className="starts"
              src={stars3}
              alt=""
            />
            <Stars className="starts" src={stars4} alt="" />

            <Stars src={ufo} />
            <Stars
              style={{ animationDelay: '-1.2s', filter: 'brightness(2)' }}
              className="starts"
              src={ufoLight}
            />
          </Layer> */}

          <Layer
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              justifyContent: 'flex-start'
            }}>
            <div
              style={{
                backgroundColor: '#0f467b',
                height: '16%',
                boxSizing: 'content-box',
                width: '100%'
              }}></div>
            <img
              style={{
                width: '100%',
                height: '10%',
                marginBottom: '-3vh'
              }}
              src={water}
              alt=""
            />
          </Layer>
          <Layer
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflowY: 'hidden',
              boxSizing: 'border-box'
            }}>
            <LightBox
              style={{
                width: '34%',
                marginBottom: 'calc(-5vh - 50px)',
                marginTop: 'calc(60vh - 60px)',
                flexGrow: 0,
                flexShrink: 0
              }}>
              <img
                style={{
                  width: '100%'
                }}
                src={torch2}
                alt=""
              />
              <Light
                style={{ filter: 'brightness(2)' }}
                className="heartbeat torch2light"
                src={torch2light}
                alt=""
              />
            </LightBox>

            <div
              style={{
                width: '30%',
                marginBottom: 'calc(-5vh - 50px)',
                marginTop: 'calc(60vh - 50px)',
                marginLeft: '-5%',
                marginRight: '-5%',
                flexGrow: 0,
                flexShrink: 0
              }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                <img
                  style={{
                    width: '65%',
                    marginTop: '-40px'
                  }}
                  src={tv}
                  alt=""
                />

                <img
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setShowVideo(true);
                  }}
                  style={{
                    position: 'absolute',
                    marginTop: '-16px',
                    cursor: 'pointer'
                  }}
                  src={play}
                  alt=""
                />
              </div>

              <img
                style={{
                  width: '100%',
                  marginTop: '30px'
                }}
                src={desk}
                alt=""
              />
            </div>

            <LightBox
              style={{
                width: '34%',
                marginBottom: 'calc(-5vh - 10px)',
                marginTop: 'calc(60vh - 100px)',
                flexGrow: 0,
                flexShrink: 0
              }}>
              <img
                style={{
                  width: '100%'
                }}
                src={torch1}
                alt=""
              />

              <Light
                style={{ filter: 'brightness(2)' }}
                className="heartbeat"
                src={torch1light}
                alt=""
              />
              <Light
                style={{ filter: 'brightness(2)' }}
                className="heartbeat"
                src={torch1light}
                alt=""
              />
            </LightBox>
          </Layer>
          <Layer
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 'calc(26vh + 12vw)',
              height: '100vh',
              boxSizing: 'border-box',
              pointerEvents: 'none'
            }}>
            <img id="logo-img" style={{ height: '90px' }} src={logo} alt="" />

            <h1 style={{ fontSize: '26px', margin: '2vh 0' }}>
              <img style={{ height: '40px' }} src={title2} alt="" />
            </h1>
            <p
              style={{
                width: '650px',
                fontWeight: 'lighter',
                fontSize: '20px',
                marginBottom: 0,
                textAlign: 'center'
              }}>
              {t('start.intro')}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '38px',
                padding: '6vh 0'
              }}>
              <a
                className={styles['contanct-icon']}
                href="//twitter.com/PlayerOneWorld"
                target="_blank"
                rel="noopener noreferrer">
                <img src={twColorIcon} alt="" />
              </a>
              <a
                className={styles['contanct-icon']}
                href="//discord.gg/playeroneworld"
                target="_blank"
                rel="noopener noreferrer">
                <img src={dColorIcon} alt="" />
              </a>
              <a
                className={styles['contanct-icon']}
                href="//t.me/playeroneworld"
                target="_blank"
                rel="noopener noreferrer">
                <img src={tlColorIcon} alt="" />
              </a>
              <a
                className={styles['contanct-icon']}
                href="//bit.ly/30OTBkt"
                target="_blank"
                rel="noopener noreferrer">
                <img src={yColorIcon} alt="" />
              </a>
              <a
                className={styles['contanct-icon']}
                href="//mirror.xyz/playeroneworld.eth"
                target="_blank"
                rel="noopener noreferrer">
                <img src={mColorIcon} alt="" />
              </a>
            </div>

            {/* <div style={{ margin: '-3vh 0 3vh 0' }}>
              <BorderedBtn
                width="234px"
                height="44px"
                onClick={() => window.open(migrate_url)}
              >
                <span style={{ fontSize: '24px' }}>Migrate</span>
              </BorderedBtn>
            </div> */}
          </Layer>

          <MainVideo
            show={showVideo}
            onCancel={hideVideo}
            width="100%"
            src={`${static_server}/pubs/PlayerOne_Trailer_v5.mp4?ver=${version}`}></MainVideo>
        </Page>

        <Page>
          <Boxes />
        </Page>

        {/* <Page> */}
        {/* <Airdrop /> */}
        {/* {isTest && (
          <AirdropContainer
            onClose={() => setAirdropClickStatus(false)}
            clickStatus={airdropClickStatus}
          />
        )} */}
        {/* </Page> */}
        {/* <Page>
          <Pass />
        </Page> */}
        {/* <Page
          style={{
            background:
              'linear-gradient(180deg, #2B1850 26.24%, #6341AA 64.97%, #B561D9 108.18%)'
          }}
        >
          <PassCard />
        </Page> */}
        {/* <Page style={{ backgroundColor: '#2b184f' }}>
          <Layer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '80%',
                marginTop: '10vh',
                opacity: '0.2'
              }}>
              <img style={{ height: '100%' }} src={giant2} alt="" />
              <img style={{ height: '100%' }} src={giant1} alt="" />
            </div>
          </Layer>
          <Layer
            style={{
              backgroundImage: `url(${bgSvg})`,
              opacity: 0.6
            }}
          />
          <Layer
            style={{
              opacity: 0.8,
              background:
                'linear-gradient(180deg, rgba(49, 28, 87, 0) 39.07%, #301D55 62.8%, #301D55 66.88%, #301D55 69.8%, #301D55 74.47%)'
            }}
          />
          <ParcelSale />
        </Page> */}
        {/* <Page
          style={{
            background:
              'linear-gradient(180deg, #2B1850 26.24%, #6341AA 64.97%, #B561D9 108.18%)'
          }}
        >
          <Event />
        </Page> */}
        {/* <Page
          style={{
            background:
              'linear-gradient(180deg, #2B1850 26.24%, #6341AA 64.97%, #B561D9 108.18%)'
          }}>
          <MysteryBox />
        </Page> */}
        <Page
          style={{
            backgroundColor: '#250948',
            display: 'flex'
          }}>
          <VoxelRole />
        </Page>

        <Page>
          <SpaceEditor />
        </Page>

        <Page
          style={{
            background:
              'linear-gradient(119.18deg, #591EA6 0%, #400E82 26.32%, #210743 99.98%)'
          }}>
          <Layer
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <div></div>
            <div
              style={{
                width: '54vh',
                marginRight: '10%',
                height: '100%',
                flexShrink: 0,
                background:
                  'linear-gradient(194.04deg, rgba(85, 0, 173, 0.63) -29.43%, rgba(85, 0, 173, 0.4) 100%)'
              }}></div>
          </Layer>
          <Layer
            ref={bannerElement}
            // style={{ backgroundImage: `url(${bgSvg})`, opacity: 0.75 }}
          >
            <div
              style={{
                backgroundImage: `url(${bgSvg})`,
                opacity: 0.75,
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}></div>
            <Suspense fallback={''}>
              <Banner
                rolling={rolling}
                prev={prev}
                current={current}
                next={next}
              />
            </Suspense>
          </Layer>
        </Page>
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px'
          }}>
          <ClickAwayListener
            onClickAway={() => {
              if (showContact) {
                setShowContact(false);
              }
            }}>
            <ContactItem
              onClick={() => {
                window.open('//t.me/playeroneworld');
                setShowContact(false);
              }}
              src={telegramIcon}
              show={showContact}
            />
            <ContactItem
              onClick={() => {
                window.open('//discord.gg/playeroneworld');
                setShowContact(false);
              }}
              src={discordIcon}
              show={showContact}
            />
            <ContactItem
              onClick={() => {
                window.open('//twitter.com/PlayerOneWorld');
                setShowContact(false);
              }}
              src={twitterIcon}
              show={showContact}
            />
            <ContactItem
              onClick={() => {
                window.open('//playerone.gitbook.io/doc');
                setShowContact(false);
              }}
              src={docsIcon}
              show={showContact}
            />
            <div
              style={{ position: 'relative' }}
              onClick={() => {
                setShowContact(!showContact);
              }}>
              <img
                style={{ width: '40px', cursor: 'pointer' }}
                src={contactIcon}
                alt="contact Icon"
              />
            </div>
          </ClickAwayListener>
        </div>
        {/* {isTest && (
          <div className={styles.airdrop} onClick={clickAirdrop}>
            <img src={AirdropIcon} alt="" />
          </div>
        )} */}
        {isTest && <VideoList />}
        {isTest && <Partners />}
        <Investors />
        <Footer bgColor="linear-gradient(90deg, #3d0e7a 0%, #220844 100%)" />
      </div>
      <LandPlan text=" >" />
    </MainPage>
  );
}

const ContactItem = ({ src, show, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={
        show === true
          ? 'show-contract'
          : show === false
          ? 'hide-contract'
          : 'contract'
      }>
      <img style={{ width: '40px' }} src={src} alt="" />
    </div>
  );
};

export const VoxelRole = () => {
  const history = useHistory();
  const [animationName, setAnimationName] = useState('dance1');
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          background:
            'linear-gradient(180deg, #242453 0%, #30306F 7.63%, #4848A6 100%)',
          height: '100%',
          flexShrink: 0,
          width: '50%'
        }}>
        <Suspense fallback={''}>
          <ModelViewer animationName={animationName} />
        </Suspense>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          marginLeft: '-84px'
        }}>
        <img
          style={{ width: '32px', cursor: 'pointer' }}
          onClick={() => setAnimationName('idle')}
          src={animationName === 'idle' ? standSelected : stand}
          alt=""
        />
        <img
          style={{ width: '32px', cursor: 'pointer' }}
          src={animationName === 'dance1' ? danceSelected : dance}
          onClick={() => setAnimationName('dance1')}
          alt=""
        />
        <img
          style={{ width: '32px', cursor: 'pointer' }}
          src={animationName === 'dance2' ? danceSelected : dance}
          onClick={() => setAnimationName('dance2')}
          alt=""
        />
      </div>

      <div
        style={{
          padding: '6vh 72px',
          width: '50%',
          display: 'flex',
          boxSizing: 'border-box',
          flexDirection: 'column',
          justifyContent: 'space-around',
          flexShrink: 0
        }}>
        <Flex
          style={{
            margin: '-1vh 0'
          }}>
          <img src={logoIcon} alt="" />
          <H2>RoleEditor</H2>
        </Flex>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4vh'
          }}>
          <H3
            style={{
              alignSelf: 'flex-start'
            }}>
            {t('start.voxel_title')}
          </H3>
          <Flex>
            <img src={voxelIcon1} alt="" />
            <P>{t('start.voxel_p1')}</P>
          </Flex>

          <Flex>
            <img src={voxelIcon2} alt="" />
            <P>{t('start.voxel_p2')}</P>
          </Flex>

          <Flex>
            <img src={voxelIcon3} alt="" />
            <P>{t('start.voxel_p3')}</P>
          </Flex>
        </div>

        <div
          style={{
            display: 'flex',
            width: 'calc(100% - 8px)',
            marginLeft: '4px',
            gap: '56px',
            marginTop: '4vh',
            alignItems: 'flex-end'
          }}>
          <BorderedBtn
            bgColor="#00c4fc"
            borderColor="#00c4fc"
            height="48px"
            onClick={() => history.open('/role-editor')}
            style={{
              fontSize: '23px',
              fontWeight: '600',
              padding: '0 36px',
              maxWidth: '234px'
            }}>
            {t('start.voxel_btn1')}
          </BorderedBtn>
          <BorderedBtn
            onClick={() => history.push('/market/voxelrole')}
            height="48px"
            bgColor="rgba(0,0,0,0)"
            borderColor="#00c4fc"
            borderWidth="1px"
            style={{
              padding: '0 36px',
              fontSize: '23px',
              fontWeight: '600',
              maxWidth: '234px'
            }}>
            {t('start.voxel_btn2')}
          </BorderedBtn>
        </div>
      </div>
    </>
  );
};
