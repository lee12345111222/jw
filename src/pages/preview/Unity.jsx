import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Unity, { UnityContext } from 'react-unity-webgl';

import { useTranslation } from 'react-i18next';

import { Progress } from 'antd';

import { useWallet } from 'use-wallet';
import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';

import LoadingAnimation from './LoadingAnimation';

import Ui from './Ui';

import Help from './Help';

// import { preview_static_server } from '@/constant/env/index';

import usePointerlockchange from '@/hooks/usePointerlockchange';

// import { version } from '@/../package.json';

const unityContext = new UnityContext({
  loaderUrl: '/game/share/PlayerOneShare.loader.js',
  dataUrl: '/game/share/PlayerOneShare.data.unityweb',
  frameworkUrl: '/game/share/PlayerOneShare.framework.js.unityweb',
  codeUrl: '/game/share/PlayerOneShare.wasm.unityweb'
});

const Pr = styled(Progress)`
  & .ant-progress-inner {
    background-color: #374350;
  }
`;

const Loading = ({ duration, loadingMsg }) => {
  const [dots, setDots] = useState('.');
  const { t } = useTranslation();

  useEffect(() => {
    if (dots === '...') {
      setTimeout(() => {
        setDots('');
      }, 500);
    } else {
      setTimeout(() => {
        setDots(dots + '.');
      }, 500);
    }
  }, [dots]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '70px',
        backgroundColor: '#000'
      }}>
      <LoadingAnimation />
      <div>
        <Pr
          strokeColor="#00C9FF"
          percent={duration}
          showInfo={false}
          style={{ width: '25vw' }}
        />

        <p
          style={{
            padding: '16px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, .65)'
          }}>
          {loadingMsg || t('editor.loading')}
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              textAlign: 'left'
            }}>
            {dots}
          </span>
        </p>
      </div>
    </div>
  );
};

/**
 *
 * @param {{user_token: string, guest: boolean}} param0
 * @returns
 */
export default function MyUnity({ user_token, guest }) {
  const { id: spaceId, category } = useParams();

  const { account } = useWallet();

  const [progression, setProgression] = useState(0);

  const [loadingMsg, setLoadingMsg] = useState();

  const [builindSize, setBuilindSize] = useState();

  const [isMeebit, setIsMeebit] = useState(true);

  useEffect(() => {
    window.ongamenotify = function (type, msg) {
      console.log('the msg type is >>>', type, msg);
      switch (type) {
        case 'download_building':
          setProgression(0.84);
          setLoadingMsg('Downloading building data');
          return;
        case 'fetch_role':
          setProgression(0.88);
          setLoadingMsg('Loading character data');
          return;
        case 'connect_mmo':
          setProgression(0.92);
          setLoadingMsg('connecting to server');
          return;
        case 'joined_room':
          setProgression(1);
          return;
        case 'download_building_done':
          setBuilindSize(msg);
          return;
        case 'switch_role':
          setIsMeebit(msg === 'meebit');
          return;
        default:
          setLoadingMsg(
            <span style={{ color: 'red' }}>
              connection error, please try again
            </span>
          );
          return;
      }
    };

    return () => delete window.ongamenotify;
  }, []);

  useEffect(() => {
    unityContext.on('progress', function (progression) {
      setProgression(progression - 0.2);
      if (progression === 1) {
        setTimeout(() => {
          const env = process.env.REACT_APP_ENV === 'test' ? 'test' : 'prod';
          const intactAccount = guest ? `guest-${uuidv4()}` : account;
          // const parameter = `${user_token}&${spaceId}&test&${intactAccount}&${env}`;
          // login_token=xx&address=0x&name=&parcel_id=4&category=parcel&env=test

          const params = {
            login_token: user_token,
            address: intactAccount,
            category,
            env
          };

          if (category === 'parcel') {
            params.parcel_id = spaceId;
          }

          if (category === 'space') {
            params.space_uuid = spaceId;
          }

          const parameters = new URLSearchParams(params);

          console.log('parameters >>>', parameters);

          unityContext.send(
            'BuildSurface',
            'AcceptReactInit',
            parameters.toString()
          );
        }, 0.5 * 1000);
      }
    });

    window.WebApiRoleDevSetJumpSpeed = (val = 3) => {
      console.log('WebApiRoleDevSetJumpSpeed');
      unityContext.send('DevTools', 'WebApiRoleDevSetJumpSpeed', val);
    };

    window.WebApiRoleDevSetAddSpeed = (val = 3) => {
      console.log('WebApiRoleDevSetAddSpeed');
      unityContext.send('DevTools', 'WebApiRoleDevSetAddSpeed', val);
    };

    window.WebApiRoleDevSetSpeed = (val = 1.5) => {
      console.log('WebApiRoleDevSetSpeed');
      unityContext.send('DevTools', 'WebApiRoleDevSetSpeed', val);
    };

    window._unity = {
      setRenderQuality(num = 7) {
        const quality = num > 7 ? 7 : num < 1 ? 1 : num;
        unityContext.send(
          'WebApi',
          'WebApiAdjustRenderQuality',
          quality.toString()
        );
      }
    };

    return () => {
      unityContext.removeAllEventListeners();
      delete window.WebApiRoleDevSetJumpSpeed;
      delete window.WebApiRoleDevSetAddSpeed;
      delete window.WebApiRoleDevSetSpeed;
      delete window._unity;
    };
  }, [account, category, guest, spaceId, user_token]);

  const pointerlockchangeCallback = useCallback((isLock) => {
    if (!isLock) {
      unityContext.send('BuildSurface', 'SwitchToPauseMode');
    }
  }, []);

  usePointerlockchange(pointerlockchangeCallback);

  const [showHelp, setShowHelp] = useState(true);

  return (
    <div style={{ backgroundColor: '#000', boxSizing: 'border-box' }}>
      <Unity
        unityContext={unityContext}
        style={{
          visibility: progression === 1 ? 'visible' : 'hidden',
          width: '100%',
          height: '100vh'
        }}
        devicePixelRatio={1}
      />
      {progression >= 1 && (
        <Ui
          unityContext={unityContext}
          account={account}
          token={user_token}
          size={builindSize}
          spaceId={spaceId}
          isMeebit={isMeebit}
          onShowHelp={setShowHelp}
        />
      )}

      {showHelp && (
        <Help
          onClick={() => {
            setShowHelp(false);
          }}
        />
      )}
      {progression < 1 && (
        <Loading duration={progression * 100} loadingMsg={loadingMsg} />
      )}
    </div>
  );
}
