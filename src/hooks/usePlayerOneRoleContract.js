import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import { PlayerOneRoleAddress } from '@/constant/env/index';
import { httpProvider, supported_chains } from '@/constant/env/index';

const ContractAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'string', name: '_uri', type: 'string' },
      { internalType: 'uint256', name: '_timestamp', type: 'uint256' },
      { internalType: 'bytes', name: '_signature', type: 'bytes' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

export default function usePlayerOneRoleContract() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () =>
      new new Web3(ethereum).eth.Contract(ContractAbi, PlayerOneRoleAddress),
    [ethereum]
  );

  const mintEstimateGasfee = useCallback(
    /**
     * gu suan mint cheng ben，attention  gaslimit hardcode
     * @returns {Promise<string>}
     */
    async () => {
      const web3 = new Web3(ethereum);

      const gasAmount = 434_806; // eth gas lint 251_076

      try {
        const gasPrice = await web3.eth.getGasPrice();

        const result = web3.utils.fromWei(
          web3.utils.toBN(gasAmount).mul(web3.utils.toBN(gasPrice))
        );

        return result;
      } catch (e) {
        console.log(e);
      }
    },
    [ethereum]
  );

  const totalSupply = useCallback(
    /**
     * @returns {Promise<string>}
     */
    async () => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, PlayerOneRoleAddress);

      const result = await readOnlyContract.methods.totalSupply().call();

      return result;
    },
    []
  );

  const roleMint = useCallback(
    /**
     *
     * @param {string} tokenId
     * @param {string} uri
     * @param {string} timestamp
     * @param {string} signature
     * @returns {Promise<{transactionHash: string}>}
     */
    async (tokenId, uri, timestamp, signature) => {
      const web3 = new Web3(ethereum);

      const gasAmount = await contract.methods
        .mint(tokenId, uri, timestamp, signature)
        .estimateGas({ from: account, to: PlayerOneRoleAddress });

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods
        .mint(tokenId, uri, timestamp, signature)
        .send({
          from: account,
          to: PlayerOneRoleAddress,
          gasLimit: gasAmount,
          gasPrice
        });

      return result;
    },
    [account, ethereum, contract]
  );

  return {
    roleMint,
    mintEstimateGasfee,
    totalSupply
  };
}
