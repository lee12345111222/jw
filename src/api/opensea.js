const openseaUrl =
  process.env.REACT_APP_ENV === 'test'
    ? 'https://testnets-api.opensea.io/api/v1'
    : 'https://api.opensea.io/api/v1';

const paramFormatter = (params) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .reduce((pre, [k, v]) => pre.append(k, v) || pre, new URLSearchParams());

export const asyncFetch = async (path, params) => {
  return new Promise((resolve, reject) => {
    const url = new URL(`${openseaUrl}/${path}`);

    url.search = paramFormatter(params);
    fetch(url)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
};

export const getAssets = async ({ address, owner, cursor }) =>
  asyncFetch('assets', {
    owner,
    limit: 20,
    cursor,
    asset_contract_address: address,
    include_orders: false
  });

export const getDetail = async ({ address, tokenId }) =>
  asyncFetch(`asset/${address}/${tokenId}/?include_orders=true`, {});
