class ConnectChatServer {
  constructor(serverHost, actionCallback, startCallback) {
    this.hb_ping = 0; // 上次ping时间（戳，毫秒）
    this.hb_interval = 2 * 10000; // 心跳间隔（毫秒）
    this.hb_overtime = 3 * 10000; // 重连间隔
    this.serverHost = serverHost;
    this.actionCallback = actionCallback;
    this.startCallback = startCallback;
    this.connectionStatus = null;
  }

  /**
   * 执行连接并开启心跳
   */
  connect() {
    this.initSocket();

    this.interval = setInterval(() => {
      this.heartbeat();
    }, this.hb_interval);
  }

  /**
   * 断开连接
   */
  disconnect() {
    clearInterval(this.interval);
    this.socket.close();
  }

  /**
   * 重连
   */
  reconnect() {
    this.initSocket();
  }

  /**
   * 收到服务器 pong 消息
   */
  updateHeartbeat() {
    this.hb_ping = new Date().getTime();
    console.log('revived pong, update HB ', this.hb_ping);
  }

  /**
   * 发送消息
   * @param msgid
   * @param msgBody
   */
  sendMsg(msgid, msgBody) {
    msgBody.action = msgid;
    this.socket.send(JSON.stringify(msgBody));
  }

  /**
   * 心跳
   */
  heartbeat() {
    const now = new Date().getTime();
    const timefly = now - this.hb_ping;
    if (timefly >= this.hb_overtime) {
      this.reconnect();
    } else {
      this.sendMsg('ping', {
        timestamp: parseInt(now / 1000)
      });
    }
  }

  /**
   * 初始化 socket
   */
  initSocket() {
    const socket = new WebSocket(`${this.serverHost}/connect`);
    socket.binaryType = 'arraybuffer';

    // socket.onmessage = (event) => {
    //   const msg = JSON.parse(event.data);
    //   const msgid = msg.action;

    //   console.log('Received Message: ', msgid, msg);

    //   msgid === 'pong'
    //     ? this.updateHeartbeat()
    //     : this.actionCallback(msgid, msg);
    // };

    socket.addEventListener('open', () => {
      this.updateHeartbeat();
      this.sendMsg('msg', {
        action: 'msg',
        msg: 'test qqqq'
      });

      console.log('this.startCallback >>>', this.startCallback);

      this.startCallback(socket);
    });

    socket.onclose = function () {
      this.status = 'close';
      console.log('Ws has closed');
    };

    socket.onerror = function (error) {
      this.status = 'error';
      console.log('Ws error : ', error.data);
    };

    this.socket = socket;
  }
}

export default ConnectChatServer;
