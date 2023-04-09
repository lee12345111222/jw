module.exports = {
  login_sign_str: `Welcome to PlayerOne!
Click "Sign" to sign in. No password needed!
I accept the PlayerOne Terms of Service: https://playerone.world/tos
ADDRESS `,
  networks: {
    1: {
      chain_id: 1,
      chain_id_hex: '0x1',
      chain_name: 'Ethereum Mainnet',
      rpc_urls: ['https://mainnet.infura.io/v3/'],
      block_explorer_urls: ['https://etherscan.io'],
      native_currency: {
        symbol: 'ETH',
        name: 'ETH',
        decimals: 18
      }
    },
    137: {
      chain_id: 137,
      chain_id_hex: '0x89',
      chain_name: 'Polygon Mainnet',
      rpc_urls: ['https://polygon-rpc.com/'],
      block_explorer_urls: ['https://polygonscan.com'],
      native_currency: {
        symbol: 'MATIC',
        name: 'MATIC',
        decimals: 18
      }
    },
    5: {
      chain_id: 5,
      chain_id_hex: '0x5',
      chain_name: 'Goerli Test Network',
      rpc_urls: ['https://goerli.infura.io/v3/'],
      block_explorer_urls: ['https://goerli.etherscan.io/'],
      native_currency: {
        symbol: 'ETH',
        name: 'ETH',
        decimals: 18
      }
    },
    80001: {
      chain_id: 80001,
      chain_id_hex: '0x13881',
      chain_name: 'Mumbai',
      rpc_urls: ['https://matic-mumbai.chainstacklabs.com'],
      block_explorer_urls: ['https://mumbai.polygonscan.com'],
      native_currency: {
        symbol: 'MATIC',
        name: 'MATIC',
        decimals: 18
      }
    }
  },
  httpProvider: {
    1: 'https://mainnet.infura.io/v3/54b15c3668e4458ca3ca92479edc3af2',
    137: 'https://polygon-rpc.com',
    5: 'https://goerli.infura.io/v3/54b15c3668e4458ca3ca92479edc3af2',
    80001: 'https://matic-mumbai.chainstacklabs.com'
  },
  /**
   * @typedef {Object} ISupportedChains
   * @property {1|5} ethereum
   * @property {137|80001} polygon
   */
  /**@type ISupportedChains */
  supported_chains: {
    ethereum: 1,
    polygon: 137
  }
};
