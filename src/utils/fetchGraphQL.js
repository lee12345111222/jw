import { HmacSHA256 } from 'crypto-es/lib/sha256';

import { appKey, appSecret, graphql_url } from '@/constant/env/index';

async function fetchGraphQL(text, variables) {
  const response = await fetch(graphql_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': appKey,
      'X-Api-Sign': getSign(appKey, appSecret)
    },
    body: JSON.stringify(
      //     {
      //   query: text,
      //   variables
      // }
      {
        variables: {
          //   realtime: true,
          //   thirdStandards: ['nfttrade-zero-ex', 'opensea-wyv', 'element-ex-v3'],
          collectionSlugs: ['blueprint-2245c4'],
          //   sortAscending: false,
          //   sortBy: 'PriceLowToHigh',
          first: 15
        },
        query: `query exploreAssetsList($before: String, $after: String, $first: Int, $last: Int, $querystring: String, $categorySlugs: [String!], $collectionSlugs: [String!], $sortBy: SearchSortBy, $sortAscending: Boolean, $toggles: [SearchToggle!], $ownerAddress: Address, $creatorAddress: Address, $blockChains: [BlockChainInput!], $paymentTokens: [String!], $priceFilter: PriceFilterInput, $stringTraits: [StringTraitInput!], $contractAliases: [String!], $thirdStandards: [String!], $realtime: Boolean) {
  search(
    
    before: $before
    after: $after
    first: $first
    last: $last
    search: {querystring: $querystring, categorySlugs: $categorySlugs, collectionSlugs: $collectionSlugs, sortBy: $sortBy, sortAscending: $sortAscending, toggles: $toggles, ownerAddress: $ownerAddress, creatorAddress: $creatorAddress, blockChains: $blockChains, paymentTokens: $paymentTokens, priceFilter: $priceFilter, stringTraits: $stringTraits, contractAliases: $contractAliases}
  ) {
    totalCount
    edges {
      cursor
      node {
        asset {
          chain
          chainId
          contractAddress
          tokenId
          tokenType
          name
          imageAttrs
          imageThumbnailUrl
          imagePreviewUrl
          animationUrl
          tradeSummary(thirdStandards: $thirdStandards, realtime: $realtime) {
            lastSale {
              lastSalePrice
              lastSalePriceUSD
              lastSaleQuantity
              lastSaleTokenContract {
                id
                name
                address
                icon
                decimal
                symbol
                accuracy
                __typename
              }
              __typename
            }
            bestBid {
              bestBidPrice
              bestBidToken
              bestBidPriceBase
              bestBidPriceUSD
              bestBidPriceCNY
              bestBidCreatedDate
              bestBidOrderString
              bestBidOrderQuantity
              bestBidTokenContract {
                id
                name
                address
                icon
                decimal
                symbol
                accuracy
                __typename
              }
              __typename
            }
            bestAsk {
              bestAskSaleKind
              bestAskPrice
              bestAskToken
              bestAskPriceBase
              bestAskPriceUSD
              bestAskExpirationDate
              bestAskOrderString
              bestAskOrderType
              bestAskOrderQuantity
              bestAskTokenContract {
                id
                name
                address
                icon
                decimal
                symbol
                accuracy
                __typename
              }
              __typename
            }
            __typename
          }
          paymentTokens {
            id
            name
            address
            icon
            symbol
            chain
            chainId
            decimal
            __typename
          }
          collection {
            name
            isVerified
            slug
            imageUrl
            royaltyAddress
            royalty
            stats {
              ownerCount
              assetCount
              floorPrice
              coin {
                name
                address
                icon
                __typename
              }
              __typename
            }
            contracts {
              blockChain {
                chain
                chainId
                __typename
              }
              __typename
            }
            __typename
          }
          rarityRank
          isFavorite
          favoriteQuantity
          ownedQuantity
          __typename
        }
        __typename
      }
      __typename
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
      __typename
    }
    __typename
  }
}`
      }
    )
  });

  return await response.json();
}

function getSign(appKey, appSecret) {
  const timestamp = Date.now() >> 0;
  const nonce = ((Math.random() * 999) >> 0) + 1000;
  const content = `${appKey}${nonce}${timestamp}`;
  let sign = `${HmacSHA256(
    content,
    appSecret
  ).toString()}.${nonce}.${timestamp}`;

  return sign;
}

export default fetchGraphQL;
