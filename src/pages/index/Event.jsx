import styled from 'styled-components';

import calendarIcon from './event-assets/calendar.png';
import titlebg from './event-assets/title-bg.svg';
import beforeIcon from './event-assets/before-icon.svg';
import item1 from './event-assets/item1.png';
import item2 from './event-assets/item2.png';
import item3 from './event-assets/item3.png';
import mountain from './event-assets/mountain.png';

import load from '@/utils/load';

import styles from './event.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const {
  // mountain2,
  stars1,
  stars2,
  stars3,
  stars4,
  bg_svg: bgSvg
} = load('img/index');

export default function Event() {
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

      <Layer className={cx('layer')}>
        <div className={cx('top')}>
          <p className={cx('time')}>
            <img src={calendarIcon} alt="" />
            <div>
              Event time: <span>2022.4.1~2022.4.15</span>
            </div>
          </p>
          <h2 className={cx('title')}>PlayerOne's First Beta Test</h2>
          <div className={cx('title2-contaner')}>
            <div className={cx('title2')}>
              <img src={titlebg} alt="" />
              <div>For Targeted Candidates</div>
            </div>
          </div>
        </div>

        <div
          className={cx('bottom')}
          style={{ backgroundImage: `url(${mountain})` }}
        >
          <div className={cx('reward')}>
            <img src={beforeIcon} alt="" />
            <div>REWARD</div>
            <img src={beforeIcon} alt="" />
          </div>
          <div className={cx('item-list')}>
            <Item src={item1} text1="MG Token" text2="20,000" />
            <Item src={item2} text1="Parcel Whitelist" text2="1" />
            <Item src={item3} text1="Mystery Box" text2="6" />
          </div>
          <div className={cx('foot')}>
            <div className={cx('foot-title')}>Eligibility Statement</div>
            <div>
              <ul>
                <li>
                  Sign up through the application link & fill out
                  information(including name, Bio, Social media links, etc.)
                  will have a chance to be eligible for the test
                </li>
                <li>
                  Architects who have built on other metaverse platforms will
                  receive our invitation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

const Item = ({ src, text1, text2 }) => {
  return (
    <div className={cx('event-item')}>
      <div className={cx('event-item-box1')}></div>
      <div className={cx('event-item-box2')}></div>
      <div className={cx('event-item-box')}>
        <div className={cx('container')}>
          <img src={src} alt="" />
          <div className={cx('item-text')}>
            {text1} * <span>{text2}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
