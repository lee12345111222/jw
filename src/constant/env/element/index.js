const OPENSEA_URL = 'https://opensea.io/assets';

module.exports = {
  graphql_url: 'https://api.element.market/graphql',
  OPENSEA_URL: OPENSEA_URL,
  opensea: {
    ethereum: `${OPENSEA_URL}/ethereum`,
    polygon: `${OPENSEA_URL}/matic`
  },
  redirect_url: 'https://opensea.io/assets/ethereum',
  appKey: 'zQbYj7RhC1VHIBdWU63ki5AJKXloamDT',
  appSecret: 'UqCMpfGn3VyQEdsjLkzJv9tNlgbKFD7O',
  collectionSlug: {
    parcel: 'playeroneworld',
    role: 'playerone-voxelrole',
    roleParts: 'voxelroleparts',
    bluePrint: 'playerone-blueprint',
    jetpack: 'playerone-jetpack'
  }
};
