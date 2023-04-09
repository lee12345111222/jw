import { useCallback } from 'react';
import Web3 from 'web3';

import { MysteryBoxesUSDTAddress as ContractAddress } from '../constant/index';
import ContractAbi from '../constant/abi/MysteryBoxesBUSD.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

/** check 50% white list count*/
export default function useQueryDisWhiteListExist() {
  const execute = useCallback(
    /**
     *
     * @param {string} owner
     * @param {1 | 3 | 6 | 9} boxType
     */
    async (owner, boxType) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods
        .discountWhiteList(owner, boxType)
        .call();
      return result;
    },
    [contract]
  );

  return execute;
}
