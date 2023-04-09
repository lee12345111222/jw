import styles from './index.module.css';
import classNames from 'classnames/bind';

import BorderedBtn from '../BorderedBtn2/index';

import landPlanIcon from '@/assets/icon/landplan-icon.png';

const cx = classNames.bind(styles);

export default function LandPlan({ text }) {
  return (
    <div className={cx('land-plan')}>
      <BorderedBtn
        onClick={() => window.open('/static/PlayerOneGenesisLandPlan.pdf')}
      >
        <img src={landPlanIcon} alt="" />
        <div className={cx('text')}>{text}</div>
      </BorderedBtn>
    </div>
  );
}
