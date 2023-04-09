// import boxtype1Icon from '@/assets/icon/boxtype1-icon.svg';
// import boxtype2Icon from '@/assets/icon/boxtype2-icon.svg';
// import boxtype3Icon from '@/assets/icon/boxtype3-icon.svg';
// import boxtype4Icon from '@/assets/icon/boxtype4-icon.svg';

// import lboxtype1Icon from '@/assets/icon/building-icon1.svg';
// import lboxtype2Icon from '@/assets/icon/building-icon2.svg';
// import lboxtype3Icon from '@/assets/icon/building-icon3.svg';
// import lboxtype4Icon from '@/assets/icon/building-icon4.svg';

// import AircraftType1Icon from '@/assets/icon/aircraft-icon1.svg';
// import AircraftType2Icon from '@/assets/icon/aircraft-icon2.svg';
// import AircraftType3Icon from '@/assets/icon/aircraft-icon3.svg';
// import AircraftType4Icon from '@/assets/icon/aircraft-icon4.svg';

import classes from './MysteryBoxCard.module.css';

import classNames from 'classnames/bind';

import usdtIcon from '@/assets/icon/usdt-icon.svg';
import partsCountIcon from '@/assets/icon/parts-count-icon.png';

import {
  BasicCard,
  InfoBoxContainer,
  InfoBox2
} from '@/components/Cards/index';

const cx = classNames.bind(classes);

// const typeListCollection = {
//   genesis: [boxtype1Icon, boxtype2Icon, boxtype3Icon, boxtype4Icon],
//   blueprint: [lboxtype1Icon, lboxtype2Icon, lboxtype3Icon, lboxtype4Icon],
//   aircraft: [
//     AircraftType1Icon,
//     AircraftType2Icon,
//     AircraftType3Icon,
//     AircraftType4Icon
//   ]
// };
// const typeIconList = [boxtype1Icon, boxtype2Icon, boxtype3Icon, boxtype4Icon];

export default function MysteryBoxCard({
  img,
  title,
  price,
  count,
  free,
  onClick
}) {
  return (
    <BasicCard img={img} title={title} onClick={onClick}>
      <div className={cx('info-box')}>
        <div className={cx('info')}>
          <img src={partsCountIcon} alt="" />
          <span>{count}</span>
        </div>
        <div className={cx('info')}>
          <img src={usdtIcon} alt="" />
          <span className={cx({ free })}>{price}</span>
        </div>
      </div>
      <InfoBoxContainer>
        <InfoBox2>In Progress</InfoBox2>
      </InfoBoxContainer>
    </BasicCard>
  );
}

export const MysteryBoxCardPro = ({
  title,
  onClick,
  typeIndex,
  img,
  type,
  isNew = true
}) => {
  return (
    <BasicCard
      img={img}
      title={
        <span className={cx('pro-title', { 'new-box-title': isNew })}>
          {title}
        </span>
      }
      onClick={onClick}>
      <div className={cx('info-box')}>
        <div className={cx('info')}>
          {/* <img src={typeListCollection[type][typeIndex]} alt="" /> */}
          <span>1</span>
        </div>
      </div>
      <InfoBoxContainer>
        <InfoBox2>In Progress</InfoBox2>
      </InfoBoxContainer>
    </BasicCard>
  );
};
