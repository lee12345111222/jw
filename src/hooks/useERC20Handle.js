import { useCallback } from 'react';

import Web3 from 'web3';

import ContractAbi from '../constant/abi/ERC20.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

export default function useERC20Handle() {
  const decimals = useCallback(
    /**
     *
     * @param {string} ContractAddress
     * @param {keyof typeof supported_chains} chainName
     * @returns
     */
    async (ContractAddress, chainName) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains[chainName]]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods.decimals().call();

      return Number(result);
    },
    []
  );

  return { decimals };
}
