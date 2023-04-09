import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Unity, { UnityContext } from 'react-unity-webgl';

import PublishToParcel from './PublishToParcel';

import { useWallet } from 'use-wallet';

import UI from './UI';

import Blueprint from './Blueprint';

import usePointerlockchange from '@/hooks/usePointerlockchange';

// import { editor_static_server } from '@/constant/env/index';

// import { version } from '@/../package.json';
import { message } from 'antd';

export default function MyUnity({ user_token, onProgress, onHelp }) {
  const { category, id } = useParams();
  const { account } = useWallet();
  const [progression, setProgression] = useState(0);

  const [showBlueprintList, setShowBlueprintList] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  // const unityContext = useMemo(() => {
  //   const unity = new UnityContext({
  //     loaderUrl: `${editor_static_server}/PlayerOneEditor.loader.js?v=${version}`,
  //     dataUrl: `${editor_static_server}/PlayerOneEditor.data.unityweb?v=${version}`,
  //     frameworkUrl: `${editor_static_server}/PlayerOneEditor.framework.js.unityweb?v=${version}`,
  //     codeUrl: `${editor_static_server}/PlayerOneEditor.wasm.unityweb?v=${version}`
  //   });

  //   return unity;
  // }, []);

  const unityContext = useMemo(() => {
    const unity = new UnityContext({
      loaderUrl: '/game/build/PlayerOneEditor.loader.js',
      dataUrl: '/game/build/PlayerOneEditor.data.unityweb',
      frameworkUrl: '/game/build/PlayerOneEditor.framework.js.unityweb',
      codeUrl: '/game/build/PlayerOneEditor.wasm.unityweb'
    });

    return unity;
  }, []);

  useEffect(() => {
    unityContext.on('progress', (progression) => {
      setProgression(progression);
      onProgress(progression);
    });
  }, [onProgress, unityContext]);

  useEffect(() => {
    window.RequestReactLogin = function () {
      const parameter = `${user_token}&${account}`;
      unityContext.send('BuildSurface', 'AcceptReactSetLoginToken', parameter);
    };

    return () => {
      delete window.RequestReactLogin;
    };
  }, [account, unityContext, user_token]);

  const inputEl = useRef(null);

  const [showVoxelMarket, setShowVoxelMarket] = useState(false);

  const upImg = useCallback(
    (el) => {
      let files = el.target.files;
      if (files.length < 1) return;

      let blobUri = window.URL.createObjectURL(files[0]);
      console.log('blobUri >>>', blobUri);

      unityContext.send(
        'UICtrlInst',
        'WebglUploadNotify',
        `flag=&res=${blobUri}`
      );

      inputEl.current.value = null;
    },
    [unityContext]
  );

  useEffect(() => {
    if (progression === 1) {
      setTimeout(() => {
        const env = process.env.REACT_APP_ENV === 'test' ? 'test' : 'prod';

        // "login_token={0}&address={1}&name={2}&category={3}&parcel_id={4}&space_uuid={5}&env=test"
        // category space parcel
        const params = {
          login_token: user_token,
          address: account,
          // name: '',
          category,
          env
        };

        if (category === 'parcel') {
          params.parcel_id = id;
        }

        if (category === 'space') {
          params.space_uuid = id;
        }

        const parameters = new URLSearchParams(params);

        unityContext.send(
          'BuildSurface',
          'AcceptReactInit',
          parameters.toString()
        );
      }, 0.5 * 1000);
    }
  }, [account, category, id, progression, unityContext, user_token]);

  useEffect(() => {
    window.WebApiShowFps = (val = 'yes') => {
      unityContext.send('DevTools', 'WebApiShowFps', val);
    };

    return () => {
      delete window.WebApiShowFps;
    };
  }, [unityContext]);

  useEffect(() => {
    window.uploadimage = () => {
      inputEl.current.click();
    };

    return () => {
      delete window.uploadimage;
    };
  }, []);

  useEffect(() => {
    window.callclipborad = () => {
      console.log('callclipborad invoke');
      navigator.clipboard.readText().then((clipText) => {
        unityContext.send('UICtrlInst', 'WebglClipboradNotify', clipText);
      });
    };

    return () => {
      delete window.callclipborad;
    };
  }, [unityContext]);

  useEffect(() => {
    window.v2g = () => unityContext.send('BuildSurface', 'ExportVoxToGLB');

    return () => {
      delete window.v2g;
    };
  }, [unityContext]);

  useEffect(() => {
    window.openurl = (url) => {
      const {
        protocol,
        pathname,
        searchParams: search
      } = new URL(decodeURI(url));
      const searchParams = {};

      for (const [key, value] of search) {
        searchParams[key] = value;
      }

      if (protocol !== 'playerone:') {
        return window.open(url);
      }

      switch (pathname) {
        case '//shop/voxel':
          setShowVoxelMarket(true);
          break;
        case url === '//help':
          onHelp(true);
          break;
        case '//openblueprintlist':
          setShowBlueprintList(true);
          break;
        case '//publishToParcel':
          setShowPublishDialog(true);
          break;
        case '//setclipboard':
          navigator.clipboard.writeText(searchParams.content).then(
            () => message.success(searchParams.tip),
            () => message.error('Copy faild')
          );
          break;
        default:
          break;
      }
    };

    return () => {
      unityContext.removeAllEventListeners();
      delete window.openurl;
    };
  }, [onHelp, unityContext]);

  const pointerlockchangeCallback = useCallback(
    (isLock) => {
      if (!isLock) {
        unityContext.send('BuildSurface', 'SwitchToPauseMode');
      }
    },
    [unityContext]
  );

  usePointerlockchange(pointerlockchangeCallback);

  return (
    <div style={{ backgroundColor: '#000' }}>
      <UI
        unityContext={unityContext}
        open={showVoxelMarket}
        onHide={() => setShowVoxelMarket(false)}
      />
      <Unity
        unityContext={unityContext}
        style={{
          //   visibility: progression === 1 ? 'visible' : 'hidden',
          width: '100%',
          height: '100vh'
        }}
        devicePixelRatio={1}
      />

      {showBlueprintList && (
        <Blueprint
          onClose={() => setShowBlueprintList(false)}
          open={showBlueprintList}
          tokenId={id}
          unityContext={unityContext}
        />
      )}

      {showPublishDialog && (
        <PublishToParcel
          onClose={() => setShowPublishDialog(false)}
          loginToken={user_token}
          address={account}
          uuid={id}
        />
      )}

      <div
        style={{
          display: 'none'
        }}>
        <form onChange={upImg}>
          <input ref={inputEl} type="file" name="upfile" />
        </form>
      </div>
    </div>
  );
}
