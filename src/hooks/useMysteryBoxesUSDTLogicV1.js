import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import { MysteryBoxesUSDTAddress as ContractAddress } from '../constant/env/index';
import ContractAbi from '../constant/abi/MysteryBoxesUSDTLogicV1.json';
import { httpProvider, supported_chains } from '@/constant/env/index';

export default function useMysteryBoxesUSDTLogicV1() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const buyMysteryBoxLegend = useCallback(
    /**
     *
     * @param {number} grade 0 1 2 3
     * @returns {Promise<{transactionHash: string}>}
     */
    async (grade) => {
      const salt = Math.floor(Math.random() * 1000000) + Date.now();
      // const result = await contract.methods
      //   .buyMysteryBoxLegend(grade, salt)
      //   .send({
      //     from: account,
      //     to: ContractAddress
      //   });

      // return result;

      return new Promise((resolve, reject) => {
        const call = contract.methods.buyMysteryBoxLegend(grade, salt).send({
          from: account,
          to: ContractAddress
        });

        call
          .on('transactionHash', (tx) => {
            console.log(tx);
            const transaction =
              typeof tx === 'string' ? { transactionHash: tx } : tx;
            resolve(transaction);
          })
          .on('error', (error, receipt) => {
            console.log(error);
            reject(error);
          });
      });
    },
    [account, contract]
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
