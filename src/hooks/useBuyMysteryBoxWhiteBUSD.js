import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import { MysteryBoxesUSDTAddress as ContractAddress } from '@/constant/env/index';
import ContractAbi from '../constant/abi/MysteryBoxesBUSD.json';

export default function useBuyMysteryBoxWhiteBUSD() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const execute = useCallback(
    /**
     *
     * @param {number} mintQuantity 1 3 6 9
     * @param {bool} isFree
     * @returns {Promise<{transactionHash: string}>}
     */
    async (mintQuantity, isFree) => {
      const web3 = new Web3(ethereum);

      const salt = Math.floor(Math.random() * 1000000) + Date.now();

      const gasAmount = await contract.methods
        .buyMysteryBoxWhite(mintQuantity, salt, isFree)
        .estimateGas({ from: account, to: ContractAddress })
        .then((v) => (v * 1.4) >> 0);

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods
        .buyMysteryBoxWhite(mintQuantity, salt, isFree)
        .send({
          from: account,
          to: ContractAddress,
          gasLimit: gasAmount,
          gasPrice
        });

      return result;
    },
    [account, ethereum, contract]
  );

  return execute;
}
