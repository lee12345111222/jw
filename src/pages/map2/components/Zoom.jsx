import { useMemo } from 'react';

import styles from './index.module.css';

import ToolContainer from './ToolContainer';

import addIcon from './../images/add_icon.png';
import minusIcon from './../images/minus_icon.png';
import zoomIcon from './../images/zoom_icon.png';
import fullIcon from './../images/full_icon.png';

const fullScreen = () => {
  const el = document.documentElement;

  document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    ? document.exitFullscreen?.() ||
      document.mozCancelFullScreen?.() ||
      document.webkitExitFullscreen?.()
    : el.requestFullscreen?.() ||
      el.mozRequestFullScreen?.() ||
      el.webkitRequestFullscreen?.() ||
      el.msRequestFullscreen?.();
};

const Zoom = ({ map }) => {
  const defaultCenter = useMemo(() => map.getBounds(), [map]);

  return (
    <>
      <ToolContainer className={styles.fullscreen}>
        <div onClick={fullScreen}>
          <img src={fullIcon} alt="" />
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
        <div
          onClick={async () => {
            if ((await map.getZoom()) === 3) {
              await map.setZoom(2);
              setTimeout(() => {
                map.setZoom(-2);
              }, 280);
            }
            map.fitBounds(defaultCenter);
          }}
        >
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
