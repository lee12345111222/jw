import ToolContainer from './ToolContainer';

import Tooltip from '@/ui/tooltip/index';

import water from '@/assets/icon/water-icon.png';
import beach from '@/assets/icon/beach-icon.png';
import forest from '@/assets/icon/forest-icon.png';
import mountain from '@/assets/icon/mountain-icon.png';
import sea from '@/assets/icon/sea-icon.png';
import wasteland from '@/assets/icon/wasteland-icon.png';

import styles from './landTypes.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function LandTypes() {
  return (
    <ToolContainer className={cx('land')}>
      <Item src={forest} text="Forest" />
      <Line />
      <Item src={sea} text="Sea" />
      <Line />
      <Item src={mountain} text="Mountain" />
      <Line />
      <Item src={beach} text="Beach" />
      <Line />
      <Item src={water} text="Lake & River" />
      <Line />
      <Item src={wasteland} text="Under Construction" />
    </ToolContainer>
  );
}

const Item = ({ src, text }) => (
  <Tooltip title={text} top>
    <img src={src} alt="" />
  </Tooltip>
);

const Line = () => <div className={cx('line')}></div>;
