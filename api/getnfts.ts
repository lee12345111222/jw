import type { VercelRequest, VercelResponse } from '@vercel/node';
import Cors from 'cors';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import initMiddleware from '../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    origin: /localhost|playerone.world/,
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

const alchemyapiUrls = {
  '1': 'https://eth-mainnet.alchemyapi.io/v2/MGAnoIh69sWsoW8oW_ulK8v9FpSK13FG',
  '137':
    'https://polygon-mainnet.g.alchemy.com/v2/MGAnoIh69sWsoW8oW_ulK8v9FpSK13FG',
  '4': 'https://eth-rinkeby.g.alchemy.com/v2/MGAnoIh69sWsoW8oW_ulK8v9FpSK13FG',
  '80001':
    'https://polygon-mumbai.g.alchemy.com/v2/MGAnoIh69sWsoW8oW_ulK8v9FpSK13FG'
};

// http://localhost:3000/api/getnfts?chainid=1&owner=0xd2B0660F1B2275512Dec4643B4f2BDd7F8d4d653&contract=0xb840ec0db3b9ab7b920710d6fc21a9d206f994aa
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cors(req, res);

  if (typeof req.query.contract === 'undefined') {
    res.status(400).end();
    return;
  }

  const alchemyapiUrl =
    alchemyapiUrls[req.query.chainid as keyof typeof alchemyapiUrls];

  const web3 = createAlchemyWeb3(alchemyapiUrl);

  const ownedNfts = await web3.alchemy.getNfts({
    owner: req.query.owner as string,
    contractAddresses: [req.query.contract as string],
    pageKey: req.query.pageKey as string,
    withMetadata: true
  });

  res.status(200).json(ownedNfts);
}
