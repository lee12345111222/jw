import { useMemo, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import MysteryBoxCard, { MysteryBoxCardPro } from './MysteryBoxCard';

import { MysteryBoxConf } from '@/constant/env/index';

import { part, genesis, blueprint, aircraft } from './boxList.js';

import styles from './MysteryBox.module.css';
import classNames from 'classnames/bind';
// import { isTest } from '@/utils/common';

const cx = classNames.bind(styles);
const { priceMap } = MysteryBoxConf;

export default function MysteryBox() {
  const history = useHistory();

  const handleClick = useCallback(
    (type, id) => {
      history.push(`/mysterybox/detail/${type}/${id}`);
    },
    [history]
  );

  const GoodList = useMemo(
    () =>
      part.map(({ id, ...item }, index) => (
        <div key={id} className="land-card">
          <MysteryBoxCard
            {...item}
            price={priceMap[index * 3 || 1]}
            onClick={() => handleClick('part', id)}
          />
        </div>
      )),
    [handleClick]
  );

  const ProGoodList = useMemo(
    () =>
      genesis.map(({ id, ...item }, index) => (
        <div key={id} className="land-card">
          <MysteryBoxCardPro
            {...item}
            isNew={false}
            typeIndex={index}
            type="genesis"
            onClick={() => handleClick('genesis', id)}
          />
        </div>
      )),
    [handleClick]
  );

  const blueprintItemList = useMemo(
    () =>
      blueprint.map(({ id, ...item }, index) => (
        <div key={id} className="land-card">
          <MysteryBoxCardPro
            {...item}
            isNew={false}
            typeIndex={index}
            type="blueprint"
            onClick={() => handleClick('blueprint', id)}
          />
        </div>
      )),
    [handleClick]
  );

  const aircraftItemList = useMemo(
    () =>
      aircraft.map(({ id, ...item }, index) => (
        <div key={id} className="land-card">
          <MysteryBoxCardPro
            {...item}
            typeIndex={index}
            type="jetpack"
            onClick={() => handleClick('jetpack', id)}
          />
        </div>
      )),
    [handleClick]
  );

  return (
    <>
      <div>
        <CardList>
          {aircraftItemList}
          {blueprintItemList}
          {ProGoodList}
          {GoodList}
        </CardList>
      </div>
    </>
  );
}

const CardList = ({ children }) => {
  return <div className={cx('card-list')}>{children}</div>;
};
