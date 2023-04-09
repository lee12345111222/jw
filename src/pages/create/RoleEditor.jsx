import MainPage from '@/components/MainPage/index';

import classes from './index.module.css';
import classNames from 'classnames/bind';

import roleEditorTitle from '@/assets/img/roleEditor.svg';

import spaceEditorItemIcon1 from '@/assets/icon/space-editor-item1-icon.svg';
import spaceEditorItemIcon2 from '@/assets/icon/space-editor-item2-icon.svg';
import spaceEditorItemIcon3 from '@/assets/icon/space-editor-item3-icon.svg';

// import editorEditor from '@/assets/icon/editor-box-icon.svg';
// import editorArrow from '@/assets/icon/role-editor-arrow.svg';

import roleEditor from '@/assets/img/roleEditor.png';

import { Button } from '@/custom-ui/index';

const cx = classNames.bind(classes);

export default function Create() {
  return (
    <MainPage alpha>
      <div className={cx('create')}>
        <div className={cx('half-page')} />
        <Navigator />
        <RoleEditor />
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

const RoleEditor = () => {
  return (
    <div className={cx('editor-page')}>
      <div className={cx('contents')}>
        <Title src={roleEditorTitle} />
        <P>
          Here is the role editor's documentation. Here is the role editor's
          documentation
        </P>
        <DescList>
          <DescItem
            icon={spaceEditorItemIcon1}
            text="身体根据角色种类会有不同的稀有程度划分，越稀有的种类其身体价值越高"
          />
          <DescItem
            icon={spaceEditorItemIcon2}
            text="PlayerOne 角色将不会进行销售，只根据游戏阶段空投给社区用户"
          />
          <DescItem
            icon={spaceEditorItemIcon3}
            text="用户在 Role Editor 中完成角色搭配后可以一键上链，同时角色属性一并上链"
          />
        </DescList>
        {/* <ChestTitle /> */}
        <Actions>
          <MainBtn>打开 RoleEditor</MainBtn>
          <SecondBtn>View On Opensea</SecondBtn>
        </Actions>
      </div>
      <div className={cx('contents')} style={{ padding: '0' }}>
        <Poster src={roleEditor} />
      </div>
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
