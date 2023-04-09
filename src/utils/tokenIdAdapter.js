import Web3 from 'web3';

import contractIdMap from '../constant/contractIdMap.json';
import editorIdMap from '../constant/editorIdMap.json';

/**
 * part contract tokenid to frontend id
 * @param {string} tokenid
 * @returns {Array<number>[2]}
 */
export const partContractToEditor = (tokenid) => contractIdMap[tokenid];

/**
 * frontend tokenid to contract tokenid
 * @param {string} id
 * @param {string} subId
 * @returns {string}
 */
export const editorToPartContract = (id, subId) => {
  if (id === 0 && subId === 0) return 0;
  return editorIdMap[id][subId];
};

/**
 * parts id to contract tokenid
 * use 0 if not exist
 * sorts are body hair beard glasses shirt necklace shoes pants hat earrings coat
 * @param {Array<string>} ids
 * @returns {string}
 */
export const roldIdSyntByPartId = (ids) => {
  const BN = Web3.utils.BN;

  let extraId = new BN(0);

  for (let i = 0, l = ids.length; i < l; i++) {
    const idOffset = i * 16;
    extraId = extraId.or(new BN(ids[i]).shln(idOffset));
  }

  return extraId.toString();
};
