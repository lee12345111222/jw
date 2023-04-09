import { MD5 } from 'crypto-es/lib/md5';

/**
 *
 * @description create random voxelRole part
 *
 * @param {number} partId
 * @param {[]} itemIds
 * @param {{}} roleCounter
 * @returns {boolean}
 */
export const randomPart = (partId, itemIds, roleCounter) => {
  let mintedAmount = 1;
  let items = {};

  if (roleCounter[partId]) {
    mintedAmount = roleCounter[partId].amount;
    items = roleCounter[partId].items;
  }

  let weighted = [];

  let t = 1;
  if (mintedAmount < 100) {
    t = 100;
  }

  let randomAmount = 0;

  for (let i in itemIds) {
    let itemId = itemIds[i];

    let _a = 1;

    if (items[itemId]) {
      _a = items[itemId].amount + 1;
    }

    let sum = parseInt((mintedAmount / _a) * t);

    randomAmount += sum;

    weighted.push({
      item_id: itemId,
      value: randomAmount
    });
  }

  let r = Math.random();
  r = parseInt(r * 100000000);
  let n = r % randomAmount;

  for (let i = 0; i < weighted.length; i++) {
    if (n < weighted[i].value) {
      return weighted[i].item_id;
    }
  }

  return 0; // error
};

/**
 *
 * @description create voxelRole hash code
 *
 * @param {[]} partMap
 * @returns {string}
 */
export const generateRolePartsHash = (partMap) => {
  let partNames = [];
  for (let partName in partMap) {
    partNames.push(partName);
  }

  partNames = partNames.sort();

  let str = '';

  for (let i in partNames) {
    let partName = partNames[i];
    let partItem = partMap[partName];

    if (str.length > 0) {
      str += '&';
    }

    str += `${partName}=${partItem}`;
  }

  let result = MD5(str).toString();

  return result;
};
