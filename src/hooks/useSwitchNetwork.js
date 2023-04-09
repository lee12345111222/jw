import { useCallback } from 'react';
import { detectMetaMask, MetaMaskNotInstallError } from '../utils/common';

import { networks } from '@/constant/env/index';

export default function useSwitchNetwork() {
  const execute = useCallback(
    /**
     *
     * @param {1|5|137|80001} chainId
     * @returns
     */
    async (chainId) => {
      const provider = detectMetaMask();

      const network = networks[chainId];

      try {
        if (!provider) {
          throw new MetaMaskNotInstallError();
        }

        return await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: network.chain_id_hex }]
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: network.chain_id_hex,
                  chainName: network.chain_name,
                  rpcUrls: network.rpc_urls,
                  blockExplorerUrls: network.block_explorer_urls,
                  nativeCurrency: network.native_currency
                }
              ]
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    },
    []
  );

  return execute;
}
