import { useMemo } from 'react';

// import Image from './Image';

import VideoPlayer from './VideoPlayer';

import { Flex, Grid } from './Basic';
import { ActionSheet } from '../pages/create/StyledComponents';
import san from '@/assets/icon/san.png';
import located from '@/assets/icon/voxel.png';

import { Btn } from '@/components/BasicComponents';

export const LandCard = ({
  src,
  video,
  name,
  price,
  role,
  onClick,
  index,
  current,
  onPlay
}) => {
  const roleList = useMemo(() => {
    return {
      1000: 'Human',
      1001: 'Alien',
      1002: 'Monkey',
      1003: 'Robot',
      1004: 'Elves',
      1005: 'Zombie',
      1006: 'Skull'
    };
  }, []);
  return (
    <div
      onClick={onClick}
      style={{
        fontSize: '16px',
        color: '#fff',
        fontWeight: 400,
        width: '100%',
        backgroundColor: '#303439',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1'
        }}
      >
        {/* <Image
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          src={src}
          alt=""
        /> */}
        <VideoPlayer
          index={index}
          current={current}
          loop
          onPlay={onPlay}
          src={video}
          poster={src}
        />
      </div>

      <ActionSheet>
        <div style={{ lineHeight: 1 }}>{name}</div>

        <Flex ai="center" jc="space-between">
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
                height: '14px',
                margin: '4px'
              }}
              src={located}
              alt=""
            />
            {roleList[role]}
          </Btn>
          <div
            style={{
              display: price ? 'flex' : 'none',
              alignItems: 'center'
            }}
          >
            <img
              src={san}
              style={{
                marginRight: '8px'
              }}
              width="9"
              alt=""
            />
            <span>{price}</span>
          </div>

          <div style={{ display: price ? 'none' : 'block', fontSize: '16px' }}>
            Not on sale
          </div>
        </Flex>
      </ActionSheet>
    </div>
  );
};

export const LandList = ({ children, refs, onScroll }) => (
  <Grid
    ref={refs}
    onScroll={onScroll}
    p="24px"
    gg="24px 28px"
    gc="repeat(auto-fill, minmax(200px, 1fr))"
    style={{ overflowY: 'auto' }}
  >
    {children}
  </Grid>
);
