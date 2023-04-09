import { useCallback } from 'react';
import Web3 from 'web3';

import { VoxelRolePartsAddress as ContractAddress } from '../constant/index';
import ContractAbi from '../constant/abi/PlayerOneRoleParts.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

/** all count*/
export default function useQueryPartTotalSupply() {
  const execute = useCallback(
    /**
     *
     * @param {string} tokenId
     */
    async (tokenId) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods
        .tokenIdTotalSupply(tokenId)
        .call();
      return result;
    },
    []
  );

  return execute;
}