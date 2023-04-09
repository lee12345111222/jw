import { H2 } from './Index';
import { Button } from '@/custom-ui/index';

import logo from '@/assets/icon/logo.png';
import subtitle from '@/assets/img/space-editor-subtitle.png';
import subtitleSmall from '@/assets/img/space-editor-subtitle-small.png';
import spacePoster from '@/assets/img/space-poster.png';
import spaceEditorBg from '@/assets/img/space-editor-bg.png';

import classes from './SpaceEditor.module.css';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';

const cx = classNames.bind(classes);

export default function SpaceEditor() {
  return (
    <div
      className={cx('space-editor')}
      style={{ backgroundImage: `url(${spaceEditorBg})` }}
    >
      <div className={cx('page-left')}>
        <img src={spacePoster} alt="" />
      </div>
      <PageRight />
    </div>
  );
}

const PageRight = () => (
  <div className={cx('page-right')}>
    <div className={cx('desc-list')}>
      <div className={cx('title')}>
        <img src={logo} alt="" />
        <H2 className={cx('h2')}>SpaceEditor</H2>
      </div>
      <img className={cx('subtitle')} src={subtitle} alt="" />
      <img className={cx('subtitle-small')} src={subtitleSmall} alt="" />
    </div>
    <div className={cx('actions')}>
      {/* <Link to="/space-editor"> */}
      <Button onClick={() => window.open('/space-editor')}>
        <div className={cx('btn')}>Open SpaceEditor</div>
      </Button>
      {/* </Link> */}
      <Button
        onClick={() =>
          window.open('https://opensea.io/collection/playerone-blueprint')
        }
        type=""
      >
        <div className={cx('btn')}>Blueprint on Opensea</div>
      </Button>
    </div>
  </div>
);
