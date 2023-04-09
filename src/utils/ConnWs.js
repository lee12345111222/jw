function ConnWs(serverHost, actionCallback, startCallback) {
  this.serverHost = serverHost;
  this.actionCallback = actionCallback;
  this.startCallback = startCallback;

  this.wsconnect(); // go
}

ConnWs.prototype = {
  socket: null, // 连接句柄
  hb_ping: 0, // 上次ping时间（戳，毫秒）
  hb_interval: 20000, // 心跳间隔（毫秒）
  hb_overtime: 30000, // 重连间隔

  /**
   * 执行连接并开启心跳
   */
  wsconnect: function () {
    var that = this;
    that.initSocket();

    setInterval(function () {
      that.heartbeat();
    }, that.hb_interval);
  },

  /**
   * 重连
   */
  wsreconnect: function () {
    this.initSocket();
  },

  /**
   * 初始化 socket
   * @param uuid
   */
  initSocket: function (uuid) {
    var that = this;
    this.socket = new WebSocket(`${this.serverHost}/connect`);
    this.socket.binaryType = 'arraybuffer';

    // Message received on the socket
    this.socket.onmessage = function (event) {
      let msg = JSON.parse(event.data);
      let msgid = msg.action;

      console.log('Received Message: ', msgid, msg);

      switch (msgid) {
        case 'pong': // pong
          that.updateHeartbeat();
          break;
        default:
          that.actionCallback(msgid, msg);
          break;
      }
    };

    this.socket.onopen = async function () {
      // Web Socket 已连接上，使用 send() 方法发送数据
      that.hb_ping = new Date().getTime();
      console.log('Ws has opened, update HB ', that.hb_ping);
      that.sendMSG('msg', {
        action: 'msg',
        msg: 'test qqqq'
      });

      await that.startCallback();
    };

    this.socket.onclose = function () {
      // 关闭 websocket
      console.log('Ws has closed');
    };

    this.socket.onerror = function (event) {
      console.log('Ws error : ', event.data);
    };
  },

  /**
   * 收到服务器 pong 消息
   */
  updateHeartbeat: function () {
    this.hb_ping = new Date().getTime();
    console.log('revived pong, update HB ', this.hb_ping);
  },

  /**
   * 心跳
   */
  heartbeat: function () {
    // 是否超时重连
    var now = new Date().getTime();
    var cha = now - this.hb_ping;
    if (cha >= this.hb_overtime) {
      this.wsreconnect();
    } else {
      var msgid = 'ping';
      var content = {
        timestamp: parseInt(now / 1000)
      };
      this.sendMSG(msgid, content);
    }
  },

  /**
   * 发送消息
   * @param msgid
   * @param msgBody
   */
  sendMSG: function (msgid, msgBody) {
    msgBody.action = msgid;

    // 发送
    this.socket.send(JSON.stringify(msgBody));
  }
};

export default ConnWs;
