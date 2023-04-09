import { useCallback, useState } from 'react';

import styles from './index.module.css';

import ToolContainer from './ToolContainer';

import addIcon from './../images/add_icon.png';
import minusIcon from './../images/minus_icon.png';
import zoomIcon from './../images/zoom_icon.png';
import fullIcon from './../images/full_icon.png';
import exitFullIcon from './../images/exit_full_icon.svg';

const isFullScreen = () =>
  document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

document.exitFullScreenFn =
  document.exitFullscreen ||
  document.mozCancelFullScreen ||
  document.webkitExitFullscreen;

const el = document.documentElement;

el.fullScreenFn =
  el.requestFullscreen ||
  el.mozRequestFullScreen ||
  el.webkitRequestFullscreen ||
  el.msRequestFullscreen;

const Zoom = ({ map }) => {
  const [isFull, setIsFull] = useState(isFullScreen());

  const fullScreen = useCallback(async () => {
    if (isFullScreen()) {
      await document.exitFullScreenFn();
    } else {
      await el.fullScreenFn();
    }
    setIsFull(isFullScreen());
  }, []);

  return (
    <>
      <ToolContainer className={styles.fullscreen}>
        <div onClick={fullScreen}>
          <img src={isFull ? exitFullIcon : fullIcon} alt="" />
        </div>
      </ToolContainer>
      <ToolContainer className={styles.zoom}>
        <div
          onClick={() => {
            map.setZoom(map.getZoom() + 1);
          }}
        >
          <img src={addIcon} alt="" />
        </div>
        <div onClick={map.reset}>
          <img src={zoomIcon} alt="" />
        </div>
        <div
          onClick={() => {
            map.setZoom(map.getZoom() - 1);
          }}
        >
          <img src={minusIcon} alt="" />
        </div>
      </ToolContainer>
    </>
  );
};

export default Zoom;
