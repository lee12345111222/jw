import React, { Suspense } from 'react';

import MainPage from '@/components/MainPage/index';

import { useTranslation } from 'react-i18next';

const MysteryBox = React.lazy(() => import('./MysteryBox'));

export default function Event() {
  const { t } = useTranslation();

  return (
    <MainPage title={t('event.tab1')}>
      <Suspense fallback={''}>
        <MysteryBox />
      </Suspense>
    </MainPage>
  );
}
