import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import { PlayerOneMintPass as ContractAddress } from '@/constant/env/index';

import ContractAbi from '@/constant/abi/PlayerOneMintPass.json';
import priceMintPass from '../constant/priceMintPass.json';

export default function usePlayerOneMintPass() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const mintPass = useCallback(
    /**
     * 购买 passcard
     * @param {number} nums 数量
     * @param {number} mintType 类型
     * @param {Array<string>} merkleProof - 默克尔树证明
     * @returns
     */
    async (nums, mintType, merkleProof) => {
      const priceWei = new BigNumber(priceMintPass[mintType]).times(nums);

      const result = await contract.methods
        .mintPass(nums, mintType, merkleProof)
        .send({
          from: account,
          to: ContractAddress,
          value: priceWei
        });

      return result;
    },
    [account, contract]
  );

  const exchangeParcel = useCallback(
    /**
     * 使用 passcard 兑换土地
     * @param {number} tokenid MintPass NFT id
     * @param {number} parcelId 土地的 tokenid，从服务器获取
     * @param {Array<number>} box 土地的信息 x1, y1, z1, x2, y2, z2，从服务器获取
     * @param {Array<string>} merkleProof - 默克尔树证明
     * @returns
     */
    (tokenid, parcelId, box, merkleProof) => {
      // const result = await contract.methods
      //   .exchangeParcel(tokenid, parcelId, box, merkleProof)
      //   .send({
      //     from: account,
      //     to: ContractAddress
      //   });

      // return result;

      return new Promise((resolve, reject) => {
        const call = contract.methods
          .exchangeParcel(tokenid, parcelId, box, merkleProof)
          .send({
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

  const getCurrentSupply = useCallback(
    /**
     * 获取现在所有类型已经购买的类型，数组的索引对应 passcard 的类型
     * @returns {Array<number>}
     */
    async () => {
      const result = await contract.methods.getCurrentSupply().call();
      return result;
    },
    [contract]
  );

  const getMintedPerAddress = useCallback(
    /**
     * 根据地址获取已购买的次数
     * @param {string} addr
     * @returns {number}
     */
    async (addr) => {
      const result = await contract.methods.mintedPerAddress(addr).call();
      return result;
    },
    [contract]
  );

  return { mintPass, exchangeParcel, getCurrentSupply, getMintedPerAddress };
}
