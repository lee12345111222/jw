import React from 'react';

import Peer from 'peerjs';

import ConnWs from '@/utils/ConnWs';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.audioListRef = React.createRef();
    this.state = {
      server_host: 'rtctest0208.playerone.world',
      wsObj: null,
      myWebcamStream: null,
      pause: false,
      mediaConstraints: { audio: true },
      roomUserList: [], //{"username"=>mediaConnection}
      myUserFlag: '',
      myPeer: null
    };
  }

  componentDidMount() {
    const ready = async () => {
      const self = this;

      if (self.state.myWebcamStream) {
        const tkx = self.state.myWebcamStream.getTracks();
        if (self.state.pause) {
          for (const i in tkx) {
            tkx[i].enabled = true;
          }
          console.log('set voice enable');
          self.setState({ pause: false });
        } else {
          for (const i in tkx) {
            tkx[i].enabled = false;
          }
          console.log('set voice disable');
          self.setState({ pause: true });
        }

        return;
      }

      function composeUserFlag(v) {
        return v;
      }

      function callStreamFn(uflag, stream) {
        // `stream` is the MediaStream of the remote peer.
        // Here you'd add it to an HTML video/canvas element.
        let audioItem = document.createElement('audio');
        audioItem.autoplay = true;
        //   audioItem.controls = true;
        audioItem.id = 'audio-' + uflag;
        self.audioListRef.current.appendChild(audioItem);
        audioItem.srcObject = stream;
      }

      function NewLocalPeer(uflag) {
        return new Promise((resole, reject) => {
          const peer = new Peer(composeUserFlag(uflag), {
            host: 'testpeerjs0214.playerone.world',
            path: '/peerjs',
            config: {
              iceServers: [
                { urls: 'stun:turntest0214.playerone.world:3478' },
                {
                  urls: 'turn:turntest0214.playerone.world:3478', // A TURN server
                  username: 'hello',
                  credential: 'world'
                }
              ]
            }
          });

          peer.on('open', function (id) {
            console.log('peer open', id);
            resole(true); // waiting until peer open
          });

          peer.on('call', function (mediaConnection) {
            mediaConnection.on('stream', function (stream) {
              callStreamFn(mediaConnection.peer, stream);
            });

            // Answer the call, providing our mediaStream
            mediaConnection.answer(self.state.myWebcamStream);
          });

          self.setState({ myPeer: peer });
        });
      }

      // 加入房间
      async function connect() {
        if (self.state.wsObj == null) {
          alert("websocket didn't init");
          return;
        }
        self.setState({ myUserFlag: self.props.account });
        let roomId = self.props.roomId;

        // 开启本地语音
        try {
          const webcamStream = await navigator.mediaDevices.getUserMedia(
            self.state.mediaConstraints
          );

          self.setState({ myWebcamStream: webcamStream });
        } catch (err) {
          console.error(err);
          return;
        }

        // 连接到 peer
        await NewLocalPeer(self.state.myUserFlag);
        let msg = {
          user_flag: self.state.myUserFlag,
          room_id: roomId
        };

        self.state.wsObj.sendMSG('VC_join_room', msg);
      }

      function respError(data) {
        console.error(`remote resp error msg: code(${data.code}) ${data.msg}`);
      }

      // 更新房间用户列表
      function respRoomUsers(data) {
        for (let i in data.userlist) {
          let userFlag = data.userlist[i];

          if (userFlag !== self.state.myUserFlag) {
            // 连接
            console.log(`will add user to room list: ${userFlag}`);

            const roomList = [...self.state.roomUserList];

            roomList[userFlag] = self.state.myPeer.call(
              composeUserFlag(userFlag),
              self.state.myWebcamStream
            ); // roomUserList[userFlag] = mediaConnection

            roomList[userFlag].on('stream', function (stream) {
              // `stream` is the MediaStream of the remote peer.
              // Here you'd add it to an HTML video/canvas element.
              callStreamFn(userFlag, stream);
            });

            self.setState({ roomUserList: roomList });
          }
        }
      }

      /**
       * 路由收到的服务器响应数据
       * @param msgid 双字节无符号整数，消息id，0-65535
       * @param content 消息正文
       */
      function dealAction(msgid, content) {
        console.log('deal action data ', msgid, content);

        switch (msgid) {
          case 'error':
            respError(content);
            break;
          case 'VC_room_userlist':
            respRoomUsers(content);
            break;
          default:
            console.log('unsupported action:', msgid);
            break;
        }
      }

      function start(e) {
        const wsHost = `wss://${self.state.server_host}`;

        console.log('will connect to ', wsHost);

        const ws = new ConnWs(wsHost, dealAction, connect);

        self.setState({ wsObj: ws });
      }

      start();
    };

    this.props.onReady(ready);
  }

  render() {
    return <div ref={this.audioListRef}></div>;
  }
}

export default Chat;
