const OPENSEA_URL = 'https://testnets.opensea.io/assets';

module.exports = {
  graphql_url: 'https://api-test.element.market/graphql',
  OPENSEA_URL: 'https://testnets.opensea.io/assets',
  // OPENSEA_URL: OPENSEA_URL,
  opensea: {
    ethereum: `${OPENSEA_URL}/rinkeby`,
    polygon: `${OPENSEA_URL}/mumbai`
  },
  redirect_url: 'https://testnets.opensea.io/assets',
  appKey: 'ysBokbA3gKUzt61DmeHWjTFYZ07CGPQL',
  appSecret: 'a2PAJXRBChdpGvoyKEz3lLS5Yf1bM0NO',
  collectionSlug: {
    parcel: 'playerone-parcel-91db83',
    role: 'playerone-role-d749c3',
    roleParts: 'voxelroleparts-997a75',
    bluePrint: 'blueprint-da3562',
    jetpack: 'untitled-collection-bb892a'
  }
};
