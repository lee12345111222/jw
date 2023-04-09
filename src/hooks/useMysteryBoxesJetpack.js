import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import Web3 from 'web3';

import { MysteryBoxesJetpack as ContractAddress } from '../constant/env/index';
import ContractAbi from '../constant/abi/MysteryBoxesJetpack.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

export default function useMysteryBoxesJetpack() {
  const { ethereum } = useWallet();

  const contract = useMemo(
    () => new Contract(ContractAddress, ContractAbi),
    []
  );

  const claim = useCallback(
    /**
     *
     * @param {number} grade 0 1 2 3
     * @returns {Promise<{transactionHash: string}>}
     */
    async (grade) => {
      const salt = Math.floor(Math.random() * 1000000) + Date.now();

      const web3Provider = new Web3Provider(ethereum);

      const signer = web3Provider.getSigner();

      const contractWithSigner = contract.connect(signer);

      await contractWithSigner.callStatic.claim(grade, salt);

      const tx = await contractWithSigner.claim(grade, salt); // hash

      return { transactionHash: tx.hash };
    },
    [ethereum, contract]
  );

  const freeWhiteList = useCallback(
    /**
     *
     * @param {string} owner
     * @param {0 | 1 | 2 | 3} boxType
     */
    async (owner, boxType) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.ethereum]
      ).eth.Contract(ContractAbi, ContractAddress);

      console.log(ContractAddress);

      const result = await readOnlyContract.methods
        .freeWhiteList(owner, boxType)
        .call();

      // const result = await contract.freeWhiteList(owner, boxType);

      return result;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contract]
  );

  return { claim, freeWhiteList };
}
