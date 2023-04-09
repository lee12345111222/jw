import React, {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { Flex } from '@/components/Basic';

import Part01Img from '@/assets/img/create/part-01.png';
import Part02Img from '@/assets/img/create/part-02.png';
import Part03Img from '@/assets/img/create/part-03.png';
import Part04Img from '@/assets/img/create/part-04.png';
import Part05Img from '@/assets/img/create/part-05.png';
import N from '@/assets/img/create/N.png';
import SR from '@/assets/img/create/SR.png';
import R from '@/assets/img/create/R.png';
import SSR from '@/assets/img/create/SSR.png';
import imageLoading from '@/components/videoPlayer/assets/imageLoading.png';
import playIcon from '@/assets/icon/play-icon.png';
// import pauseIcon from '@/assets/icon/pause-icon.png';
import VoxelAndRoleBgImg from '@/assets/img/create/voxel-bg.png';
import SpaceBgImg from '@/assets/img/create/space-bg.png';
import Logo from '@/assets/img/index/logo.png';

import voxelEditorImg from 'src/assets/img/create/voxel-img.png';
import SpaceEditerImg from 'src/assets/img/create/space-img.png';
import RoleEditorImg from 'src/assets/img/create/role-img.png';

import SubtitleIcon from 'src/assets/img/create/subtitle-text.svg';

import BorderedBtn from '@/components/BorderedBtn2/index';

import { useHistory } from 'react-router-dom';

import { message } from 'antd';
import { isTest } from '@/utils/common';

import { FooterLinkArray } from '@/utils/footer-link';

const cx = classNames.bind(styles);

export const CreateTitle = ({ children }) => {
  return <div className={cx('create-title')}>{children}</div>;
};
export const CreateSubtitle = ({ children }) => {
  return <div className={cx('create-subtitle')}>{children}</div>;
};
export const CardTitle = ({ children, style }) => {
  return (
    <div className={cx('card-title')} style={style}>
      {children}
    </div>
  );
};
export const CardContent = ({ children, className, onClick = () => {} }) => {
  return (
    <div className={cx('card-content', className)} onClick={onClick}>
      {children}
    </div>
  );
};
export const DescContent = ({ children, className }) => {
  return <div className={cx('desc-content', className)}>{children}</div>;
};

export const EditIconArea = ({ src }) => {
  return (
    <div className={cx('edit-icon')}>
      <img src={src} width="20px" alt="" />
    </div>
  );
};

export const VoxelPart = ({ icon, bodyImg, name, className }) => {
  return (
    <>
      <Flex
        fd="column"
        ai="center"
        gap="12px"
        className={cx('voxel-part', className)}
        style={{ padding: '40px 24px 30px', position: 'relative' }}>
        <div className={cx('voxel-part-icon')}>
          <Image src={icon} height="20%" />
        </div>
        <Image src={bodyImg} width="100%" />
        <DescContent className={cx('card-desc-title')}>{name}</DescContent>
      </Flex>
    </>
  );
};
export const VoxelPartArea = () => {
  return (
    <Flex ai="center" jc="center" gap={'20px'} style={{ width: '100%' }}>
      <FirstVoxelPart />
      <SecondVoxelPart />
      <ThirdVoxelPart />
      <FouredVoxelPart />
      <FifthVoxelPart />
    </Flex>
  );
};
const FirstVoxelPart = () => {
  return (
    <>
      <VoxelPart
        className={cx('part-01')}
        icon={N}
        bodyImg={Part01Img}
        name="Stylized Tee"
      />
    </>
  );
};
const SecondVoxelPart = () => {
  return (
    <>
      <VoxelPart
        className={cx('part-02')}
        icon={R}
        bodyImg={Part02Img}
        name="Trenchcoat"
      />
    </>
  );
};
const ThirdVoxelPart = () => {
  return (
    <>
      <VoxelPart
        className={cx('part-03')}
        icon={SR}
        bodyImg={Part03Img}
        name="Skeleton Earrings"
      />
    </>
  );
};
const FouredVoxelPart = () => {
  return (
    <>
      <VoxelPart
        className={cx('part-04')}
        icon={SR}
        bodyImg={Part04Img}
        name="Kerchief"
      />
    </>
  );
};

const FifthVoxelPart = () => {
  return (
    <>
      <VoxelPart
        className={cx('part-05')}
        icon={SSR}
        bodyImg={Part05Img}
        name="Gold Afro"
      />
    </>
  );
};

const VoxelEditorCard = ({ title, content, src }) => {
  return (
    <div className={cx('voxel-editor-card')}>
      <EditIconArea src={src} />
      <CardTitle style={{ margin: '22px 0 16px 0' }}>{title}</CardTitle>
      <CardContent>{content}</CardContent>
    </div>
  );
};

export const VoxelEditorCardArea = ({ cardList }) => {
  const CardList = useMemo(() => {
    return cardList?.map((item, index) => {
      return <VoxelEditorCard {...item} key={index} />;
    });
  }, [cardList]);

  return <Flex gap="20px">{CardList}</Flex>;
};

export const Image = ({ src, width, height }) => {
  const containerStyle = useMemo(() => {
    const style = {};
    if (width) {
      style.width = width;
    }
    if (height) {
      style.height = height;
    }
    return style;
  }, [height, width]);

  const ImageStyle = useMemo(() => {
    const style = {
      display: 'block'
    };
    if (width) {
      style.width = '100%';
    }
    if (height) {
      style.height = '100%';
    }
    return style;
  }, [height, width]);

  return (
    <div style={containerStyle} className={cx('')}>
      <img src={src} style={ImageStyle} alt="" />
    </div>
  );
};

const RoleEditorVideo = ({ desc, src, href }) => {
  return (
    <Flex ai="center" fd="column" gap="12px" className={cx('video-item')}>
      <a href={href} target="_blank" rel="noreferrer">
        <Image width="100%" src={src} />
      </a>
      <DescContent>{desc}</DescContent>
    </Flex>
  );
};

export const RoleEditorVideoArea = ({ list }) => {
  const VideoList = useMemo(() => {
    return list?.map((item, index) => {
      return <RoleEditorVideo {...item} key={index} />;
    });
  }, [list]);
  return (
    <Flex jc="center" gap="20px" className={cx('role-editor-video-area')}>
      {VideoList}
    </Flex>
  );
};

export const VideoPlayerArea = ({ videoList }) => {
  const [current, setCurrent] = useState(-1);

  const handlePlay = useCallback(
    (val) => {
      val === current ? setCurrent(undefined) : setCurrent(val);
    },
    [current]
  );

  const VideoPlayList = useMemo(() => {
    return videoList?.map(({ video }, index) => {
      return (
        <VideoPlayerCopy
          index={index}
          key={index}
          onPlay={handlePlay}
          video={video}
          current={current}
          poster=""
          loop
        />
      );
    });
  }, [current, handlePlay, videoList]);

  return (
    <Flex ai="center" jc="center" gap="20px">
      {VideoPlayList}
    </Flex>
  );
};

export const VideoPlayerCopy = function ({
  video,
  preload,
  poster,
  loop,
  muted = true,
  index = 0,
  current = undefined,
  onPlay
}) {
  const videoElement = useRef();
  const [canPlay, setCanPlay] = useState();
  const [playStatus, setPlayStatus] = useState(false);

  const pause = useCallback(() => {
    if (!videoElement?.current) {
      return;
    }
    setPlayStatus(false);
    videoElement.current.pause();
    videoElement.current.currentTime = 0;
  }, []);

  const play = useCallback(() => {
    if (!videoElement?.current) {
      return;
    }
    setPlayStatus(true);
    videoElement.current.play();

    return () => videoElement.current.pause();
  }, []);

  useEffect(() => {
    index === current ? play() : pause();
  }, [current, index, pause, play]);

  const handlePlay = useCallback(
    (event) => {
      event.stopPropagation();

      if (onPlay) {
        onPlay(index === current ? undefined : index);
      } else {
        playStatus ? pause() : play();
        setPlayStatus(!playStatus);
      }
    },
    [current, index, onPlay, pause, play, playStatus]
  );

  return (
    <div
      className={styles['video-box']}
      style={{ backgroundImage: `url(${imageLoading})` }}>
      <video
        className={`${styles.video} ${canPlay ? styles.onload : ''}`}
        onCanPlay={() => setCanPlay(true)}
        ref={videoElement}
        src={video}
        poster={poster}
        loop={loop}
        muted={muted}
        onClick={handlePlay}
        preload={preload || 'metadata'}
      />

      {!playStatus && (
        <img
          className={styles['play-icon']}
          onClick={handlePlay}
          src={playIcon}
          alt=""
        />
      )}
    </div>
  );
};

const SubFooterLeftContent = ({ children }) => {
  return (
    <CardContent className={cx('subfooter-left-content')}>
      {children}
    </CardContent>
  );
};

const SubFooterRightContent = ({ children }) => {
  return (
    <CardContent className={cx('subfooter-right-content')}>
      {children}
    </CardContent>
  );
};

const SubFooterRightTitle = ({ children }) => {
  return (
    <CardTitle className={cx('subfooter-right-title')}>{children}</CardTitle>
  );
};

const SubFooter = ({ src, children }) => {
  return (
    <div className={cx('subfooter-container')}>
      <img src={src} alt="" />
      {children}
    </div>
  );
};

export const VoxelSubFooter = () => {
  return (
    <SubFooter src={VoxelAndRoleBgImg}>
      <div className={cx('children-container')}>
        <LeftContent />
        <RightContent src={voxelEditorImg} />
      </div>
    </SubFooter>
  );
};

export const RoleSubFooter = () => {
  return (
    <SubFooter src={VoxelAndRoleBgImg}>
      <div className={cx('children-container')}>
        <LeftContent />
        <RightContent src={RoleEditorImg} />
      </div>
    </SubFooter>
  );
};

export const SpaceSubFooter = () => {
  return (
    <SubFooter src={SpaceBgImg}>
      <div className={cx('children-container')}>
        <LeftContent />
        <RightContent src={SpaceEditerImg} />
      </div>
    </SubFooter>
  );
};

const LeftContent = () => {
  return (
    <div className={cx('left-content')}>
      <Flex fd="column">
        <img src={Logo} alt="" height="34px" width="264px" />
        <div style={{ margin: '10px 0' }}>
          <img src={SubtitleIcon} alt="" />
        </div>
        <SubFooterLeftContent>
          Create your own metaverse building and invite friends to play together
        </SubFooterLeftContent>
      </Flex>
    </div>
  );
};

const RightContent = ({ src }) => {
  const handleClick = () => {
    window.open('//discord.gg/playeroneworld');
  };

  return (
    <Flex ai="center" className={cx('right-content')} jc="space-between">
      <Flex fd="column" style={{ marginLeft: 32 }}>
        <SubFooterRightTitle>Join our community</SubFooterRightTitle>
        <SubFooterRightContent>
          Let's party in the PlayerOne, learn more about the project information
          by following us.
        </SubFooterRightContent>
        <div style={{ width: 106 }}>
          <BorderedBtn width="106px" height="20px" onClick={handleClick}>
            Join Us
          </BorderedBtn>
        </div>
      </Flex>
      <img src={src} className={cx('right-content-img')} alt="" />
    </Flex>
  );
};

export const Footer = ({ bgColor = 'rgba(48, 60, 70, 0.1)' }) => {
  return (
    <Flex
      className={cx('footer-container')}
      ai="center"
      jc="space-between"
      // gap="120px"
      style={{
        background: bgColor
      }}>
      <FooterLeft />
      <FooterCenter />
      <FooterRight />
    </Flex>
  );
};

const FooterLeft = () => {
  return (
    <Flex fd="column">
      <img src={Logo} width="214px" alt="" />
      <div className={cx('footer-left-line')}></div>
      <CardContent className={cx('footer-left-content')}>
        Everyone Can Build Metaverse
        <CardContent className={cx('footer-left-content')}>
          Metaverse Integrating Tool, Social, Market,and P2E
        </CardContent>
      </CardContent>
    </Flex>
  );
};

const FooterCenter = () => {
  const footerNav = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Market', path: '/market' },
      { name: 'Press', path: '/press' },
      { name: 'Create', path: '/create' },
      { name: 'Box', path: '/mysterybox' },
      { name: 'Document', path: 'document' },
      { name: 'Map', path: '/map' },
      { name: 'Discover', path: '/discover' },
      { name: 'About Us', path: '/aboutus' }
    ],
    []
  );

  const lineFooterNav = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Market', path: '/market' },
      { name: 'Create', path: '/create' },
      { name: 'Box', path: '/mysterybox' },
      { name: 'Document', path: 'document' },
      { name: 'Map', path: '/map' },
      { name: 'Discover', path: '/discover' }
    ],
    []
  );

  const nav = useMemo(() => {
    if (isTest) return footerNav;
    return lineFooterNav;
  }, [footerNav, lineFooterNav]);

  const history = useHistory();

  const handleClick = (path) => {
    if (!path) {
      return message.info('Coming soon');
    }
    if (path === 'document') {
      return window.open('https://playerone.gitbook.io/doc/');
    }
    if (path === '/press') {
      return window.open(path);
    }

    history.push(path);
  };

  return (
    <div className={cx('footer-center-content')}>
      {nav.map(({ name, path }) => (
        <CardContent
          className={cx('footer-nav')}
          key={name}
          onClick={() => handleClick(path)}>
          {name}
        </CardContent>
      ))}
    </div>
  );
};

const FooterRight = () => {
  const IconList = FooterLinkArray.map(({ src, href }, index) => {
    return (
      <a key={index} href={href} target="_blank" rel="noreferrer">
        <img className={cx('footer-right-coin')} src={src} alt="icon"></img>
      </a>
    );
  });
  return (
    <Flex fd="column" gap="15px">
      <div className={cx('footer-right-title')}>FOLLOW US</div>
      <Flex gap="20px">{IconList}</Flex>
      <div className={cx('footer-right-copyright')}>
        Copyright © 2023 PlayerOne
      </div>
    </Flex>
  );
};
