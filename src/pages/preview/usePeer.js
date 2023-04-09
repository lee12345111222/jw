import { useState, useCallback } from 'react';

import Peer from 'peerjs';

export default function usePeer() {
  const [error, setError] = useState();
  const [status, setStatus] = useState('closed');
  const [peer, setPeer] = useState(null);

  const create = useCallback((userFlag, onCall, onConnect) => {
    setStatus('opening');
    const peer = new Peer(userFlag, {
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

    setPeer(peer);

    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setStatus('open');
    });

    peer.on('error', (error) => {
      setError(error);
      // setStatus(error);
    });

    peer.on('call', (remoteCall) => {
      onCall(remoteCall);
    });

    peer.on('connection', (conn) => {
      console.log('conn >>>', conn);
      const { peer: remoteUserFlag } = conn;
      onConnect(remoteUserFlag, peer);
    });
  }, []);

  return { peer, create, error, status };
}
