import { useEffect } from 'react';

import { useWallet } from 'use-wallet';

import { setStatus } from '@/store/reducer/user';
import { useDispatch } from 'react-redux';

export default function useLogin() {
  const dispatch = useDispatch();

  const { account } = useWallet();

  useEffect(() => {
    dispatch(setStatus());
  }, [account, dispatch]);
}
