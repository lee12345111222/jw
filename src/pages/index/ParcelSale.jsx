import parcelSaleImage from '@/assets/img/index/parcel-sale.svg';
import parcelMapImage from '@/assets/img/index/parcel-map.png';

import { Image } from '@/components/Basic';

import beforeIcon from './event-assets/before-icon.svg';

import styled from 'styled-components';

export default function ParcelSale(props) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        padding: '13.7142857vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: '40px'
      }}
    >
      <div>
        <div
          style={{
            width: 'max-content'
          }}
        >
          <H2 style={{ width: 'max-content', marginBottom: 0 }}>
            PlayerOne Parcel Sale
          </H2>
          <Image h="7px" src="/event_static/mBoxLine.png" />
        </div>

        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '18px',
            marginTop: '24px'
          }}
        >
          as long as you are whitelisted, you may buy Parcel. Each whitelisted
          members may purchase 1 to 2 plots of Parcel. If you wish to acquire
          additional whitelists, you may actively participate in PlayerOne's
          Twitter and Discord WL giveaways.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '24px'
        }}
      >
        <div
          style={{
            width: '34.2857%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          <SmallTitle>Block Display</SmallTitle>
          <img style={{ width: '100%' }} src={parcelMapImage} alt="" />
        </div>

        <div
          style={{
            width: '63.42857%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          <SmallTitle>Plot introduction</SmallTitle>
          <img style={{ width: '100%' }} src={parcelSaleImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export const H2 = styled.h2`
  font-weight: 900;
  font-size: 64px;
  text-shadow: 5px 5px 0px #000000;
  color: #fff;
  font-family: gilroy;
`;

const SmallTitle = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <img src={beforeIcon} style={{ transform: 'rotateZ(90deg)' }} alt="" />
    <div style={{ fontSize: '36px', fontFamily: 'gilroy' }}>{children}</div>
    <img
      src={beforeIcon}
      style={{ transform: 'rotateZ(90deg) rotateX(180deg)' }}
      alt=""
    />
  </div>
);
