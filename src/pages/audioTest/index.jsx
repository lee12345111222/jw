import { useCallback } from 'react';

import { useWallet } from 'use-wallet';
import useChat from '../preview/useChat';

export default function AudioTest() {
  const { account } = useWallet();
  const { connect, disconnect } = useChat(account, '12345678');

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div>
      <button onClick={handleConnect}>connect</button>
      <button onClick={handleDisconnect}>disconnect</button>
    </div>
  );
}
