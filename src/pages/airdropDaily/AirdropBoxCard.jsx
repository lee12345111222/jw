import React, { useMemo, useCallback } from 'react';

import styles from './AirdropBoxCard.module.css';

import BorderedBtn from '@/components/BorderedBtn2/index';

import { BasicCard } from '@/components/Cards/index';
import { Flex } from '@/components/Basic';
import { useHistory } from 'react-router-dom';

export default function AirdropBoxCard({
  img,
  lightImg,
  title,
  score = 0,
  status,
  count,
  id,
  icon,
  countDesc
}) {
  const history = useHistory();

  const handleClick = useCallback(() => {
    switch (id) {
      case 1:
        return history.push(`/mysterybox/detail/part/1`);
      case 2:
        return history.push(`/mysterybox/detail/genesis/1`);
      case 3:
        return history.push(`/mysterybox/detail/genesis/3`);
      case 4:
        return history.push(`/mysterybox/detail/genesis/4`);
      default:
        return null;
    }
  }, [history, id]);

  const BtnStatus2 = useMemo(() => {
    switch (status) {
      case 0:
        return (
          <BorderedBtn
            width="190px"
            bgColor="#555d65"
            borderColor="#999ea3"
            disabled>
            {score} Score
          </BorderedBtn>
        );
      case 1:
      case 2:
        return (
          <BorderedBtn
            width="190px"
            bgColor="#AC5CFF"
            borderColor="#AC5CFF"
            disabled>
            Distributing
          </BorderedBtn>
        );
      case 3:
        return (
          <BorderedBtn width="190px" onClick={handleClick}>
            Open
          </BorderedBtn>
        );

      default:
        return null;
    }
  }, [status, score, handleClick]);

  return (
    <BasicCard
      img={img}
      lightImg={lightImg}
      title={<div className={styles.title}> {title} </div>}
      detailStyle={{ padding: 24 }}>
      <Flex gap="8px" ai="center">
        {icon}
        <span className={styles.content}>
          {countDesc} : {count}
        </span>
      </Flex>
      <Flex ai="center" jc="center">
        {BtnStatus2}
      </Flex>
    </BasicCard>
  );
}
