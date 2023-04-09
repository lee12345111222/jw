import Image from './Image';

import { Flex, Grid } from './Basic';

import { ActionSheet } from '../pages/create/StyledComponents';
import union from './../assets/icon/union.png';
import san from './../assets/icon/san.png';
import areaName from './../assets/icon/area_name.png';
import located from './../assets/icon/location.png';

import { getDisplayBalance2ETH } from '@/utils/common';

import { Btn } from '../components/BasicComponents';

export const LandCard = ({
  src,
  name,
  size,
  price,
  coord,
  area,
  children,
  onClick,
  style
}) => (
  <div
    onClick={onClick}
    style={{
      fontSize: '16px',
      color: '#fff',
      fontWeight: 400,
      ...style,
      width: '100%',
      backgroundColor: '#303439',
      borderRadius: '4px',
      overflow: 'hidden'
    }}
  >
    <div
      style={{
        width: '100%',
        aspectRatio: '1 / 1'
      }}
    >
      <Image src={src} />
    </div>
    <ActionSheet>
      <div style={{ lineHeight: 1 }}>{name}</div>
      <Flex fd="row" ai="center" jc="space-between">
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img
            height="16"
            style={{
              marginRight: '8px'
            }}
            src={union}
            alt=""
          />
          <span>
            {size?.[0]} × {size?.[1]} × {size?.[2]}
          </span>
        </div>
        <div
          style={{
            // display: price ? 'flex' : 'none',
            alignItems: 'center'
          }}
        >
          {price ? (
            <>
              <img
                src={san}
                style={{
                  marginRight: '8px'
                }}
                width="9"
                alt=""
              />
              <span>{getDisplayBalance2ETH(price, true)}</span>
            </>
          ) : (
            <span
              style={{ fontSize: '14px', color: 'rgba(255, 255, 255, .85)' }}
            >
              Not on sale
            </span>
          )}
        </div>
      </Flex>

      <Flex fd="row" ai="center" style={{ color: '#fff' }}>
        <Btn
          style={{
            flexShrink: 0,
            padding: '0 8px 0 4px',
            fontSize: '15px',
            height: '20px',
            background: '#FFB801'
          }}
        >
          <img
            style={{
              width: '16px',
              marginRight: '4px'
            }}
            src={located}
            alt=""
          />
          {coord.toString()}
        </Btn>
        <div style={{ width: '20px' }}></div>
        <Btn
          style={{
            flexShrink: 0,
            padding: '0 8px 0 4px',
            fontSize: '15px',
            height: '20px',
            background: '#AC5CFF'
          }}
        >
          <img
            style={{
              width: '16px',
              marginRight: '6px'
            }}
            src={areaName}
            alt=""
          />
          {area}
        </Btn>
      </Flex>
      {children}
    </ActionSheet>
  </div>
);

export const LandList = ({ children, refs, onScroll }) => (
  <Grid
    p="24px"
    pb="36px"
    style={{ overflowY: 'auto' }}
    ref={refs}
    onScroll={onScroll}
    gc="repeat(auto-fill, minmax(220px, 1fr))"
    gg="40px"
  >
    {children}
  </Grid>
);
