import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import ContractAbi from '../constant/abi/ERC20.json';

export default function useERC20Approve(ContractAddress) {
  const { ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const execute = useCallback(
    /**
     *
     * @returns {Promise<{transactionHash: string}>}
     */
    async (_spender) => {
      const web3 = new Web3(ethereum);

      // const amount = web3.utils.toBN(1e59).toString();
      const amount =
        '100000000000000000000000000000000000000000000000000000000000';

      const gasAmount = await contract.methods
        .approve(_spender, amount)
        .estimateGas({ from: _spender, to: ContractAddress });

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods.approve(_spender, amount).send({
        from: _spender,
        to: ContractAddress,
        gasLimit: gasAmount,
        gasPrice
      });

      return result;
    },
    [ethereum, contract]
  );

  return execute;
}
