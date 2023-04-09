import MainPage from '@/components/MainPage/index';

import classes from './index.module.css';
import classNames from 'classnames/bind';

import voxelEditorTitle from '@/assets/img/voxel-editor-title.svg';

import spaceEditorItemIcon1 from '@/assets/icon/space-editor-item1-icon.svg';
import spaceEditorItemIcon2 from '@/assets/icon/space-editor-item2-icon.svg';
import spaceEditorItemIcon3 from '@/assets/icon/space-editor-item3-icon.svg';

import voxelEditor from '@/assets/img/voxel-editor-img.png';

import { Button } from '@/custom-ui/index';

const cx = classNames.bind(classes);

export default function Create() {
  return (
    <MainPage alpha>
      <div className={cx('create')}>
        <div className={cx('half-page')} />
        <Navigator />
        {/* <RoleEditor /> */}
        {/* <EditorPage />
        <EditorPage /> */}
      </div>
    </MainPage>
  );
}

const Navigator = () => {
  return (
    <div className={cx('navigator')}>
      <ul>
        <li>RoleEditor</li>
        <li>SpaceEditor</li>
        <li>VoxelEditor</li>
      </ul>
    </div>
  );
};

const Title = ({ src }) => {
  return <img className={cx('title')} src={src} alt="" />;
};

const P = ({ children }) => {
  return <p className={cx('p')}>{children}</p>;
};

const DescList = ({ children }) => {
  return <ul className={cx('desc-list')}>{children}</ul>;
};

const DescItem = ({ icon, text }) => {
  return (
    <li className={cx('desc-item')}>
      <img src={icon} alt="" />
      <span>{text}</span>
    </li>
  );
};

const Actions = ({ children }) => {
  return <div className={cx('actions')}>{children}</div>;
};

const MainBtn = ({ children }) => {
  return (
    <Button borderWeight="3px" bg="purple">
      <div className={cx('btn')}>{children}</div>
    </Button>
  );
};

const SecondBtn = ({ children }) => {
  return (
    <Button bg="white" borderWeight="3px" type="">
      <div className={cx('btn')}>{children}</div>
    </Button>
  );
};

const Poster = ({ src }) => (
  <div className={cx('poster')}>
    {/* <img src={src} alt="" /> */}
    {/* <ImageBox src={src} /> */}
    <img src={src} alt="" />
  </div>
);
