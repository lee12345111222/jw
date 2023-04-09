import { useCallback } from 'react';
import { useHistory as useH } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { message } from 'antd';

import { useSelector } from 'react-redux';
import useLoginToken from '@/hooks/useLoginToken';
import { isAllowed } from '@/api/user';
import useApi from '@/hooks/useApi';
import { useDispatch } from 'react-redux';
import { setStatus } from '@/store/reducer/user';

import isMobile from 'is-mobile';

const allowedList = [
  '/',
  '/assets/parcel',
  '/market/parcel',
  '/mysterybox',
  '/mysteryBox/detail/1',
  '/mysteryBox/detail/2',
  '/mysteryBox/detail/3',
  '/mysteryBox/detail/4',
  '/role-editor',
  '/map'
];

const whiteList = ['/discover', '/profile'];

export default function useHistory() {
  const history = useH();
  const [getToken] = useLoginToken();

  const { t } = useTranslation();

  const checkEnv = useCallback(() => process.env.REACT_APP_ENV === 'test', []);
  const userStatus = useSelector(({ user: { status } }) => status);
  const { run } = useApi(isAllowed, { manual: true });
  const dispatch = useDispatch();

  const push = useCallback(
    async (url) => {
      if (isMobile()) {
        return message.info('is mobile');
      }

      if (checkEnv()) {
        return history.push(url);
      }

      if (allowedList.find((item) => url === item)) {
        return history.push(url);
      }

      if (whiteList.find((item) => url === item)) {
        if (userStatus) {
          return history.push(url);
        }

        const token = await getToken();
        const { code } = await run({ login_token: token });
        if (+code === 200) {
          dispatch(setStatus(true));
          return history.push(url);
        } else {
          return message.info(
            'You are not eligible for internal testing, please contact the platform to apply'
          );
        }
      }

      message.info('Coming soon');
    },
    [checkEnv, dispatch, getToken, history, run, userStatus]
  );

  const open = useCallback(
    (url) => {
      if (checkEnv()) {
        return window.open(url);
      }
      if (allowedList.find((index) => index === url)) {
        return window.open(url);
      }

      message.info(t('app.message.coming'));
    },
    [checkEnv, t]
  );

  return { ...history, push, open };
}
