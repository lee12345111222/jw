import styled from 'styled-components';
import { Container } from '@/components/Basic';

import { default as Card } from '../passCard/index';

import load from '@/utils/load';

const { stars1, stars2, stars3, stars4, bg_svg: bgSvg } = load('img/index');

export default function PassCard() {
  return (
    <>
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
      <Layer>
        <Card />
      </Layer>
    </>
  );
}

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
