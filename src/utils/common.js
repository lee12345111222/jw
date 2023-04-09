import Web3 from 'web3';
import BigNumber from 'bignumber.js';

/**
 *
 * @param {string} address
 */
export const showShortAddress = (address) => {
  if (!address) return '-';

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const getDisplayBalance2ETH = (balance = 0, format = false) => {
  let balance2ETH;
  try {
    balance2ETH = Web3.utils.fromWei(balance, 'ether');
  } catch (e) {
    balance2ETH = '';
  }

  if (format) {
    return ((balance2ETH * 10000) >> 0) / 10000;
  }

  return balance2ETH;
};

/**
 *
 * @param {string} amount
 * @param {number} decimal
 * @param {*} param2
 * @returns {string}
 */
export const displayTokenAmount = (
  amount,
  decimal = 18,
  { symbol = '', commify = false, digits = 4 } = {}
) =>
  new BigNumber(amount).div(10 ** decimal).toFormat(digits, {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: commify ? ',' : '',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: symbol
  });

const txCallbacks = {};

/**
 *
 * @param {Web3} web3
 * @param {string} txHash
 * @param {(receipt) => void} onFinalized
 */
const track = (web3, txHash, onFinalized) => {
  if (txCallbacks[txHash]) {
    txCallbacks[txHash].push(onFinalized);
  } else {
    txCallbacks[txHash] = [onFinalized];
    const poll = async () => {
      const tx = await web3.eth.getTransaction(txHash);

      if (
        tx &&
        tx.blockHash &&
        tx.blockHash !==
          '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        const receipt = await web3.eth.getTransactionReceipt(txHash);

        if (!receipt) {
          console.warn('No receipt found for ', txHash);
        }

        txCallbacks[txHash].map((f) => f(receipt));
        delete txCallbacks[txHash];
      } else {
        setTimeout(poll, 2000);
      }
    };
    poll().catch();
  }
};

/**
 * confirm trade
 * @param {string} txHash
 * @returns
 */
export const confirmTransaction = async (web3, txHash) => {
  return new Promise((resolve, reject) => {
    track(web3, txHash, (receiptObj) => {
      if (receiptObj.status) {
        resolve(receiptObj);
      } else {
        reject(new Error('Transaction failed'));
      }
    });
  });
};

/**
 * read ERC1155 trade summary
 * @param {Array<any>} logs
 * 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62
 * 0x00000000000000000000000000000000000000000000000000000000000003e8
 * 0x0000000000000000000000000000000000000000000000000000000000000001
 * @returns {{id: string, quantity: string}[]}
 */
export const parsingBuyMysteryBoxEvtIds = (logs) => {
  // return logs
  //   .filter(
  //     (log) =>
  //       log.topics[0] ===
  //       '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
  //   )
  //   .map((log) => {
  //     const data = log.data.substring(2, log.data.length);
  //     const id = '0x' + data.substring(0, 64);
  //     const quantity = '0x' + data.substring(64, 128);

  //     return {
  //       id,
  //       quantity
  //     };
  //   });

  const parts = [];

  logs.forEach((log) => {
    if (
      log.topics[0] ===
      '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
    ) {
      const data = log.data.substring(2, log.data.length);
      const id = '0x' + data.substring(0, 64);
      const quantity = '0x' + data.substring(64, 128);

      parts.push({
        id,
        quantity
      });
    }
  });

  return parts;
};

/**
 * 根据盲盒日志解析蓝图的 tokenid
 * 用法参考 parsingBuyMysteryBoxEvtIds
 * @param {*} logs
 * @returns
 */
export const parsingByMysteryBoxBlueprintId = (logs) =>
  new BigNumber(logs[0]['data'].substring(0, 66)).toString();

export function detectMetaMask() {
  if (
    typeof window.ethereum !== 'undefined' ||
    typeof window.web3 !== 'undefined'
  ) {
    // Web3 browser user detected. You can now use the provider.
    return window['ethereum'] || window.web3.currentProvider;
  }
}

export class MetaMaskNotInstallError extends Error {
  constructor() {
    super('Metamask not installed.');

    this.code = -1000; // set this way temporary
  }
}

export const sleep = (t = 1000) =>
  new Promise((resolve) => setTimeout(resolve, t));

/**
 *
 * @param {string} address
 */
export const fillAddress = (address) =>
  address.slice(0, 2) === '0x' ? address : '0x' + address;

export const isTest = process.env.REACT_APP_ENV === 'test';
export const isPrev = process.env.REACT_APP_ENV === 'preview';

//生成从 0 到 num 的随机数
export const randomNum = (num = 9, qz = true) => {
  const result = Math.random() * (num + 1); // >> 0;
  if (qz) {
    return result >> 0;
  }

  return result;
};
