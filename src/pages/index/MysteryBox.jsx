import { useCallback } from 'react';

import useHistory from '@/hooks/useHistory';

import styled from 'styled-components';
import { Flex, Container, Image, Text } from '@/components/Basic';

import load from '@/utils/load';

import { useTranslation } from 'react-i18next';

import BNBIcon from '@/assets/icon/usdt-icon.svg';
import partsCountIcon from '@/assets/icon/parts-count-icon.png';
import whitelistIcon from '@/assets/icon/whitelist-icon.png';

const {
  mountain2,
  stars1,
  stars2,
  stars3,
  stars4,
  bg_svg: bgSvg
} = load('img/index');

export default function MysteryBox() {
  const { t } = useTranslation();

  const history = useHistory();

  const handleClick = useCallback(
    (id) => {
      history.push(`/mysteryBox/detail/${id}`);
    },
    [history]
  );

  return (
    <>
      <Bg />
      <Layer>
        <Flex
          w="100%"
          h="100%"
          fd="column"
          ai="center"
          jc="space-between"
          pb="calc(12vh + 22px)"
          pt="calc(34vh - 200px)"
          style={{ boxSizing: 'border-box' }}
        >
          <Flex className="colorfull-text-container" ai="center" gap="56px">
            <Image w="380px" m="-20px 0" src="/event_static/mBox00.png" />
            <Flex fd="column">
              <div className="colorfull-text">MYSTERY BOX</div>
              <Image h="7px" src="/event_static/mBoxLine.png" />
              <Text
                fs="18px"
                lh="27px"
                c="rgba(255, 255, 255, .65)"
                style={{
                  width: '554px',
                  marginTop: '26px',
                  marginBottom: '50px'
                }}
              >
                {t('start.mystery_box_p')}
              </Text>
            </Flex>
          </Flex>
          <Flex ai="center" gap="8px">
            <MBox
              onClick={() => handleClick(1)}
              src="/event_static/mBox01.png"
              title="VoxelRole Mystery Box 1"
              parts={1}
              price={20}
              free
            />
            <MBox
              onClick={() => handleClick(2)}
              src="/event_static/mBox02.png"
              title="VoxelRole Mystery Box 2"
              parts={3}
              price={60}
              free
            />
            <MBox
              onClick={() => handleClick(3)}
              src="/event_static/mBox03.png"
              title="VoxelRole Mystery Box 3"
              parts={6}
              price={120}
              free
            />
            <MBox
              onClick={() => handleClick(4)}
              src="/event_static/mBox04.png"
              title="VoxelRole Mystery Box 4"
              parts={9}
              price={180}
              free
            />
          </Flex>
        </Flex>
      </Layer>
    </>
  );
}

export const Bg = () => {
  return (
    <>
      <Layer>
        <Container
          h="56%"
          w="100%"
          style={{
            position: 'absolute',
            bottom: 0,
            overflowY: 'hidden'
          }}
        >
          <Image
            h="100%"
            style={{ minWidth: '160%', margin: '-40px auto 0 -5%' }}
            src={mountain2}
          />
        </Container>
      </Layer>
      <Layer
        style={{
          backgroundImage: `url(${bgSvg})`,
          opacity: 0.75
        }}
      >
        <Stars
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
        <Stars className="starts" src={stars4} />
      </Layer>
      <Layer>
        <Container
          w="100%"
          h="calc(15% + 124px)"
          bg="linear-gradient(180deg, #3E276C 0%, #533493 100%)"
          style={{
            position: 'absolute',
            bottom: 0
          }}
        ></Container>
      </Layer>
    </>
  );
};

export const MBox = ({ src, title, parts, price, free, onClick, w }) => (
  <div
    onClick={onClick}
    style={{
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

const Light = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Stars = styled(Light)`
  top: calc(8vh - 100px);
`;
