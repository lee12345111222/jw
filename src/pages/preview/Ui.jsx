import { useEffect, useState, useMemo, useRef, useCallback } from 'react';

import styled from 'styled-components';
import { Flex, Text, Image } from '@/components/Basic';

import { notification, Modal } from 'antd';

// import Discover from './Discover';
import Discover from '@/pages/discover/Discover';
import NFT from './NFT';
import Setting from './Setting';
import User from './User';
import TreasureBox from './TreasureBox';

import BorderedBtn from '@/components/BorderedBtn2/index';

import { version } from '@/../package.json';

import load from '@/utils/load';
import Dialog from '@/components/proto-ui/dialog/index';
import Dialog2, { Toast } from '@/ui/dialog/index';
import styles from './ui.module.css';
import Q from '@/assets/icon/Q.png';

// import Chat from './Chat';
import { Tooltip } from 'antd';

import useChat from './useChat';

import Markdown from '../editor/Markdown';

import { showShortAddress } from '@/utils/common';

import { fireworks } from './functions';
import { message } from 'antd';

import { ReactComponent as AudioIcon } from '@/assets/preview/audio-icon.svg';
import { ReactComponent as FrownIcon } from '@/assets/preview/frown-icon.svg';
import { ReactComponent as MessageIcon } from '@/assets/preview/message-icon.svg';
import { ReactComponent as DanceIcon } from '@/assets/preview/dance-icon.svg';

import { ReactComponent as OtherIcon } from '@/assets/preview/other-icon.svg';
import { ReactComponent as QuestionIcon } from '@/assets/preview/question-icon.svg';
import { ReactComponent as SettingIcon } from '@/assets/preview/setting-icon.svg';
import { ReactComponent as WorldIcon } from '@/assets/preview/world-icon.svg';
import { ReactComponent as CloseIcon } from '@/assets/preview/close-icon.svg';

import ClickAwayListener from '@/components/proto-ui/clickAwayListener/index';

const { minimap, myArrow } = load('preview');

const actionIcon = load('role-editor/act');

const emojiList = [
  '\u{1f600}',
  '\u{1f601}',
  '\u{1f602}',
  '\u{1f603}',
  '\u{1f604}',
  '\u{1f605}',
  '\u{1f606}',
  '\u{1f607}',
  '\u{1f609}',
  '\u{1f60a}',
  '\u{1f60b}',
  '\u{1f60c}',
  '\u{1f60d}',
  '\u{1f60e}',
  '\u{1f60f}',
  '\u{1f610}',
  '\u{1f611}',
  '\u{1f612}',
  '\u{1f613}',
  '\u{1f614}',
  '\u{1f615}',
  '\u{1f616}',
  '\u{1f617}',
  '\u{1f618}',
  '\u{1f619}',
  '\u{1f61a}',
  '\u{1f61b}',
  '\u{1f61c}',
  '\u{1f61d}',
  '\u{1f61e}',
  '\u{1f61f}',
  '\u{1f620}',
  '\u{1f621}',
  '\u{1f622}',
  '\u{1f623}',
  '\u{1f624}',
  '\u{1f625}',
  '\u{1f626}',
  '\u{1f627}',
  '\u{1f628}',
  '\u{1f629}',
  '\u{1f62a}',
  '\u{1f62b}',
  '\u{1f62c}',
  '\u{1f62d}'
];

// unicode 字符串 转 emoji
// const num = 128566
// const n2s = num.toString(16)
// const str = '\u{1f624}'
// str.replace(/\u/g, "%u")

export default function Ui({
  unityContext,
  account,
  token,
  size,
  spaceId,
  isMeebit,
  onShowHelp
}) {
  useEffect(() => {
    window.gameSettings = (actionName, val) => {
      unityContext.send('BuildSurface', actionName, val.toString());
    };

    return () => {
      delete window.gameSettings;
    };
  }, [unityContext]);

  const [msgList, setMsgList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const inputElement = useRef();
  const actionListElement = useRef();

  const [NFTUrl, setNFTUrl] = useState('');
  const [showNFTInfo, setshowNFTInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [visible, setVisible] = useState(true);

  const [val, setVal] = useState('');

  const [nftName, setNftName] = useState('-');

  useEffect(() => {
    window.ongamenotify = function (type, msg) {
      if (type === 'disconnect_mmo') {
        notification.error({
          message: 'Network Error',
          description: 'You are disconnect from server, Please try again'
        });
      }

      const list = [...msgList];
      list.push({ user: 'System', msg: type, id: new Date().getTime() });
      setMsgList(list);
      console.log(`game notify in UI ${type} ${msg}`);
    };

    window.onmessagerecv = function (sender, content) {
      const list = [...msgList];
      list.push({ user: sender, msg: content, id: new Date().getTime() });
      setMsgList(list);
      console.log(`onmessagerecv in UI ${sender} ${content}`);
    };

    return () => {
      delete window.ongamenotify;
      delete window.onmessagerecv;
    };
  }, [msgList]);

  const handleSend = useCallback(
    (val) => {
      unityContext.send('BuildSurface', 'SetCaptureKeyboardInputEnabled', val);
    },
    [unityContext]
  );

  const [showFps, setShowFps] = useState(true);
  const [nameDisplay, setNameDisplay] = useState(true);

  const sendMsg = useCallback(() => {
    const val = inputElement.current.value;
    inputElement.current.value = '';
    setShowEmoji(false);
    if (!val) {
      return;
    }

    if (val[0] === '\\') {
      const cmd = val.split(' ');
      // cmd[1] ? cmd[1] = cmd[1].trim();

      if (val.toLowerCase() === '\\showfps') {
        unityContext.send('DevTools', 'WebApiShowFps', showFps ? 'yes' : 'no');
        setShowFps(!showFps);

        return;
      }
      if (cmd[0].toLowerCase() === '\\setrq' && typeof +cmd[1] === 'number') {
        unityContext.send(
          'DevTools',
          'WebApiAdjustRenderQuality',
          cmd[1].toString()
        );
      }

      return;
    }

    unityContext.send('BuildSurface', 'SendChatMsg', val.toString());
  }, [showFps, unityContext]);

  const showEnter = useCallback(() => {
    setShowInput(true);
    handleSend('0');
    setTimeout(() => {
      inputElement.current.focus();
    }, 50);
  }, [handleSend]);

  const hideEnter = useCallback(() => {
    inputElement.current.value = '';
    handleSend('1');
    inputElement.current.blur();
    setShowInput(false);
    setShowEmoji(false);
  }, [handleSend]);

  const handleKeyPress = useCallback(
    ({ key }) => {
      if (key !== 'Enter') {
        return;
      }

      if (document.activeElement.id === 'msg-input') {
        sendMsg();
        setVal();
      } else {
        // showEnter();
      }
    },
    // [hideEnter, sendMsg, showEnter]
    [sendMsg]
  );

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    window.onfire = fireworks;

    return () => {
      delete window.onfire;
    };
  }, []);

  const [askConfirm, setAskConfirm] = useState(false);

  const handleAskConfirm = useCallback(() => {
    setAskConfirm((url) => {
      window.open(url);
      return false;
    });
  }, []);

  useEffect(() => {
    window.openurl = (url) => {
      if (url === 'playerone://shop/voxel') {
        // setShowVoxelMarket(true);
      } else {
        setAskConfirm(url);
      }
    };
    return () => {
      delete window.openurl;
    };
  }, []);

  const MsgList = useMemo(
    () =>
      msgList.map(({ user, msg, id }) => {
        return <MsgText user={user} msg={msg} key={id} account={account} />;
      }),
    [account, msgList]
  );

  const ColorMsgList = useMemo(
    () =>
      msgList.map(({ user, msg, id }) => {
        return (
          <MsgText
            user={user}
            msg={msg}
            key={id}
            account={account}
            changeColor
          />
        );
      }),
    [account, msgList]
  );

  useEffect(() => {
    window.viewnftinfo = (url) => {
      setNFTUrl(url);
      setshowNFTInfo(true);
    };

    return () => {
      delete window.viewnftinfo;
    };
  }, []);

  const handleEmojiInput = useCallback((emoji) => {
    inputElement.current.value += `${emoji} `;
  }, []);

  const handleInputBlur = useCallback(() => {
    if (!window.inputStatus) {
      // hideEnter();
    } else {
      inputElement.current.focus();
    }
  }, []);

  const handleEmojiShow = useCallback(() => {
    setShowEmoji(!showEmoji);
  }, [showEmoji]);

  const showActionList = useCallback(() => {
    setShowAction(!showAction);
  }, [showAction]);

  const { connect, disconnect, status } = useChat();

  const [chatStatus, setChatStatus] = useState(false);
  const connectChatServer = useCallback(async () => {
    if (status === 'connecting') {
      return message.info('connecting the chat server already');
    }
    chatStatus ? disconnect() : connect(account, spaceId);
    setChatStatus((val) => {
      unityContext.send(
        'BuildSurface',
        'SetVoiceChatState',
        val ? 'no' : 'yes'
      );
      return !val;
    });
  }, [account, chatStatus, connect, disconnect, spaceId, status, unityContext]);

  useEffect(() => {
    if (showAction) {
      actionListElement.current.focus();
    }
  }, [showAction]);

  const handleAction = (id) => {
    unityContext.send('BuildSurface', 'SwitchRoleAction', id.toString());
    setShowAction(false);
    setTimeout(() => {
      unityContext.requestPointerLock();
    }, 200);
  };

  const EmojiList = useMemo(
    () =>
      emojiList.map((emoji, index) => (
        <Emoji onClick={handleEmojiInput} key={index}>
          {emoji}
        </Emoji>
      )),
    [handleEmojiInput]
  );

  const [screenImg, setScreenImg] = useState(null);
  const [showScreenShot, setShowScreenShot] = useState(false);

  // jpeg

  useEffect(() => {
    window.screenshotdone = (val) => {
      setScreenImg(`data:image/jpeg;base64,${val}`);
      setShowScreenShot(true);
    };
    return () => {
      delete window.screenshotdone;
    };
  }, []);

  const [showToast, setShowToast] = useState(false);
  const handleHideUi = useCallback(() => {
    setVisible(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, []);

  const handleAboutAction = useCallback(
    (val) => {
      if (val !== 'about') {
        setShowAbout(false);
      }
      switch (val) {
        case 'hideui':
          return handleHideUi();
        case 'help':
          window.open(
            'https://app.gitbook.com/o/-LArAHzZbLWRbAz7gFdl/s/zerUwbiIOYaaXdLMnHsf/tutorial/discover'
          );
          break;
        case 'showfps':
          unityContext.send(
            'DevTools',
            'WebApiShowFps',
            showFps ? 'yes' : 'no'
          );
          return setShowFps(!showFps);
        case 'screenshot':
          return unityContext.send('DevTools', 'InvokeScreenshot');
        case 'hidename':
          unityContext.send(
            'BuildSurface',
            'SetNameDisplay',
            nameDisplay ? 'no' : 'yes'
          );
          return setNameDisplay(!nameDisplay);
        default:
          return 0;
      }
    },
    [handleHideUi, nameDisplay, showFps, unityContext]
  );

  const handleCloseScreenShot = useCallback(() => {
    setShowScreenShot(false);
    setScreenImg(null);
  }, []);

  useEffect(() => {
    document.body.addEventListener('keydown', ({ key }) => {
      key === 'q' && setVisible(true);
    });
  }, []);

  return (
    <Flex
      w="100vw"
      h="100vh"
      p="16px"
      jc="space-between"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: 'none'
      }}>
      <Flex w="50%" fd="column" jc="space-between">
        <MiniMap size={size} />
        <Flex
          fd="column"
          jc="flex-end"
          gap="16px"
          style={{
            flexGrow: 1,
            flexShrink: 0
          }}>
          {!showInput && (
            <MsgContainer showContainer={MsgList.length > 0}>
              <Text c="rgba(255,255,255,0.9)" fw="500" fs="18px" lh="22px">
                Chat
              </Text>
              <div
                style={{
                  height: 284,
                  overflow: 'scroll'
                }}
                className="message-div">
                <Flex
                  gap="16px"
                  fd="column"
                  jc="flex-end"
                  style={{
                    minHeight: '100%'
                  }}>
                  {MsgList}
                </Flex>
              </div>
            </MsgContainer>
          )}

          <ClickAwayListener onClickAway={hideEnter}>
            <div
              style={{
                pointerEvents: 'auto',
                display: showInput ? 'block' : 'none'
              }}>
              <Flex
                fd="column"
                w="368px"
                h="427px"
                radius="8px"
                bgcolor="rgba(26, 32, 38, 0.96)"
                jc="space-between"
                style={{
                  position: 'relative'
                }}>
                <Flex
                  p="16px"
                  jc="space-between"
                  style={{
                    borderBottom: '1px solid rgba(67, 75, 83, .4)',
                    fontFamily: 'SF Pro Display'
                  }}>
                  <Text c="rgba(255,255,255,0.9)" fw="500" fs="18px" lh="22px">
                    Chat
                  </Text>

                  <CloseIcon
                    style={{ cursor: 'pointer' }}
                    onClick={hideEnter}
                  />
                </Flex>

                {showEmoji && (
                  <EmojiContainer>
                    <Flex fw="wrap">{EmojiList}</Flex>
                  </EmojiContainer>
                )}

                <Flex p="16px" fd="column" gap="16px">
                  <div
                    style={{
                      height: 284,
                      overflow: 'scroll'
                    }}
                    className="message-div">
                    <Flex
                      gap="16px"
                      fd="column"
                      jc="flex-end"
                      style={{
                        minHeight: '100%'
                      }}
                      // ai="flex-end"
                    >
                      {ColorMsgList}
                    </Flex>
                  </div>
                  {/* </Flex> */}
                  <Flex ai="center">
                    <StyledInput
                      val={val}
                      setVal={setVal}
                      refObject={inputElement}
                      handleInputBlur={handleInputBlur}
                      onEmojiClick={handleEmojiShow}
                    />
                    <SendMsg onSend={sendMsg} inputElement={inputElement} />
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </ClickAwayListener>

          <Flex
            bgcolor="rgba(75, 77, 77, 0.85)"
            w="350px"
            fw="wrap"
            gap="8px"
            p="8px"
            ref={actionListElement}
            tabIndex={80002}
            onBlur={() => setShowAction(false)}
            style={{
              position: 'absolute',
              bottom: '72px',
              pointerEvents: 'auto',
              outlineStyle: 'none',
              display: showAction ? 'flex' : 'none'
            }}>
            <ActionItem onClick={handleAction} id="2" />
            <ActionItem onClick={handleAction} id="3" />
            <ActionItem onClick={handleAction} id="4" />
            <ActionItem onClick={handleAction} id="5" />
            <ActionItem onClick={handleAction} id="6" />
            <ActionItem onClick={handleAction} id="7" />
            <ActionItem onClick={handleAction} id="8" />
          </Flex>

          <Flex
            gap="12px"
            ai="center"
            style={{
              padding: '0 8px',
              background: 'rgba(26, 32, 38, 0.96)',
              width: 'fit-content',
              borderRadius: 4
            }}>
            <ToolTipIcon title="Voice" onClick={connectChatServer}>
              <AudioIcon />
            </ToolTipIcon>

            <Line />

            <ToolTipIcon title="Chat" onClick={showEnter} checked={showInput}>
              <MessageIcon />
            </ToolTipIcon>

            {!isMeebit && (
              <ToolTipIcon
                title="Action"
                onClick={showActionList}
                checked={showAction}>
                <DanceIcon />
              </ToolTipIcon>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex fd="column" jc="space-between" ai="flex-end">
        <User token={token} account={account} unityContext={unityContext} />
        <Flex
          gap="12px"
          style={{
            padding: '12px 8px',
            background: 'rgba(26, 32, 38, 0.96)',
            width: 'fit-content',
            borderRadius: 4
          }}>
          <ActionIcon
            onClick={() =>
              // window.open('hhttps://playerone.gitbook.io/doc/tutorial/discover')
              onShowHelp(true)
            }>
            <QuestionIcon />
          </ActionIcon>

          <ActionIcon onClick={() => setShowDiscover(true)}>
            <WorldIcon />
          </ActionIcon>
          <ActionIcon
            onClick={() => setShowSettings(true)}
            checked={showSettings}>
            <SettingIcon />
          </ActionIcon>
          <ActionIcon onClick={() => setShowAbout(true)} checked={showAbout}>
            <OtherIcon />
          </ActionIcon>
        </Flex>
      </Flex>

      <Dialog2
        title="Explore"
        fullscreen={true}
        animate={false}
        footer=""
        open={showDiscover}
        onCancel={() => setShowDiscover(false)}>
        <Discover hideMain={true} />
      </Dialog2>

      <Toast open={showToast}>
        <div>
          <span>Press </span>
          <img src={Q} alt="" />
          <span> to Show Ui</span>
        </div>
      </Toast>

      <NFTModal
        onCancel={() => setshowNFTInfo(false)}
        footer={null}
        width="336px"
        closable={false}
        bodyStyle={{ padding: '24px 32px' }}
        title={
          <Flex jc="space-between" ai="center">
            <NFTModalTitle>{nftName}</NFTModalTitle>
            <CloseIcon
              style={{ cursor: 'pointer' }}
              onClick={() => setshowNFTInfo(false)}
            />
          </Flex>
        }
        visible={showNFTInfo}>
        <NFT url={NFTUrl} setName={setNftName} />
      </NFTModal>

      <Modal
        width="720px"
        onCancel={() => setShowSettings(false)}
        visible={showSettings}
        footer=""
        bodyStyle={{ padding: 0 }}>
        {showSettings && <Setting unityContext={unityContext} />}
      </Modal>

      <About
        onAction={handleAboutAction}
        visible={showAbout}
        showFps={showFps}
        nameDisplay={nameDisplay}
      />

      <ScreenShot
        img={screenImg}
        show={showScreenShot}
        onClose={handleCloseScreenShot}
      />

      <div style={{ position: 'absolute' }}>
        {/* <Chat
          account={account}
          roomId={spaceId}
          onReady={(fn) => setChatHandler(() => fn)}
        /> */}
        <TreasureBox account={account} />

        <Markdown unityContext={unityContext} editable={false} />
      </div>

      <ConfirmDialog
        onConfirm={handleAskConfirm}
        onCancel={() => setAskConfirm(false)}
        open={!!askConfirm}
      />
    </Flex>
  );
}

const ConfirmDialog = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog2 open={open} header="" onConfirm={onConfirm} onCancel={onCancel}>
      <div>Please confirm to open the other website.</div>
    </Dialog2>
  );
};

const StyledInput = ({
  handleInputBlur,
  refObject,
  setVal,
  val,
  onEmojiClick
}) => {
  const handleChange = useCallback(
    ({ target: { value } }) => {
      setVal(
        value
          .replace(
            /[^a-zA-Z0-9\u{1f600}-\u{1f62d} ~!@#$%^&*()/|\\,.<>?"'();:_+-=[\]{}]+/u,
            ''
          )
          .slice(0, 52)
      );
    },
    [setVal]
  );
  return (
    <InputContainer>
      <EmojiBtn onClick={onEmojiClick} />
      {/* <FrownIcon
        style={{ position: 'absolute', top: 12, left: 16, cursor: 'pointer' }}
        onClick={onEmojiClick}
      /> */}
      <input
        value={val}
        onChange={handleChange}
        type="text"
        id="msg-input"
        onBlur={() => {
          handleInputBlur();
          setVal();
        }}
        ref={refObject}
        style={{
          border: 'none',
          background: 'rgba(74, 80, 87, 0.45)',
          flexGrow: 1,
          borderRadius: 4,
          outline: 'none',
          color: '#fff',
          height: 40,
          paddingLeft: 48,
          width: '100%'
        }}
      />
    </InputContainer>
  );
};

const ScreenShot = ({ img, show, onClose }) => {
  const download = useCallback(() => {
    const link = document.createElement('a');
    link.setAttribute('href', img);
    link.setAttribute('download', 'screenshot.jpeg');
    link.click();
  }, [img]);
  return (
    <Dialog open={show}>
      <div className={styles.screenshot}>
        <div>
          <img src={img} alt="" />
        </div>
        <div className={styles['screenshot-actions']}>
          <BorderedBtn
            onClick={onClose}
            style={{ padding: '4px 16px' }}
            bgColor="rgba(0,0,0,0)">
            <span style={{ color: '#00c4fc' }}>Cancel</span>
          </BorderedBtn>
          <BorderedBtn onClick={download} style={{ padding: '4px 16px' }}>
            <span>Save</span>
          </BorderedBtn>
        </div>
      </div>
    </Dialog>
  );
};

const About = ({ visible, onAction, showFps, nameDisplay }) => {
  const [showVersion, setShowVersion] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowVersion(false);
    }
  }, [visible]);

  return (
    visible && (
      <>
        <div
          style={{
            position: 'absolute',
            right: '18px',
            bottom: '96px',
            backgroundColor: 'rgba(26, 32, 38, 0.96)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '8px 0',
            pointerEvents: 'auto',
            fontSize: '16px',
            lineHeight: '19px',
            color: 'rgba(255, 255, 255, .85)',
            borderRadius: 8
          }}>
          <AboutItem onClick={() => onAction('hideui')}>Hide UI</AboutItem>
          <AboutItem onClick={() => onAction('screenshot')}>
            Screenshot
          </AboutItem>
          <AboutItem onClick={() => onAction('showfps')}>
            {showFps ? 'Show FPS' : 'Hide FPS'}
          </AboutItem>
          <AboutItem onClick={() => onAction('hidename')}>
            {nameDisplay ? 'Hide Name' : 'Show Name'}
          </AboutItem>
          <AboutItem onClick={() => onAction('help')}>Help</AboutItem>
          <AboutItem
            onMouseEnter={() => setShowVersion(true)}
            onMouseLeave={() => setShowVersion(false)}
            onClick={() => onAction('about')}>
            About
          </AboutItem>

          {showVersion && (
            <div
              style={{
                position: 'absolute',
                right: '100%',
                width: '100%',
                bottom: '0',
                boxSizing: 'content-box',
                paddingRight: '4px'
              }}>
              <AboutItem
                style={{
                  // padding: '8px 4px',
                  backgroundColor: 'rgba(26, 32, 38, 0.96)',
                  borderRadius: 8,
                  padding: '19px 0',
                  paddingLeft: 0,
                  textAlign: 'center'
                  // border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
                onClick={() => onAction('about')}>
                <div>Version: {version}</div>
              </AboutItem>
            </div>
          )}
        </div>
      </>
    )
  );
};

const AboutItem = styled.div`
  padding: 4px 12px 4px 4px;
  width: 160px;
  box-sizing: border-box;
  padding: 15px 0 15px 39px;
  cursor: pointer;
  transition: all ease-out 0.16s;
  &:hover {
    color: #fff;
    background-color: rgba(75, 77, 77, 0.45);
  }
`;

const MiniMap = ({ size }) => {
  const [width, height, left, top, scale] = useMemo(() => {
    const [w, , h] = size.split(',').map((str) => +str);
    const l = w >= h ? 88 / w : 88 / h;

    const [width, height] = [w * l, h * l, 88 * l];
    const [left, top] = [(168 - width) / 2, (168 - height) / 2];

    return [width, height, left, top, l];
  }, [size]);

  const [me, setMe] = useState();
  const [others, setOthers] = useState([]);

  useEffect(() => {
    window.updateplayerposition = function (json) {
      // console.log('json >>>', json);

      // const d = {
      //   'aefad959-a275-4143-a0ee-d2f2502bfd5b': {
      //     isMine: true,
      //     position: [82.89315, 15.0, 69.24053],
      //     rotation: [0.0, 127.999878, 0.0],
      //     syncFlag: 763
      //   },
      //   '910c827d-9b8c-40fa-8ae8-914357974fdc': {
      //     isMine: false,
      //     position: [78.51092, 15.0, 68.82675],
      //     rotation: [0.0, 51.21802, 0.0],
      //     syncFlag: 763
      //   }
      // };

      const data = Object.values(JSON.parse(json));
      setMe(data.find((item) => item.isMine));
      setOthers(data.filter((item) => !item.isMine));
    };
    return () => {
      delete window.updateplayerpositions;
    };
  }, []);

  const OthersList = useMemo(
    () =>
      others.map((person, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${left - 6 + (person.position?.[0] || 0) * scale}px`,
            top: `${top + height - 8 - (person.position?.[2] || 0) * scale}px`,
            width: '4px',
            height: '4px',
            backgroundColor: '#fff',
            borderRadius: '50%'
          }}
          alt=""
        />
      )),
    [height, left, others, scale, top]
  );

  return (
    <Flex>
      <div
        style={{
          position: 'relative',
          pointerEvents: 'auto'
        }}>
        <Image w="176px" src={minimap} />
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '4px',
            width: '168px',
            height: '168px',
            borderRadius: '50%',
            overflow: 'hidden'
          }}>
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: '#6f757d',
              border: 'solid 2px #3d434b',
              position: 'absolute',
              top: `${top}px`,
              left: `${left}px`
            }}></div>
          {OthersList}
          <img
            src={myArrow}
            style={{
              position: 'absolute',
              left: `${left - 6 + (me?.position?.[0] || 0) * scale}px`,
              top: `${top + height - 8 - (me?.position?.[2] || 0) * scale}px`,
              width: '12px',
              transform: `rotate(${me?.rotation?.[1] || 0}deg)`
            }}
            alt=""
          />
        </div>
      </div>
    </Flex>
  );
};

const SendMsg = ({ onSend }) => {
  const handleSend = useCallback(() => {
    window.inputStatus = true;
    onSend();
  }, [onSend]);
  return (
    <Flex
      onMouseUp={() => (window.inputStatus = false)}
      onMouseDown={handleSend}
      p="9px 16px"
      style={{
        cursor: 'pointer',
        background: '#06C4FF',
        borderRadius: '0px 4px 4px 0px',
        boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.04)'
      }}>
      Send
    </Flex>
  );
};

const MsgText = ({ showAll = false, user, msg, account, changeColor }) => {
  // 滑动到底部
  const updateScroll = useCallback((id) => {
    const elements = document.querySelectorAll(`.${id}`);
    if (elements) {
      elements.forEach((item) => {
        item.scrollTop = item.scrollHeight;
      });
    }
  }, []);

  useEffect(() => {
    updateScroll('message-div');
  }, [updateScroll]);

  return (
    <Flex
      // className="hide-slow"
      gap="8px"
      fw="wrap"
      jc="flex-start"
      p="8px"
      bgcolor={
        !!changeColor ? 'rgba(74, 80, 87, 0.45)' : 'rgba(26, 32, 38, 0.96)'
      }
      radius="4px"
      // b="1px solid rgba(0, 0, 0, 0.05)"
      style={{
        fontSize: '14px',
        maxWidth: '336px',
        visibility: 'visible',
        width: 'fit-content'
      }}>
      {showAll ? <Text c="rgba(255, 255, 255, .75)">[ALL]</Text> : ''}
      <Text
        style={{ flexShrink: 0 }}
        c={
          user === 'System'
            ? '#5FCFFF'
            : user === account
            ? 'rgba(255, 255, 255, .45)'
            : '#F2FF60'
        }>
        {user.length >= 24 ? showShortAddress(user) : user}
      </Text>
      <Text c="rgba(255, 255, 255, 1)" style={{ wordBreak: 'break-all' }}>
        {msg}
      </Text>
    </Flex>
  );
};

const Emoji = ({ children, onClick }) => {
  const handleClick = useCallback(() => {
    window.inputStatus = true;
    onClick(children);
  }, [children, onClick]);

  return (
    <StyledText
      onMouseUp={() => (window.inputStatus = false)}
      onMouseDown={handleClick}>
      {children}
    </StyledText>
  );
};

const StyledText = styled(Text)`
  font-size: 24px;
  line-height: 1;
  padding: 9px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #333538;
  }
  &:active {
    background-color: #2c2e30;
  }
`;

const EmojiBtn = ({ onClick }) => {
  const handleClick = useCallback(() => {
    window.inputStatus = true;
    onClick();
  }, [onClick]);
  return (
    <Flex
      onMouseUp={() => (window.inputStatus = false)}
      onMouseDown={handleClick}
      ai="center"
      jc="center"
      style={{ position: 'absolute', top: 12, left: 16, cursor: 'pointer' }}>
      <FrownIcon />
    </Flex>
  );
};

const ActionItem = ({ onClick, id }) => {
  return (
    <ActionBox onClick={() => onClick(id)}>
      <Image src={actionIcon[`act${+id + 1}`]} />
    </ActionBox>
  );
};

const ActionBox = styled.div`
  width: 52px;
  margin: 0 4px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: rgba(75, 77, 77, 0.65);
    border: 1px solid rgba(95, 207, 255, 0.5);
  }
  &:active {
    border: 1px solid #5fcfff;
  }
`;

const ActionIcon = styled.button`
  padding: 0;
  outline: 0;
  border: none;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? '#4a5057' : 'transparent')};
  &:hover {
    background-color: rgba(74, 80, 87, 0.45);
  }
  &:active {
    background-color: #4a5057;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 16px;
  background: rgba(74, 80, 87, 0.45);
`;

const IconContainer = styled.div`
  border-width: 12px;
  border-color: transparent;
  border-style: solid;
  border-left: 0;
  border-right: 0;
`;

const ToolTipIcon = ({ onClick, checked, children, title }) => {
  return (
    <Tooltip
      title={title}
      overlayInnerStyle={{
        backgroundColor: 'rgba(26, 32, 38, 0.96)'
      }}>
      <IconContainer>
        <ActionIcon checked={checked} onClick={onClick}>
          {children}
        </ActionIcon>
      </IconContainer>
    </Tooltip>
  );
};

const MsgContainer = styled.div`
  display: flex;
  gap: 33px;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 368px;
  height: 371px;
  background: rgba(26, 32, 38, 0.45);
  border-radius: 8px;
  pointer-events: auto;
  visibility: hidden;
  padding: 16px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  transition: all 0.24s ease-in-out;
  &:hover {
    visibility: visible;
  }
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    visibility: ${(props) => (props.showContainer ? 'visible' : 'hidden')};
    content: '';
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EmojiContainer = styled.div`
  position: absolute;
  left: 16px;
  bottom: 72px;
  width: 312px;
  height: 200px;
  padding: 16px 8px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(87, 94, 102, 0.65);
  background-color: #3f4245;
  overflow: scroll;
`;

const NFTModalTitle = styled.div`
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
  padding-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NFTModal = styled(Modal)`
  top: 16px;
  left: calc((100% - 336px) / 2 - 16px);
  & .ant-modal-content {
    border-radius: 8px;
  }

  & .ant-modal-header {
    padding: 24px 32px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;
