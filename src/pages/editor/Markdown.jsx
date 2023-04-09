import { useEffect, useState, useCallback } from 'react';

import Dialog from '@/ui/dialog/index';

import { getgameres, savegameres } from '@/api/editor';
import useApi from '@/hooks/useApi';

import useLoginToken from '@/hooks/useLoginToken';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import styled from 'styled-components';
import { message } from 'antd';

import { useWallet } from 'use-wallet';

const mdParser = new MarkdownIt();

export default function Markdown({ unityContext, editable = true }) {
  const [content, setContent] = useState('');
  const [spaceuuid, setSpaceuuid] = useState();
  const [featureuuid, setFeatureuuid] = useState();
  const [readOnly, setReadOnly] = useState(true);

  const { account } = useWallet();

  const [getToken] = useLoginToken();

  const { run: getData } = useApi(getgameres, {
    manual: true,
    onSuccess({ code, data, msg }) {
      if (code === 200) {
        setContent(data.content || '');
        if (editable) {
          setReadOnly(false);
        }
      } else {
        message.error(msg);
      }
    }
  });

  const { run: save } = useApi(savegameres, { manual: true });

  useEffect(() => {
    if (!spaceuuid || !featureuuid) {
      return;
    }

    getData({ building_uuid: spaceuuid, feature_uuid: featureuuid });
  }, [featureuuid, getData, spaceuuid]);

  useEffect(() => {
    const btn = document.querySelector('.button-type-fullscreen');
    function eventHandler(e) {
      e.stopPropagation();

      const el = document.querySelector('.rc-md-editor');

      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen
        ? document.exitFullscreen?.() ||
          document.mozCancelFullScreen?.() ||
          document.webkitExitFullscreen?.()
        : el.requestFullscreen?.() ||
          el.mozRequestFullScreen?.() ||
          el.webkitRequestFullscreen?.() ||
          el.msRequestFullscreen?.();
    }
    btn.addEventListener('click', eventHandler);

    return () => {
      btn.removeEventListener('click', eventHandler);
    };
  }, []);

  useEffect(() => {
    window.openmdeditor = (spaceuuid, featureuuid) => {
      if (editable) {
        unityContext.send(
          'BuildSurface',
          'SetCaptureKeyboardInputEnabled',
          '0'
        );
      }
      setSpaceuuid(spaceuuid);
      setFeatureuuid(featureuuid);
    };

    return () => {
      delete window.openmdeditor;
    };
  }, [editable, unityContext]);

  const handleClose = useCallback(() => {
    setSpaceuuid();
    setFeatureuuid();
    unityContext.send('BuildSurface', 'SetCaptureKeyboardInputEnabled', '1');
  }, [unityContext]);

  const handleConfirm = useCallback(async () => {
    if (!editable) {
      return handleClose();
    }

    const token = await getToken();
    const { code, msg } = await save({
      login_token: token,
      address: account,
      building_uuid: spaceuuid,
      feature_uuid: featureuuid,
      content
    });

    if (code === 200) {
      message.success('Success');
    } else {
      message.error(msg);
    }
  }, [
    account,
    content,
    editable,
    featureuuid,
    getToken,
    handleClose,
    save,
    spaceuuid
  ]);

  return (
    <Dialog
      backdrop={false}
      open={spaceuuid && featureuuid}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      header=""
    >
      <div>
        <StyledEditor
          style={{
            width: editable ? '70vw' : '600px',
            height: editable ? '70vh' : 'auto'
          }}
          value={content}
          view={{ menu: editable, md: editable, html: true }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setContent(text)}
          readOnly={readOnly}
        />
      </div>
    </Dialog>
  );
}

const StyledEditor = styled(MdEditor)`
  max-height: 70vh;
  min-height: 30vh;
  background-color: #2f3439;
  border: none;
  & .drop-wrap {
    background-color: #192026;
    border-color: #000;
  }
  & .header-list .list-item {
    &:hover {
      background: #2f3439;
    }
  }
  & .editor-container .sec-md .input {
    background-color: #2f3439;
    border-right: 1px solid #192026;
    color: rgba(255, 255, 255, 0.84);
  }
  & .rc-md-navigation {
    background-color: #182026;
    border-bottom: none;
    & .navigation-nav {
      & .button-wrap {
        gap: 16px;
        & .button {
          color: #fff;
        }
      }
    }
    & .button-type-mode {
      display: none !important;
    }
  }
  & .custom-html-style {
    color: rgba(255, 255, 255, 0.84);
    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #fff;
    }
    & pre {
      background-color: #000;
    }
    & table {
      background-color: #494f55;
      & th {
        background-color: #182026;
        border-color: #2f3439;
      }
      & td {
        border-color: #2f3439;
      }
    }
    & blockquote {
      color: rgba(255, 255, 255, 0.64);
      background-color: #000;
      border-color: #444;
    }
    & code {
      background-color: #000;
      border-radius: 2px;
    }
  }
`;
