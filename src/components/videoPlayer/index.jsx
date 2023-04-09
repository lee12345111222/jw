import { useState, useRef, useCallback, useEffect } from 'react';

import styles from './index.module.css';

import imageLoading from './assets/imageLoading.png';
import playIcon from '@/assets/icon/play-icon.png';
import pauseIcon from '@/assets/icon/pause-icon.png';

export default function VideoPlayer({
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
      style={{ backgroundImage: `url(${imageLoading})` }}
    >
      <video
        className={`${styles.video} ${canPlay ? styles.onload : ''}`}
        onCanPlay={() => setCanPlay(true)}
        ref={videoElement}
        src={video}
        poster={poster}
        loop={loop}
        muted={muted}
        preload={preload || 'metadata'}
      />

      {canPlay && (
        <img
          className={styles['play-icon']}
          onClick={handlePlay}
          src={playStatus ? pauseIcon : playIcon}
          alt=""
        />
      )}
    </div>
  );
}
