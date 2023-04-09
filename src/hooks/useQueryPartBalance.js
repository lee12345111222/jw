import { useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import { VoxelRolePartsAddress as ContractAddress } from '@/constant/env/index';
import ContractAbi from '../constant/abi/PlayerOneRoleParts.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

/** owned parts */
export default function useQueryPartBalance() {
  const { account } = useWallet();

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
        .balanceOf(account, tokenId)
        .call();
      return result;
    },
    [account]
  );

  return execute;
}
