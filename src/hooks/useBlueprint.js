import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import Web3 from 'web3';

import { Blueprint as ContractAddress } from '@/constant/env/index';

import ContractAbi from '@/constant/abi/BlueprintLogicV1.json';

export default function useBlueprint() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const mint = useCallback(
    /**
     * 创建蓝图
     * @param {number} uuid 服务器返回到唯一标识，会用作资源的读取
     * @param {number} amount 创建的数量
     * @returns
     */
    async (uuid, amount) => {
      const result = await contract.methods.mint(uuid, amount, account).send({
        from: account,
        to: ContractAddress
      });

      return result;
    },
    [account, contract]
  );

  const bindBlueprint = useCallback(
    /**
     * 使用蓝图
     * @param {number} tokenId 蓝图的id
     * @param {number} parcelTokenId 土地的id
     * @returns
     */
    async (tokenId, parcelTokenId) => {
      const web3Provider = new Web3Provider(ethereum);

      const signer = web3Provider.getSigner();

      const contractWithSigner = new Contract(
        ContractAddress,
        ContractAbi
      ).connect(signer);

      await contractWithSigner.callStatic.useBlueprint(
        tokenId,
        parcelTokenId,
        account
      );

      const tx = await contractWithSigner.useBlueprint(
        tokenId,
        parcelTokenId,
        account
      ); // hash

      return { transactionHash: tx.hash };
    },
    [account, ethereum]
  );

  const remainingSupply = useCallback(
    /**
     * 实际剩余的量，减去使用的量
     * @param {number} tokenid
     * @returns {number}
     */
    async (tokenid) => {
      const result = await contract.methods.remainingSupply(tokenid).call();
      return result;
    },
    [contract]
  );

  const isCreator = useCallback(
    /**
     * 是否在创建者中
     * @param {string} addr
     * @returns {boolean}
     */
    async (addr) => {
      const result = await contract.methods.isCreator(addr).call();
      return result;
    },
    [contract]
  );

  const isBindingBlueprint = useCallback(
    /**
     * 是否已绑定过
     * @param {string} parcelId
     * @param {string} tokenId
     * @returns {boolean}
     */
    async (parcelId, tokenId) => {
      const result = await contract.methods
        .parcelToBlueprint(parcelId, tokenId)
        .call();
      return result;
    },
    [contract]
  );

  return {
    mint,
    isCreator,
    remainingSupply,
    bindBlueprint,
    isBindingBlueprint
  };
}
