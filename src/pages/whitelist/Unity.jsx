import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import useLoginToken from '@/hooks/useLoginToken';
import { isAllowed } from '@/api/user';
import useApi from '@/hooks/useApi';
import { useWallet } from 'use-wallet';

export default function Unity({ children }) {
  const status = useSelector(({ user: { status } }) => status);
  const [userStatus, setUserStatus] = useState(status);

  const { account } = useWallet();

  const [getToken] = useLoginToken();

  const { run } = useApi(isAllowed, { manual: true });

  useEffect(() => {
    if (!account) {
      return;
    }
    if (status) {
      return;
    }

    const fn = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }

      const { code } = await run({ login_token: token });

      if (code !== 200) {
        window.close();
      }
      setUserStatus(true);
    };

    fn();
  }, [account, getToken, run, status]);

  return (
    <>
      {process.env.REACT_APP_ENV === 'test'
        ? children
        : userStatus
        ? children
        : ''}
    </>
  );
}
