import { useMemo } from 'react';

import ToolContainer from './ToolContainer';
import Tooltip from '@/ui/tooltip/index';

import passcard1 from '@/assets/map/passcard1.png';
import passcard2 from '@/assets/map/passcard2.png';
import passcard3 from '@/assets/map/passcard3.png';
import passcard4 from '@/assets/map/passcard4.png';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function PassCards({ passcards }) {
  const [card1, card2, card3, card4] = useMemo(
    () => [
      passcards.filter(({ ptype }) => ptype === 0).length,
      passcards.filter(({ ptype }) => ptype === 1).length,
      passcards.filter(({ ptype }) => ptype === 2).length,
      passcards.filter(({ ptype }) => ptype === 3).length
    ],
    [passcards]
  );

  return (
    <ToolContainer className={cx('pass-cards')}>
      <Tooltip title={`10 * 10 Pass: ${card1}`}>
        <div className={cx('pass-card')}>
          <img src={passcard1} alt="" />
        </div>
      </Tooltip>
      <Tooltip title={`20 * 20 Pass: ${card2}`}>
        <div className={cx('pass-card')}>
          <img src={passcard2} alt="" />
        </div>
      </Tooltip>
      <Tooltip title={`30 * 30 Pass: ${card3}`}>
        <div className={cx('pass-card')}>
          <img src={passcard3} alt="" />
        </div>
      </Tooltip>
      <Tooltip title={`40 * 40 Pass: ${card4}`}>
        <div className={cx('pass-card')}>
          <img src={passcard4} alt="" />
        </div>
      </Tooltip>
    </ToolContainer>
  );
}
