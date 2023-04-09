import { useState, useMemo } from 'react';

import styled from 'styled-components';

import { message } from 'antd';

import { useTranslation } from 'react-i18next';

import TweenOne from 'rc-tween-one';

import vicon21 from './../../../assets/img/index/vicon1-1.png';
import vicon22 from './../../../assets/img/index/vicon1-2.png';

import cube from './../../../assets/img/index/cube.png';
import cubeLight from './../../../assets/img/index/cube-light.png';

// import { Btn } from '../../../components/BasicComponents';

import BorderedBtn from '@/components/BorderedBtn2/index';

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0;
  }
`;

const H2 = styled.h2`
  font-weight: 900;
  font-size: 64px;
  margin: 0;
  text-shadow: 5px 5px 0px #000000;
  color: #fff;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  padding: 36px 0;
  color: #fff;
  margin-bottom: 0;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-left: 12px;
  color: rgba(255, 255, 255, 0.65);
`;

export default function Slider1({ rolling, history }) {
  const [duration, setDuration] = useState(1);
  const [type, setType] = useState('from');
  const [speed, setSpeed] = useState(1);

  const { t } = useTranslation();

  useMemo(() => {
    if (rolling === 1 || rolling === -2) {
      setDuration(1);
    } else {
      setDuration(-1);
    }

    if (rolling ** 2 === 1) {
      setType('to');
      setSpeed(0.8);
    } else {
      setType('from');
      setSpeed(1);
    }
  }, [rolling]);

  return (
    <Layer
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          padding: '70px 130px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <TweenOne
          className="banner-user-title"
          animation={{
            x: duration * 320,
            opacity: 0,
            type
          }}
        >
          <H2>{t('start.world')}</H2>
        </TweenOne>

        <TweenOne
          className="banner-user-title"
          animation={{
            x: duration * 320,
            opacity: 0,
            type,
            delay: speed * 140
          }}
        >
          <H3>{t('start.world_title')}</H3>
        </TweenOne>

        <div
          style={{
            padding: '36px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px'
          }}
        >
          <TweenOne
            className="banner-user-title"
            animation={{
              x: duration * 320,
              opacity: 0,
              type,
              delay: speed * 280
            }}
          >
            <Flex m="36px 0">
              <img src={vicon21} alt="" />
              <P>{t('start.world_p1')}</P>
            </Flex>
          </TweenOne>

          <TweenOne
            className="banner-user-title"
            animation={{
              x: duration * 320,
              opacity: 0,
              type,
              delay: speed * 400
            }}
          >
            <Flex m="36px 0">
              <img src={vicon22} alt="" />
              <P>{t('start.world_p2')}</P>
            </Flex>
          </TweenOne>
        </div>

        <div
          style={{
            display: 'flex',
            // flexGrow: 1,
            marginTop: '64px',
            alignItems: 'flex-end'
          }}
        >
          <TweenOne
            className="banner-user-title"
            animation={{
              x: duration * 320,
              opacity: 0,
              type,
              delay: speed * 520
            }}
          >
            <BorderedBtn
              onClick={() => message.info(t('app.message.coming'))}
              bgColor="#5505a9"
              borderColor="#5505a9"
              width="234px"
              height="48px"
              style={{
                fontSize: '23px',
                fontWeight: '600'
              }}
            >
              {t('start.world_btn')}
            </BorderedBtn>
          </TweenOne>
        </div>
      </div>
      <div
        style={{
          width: '54vh',
          marginRight: '10%',
          // maxWidth: '80vh',
          height: '100%',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            position: 'relative',
            marginTop: '-32px'
          }}
        >
          <TweenOne
            className="banner-user-title poster"
            animation={{
              x: duration * 160,
              opacity: 0,
              type,
              delay: speed * 140
            }}
          >
            <img
              style={{
                width: '145%',
                marginLeft: '-30%'
              }}
              src={cube}
              alt=""
            />

            <img
              style={{
                position: 'absolute',
                display: 'block',
                top: 0,
                left: 0,
                width: '145%',
                marginLeft: '-30%',
                WebkitUserDrag: 'none'
              }}
              className="heartbeat-cube"
              src={cubeLight}
              alt=""
            />
          </TweenOne>
        </div>
      </div>
    </Layer>
  );
}
