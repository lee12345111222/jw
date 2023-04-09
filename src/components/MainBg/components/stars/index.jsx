import { randomNum } from '@/utils/common';

import styles from './index.module.css';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const cometNumbner = 20; // 流星数量
const cometDelayStep = 2; // 流星延迟间隔

const starNumbner = 80; // 星星数量
const stardelayStep = 3; // 星星闪烁延迟间隔

const randLeft = () => randomNum(cometNumbner) * (100 / cometNumbner);
const randDelay = (step) => randomNum(step) + step;

const Star = ({ className }) => (
  <div
    className={cx('star', className)}
    style={{
      top: `${randomNum(100)}vh`,
      left: `${randomNum(100)}vw`,
      animationDelay: `${randDelay(stardelayStep)}s`,
      animationDuration: `${randDelay(stardelayStep) + 3}s`
    }}></div>
);

const StarList = () =>
  Array.from({ length: starNumbner }).map((_, index) => (
    <Star
      className={cx({ big: index % 20 === 0, medium: index % 9 === 0 })}
      key={index}
    />
  ));

const Comet = ({ left, delay }) => (
  <div
    className={cx('star', 'comet')}
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`
    }}></div>
);

const CometList = () =>
  Array.from({ length: cometNumbner }).map((_, index) => (
    <Comet
      key={index}
      left={randLeft()}
      delay={index * randDelay(cometDelayStep)}
    />
  ));

export default function Stars() {
  return (
    <>
      <CometList />
      <StarList />
    </>
  );
}
