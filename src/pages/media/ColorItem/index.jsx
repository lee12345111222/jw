import Atropos from 'atropos/react/atropos-react.esm.js';
import classNames from 'classnames/bind';

import 'atropos/atropos.min.css';
import styles from './index.module.css';

import Circle from '@/assets/img/media/mediaCircle.png';

const cx = classNames.bind(styles);
export const ColorItem = ({ colorArr = [] }) => {
  return (
    <div className={cx('colors-imgs-box')}>
      {colorArr.map((ele, idx) => {
        return (
          <div className={cx('colors-margin')}>
            <Atropos key={idx} shadow={false} className={cx('color-atropos')}>
              <div
                className={cx('colorImg')}
                style={{ backgroundColor: '#' + ele.hex }}>
                <div data-atropos-offset="6" className={cx('hex')}>
                  HEX: {ele.hex}
                </div>
                <div data-atropos-offset="6" className={cx('hsb')}>
                  HSB: {ele.hsb}
                </div>
                <img
                  data-atropos-offset="-2"
                  className={cx('color-item-img')}
                  src={Circle}
                  alt="c"
                />
              </div>
            </Atropos>
          </div>
        );
      })}
    </div>
  );
};
