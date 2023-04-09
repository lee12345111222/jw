import React from 'react';

import MainPage from '@/components/MainPage/index';

import { useTranslation } from 'react-i18next';

import CoreTeam01Icon from '@/assets/img/team/core-team-01.png';
import CoreTeam02Icon from '@/assets/img/team/core-team-02.png';
import CoreTeam03Icon from '@/assets/img/team/core-team-03.png';
import CoreTeam04Icon from '@/assets/img/team/core-team-04.png';
import CoreTeam05Icon from '@/assets/img/team/core-team-05.png';
import CoreTeam06Icon from '@/assets/img/team/core-team-06.png';
import CoreTeam07Icon from '@/assets/img/team/core-team-07.png';
import CoreTeam08Icon from '@/assets/img/team/core-team-08.png';

import styles from './index.module.css';

import { useHistory } from 'react-router-dom';

const MemberCard = ({ name, position, src }) => {
  return (
    <div className={styles['memberCard']}>
      <div>
        <img src={src} alt="author" className={styles['memberImg']} />
      </div>
      <div className={styles['memberName']}>{name}</div>
      <div className={styles['memberDesc']}>{position}</div>
    </div>
  );
};

const MemberList = () =>
  [
    {
      name: 'Naruto',
      position: 'Co-founder',
      src: CoreTeam01Icon
    },
    {
      name: 'Pony',
      position: 'Co-founder',
      src: CoreTeam02Icon
    },
    {
      name: 'Leo',
      position: 'Co-founder',
      src: CoreTeam03Icon
    },
    {
      name: 'Dana',
      position: 'Community Marketing',
      src: CoreTeam04Icon
    },
    {
      name: 'Greg',
      position: 'Product Manager',
      src: CoreTeam05Icon
    },
    {
      name: 'Lilian',
      position: 'Design Director',
      src: CoreTeam06Icon
    },
    {
      name: 'Stormer',
      position: '3D Engineer',
      src: CoreTeam07Icon
    },
    {
      name: 'Rock',
      position: 'Tech Lead',
      src: CoreTeam08Icon
    }
  ].map((item, index) => <MemberCard key={index} {...item}></MemberCard>);

export default function AboutUs() {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <MainPage title={t('About us')} goBack={history.goBack}>
      <div className={styles['container']}>
        <div className={styles['title']}>Playerone Core Team</div>
        <div className={styles['gardBox']}>
          <MemberList />
        </div>
      </div>
    </MainPage>
  );
}
