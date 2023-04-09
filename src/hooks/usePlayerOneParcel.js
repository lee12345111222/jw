import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import {
  PlayerOneParcelAddress as ContractAddress,
  httpProvider,
  supported_chains
} from '@/constant/env/index';

import ContractAbi from '../constant/abi/PlayerOneParcel.json';

// settleinPeriod 是否安家中、这次安家的时间、总共安家的时间
export default function usePlayerOneParcel() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const toggleSettle = useCallback(
    /**
     * 切换安家状态
     * @param {Array<number>} tokenids 要切换状态的土地 tokenid 列表
     * @returns
     */
    (tokenids) => {
      return new Promise((resolve, reject) => {
        contract.methods
          .toggleSettle(tokenids)
          .send({
            from: account,
            to: ContractAddress
          })
          .on('transactionHash', (tx) => {
            console.log('toggleSettle>>>', tx);
            resolve(tx);
          })
          .on('error', (error, receipt) => {
            console.error('toggleSettle error>>>', error);
            reject(error);
          });
      });
    },
    [account, contract]
  );

  const getSettleinPeriod = useCallback(
    /**
     *
     * @param {string} tokenid
     * @returns {Array<string>} - [] 是否安家中、这次安家的时间、总共安家的时间
     */
    async (tokenid) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.ethereum]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods
        .settleinPeriod(tokenid)
        .call();
      return result;
    },
    []
  );

  return { toggleSettle, getSettleinPeriod };
}
