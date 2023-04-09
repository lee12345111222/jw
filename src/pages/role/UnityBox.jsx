import { useEffect } from 'react';

import Unity, { UnityContent } from 'react-unity-webgl2';

// import { Loading } from './components';

import { role_player_server } from '@/constant/env/index';

import { version } from '@/../package.json';

import './unity.css';

export const unityContent = new UnityContent(
  `${role_player_server}/nft-pixcel-game.json?v=${version}`,
  `${role_player_server}/UnityLoader.js?v=${version}`
);

export default function UnityBox({ onLoad, onProgress, duration }) {
  useEffect(() => {
    unityContent.on('progress', function (progression) {
      if (progression === 1) {
        setTimeout(() => {
          unityContent.send('WebApi', 'WebApiChangePart', '0, 0');
          onProgress(progression);
          onLoad?.();
        }, 2 * 1000);
      } else {
        onProgress(progression);
      }
    });
  }, [onLoad, onProgress]);

  useEffect(() => {
    if (duration !== 1) {
      return;
    }

    const unity = {
      _isRotate: false,
      rotate() {
        this._isRotate = !this._isRotate;
        unityContent.send(
          'WebApi',
          'WebApiAutoRotateCamera',
          this._isRotate ? 'yes' : 'no'
        );
        return this._isRotate;
      },
      setRenderQuality(num = 7) {
        const quality = num > 7 ? 7 : num < 1 ? 1 : num;
        unityContent.send(
          'WebApi',
          'WebApiAdjustRenderQuality',
          quality.toString()
        );
      }
    };

    Object.assign(window, { _unity: unity });

    return () => delete window._unity;
  }, [duration]);

  return (
    <div className="unity-box">
      <Unity unityContent={unityContent} />
      {/* {duration < 1 ? <Loading duration={duration * 100} /> : ''} */}
    </div>
  );
}
