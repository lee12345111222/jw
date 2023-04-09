import { useCallback, useEffect } from 'react';

import { useWallet } from 'use-wallet';

import { useLocalStorageState, useMemoizedFn } from 'ahooks';

import { login } from '@/api/user';

import { login_sign_str } from '@/constant/env/index';

import { useSelector, useDispatch } from 'react-redux';
import { saveAccount, saveToken } from '@/store/reducer/user';

/**
 * @description 获取登录 token
 * @returns {[Function, Function]}
 */
export default function useLoginToken() {
  const { account, ethereum } = useWallet();

  const [token, setToken] = useLocalStorageState('LOGIN_TOKEN');

  const dispatch = useDispatch();

  const userToken = useSelector(({ user: { account, token } }) => [
    account,
    token
  ]);

  useEffect(() => {
    const { ADDRESS, LOGIN_TOKEN } = token || {};

    dispatch(saveAccount(ADDRESS));
    dispatch(saveToken(LOGIN_TOKEN));
  }, [dispatch, token]);

  const getPersonalSign = useCallback(
    async (account) => {
      const msgParams = `${login_sign_str}${account}`;
      return new Promise((resolve, reject) => {
        ethereum.sendAsync(
          {
            method: 'personal_sign',
            params: [msgParams, account],
            from: account,
            id: Date.now()
          },
          (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            if (result.error) {
              reject(result.error.message);
              return;
            }
            resolve(result.result);
          }
        );
      });
    },
    [ethereum]
  );

  const getNewToken = useCallback(async () => {
    if (!account) {
      return null;
    }

    let sign;

    try {
      sign = await getPersonalSign(account);
    } catch (e) {
      console.log('e >>>', e);
    }

    if (!sign) {
      return null;
    }
    const loginRes = await login({
      address: account,
      sign: sign
    });

    if (loginRes?.code !== 200) {
      return null;
    }

    await setToken({
      ADDRESS: account,
      LOGIN_TOKEN: loginRes.data.login_token
    });

    return loginRes.data.login_token;
  }, [account, getPersonalSign, setToken]);

  const getToken = useMemoizedFn(async () => {
    const [address, token] = userToken;

    if (!token || account !== address) {
      return await getNewToken(account);
    }

    return token;
  });

  const reset = useCallback(() => {
    setToken();
  }, [setToken]);

  return [
    getToken,
    reset,
    account === token?.ADDRESS ? token?.LOGIN_TOKEN : undefined
  ];
}
