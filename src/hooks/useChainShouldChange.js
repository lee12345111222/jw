import { useCallback } from 'react';

import { useWallet } from 'use-wallet';
import useSwitchNetwork from '@/hooks/useSwitchNetwork';

import { supported_chains } from '@/constant/env/index';
import { Modal } from 'antd';

const { confirm } = Modal;

export default function useChainShouldChange() {
  const { chainId } = useWallet();
  const switchNetwork = useSwitchNetwork();

  return useCallback(
    async (target = 'polygon') =>
      new Promise((resolve, reject) => {
        if (!chainId) {
          return reject();
        }
        if (chainId !== supported_chains[target]) {
          confirm({
            title: `You need to switch your wallet to the ${target} network to continue your current operations. Are you sure to switch?`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            async onOk() {
              try {
                const res = await switchNetwork(supported_chains[target]);
                resolve(res === null);
              } catch (e) {
                reject(e);
              }
            },
            onCancel() {
              resolve(false);
            }
          });
        } else {
          resolve(true);
        }
      }),
    [chainId, switchNetwork]
  );
}
