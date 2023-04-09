import { useCallback } from 'react';

import Swiper, { Director, SwiperProvider } from '@/custom-ui/swiper/index';

import mountain from '@/assets/img/index/mountain2.png';
import bgSvg from '@/assets/img/index/bg.svg';
import stars1 from '@/assets/img/index/stars1.png';
import stars2 from '@/assets/img/index/stars2.png';
import stars3 from '@/assets/img/index/stars3.png';
import stars4 from '@/assets/img/index/stars4.png';

import USDTIcon from '@/assets/icon/usdt-icon.svg';
import partsCountIcon from '@/assets/icon/parts-count-icon.png';
import whitelistIcon from '@/assets/icon/whitelist-icon.png';

import bodyIcon1 from '@/assets/icon/body-icon1.png';
import bodyIcon2 from '@/assets/icon/body-icon2.png';
import bodyIcon3 from '@/assets/icon/body-icon3.png';
import bodyIcon4 from '@/assets/icon/body-icon4.png';

import size10 from '@/assets/img/10_10.png';
import size20 from '@/assets/img/20_20.png';
import size30 from '@/assets/img/30_30.png';
import size40 from '@/assets/img/40_40.png';

import BuildingIcon1 from '@/assets/icon/building-icon1.svg';
import BuildingIcon2 from '@/assets/icon/building-icon2.svg';
import BuildingIcon3 from '@/assets/icon/building-icon3.svg';
import BuildingIcon4 from '@/assets/icon/building-icon4.svg';

import AircraftIcon1 from '@/assets/icon/aircraft-icon1.svg';
import AircraftIcon2 from '@/assets/icon/aircraft-icon2.svg';
import AircraftIcon3 from '@/assets/icon/aircraft-icon3.svg';
import AircraftIcon4 from '@/assets/icon/aircraft-icon4.svg';

import classes from './Boxes.module.css';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
// import { isTest } from '@/utils/common';

const cx = classNames.bind(classes);

export default function Boxes() {
  return (
    <div className={cx('boxes')}>
      <Bg />
      <div className={cx('swiper')}>
        <SwiperProvider>
          <div className={cx('swiper-containter')}>
            <Director type="prev">
              <NextIcon className={cx('prev', 'director')} />
            </Director>

            <Swiper height="700px" width="1000px">
              <BoxList4Final />
              <BoxList3Final />
              <BoxList2Final />
              <BoxList1Final />
            </Swiper>

            <Director type="next">
              <NextIcon className={cx('director')} />
            </Director>
          </div>
        </SwiperProvider>
      </div>
    </div>
  );
}

const Bg = () => {
  return (
    <div className={cx('bg')}>
      <div className={cx('mountain')}>
        <img src={mountain} alt="" />
      </div>
      <div
        className={cx('bg-bg')}
        style={{ background: `url(${bgSvg})` }}></div>
      <Stars />
      <div className={cx('bg-bottom')}>
        <div className={cx('box-bg')}></div>
      </div>
    </div>
  );
};

const Stars = () => {
  return (
    <div className={cx('stars')}>
      <img src={stars1} alt="" />
      <img src={stars2} alt="" />
      <img src={stars3} alt="" />
      <img src={stars4} alt="" />
    </div>
  );
};

const BoxList4Final = () => {
  const AircraftTitle = {
    title: 'Leviticus Box',
    img: '/event_static/airBox05.png',
    content:
      'Jetpack, an NFT composed of ERC-1155, is a gift designed for "Leviticus." In the life of the PlayerOne world, the Jetpack is an essential means of transportation. with the Jetpack on your back, you can overlook the PlayerOne continent from the perspective of God and fly freely with your friends in the PlayerOne world.'
  };

  const AircraftArray = useMemo(() => {
    return [
      {
        title: 'Leviticus Mystery Box 1',
        img: '/event_static/airBox01.png',
        count: 1,
        size: size10,
        icon: AircraftIcon1,
        url: '/mysterybox/detail/jetpack/1'
      },
      {
        title: 'Leviticus Mystery Box 2',
        img: '/event_static/airBox02.png',
        count: 1,
        size: size20,
        icon: AircraftIcon2,
        url: '/mysterybox/detail/jetpack/2'
      },
      {
        title: 'Leviticus Mystery Box 3',
        img: '/event_static/airBox03.png',
        count: 1,
        size: size30,
        icon: AircraftIcon3,
        url: '/mysterybox/detail/jetpack/3'
      },
      {
        title: 'Leviticus Mystery Box 4',
        img: '/event_static/airBox04.png',
        count: 1,
        size: size40,
        icon: AircraftIcon4,
        url: '/mysterybox/detail/jetpack/4'
      }
    ];
  }, []);

  const BoxList = useMemo(() => {
    return AircraftArray.map((item, index) => {
      return <Box4 {...item} key={index} />;
    });
  }, [AircraftArray]);

  return (
    <div className={cx('boxs')}>
      <ListMetaNew {...AircraftTitle} />
      <ul className={cx('boxs-list')}>{BoxList}</ul>
    </div>
  );
};

const BoxList3Final = () => {
  return (
    <div className={cx('boxs')}>
      <ListMetaNew
        title="Exodus Box"
        img="/event_static/lBox05.png"
        content={`The Blueprint Mystery Box is a gift created especially for "Exodus."The official first release Blueprint has six types: Modern, Greek, Mediterranean, Gothic, Romanesaue, and Rococo. After receiving the Blueprint, users can bind the Blueprint to the land in the Parcel Editor.`}
      />
      <ul className={cx('boxs-list')}>
        <Box4
          title="Exodus Mystery Box 1"
          img="/event_static/lBox06.png"
          count={1}
          size={size10}
          icon={BuildingIcon1}
          url="/mysterybox/detail/blueprint/1"
        />
        <Box4
          title="Exodus Mystery Box 2"
          img="/event_static/lBox07.png"
          count={1}
          size={size20}
          icon={BuildingIcon2}
          url="/mysterybox/detail/blueprint/2"
        />
        <Box4
          title="Exodus Mystery Box 3"
          img="/event_static/lBox08.png"
          count={1}
          size={size30}
          icon={BuildingIcon3}
          url="/mysterybox/detail/blueprint/3"
        />
        <Box4
          title="Exodus Mystery Box 4"
          img="/event_static/lBox09.png"
          count={1}
          size={size40}
          icon={BuildingIcon4}
          url="/mysterybox/detail/blueprint/4"
        />
      </ul>
    </div>
  );
};
const BoxList2Final = () => {
  return (
    <div className={cx('boxs')}>
      <ListMetaNew
        title="Genesis Box"
        img="/event_static/gBox05.png"
        content={`The VoxelRole Mystery Box is a gift created especially for "Genesis." Each Mystery Box contains randomly obtained required voxel body parts. RoleEditor allows users to compose characters based on their own choice. The more P2E reward you can obtain, the rarer the character is .`}
      />
      <ul className={cx('boxs-list')}>
        <Box4
          title="Genesis Mystery Box 1"
          img="/event_static/gBox06.png"
          count={1}
          size={size10}
          // price={20}
          icon={bodyIcon1}
          url="/mysterybox/detail/genesis/1"
        />
        <Box4
          title="Genesis Mystery Box 2"
          img="/event_static/gBox07.png"
          count={1}
          size={size20}
          // price={60}
          icon={bodyIcon2}
          url="/mysterybox/detail/genesis/2"
        />
        <Box4
          title="Genesis Mystery Box 3"
          img="/event_static/gBox08.png"
          count={1}
          size={size30}
          // price={120}
          icon={bodyIcon3}
          url="/mysterybox/detail/genesis/3"
        />
        <Box4
          title="Genesis Mystery Box 4"
          img="/event_static/gBox09.png"
          count={1}
          size={size40}
          // price={180}
          icon={bodyIcon4}
          url="/mysterybox/detail/genesis/4"
        />
      </ul>
    </div>
  );
};
const BoxList1Final = () => {
  return (
    <div className={cx('boxs')}>
      <ListMetaNew
        title="Mystery Box"
        img="/event_static/mBox05.png"
        content="PlayerOne role NFT is a combination of component NFT. VoxelRole components can be obtained through the VoxelRole blind box, and VoxelRole components can also be obtained through the secondary market. The greater the number of blind boxes, the greater the discount."
      />
      <ul className={cx('boxs-list')}>
        <Box3
          title="VoxelRole Mystery Box 1"
          img="/event_static/mBox07.png"
          count={1}
          price={20}
          url="/mysterybox/detail/part/1"
        />
        <Box3
          title="VoxelRole Mystery Box 2"
          img="/event_static/mBox06.png"
          count={3}
          price={60}
          url="/mysterybox/detail/part/2"
        />
        <Box3
          title="VoxelRole Mystery Box 3"
          img="/event_static/mBox08.png"
          count={6}
          price={120}
          url="/mysterybox/detail/part/3"
        />
        <Box3
          title="VoxelRole Mystery Box 4"
          img="/event_static/mBox09.png"
          count={9}
          price={180}
          url="/mysterybox/detail/part/4"
        />
      </ul>
    </div>
  );
};

const NextIcon = ({ className }) => (
  <svg
    className={className}
    width="42"
    height="60"
    viewBox="0 0 42 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M41.6385 30.6971L13.3272 0.208252H0.260437L28.5717 30.6971L0.260438 59.0073H13.3272L41.6385 30.6971Z"
      fill="currentColor"
    />
  </svg>
);
const Box3 = ({ title, img, count, price, url }) => {
  const { push } = useHistory();
  const jumpFn = useCallback(() => {
    push(url);
  }, [push, url]);

  return (
    <li onClick={jumpFn} className={cx('boxs-new-list-item')}>
      <img src={img} alt="" />
      <div>{title}</div>
      <div className={cx('boxs-new-list-item-details')}>
        <img src={whitelistIcon} alt="" />
        <div>
          <img src={USDTIcon} alt="" />
          <span className={cx('boxs-new-list-item-details-price')}>
            {price}
          </span>
        </div>
        <div>
          <img src={partsCountIcon} alt="" />
          <span>{count}</span>
        </div>
      </div>
    </li>
  );
};

const Box4 = ({ title, img, count, size, icon, url }) => {
  const { push } = useHistory();
  const jumpFn = useCallback(() => {
    push(url);
  }, [push, url]);

  return (
    <li onClick={jumpFn} className={cx('boxs-new-list-item')}>
      <img src={img} alt="" />
      <div className={cx('box2-title')}>{title}</div>
      <div className={cx('boxs-new-list-item-details')}>
        <img src={size} alt="" />
        <div>
          <img src={icon} alt="" />
          <span>{count}</span>
        </div>
      </div>
    </li>
  );
};

const ListMetaNew = ({ title, img, content }) => {
  return (
    <div className={cx('list-new-meta')}>
      <img src={img} alt="" />
      <div className={cx('list-meta-texts')}>
        <h2 className={cx('list-meta-title')}>{title}</h2>
        <img src="/event_static/mBoxLine.png" height="7px" alt="" />
        <p>{content}</p>
      </div>
    </div>
  );
};
