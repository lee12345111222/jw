// import { useCallback } from 'react';

// import useHistory from '@/hooks/useHistory';

import styled from 'styled-components';
import {
  Flex,
  // Container,
  Image,
  Text
} from '@/components/Basic';

import load from '@/utils/load';

import { useTranslation } from 'react-i18next';

import BNBIcon from '@/assets/icon/usdt-icon.png';
import partsCountIcon from '@/assets/icon/parts-count-icon.png';
import whitelistIcon from '@/assets/icon/whitelist-icon.png';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const {
  // mountain2,
  // stars1,
  // stars2,
  // stars3,
  // stars4,
  bg_svg: bgSvg
} = load('img/index');

export default function MysteryBox() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '60px',
        position: 'relative',
        background: `linear-gradient(
          180deg,
          #2b1850 0%,
          #6341aa 23.72%,
          #b561d9 76.33%
        )`
      }}
    >
      <Layer
        className={cx('bg-web')}
        style={{
          backgroundImage: `url(${bgSvg})`,
          opacity: 0.75
        }}
      >
        {/* <Stars
          style={{ animationDelay: '-0.8s' }}
          className="starts"
          src={stars1}
        />
        <Stars
          style={{ animationDelay: '1.6s' }}
          className="starts"
          src={stars2}
        />
        <Stars
          style={{ animationDelay: '0.8s' }}
          className="starts"
          src={stars3}
        />
        <Stars className="starts" src={stars4} /> */}
      </Layer>

      <img width="44%" src="/event_static/mBox00.png" alt="" />

      <div style={{ fontSize: '48rem' }} className="colorfull-text">
        MYSTERY BOX
      </div>

      <img style={{ width: '86%' }} src="/event_static/mBoxLine.png" alt="" />

      <Text
        fs="18px"
        lh="27px"
        c="rgba(255, 255, 255, .65)"
        ta="center"
        style={{
          width: '90%',
          marginTop: '26px',
          marginBottom: '50px'
        }}
      >
        {t('start.mystery_box_p')}
      </Text>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: '40px 0',
          paddingBottom: '10vw',
          boxSizing: 'border-box',
          background:
            'linear-gradient(rgb(62, 39, 108) 0%, rgb(83, 52, 147) 100%)'
        }}
      >
        <MBox
          w="40vw"
          src="/event_static/mBox01.png"
          title="Mystery Box 1"
          parts={1}
          price={20}
          style={{
            marginTop: '-10vw'
          }}
          free
        />
        <MBox
          w="40vw"
          src="/event_static/mBox02.png"
          title="Mystery Box 2"
          parts={3}
          price={60}
          style={{
            marginTop: '-10vw'
          }}
          free
        />
        <MBox
          w="40vw"
          src="/event_static/mBox03.png"
          title="Mystery Box 3"
          parts={6}
          price={120}
          free
        />
        <MBox
          w="40vw"
          src="/event_static/mBox04.png"
          title="Mystery Box 4"
          parts={9}
          price={180}
          free
        />
      </div>
    </div>
  );
}

export const MBox = ({ src, title, parts, price, free, onClick, w, style }) => (
  <div
    onClick={onClick}
    style={{
      ...style,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    }}
  >
    <Image src={src} m="-24px 0 -40px" w={w} />
    <Text fs="16px" c="#fff" lh="20px" mt="-40px">
      {title}
    </Text>
    <Flex ai="center" gap="16px">
      <Flex ai="center" gap="6px">
        <Image w="18px" h="18px" src={whitelistIcon} />
        <Image w="18px" h="18px" src={BNBIcon} />
        <Text
          fs="16px"
          c={free ? '#9A8CB8' : '#fff'}
          style={{ textDecoration: 'line-through' }}
        >
          {price}
        </Text>
      </Flex>
      <Flex ai="center" gap="6px">
        <Image w="18px" h="18px" src={partsCountIcon} />
        <Text fs="16px" c="#fff">
          {parts}
        </Text>
      </Flex>
    </Flex>
  </div>
);

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// const Light = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
// `;

// const Stars = styled(Light)`
//   background-color: orange;
// `;
