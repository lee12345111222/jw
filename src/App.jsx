import { UseWalletProvider } from 'use-wallet';

import { Provider as StoreProvider } from 'react-redux';

import { ConfigProvider } from 'antd';

import enUS from 'antd/lib/locale/en_US';

import store from './store';
import Router from './router';

import setLn from './locale/i18n';

import { supported_chains } from '@/constant/env/index';

// window
//   .importAsync('/lib/ethers-5.6.esm.min.js')
//   .then(({ ethers }) => console.log('ethers >>>', ethers));

const lang = 'en';
//
export default function App() {
  setLn(lang);

  return (
    <UseWalletProvider
      autoConnect
      connectors={{
        injected: {
          chainId: Object.values(supported_chains)
        }
      }}
    >
      <StoreProvider store={store}>
        <ConfigProvider locale={enUS}>
          <Router />
        </ConfigProvider>
      </StoreProvider>
    </UseWalletProvider>
  );
}
