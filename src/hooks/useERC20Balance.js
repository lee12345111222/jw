import { useCallback } from 'react';

import Web3 from 'web3';

import ContractAbi from '../constant/abi/ERC20.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

/**
 *
 * @param {string} ContractAddress
 * @param {keyof typeof supported_chains} chainName
 * @returns
 */
export default function useERC20Balance(ContractAddress, chainName) {
  const execute = useCallback(async (myAccount) => {
    const readOnlyContract = new new Web3(
      httpProvider[supported_chains[chainName]]
    ).eth.Contract(ContractAbi, ContractAddress);

    const result = await readOnlyContract.methods.balanceOf(myAccount).call();
    return result;
  }, []);

  return execute;
}
