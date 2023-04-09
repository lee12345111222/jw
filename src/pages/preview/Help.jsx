import styles from './help.module.css';
import classNames from 'classnames/bind';

import mouseLeftIcon from '@/assets/icon/mouse-left.svg';
import mouseIcon from '@/assets/icon/mouse.svg';
import mouseLeft2Icon from '@/assets/icon/mouse-left2.svg';
import rotateIcon from '@/assets/icon/rotate.svg';

const cx = classNames.bind(styles);

export default function Help({ onClick }) {
  return (
    <div onClick={onClick} className={cx('help')}>
      <div className={cx('left')}>
        <Circle />
        <Enter />
      </div>

      <div className={cx('absolute')}>
        <div className={cx('center')}>
          <Directions />
          <KeyMaps />
        </div>

        <div className={cx('right')}>
          <MouseLeft />
          <MouseRight />
        </div>
      </div>

      <User />
    </div>
  );
}

export const Key = ({ children, disable }) => (
  <code className={cx('key', { disable })}>{children}</code>
);

const Key2 = ({ children }) => (
  <div className={cx('key2')}>
    <code>{children}</code>
  </div>
);

export const Text = ({ children }) => (
  <span className={cx('text')}>{children}</span>
);

export const Direction = ({ direction }) => (
  <div className={cx('direction', direction)}>➡</div>
);

export const MouseLeft = () => (
  <div>
    <div className={cx('mouse-left')}>
      <img src={rotateIcon} alt="" />
      <img src={mouseIcon} alt="" />
      <img src={rotateIcon} alt="" />
    </div>
    <div>
      <div>
        <Text>Move the mouse to</Text>
      </div>
      <div>
        <Text>rotate the camera</Text>
      </div>
    </div>
  </div>
);

const MouseRight = () => (
  <div className={cx('mouse-right')}>
    <img src={mouseLeftIcon} alt="" />
    <Text> or Press </Text>
    <Key2>E</Key2>
    <Text> to interact with interactable objects</Text>
  </div>
);

export const Directions = () => (
  <div className={cx('direnctions')}>
    <Direction direction="top" />
    <div className={cx('rows')}>
      <Direction direction="left" />
      <div className={cx('keys', 'column')}>
        <div className={cx('keys')}>
          <div>
            <Key disable>Q</Key>
          </div>
          <div>
            <Key>W</Key>
          </div>
          <div>
            <Key disable>E</Key>
          </div>
        </div>
        <div className={cx('keys')}>
          <div>
            <Key>A</Key>
          </div>
          <div>
            <Key>S</Key>
          </div>
          <div>
            <Key>D</Key>
          </div>
        </div>
      </div>
      <Direction />
    </div>
    <Direction direction="bottom" />

    <Text>Direction</Text>
  </div>
);

const KeyMaps = () => (
  <div className={cx('keymaps')}>
    <div>
      <Text>Press </Text>
      <Key>C</Key>
      <Text> Switch the first person</Text>
    </div>

    <div>
      <Text>Press </Text>
      <Key>Shift</Key>
      <Text> Quick run or fast flight</Text>
    </div>

    <div>
      <Text>Press </Text>
      <Key>Space</Key>
      <Text> to jump</Text>
    </div>

    <div>
      <Text>Press </Text>
      <Key>F</Key>
      <Text> Switch flight mode</Text>
    </div>
  </div>
);

const Circle = () => (
  <div>
    <div className={cx('circle')}></div>

    <div className={cx('circle-arrow')}>➞</div>

    <div>
      <Text>Mini Map</Text>
    </div>
    <div>
      <Text>To observe the location of the character</Text>
    </div>
  </div>
);

const Enter = () => (
  <div className={cx('enter')}>
    <Text>Press </Text>
    <Key>Enter</Key>
    <Text> to interact with interactable objects</Text>
  </div>
);

const User = () => (
  <div className={cx('user')}>
    <div className={cx('head')}></div>
    <div className={cx('circle-arrow')}>➞</div>
    <div className={cx('mouse-container')}>
      <img src={mouseLeft2Icon} alt="" />
    </div>
    <Text>User Profile</Text>
  </div>
);
