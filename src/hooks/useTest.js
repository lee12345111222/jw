import { useCallback, useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { useWallet } from 'use-wallet';

const ContractAddress = '0x69c002903c0A7Be5dbCf53D269307bbbfEA84fe9';
const ContractAbi = [
  {
    inputs: [],
    name: 'ict',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export default function useTest() {
  const { ethereum } = useWallet();

  const contract = useMemo(
    () => new Contract(ContractAddress, ContractAbi),
    []
  );

  const execute = useCallback(
    /**
     *
     * @returns {Promise<{transactionHash: string}>}
     */
    async () => {
      const web3Provider = new Web3Provider(ethereum);

      const signer = web3Provider.getSigner();

      const contractWithSigner = contract.connect(signer);

      // const callStaticData = await contractWithSigner.callStatic.update()

      const tx = await contractWithSigner.update(); // hash

      return tx;
    },
    [ethereum, contract]
  );

  return execute;
}
