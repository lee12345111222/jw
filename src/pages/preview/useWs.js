import { useState, useEffect, useCallback } from 'react';

export default function useWs() {
  // disconnect, connecting, connect, error
  const [status, setStatus] = useState('disconnect');

  const [, setHbPing] = useState(0);

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const [, setWs] = useState();

  const sendMsg = useCallback((msgid, msgBody) => {
    setWs((ws) => {
      msgBody.action = msgid;
      ws?.send(JSON.stringify(msgBody));
      return ws;
    });
  }, []);

  const updateHeartbeat = useCallback(() => {
    const hbPing = new Date().getTime();
    setHbPing(hbPing);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(`wss://rtctest0208.playerone.world/connect`);
    ws.on = ws.addEventListener;

    ws.on('open', () => {
      updateHeartbeat();
      setStatus('connect');
      ws.send(JSON.stringify({ action: 'msg', msg: 'ws open' }));
    });

    ws.on('close', () => setStatus('disconnect'));

    ws.on('message', ({ data }) => {
      const msg = JSON.parse(data);
      const msgid = msg.action;

      switch (msgid) {
        case 'pong':
          updateHeartbeat();
          break;
        default:
          setMessage(msg);
      }
    });

    ws.on('error', (error) => {
      ws.close();
      setStatus('error');
      setError(error);
    });

    setWs(ws);
  }, [updateHeartbeat]);

  const disconnect = useCallback(() => {
    setWs((ws) => {
      setStatus('disconnect');
      ws.close();
      return ws;
    });
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    connect();
  }, [connect, disconnect]);

  const heartbeat = useCallback(() => {
    setHbPing((hbPing) => {
      const now = new Date().getTime();
      const timefly = now - hbPing;

      if (timefly >= 30 * 1000) {
        reconnect();
      } else {
        sendMsg('ping', { timestamp: (now / 1000) >> 0 });
      }
      return hbPing;
    });
  }, [reconnect, sendMsg]);

  const [, setTimer] = useState(null);
  useEffect(() => {
    if (status !== 'connect') {
      return setTimer((timer) => {
        if (timer) {
          clearInterval(timer);
        }
        return null;
      });
    }

    setTimer((timer) => {
      if (timer) {
        clearInterval(timer);
      }
      return setInterval(() => {
        heartbeat();
      }, 20 * 1000);
    });

    return () => {
      setTimer((timer) => {
        if (timer) {
          clearInterval(timer);
        }
        return null;
      });
    };
  }, [heartbeat, status]);

  return { connect, disconnect, sendMsg, status, error, message };
}
