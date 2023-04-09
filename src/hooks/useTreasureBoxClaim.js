import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import { TreasureBox as ContractAddress } from '@/constant/env/index';

import ContractAbi from '../constant/abi/TreasureBox.json';

export default function useTreasureBoxClaim() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const claim = useCallback(
    /**
     *
     * @param {number} pid
     * @returns
     */
    async (pid) => {
      const web3 = new Web3(ethereum);

      const gasAmount = await contract.methods
        .claim(pid)
        .estimateGas({ from: account, to: ContractAddress })
        .then((v) => (v * 1.4) >> 0);

      console.log(gasAmount);

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods.claim(pid).send({
        from: account,
        to: ContractAddress,
        gasLimit: gasAmount, // test out gas fix
        gasPrice
      });

      return result;
    },
    [account, ethereum, contract]
  );

  return claim;
}
