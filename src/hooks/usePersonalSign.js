import { useCallback } from 'react';
import { useWallet } from 'use-wallet';

/**
 * @description 小狐狸获取签名
 */
export default function usePersonalSign() {
  const { account, ethereum } = useWallet();

  const getPersonalSign = useCallback(
    async (msgParams) =>
      new Promise((resolve, reject) => {
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
      }),
    [account, ethereum]
  );

  return { getPersonalSign };
}
