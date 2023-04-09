import { useMemo } from 'react';

import CardList from '@/components/CardList/index';

import MysteryBoxCard from './AirdropBoxCard';

import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/Basic';

import styles from './AirdropScore.module.css';

import rareRewardIcon from '@/assets/icon/rare-reward.png';

import { airdropBox } from '@/pages/mysteryBox/boxList.js';

import { ReactComponent as QuestionsIcon } from '@/assets/icon/question_icon.svg';

import { Tooltip } from 'antd';

export default function AirdropBox({ boxList, loading }) {
  const { t } = useTranslation();

  const jsonDataMemo = useMemo(() => {
    // 添加新数据
    return airdropBox?.map((item, index) => {
      return {
        ...item,
        ...boxList[index]
      };
    });
  }, [boxList]);

  const GoodList = useMemo(
    () =>
      jsonDataMemo?.map(({ id, img, darkImg, ...item }) => (
        <MysteryBoxCard
          key={id}
          id={id}
          img={darkImg}
          lightImg={img}
          {...item}
        />
      )),
    [jsonDataMemo]
  );

  return (
    <Flex gap="32px" fd="column">
      <Flex gap="16px" fd="column">
        <Flex ai="center">
          <img className={styles['img-icon']} src={rareRewardIcon} alt="" />
          <div className={styles['title']}>The Next Blind Box</div>
        </Flex>

        <Flex className={styles['content']} gap="8px">
          Better rare NFT Mystery boxes can be obtained by earning higher scores
          <Tooltip
            title="Mystery box will be distributed to your address within 24H"
            overlayInnerStyle={{
              padding: 16,
              background: '#30363C',
              width: 410
            }}>
            <QuestionsIcon style={{ cursor: 'pointer' }} />
          </Tooltip>
        </Flex>
      </Flex>

      <CardList
        emptyMsg={t('app.status.no_content')}
        gridGap="24px"
        style={{ padding: 0 }}
        listStyle={{ marginBottom: 0 }}
        loading={loading}>
        {!loading && GoodList}
      </CardList>
    </Flex>
  );
}
