import { HmacSHA256 } from 'crypto-es/lib/sha256';

import {
  supported_chains,
  VoxelRolePartsAddress,
  PlayerOneRoleAddress,
  PlayerOneParcelAddress,
  Jetpack
} from '@/constant/env/index';

/**
 * @description get sign ，Element  key  index.js
 * @return {string} sign
 */
function getSign(appKey, appSecret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.floor(Math.random() * 999) + 1000;
  const content = `${appKey}${nonce}${timestamp}`;
  let sign = `${HmacSHA256(
    content,
    appSecret
  ).toString()}.${nonce}.${timestamp}`;

  return sign;
}

export const createHeader = (appKey, appSecret) => {
  return {
    'Content-Type': 'application/json',
    'X-Api-Key': appKey,
    'X-Api-Sign': getSign(appKey, appSecret)
  };
};

export const createListQueryStr = (args, collectionSlug) => {
  const { cursorStr, togglesStr, priceFilter, sortBy, ownerAddress, limit } =
    parseParams(args);

  return `query{
  search(${cursorStr} first: ${limit}, search: {
    collectionSlugs:["${collectionSlug}"]
    ${togglesStr}
    ${ownerAddress}
    ${priceFilter}
    ${sortBy}
  }){
    totalCount
    edges {
      cursor
      node {
        asset {
          tokenId
          name
          imagePreviewUrl
          properties{
            key
            value
          }
          stats{
            key
            value
          }
          tradeSummary{
            bestAsk{
              bestAskSaleKind
              bestAskPrice
              bestAskToken
              bestAskTokenId
              bestAskPriceBase
              bestAskPriceUSD
              bestAskListingDate
              bestAskExpirationDate
              bestAskPriceCNY
              bestAskCreatedDate
            }  
          }  
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
}`;
};

export const createDetailQueryStr = (type, id) => {
  const address = {
    rolePart: VoxelRolePartsAddress,
    role: PlayerOneRoleAddress,
    parcel: PlayerOneParcelAddress,
    jetpack: Jetpack
  }[type];

  const chain = {
    rolePart: 'polygon',
    role: 'polygon',
    parcel: 'eth',
    jetpack: 'eth'
  }[type];

  supported_chains.eth = supported_chains.ethereum;

  const chain_id_hex = supported_chains[chain].toString(16);

  return `query{
    asset(
      identity: {
      blockChain:{
        chain: "${chain}"
        chainId: "0x${chain_id_hex}"
      }
      contractAddress: "${address}"
      tokenId: "${id}"
    }){
      contractAddress
      tokenId
      name
      imagePreviewUrl
      properties{
        key
        value
      }
      stats{
        key
        value
      }
      assetOwners(first: 1){
        edges{
          node {
            owner
          }
        }
      }
      tradeSummary{
        bestAsk{
          bestAskSaleKind
          bestAskPrice
          bestAskToken
          bestAskTokenId
          bestAskPriceBase
          bestAskPriceUSD
          bestAskListingDate
          bestAskExpirationDate
          bestAskPriceCNY
          bestAskCreatedDate
        }  
      }
    }
  }`;
};

export const createHistoryQueryStr = (type, id) => {
  const address = {
    rolePart: VoxelRolePartsAddress,
    role: PlayerOneRoleAddress,
    parcel: PlayerOneParcelAddress,
    jetpack: Jetpack
  }[type];

  const chain = {
    rolePart: 'polygon',
    role: 'polygon',
    parcel: 'eth',
    jetpack: 'eth'
  }[type];

  supported_chains.eth = supported_chains.ethereum;

  const chain_id_hex = supported_chains[chain].toString(16);

  return `query {
    assetEvents(first: 10, input: {
      asset: {
        blockChain: {
          chain: "${chain}"
          chainId: "0x${chain_id_hex}"
        }
        contractAddress: "${address}"
        tokenId: "${id}"
      }
    }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          eventName
          fromAddress
          toAddress
          price
          eventTime
        }
      }
    }
  }`;
};

const parseParams = ({ cursor, toggles, price, sort, limit, owner } = {}) => {
  const cursorStr = cursor ? `after: "${cursor}"` : '';
  const togglesStr = toggles ? `toggles:[${toggles}]` : '';

  const [min, max, symbol] = price || [];

  let priceFilter = '';
  if (symbol && (min ?? -1) >= 0 && (max ?? -1) >= 0) {
    priceFilter = `priceFilter: {symbol: ${symbol}, min: ${min}, max: ${max}}`;
  }

  const sortBy = sort ? `sortBy: ${sort}` : '';

  const ownerAddress = owner ? `ownerAddress: "${owner}"` : '';

  return {
    cursorStr,
    togglesStr,
    priceFilter,
    sortBy,
    ownerAddress,
    limit: limit || 15
  };
};
