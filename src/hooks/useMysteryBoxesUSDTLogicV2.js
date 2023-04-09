import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import Web3 from 'web3';

import { MysteryBoxesUSDTAddress as ContractAddress } from '../constant/env/index';
import ContractAbi from '../constant/abi/MysteryBoxesUSDTLogicV1.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

export default function useMysteryBoxesUSDTLogicV2() {
  const { ethereum } = useWallet();

  const contract = useMemo(
    () => new Contract(ContractAddress, ContractAbi),
    []
  );

  const buyMysteryBoxLegend = useCallback(
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

      await contractWithSigner.callStatic.buyMysteryBoxLegend(grade, salt);

      const tx = await contractWithSigner.buyMysteryBoxLegend(grade, salt); // hash

      return { transactionHash: tx.hash };
    },
    [ethereum, contract]
  );

  const freeLegendWhiteList = useCallback(
    /**
     *
     * @param {string} owner
     * @param {0 | 1 | 2 | 3} boxType
     */
    async (owner, boxType) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods
        .freeLegendWhiteList(owner, boxType)
        .call();
      return result;
    },
    []
  );

  return { buyMysteryBoxLegend, freeLegendWhiteList };
}
