import React, { useState, useCallback } from 'react';

import styles from './videoList.module.css';

import classNames from 'classnames/bind';

import videoImg from '@/assets/img/bg.png';

import Model from '@/ui/modal/index';

import { closeiconIcon } from '@/assets/icon/index';

import VideoListImg01 from '@/assets/img/index/videolist/videolist-img01.png';
import VideoListImg02 from '@/assets/img/index/videolist/videolist-img02.png';
import VideoListImg03 from '@/assets/img/index/videolist/videolist-img03.png';
import VideoListImg04 from '@/assets/img/index/videolist/videolist-img04.png';
import VideoListImg05 from '@/assets/img/index/videolist/videolist-img05.png';
import VideoListImg06 from '@/assets/img/index/videolist/videolist-img06.png';
import VideoListImg07 from '@/assets/img/index/videolist/videolist-img07.png';

const cx = classNames.bind(styles);

const videoUrlList = [
  {
    url: 'https://www.youtube.com/embed/hwuxFc8vzNQ',
    title: 'PlayerOne: Metaverse Sandbox Game Platform Trailer',
    desc: 'PlayerOne is a metaverse sandbox game platform.',
    src: VideoListImg01
  },
  {
    url: 'https://www.youtube.com/embed/J4BgMEr2gfE',
    title: 'PlayerOne Supports Meebits Import',
    desc: 'PlayerOne & Meebits Reached Strategic Partnership, Supports Meebits Import & P2E.',
    src: VideoListImg02
  },
  {
    url: 'https://www.youtube.com/embed/UL_KR998PbI',
    title: 'PlayerOne: SpaceEditor Editing Tutorial',
    desc: 'SpaceEditor editing tutorial video, through this users can learn to how to build a building.',
    src: VideoListImg03
  },
  {
    url: 'https://www.youtube.com/embed/tsKI7srDfWc',
    title: 'PlayerOne: VoxelRole Parts Mystery Box Tutorial',
    desc: 'PlayerOne VoxelRole Parts Mystery Box tutorial video, through this Mystery Box users can get VoxelRole Parts.',
    src: VideoListImg04
  },
  {
    url: 'https://www.youtube.com/embed/ICIw3YcTUDg',
    title: 'PlayerOne: SpaceEditor Animation Tutorial',
    desc: 'SpaceEditor animation tutorial video, through which users can learn how to edit animations.',
    src: VideoListImg05
  },
  {
    url: 'https://www.youtube.com/embed/d660F7fUx7M',
    title: 'PlayerOne: VoxelRole Parts Market Trading Tutorial',
    desc: 'PlayerOne VoxelRole Parts market trading tutorial video, through this Users can learn how to trade VoxelRole parts.',
    src: VideoListImg06
  },
  {
    url: 'https://www.youtube.com/embed/uBDnTwBzfJ0',
    title: 'Settle Down Guide 2: Claiming Reward',
    desc: 'Settle Down tutorial video, through this video users can learn how to claiming reward in Settle Down.',
    src: VideoListImg07
  }
];

const VideoItem = ({ url, desc, title, src, onClick = () => {} }) => {
  return (
    <>
      <div className={cx('boxItem')} onClick={() => onClick(url)}>
        <div className={cx('box-item-img')}>
          <img src={src} alt="" />
        </div>
        <div className={cx('boxItem-content')}>
          <div className={cx('boxItem-box')}>
            <div className={cx('boxItem-title')}>{title}</div>
            <div className={cx('boxItem-subtitle')}>{desc}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const VideoItemList = ({ handleClick }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('videoItemList')}>
        {videoUrlList.map((item) => (
          <VideoItem key={item.url} {...item} onClick={handleClick}></VideoItem>
        ))}
      </div>
    </div>
  );
};
export default function VideoList() {
  const [currentSrc, setCurrentSrc] = useState();

  const onClose = useCallback(() => {
    setCurrentSrc('');
  }, []);

  const handleClick = useCallback((src) => {
    setCurrentSrc(src);
  }, []);

  return (
    <>
      <div className={cx('videoList')}>
        <img src={videoImg} alt="" />
        <div className={cx('videolist-area')}>
          <div className={cx('videoList-content')}>
            <div className={cx('videoList-title')}>YouTube Video List</div>
            <div className={cx('videoList-subtitle')}>
              Metaverse Integrating Tool, Social,Market,and P2E
            </div>
            <VideoItemList handleClick={handleClick} />
          </div>
        </div>
      </div>
      <VideoModel src={currentSrc} onClose={onClose} />
    </>
  );
}

const VideoModel = ({ src, onClose = () => {} }) => {
  return (
    <Model open={!!src} className={cx('model')}>
      <div className={cx('video-container')}>
        <iframe
          width="100%"
          height="100%"
          src={src ? `${src}?autoplay=1&loop=1&modestbranding=1&rel=0` : ''}
          title=" "
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          className={cx('video-iframe')}
        />
        <div className={cx('video-close')} onClick={onClose}>
          <img src={closeiconIcon} alt="" />
        </div>
      </div>
    </Model>
  );
};
