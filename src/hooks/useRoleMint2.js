import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import { PlayerOneRoleAdminAddress as ContractAddress } from '@/constant/env/index';
import ContractAbi from '../constant/abi/PlayerOneRoleAdmin.json';

export default function useRoleMint2() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new Contract(ContractAddress, ContractAbi),
    []
  );

  const execute = useCallback(
    /**
     *
     * @param {string} tokenId
     * @param {Array<string>} parts
     * @returns {Promise<{transactionHash: string}>}
     */
    async (parts) => {
      const web3Provider = new Web3Provider(ethereum);

      const signer = web3Provider.getSigner();

      const contractWithSigner = contract.connect(signer);

      await contractWithSigner.callStatic.addPlayerOneRole(account, parts);

      const tx = await contractWithSigner.addPlayerOneRole(account, parts); // hash

      return { transactionHash: tx.hash };
    },
    [account, ethereum, contract]
  );

  return execute;
}
