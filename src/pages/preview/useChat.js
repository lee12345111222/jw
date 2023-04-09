import { useState, useCallback, useMemo, useEffect } from 'react';

import useWs from './useWs';
import usePeer from './usePeer';
import { message } from 'antd';

export default function useChat() {
  const [userFlag, setUserFlag] = useState('');
  const [spaceId, setSpaceId] = useState('');
  const [roomUserList, setRoomUserList] = useState([]);

  const [recordError, setRecordError] = useState('');
  const [recordStatus, setRecordStatus] = useState('disconnect');
  const [localAudioStream, setLocalAudioStream] = useState(null);

  const {
    connect: connectWs,
    // disconnect: disconnectWs,
    sendMsg,
    status: wsStatus,
    error: wsError,
    message: wsMessage
  } = useWs();

  const {
    peer,
    create: createPeer,
    error: peerError,
    status: peerStatus
  } = usePeer();

  const status = useMemo(
    () =>
      wsStatus === 'connecting' ||
      peerStatus === 'opening' ||
      recordStatus === 'connecting'
        ? 'connecting'
        : '',
    [peerStatus, recordStatus, wsStatus]
  );

  // 'browser-incompatible'ERRORFATAL
  // The client's browser does not support some or all WebRTC features that you are trying to use.
  // 'disconnected'ERROR
  // You've already disconnected this peer from the server and can no longer make any new connections on it.
  // 'invalid-id'ERRORFATAL
  // The ID passed into the Peer constructor contains illegal characters.
  // 'invalid-key'ERRORFATAL
  // The API key passed into the Peer constructor contains illegal characters or is not in the system (cloud server only).
  // 'network'ERROR
  // Lost or cannot establish a connection to the signalling server.
  // 'peer-unavailable'ERROR
  // The peer you're trying to connect to does not exist.
  // 'ssl-unavailable'ERRORFATAL
  // PeerJS is being used securely, but the cloud server does not support SSL. Use a custom PeerServer.
  // 'server-error'ERRORFATAL
  // Unable to reach the server.
  // 'socket-error'ERRORFATAL
  // An error from the underlying socket.
  // 'socket-closed'ERRORFATAL
  // The underlying socket closed unexpectedly.
  // 'unavailable-id'ERRORSOMETIMES FATAL
  // The ID passed into the Peer constructor is already taken.
  // This error is not fatal if your peer has open peer-to-peer connections. This can happen if you attempt to reconnect a peer that has been disconnected from the server, but its old ID has now been taken.
  // 'webrtc'ERROR
  // Native WebRTC errors.

  const handleStream = useCallback((stream) => {
    console.log('stream >>>', stream);
    if (!stream) {
      return;
    }

    const obj = {};
    obj.audioPlayer = new Audio();
    obj.audioPlayer.srcObject = stream;
    obj.audioPlayer.play();

    stream.addEventListener('removetrack', () => {
      console.log('removetrack');

      delete obj.audioPlayer;
    });
  }, []);

  const handlePeerCall = useCallback(
    (remoteCall) => {
      console.log('remoteCall >>>', remoteCall);
      remoteCall.on('stream', (stream) => {
        console.log('remote sends stream');
        handleStream(stream);
      });

      console.log('remote calls');

      setLocalAudioStream((localAudioStream) => {
        remoteCall.answer(localAudioStream);
        return localAudioStream;
      });
    },
    [handleStream]
  );

  const handlePeerConnect = useCallback(
    (remoteUserFlag, peer) => {
      console.log('remote connect to us');
      setLocalAudioStream((localAudioStream) => {
        if (localAudioStream) {
          try {
            const remoteCall = peer.call(remoteUserFlag, localAudioStream);
            remoteCall.on('stream', (stream) => {
              console.log('remote answers stream');
              handleStream(stream);
            });
          } catch (e) {
            //
          }
        }
      });
    },
    [handleStream]
  );

  const getUserList = useCallback(() => {
    const msg = {
      user_flag: userFlag,
      room_id: spaceId
    };

    sendMsg('VC_join_room', msg);
  }, [sendMsg, spaceId, userFlag]);

  useEffect(() => {
    if (peerStatus === 'open') {
      getUserList();
    }
  }, [getUserList, peerStatus]);

  useEffect(() => {
    console.log('peerStatus >>>', peerStatus);
    if (wsStatus === 'connect' && peerStatus !== 'open') {
      if (peerStatus === 'closed') {
        createPeer(userFlag, handlePeerCall, handlePeerConnect);
      }
    }

    return () => {};
  }, [
    createPeer,
    handlePeerCall,
    handlePeerConnect,
    peerStatus,
    userFlag,
    wsStatus
  ]);

  useEffect(() => {
    if (peerStatus === 'open' && roomUserList.length) {
      if (recordStatus === 'connected') {
        roomUserList.forEach((flag) => {
          const remoteUserFlag = String(flag);
          if (remoteUserFlag !== userFlag) {
            console.log('calling the remote', remoteUserFlag);
            try {
              const remoteCall = peer.call(remoteUserFlag, localAudioStream);
              remoteCall.on('stream', (stream) => {
                console.log('remote answers stream');
                handleStream(stream);
              });
            } catch (e) {
              //
            }
          }
        });
      } else if (recordStatus !== 'connecting') {
        roomUserList.forEach((flag) => {
          const remoteUserFlag = String(flag);
          if (remoteUserFlag !== userFlag) {
            console.log('connecting the remote', remoteUserFlag);
            peer.connect(remoteUserFlag);
          }
        });
      }
    }
  }, [
    handleStream,
    localAudioStream,
    peer,
    peerStatus,
    recordStatus,
    roomUserList,
    userFlag
  ]);

  useEffect(() => {
    if (!wsMessage) {
      return;
    }

    const { action: msgid, userlist } = wsMessage;

    if (msgid === 'VC_room_userlist') {
      console.log('userlist >>>', userlist);
      setRoomUserList(userlist);
    }
  }, [wsMessage]);

  useEffect(() => {
    if (wsError) {
      message.error(`websocket connection error`);
      console.log('wsError >>>', wsError);
    }
  }, [wsError]);

  useEffect(() => {
    if (recordError) {
      message.error(`${recordError} while get local audio`);
      console.log('recordError >>>', recordError);
    }
  }, [recordError]);

  useEffect(() => {
    if (peerError) {
      message.error(`peer connection error`);
      console.log('peerError >>>', peerError);
    }
  }, [peerError]);

  // /**
  //  * 获取本地麦克风音频
  //  */
  const startRecord = useCallback(async () => {
    console.log('startRecord');
    setRecordStatus('connecting');
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      setLocalAudioStream(audioStream);
      setRecordStatus('connected');
    } catch ({ name, message: errMsg }) {
      setRecordStatus('error');
      setRecordError(errMsg);
    }
  }, []);

  // /**
  //  * 关闭本地麦克风音频
  //  */
  const stopRecord = useCallback(async () => {
    setLocalAudioStream((localAudioStream) => {
      if (localAudioStream) {
        localAudioStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      return null;
    });
  }, []);

  /**
   * 开始连接
   */
  const connect = useCallback(
    async (account, spaceId) => {
      setUserFlag(String(account));
      setSpaceId(String(spaceId));
      if (wsStatus === 'connecting') {
        console.log('connecting, wait');
      } else if (wsStatus === 'connect') {
        console.log('already connected');
      } else {
        connectWs();
      }

      if (!localAudioStream) {
        if (wsStatus === 'connect') {
          getUserList();
        }
        startRecord();
      }
    },
    [connectWs, getUserList, localAudioStream, startRecord, wsStatus]
  );

  /**
   * 断开连接
   */
  const disconnect = useCallback(() => {
    stopRecord();
  }, [stopRecord]);

  return { connect, disconnect, status };
}
