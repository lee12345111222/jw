import styled from 'styled-components';

import BannerAnim, { Element, Arrow, Thumb } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';

import useHistory from '@/hooks/useHistory';

import Slider1 from '@/pages/index/slider/Slider1';
import Slider2 from '@/pages/index/slider/Slider2';
import Slider3 from '@/pages/index/slider/Slider3';

const ArrowIcon1 = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  cursor: pointer;
  &::before {
    content: ' ';
    width: 2px;
    height: 10px;
    display: block;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 30px;
    top: 24px;
    transform: rotate(45deg);
  }
  :hover {
    &::before {
      background-color: #fff;
    }
    &::after {
      background-color: #fff;
    }
  }
  &::after {
    content: ' ';
    width: 2px;
    height: 10px;
    display: block;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 30px;
    top: 31px;
    transform: rotate(-45deg);
  }
`;

const ArrowIcon2 = styled(ArrowIcon1)`
  &::before {
    transform: rotate(-45deg);
  }
  &::after {
    transform: rotate(45deg);
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? '#fff' : 'rgba(255, 255, 255, .5)'};
  &:hover {
    background-color: #fff;
  }
`;

export default function Banner({ rolling, prev, current, next }) {
  const history = useHistory();
  return (
    <>
      <BannerAnim
        type="across"
        prefixCls="banner-user"
        dragPlay={false}
        duration={0}
      >
        <Element prefixCls="banner-user-elem" key="2">
          <Slider3 rolling={rolling} history={history} />
        </Element>

        <Element prefixCls="banner-user-elem" key="0">
          <Slider1 rolling={rolling} history={history} />
        </Element>

        <Element prefixCls="banner-user-elem" key="1">
          <Slider2 rolling={rolling} history={history} />
        </Element>

        <Arrow arrowType="prev" key="prev"></Arrow>

        <Arrow arrowType="next" key="next"></Arrow>

        <Thumb key="thumb">
          <span key={0}></span>
          <span key={1}></span>
          <span key={2}></span>
        </Thumb>
      </BannerAnim>

      <div
        style={{
          position: 'absolute',
          bottom: '8vh',
          right: '0',
          marginRight: '10%',
          width: '54vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '36px'
        }}
      >
        <ArrowIcon1 onClick={prev} />
        <Dot selected={current === 1 ? true : false} />
        <Dot selected={current === 2 ? true : false} />
        <Dot selected={current === 0 ? true : false} />
        <ArrowIcon2 onClick={next} />
      </div>
    </>
  );
}
