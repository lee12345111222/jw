import { useCallback } from 'react';
import Web3 from 'web3';

import { PlayerOneRoleAddress as ContractAddress } from '@/constant/env/index';
import ContractAbi from '../constant/abi/PlayerOneRole.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

/** is chong tu*/
export default function useQueryRoldExist() {
  const execute = useCallback(
    /**
     *
     * @param {string} extraId
     */
    async (extraId) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods
        .extraIdToTokenid(extraId)
        .call();
      return result !== '0';
    },
    []
  );

  return execute;
}
