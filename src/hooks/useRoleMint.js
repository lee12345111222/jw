import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import { PlayerOneRoleAddress } from '@/constant/env/index';

import Web3 from 'web3';

const PlayerOneRoleAbi = [
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
  }
];

export default function useRoleMint() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () =>
      new new Web3(ethereum).eth.Contract(
        PlayerOneRoleAbi,
        PlayerOneRoleAddress
      ),
    [ethereum]
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
        .estimateGas({ from: account, to: PlayerOneRoleContractAddress });

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods
        .mint(tokenId, uri, timestamp, signature)
        .send({
          from: account,
          to: PlayerOneRoleContractAddress,
          gasLimit: gasAmount,
          gasPrice
        });

      return result;
    },
    [account, ethereum, contract]
  );

  return roleMint;
}
