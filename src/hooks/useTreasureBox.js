import { useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';

import Web3 from 'web3';

import { TreasureBox as ContractAddress } from '@/constant/env/index';

import ContractAbi from '@/constant/abi/TreasureBox.json';

import { httpProvider, supported_chains } from '@/constant/env/index';

export default function useTreasureBox() {
  const { account, ethereum } = useWallet();

  const contract = useMemo(
    () => new new Web3(ethereum).eth.Contract(ContractAbi, ContractAddress),
    [ethereum]
  );

  const createBox = useCallback(
    /**
     *
     * @param {string} tokenAddress Rewarding token Address
     * @param {number} startTime
     * @param {number} endTime
     * @param {number} duration - 周期
     * @param {number} maxCount - 每天总共领取最大次数
     * @param {number} perRewardAmount - 奖励值
     * @param {number} decimal - 默认
     * @returns
     */
    async (
      tokenAddress,
      startTime,
      endTime,
      duration,
      maxCount,
      perRewardAmount,
      decimal = 18
    ) => {
      const web3 = new Web3(ethereum);

      const weiPerRewardAmount = new web3.utils.BN(perRewardAmount * 10000)
        .mul(new web3.utils.BN(10).pow(new web3.utils.BN(decimal)))
        .div(new web3.utils.BN(10000))
        .toString();

      const gasAmount = await contract.methods
        .createBox(
          tokenAddress,
          startTime,
          endTime,
          duration,
          maxCount,
          weiPerRewardAmount
        )
        .estimateGas({ from: account, to: ContractAddress })
        .then((v) => (v * 1.4) >> 0);

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods
        .createBox(
          tokenAddress,
          startTime,
          endTime,
          duration,
          maxCount,
          weiPerRewardAmount
        )
        .send({
          from: account,
          to: ContractAddress,
          gasLimit: gasAmount, // test out gas fix
          gasPrice
        });

      return result;
    },
    [account, ethereum, contract]
  );

  const deleteBox = useCallback(
    /**
     *
     * @param {number} pid
     * @returns
     */
    async (pid) => {
      const web3 = new Web3(ethereum);

      const gasAmount = await contract.methods
        .deleteBox(pid)
        .estimateGas({ from: account, to: ContractAddress })
        .then((v) => (v * 1.4) >> 0);

      console.log(gasAmount);

      const gasPrice = await web3.eth.getGasPrice();

      const result = await contract.methods.deleteBox(pid).send({
        from: account,
        to: ContractAddress,
        gasLimit: gasAmount, // test out gas fix
        gasPrice
      });

      return result;
    },
    [account, ethereum, contract]
  );

  const getBoxInfo = useCallback(
    /**
     *
     * @param {number} pid
     * @returns
     */
    async (pid) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods.boxOf(pid).call();
      return result;
    },
    []
  );

  const getReceivingRecord = useCallback(
    /**
     * 结束的时间点 = 最后一次领取时间节点 + 周期
     * 如果 （现在的时间 < 结束的时间点 ） {
     *  如果 当前用户领取次数 显示倒计时，倒计时就是现在的时间到结束的时间点
     *   如果可领取着按钮显示可领取状态
     * } 否则 {
     * 可领取
     * }
     * @param {number} pid
     * @param {string} addr
     * @returns {Array<string>} - [] 总次数，宝箱创建时间，最后领取时间
     */
    async (pid, addr) => {
      const readOnlyContract = new new Web3(
        httpProvider[supported_chains.polygon]
      ).eth.Contract(ContractAbi, ContractAddress);

      const result = await readOnlyContract.methods
        .getReceivingRecord(pid, addr)
        .call();
      return result;
    },
    []
  );

  return { createBox, deleteBox, getBoxInfo, getReceivingRecord };
}
