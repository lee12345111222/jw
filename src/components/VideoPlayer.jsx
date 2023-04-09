import { useState, useEffect, useCallback, useRef } from 'react';

import load from '@/utils/load';

import styled from 'styled-components';

const { playIcon, pauseIcon } = load('icon');

const PlayerBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: '#2a2d32';
  overflow: hidden;
  & video {
    width: 100%;
    height: calc(100% + 2px);
    object-fit: initial;
  }

  & img {
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
`;

/**
 *
 * @description
 * @typedef {string} url
 * @export VideoPlayer
 * @param {object} option -
 * @param {url} option.src -
 * @return {JSX.Element}
 */
export default function VideoPlayer({
  src,
  width,
  style,
  preload,
  poster,
  loop,
  muted,
  index = 0,
  current = undefined,
  onPlay
}) {
  const [playState, setPlayState] = useState(false);
  const [playerIcon, setPlayerIcon] = useState(playIcon);

  const videoElement = useRef();

  const play = useCallback(() => {
    setPlayerIcon(pauseIcon);
    videoElement?.current?.play();
  }, []);

  const pause = useCallback(() => {
    setPlayerIcon(playIcon);
    if (videoElement && videoElement.current) {
      videoElement.current.currentTime = 0;
      videoElement.current.pause();
    }
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
        playState ? pause() : play();
        setPlayState(!playState);
      }
    },
    [current, index, onPlay, pause, play, playState]
  );

  return (
    !src || (
      <PlayerBox style={{ width: width, ...style }}>
        <video
          ref={videoElement}
          src={src}
          poster={poster}
          loop={loop}
          muted={muted}
          preload={preload || 'metadata'}
        ></video>

        <img onClick={handlePlay} src={playerIcon} alt="" />
      </PlayerBox>
    )
  );
}
