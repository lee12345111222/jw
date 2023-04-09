import { useCallback } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import MainPage from '@/components/MainPage/index';

import classes from './index.module.css';
import classNames from 'classnames/bind';

import spaceEditorTitle from '@/assets/img/space-editor-title.svg';
import roleEditorTitle from '@/assets/img/role-editor-title.svg';
import voxelEditorTitle from '@/assets/img/voxel-editor-title.svg';

import spaceEditorItemIcon1 from '@/assets/icon/space-editor-item1-icon.svg';
import spaceEditorItemIcon2 from '@/assets/icon/space-editor-item2-icon.svg';

import roleEditorItemIcon1 from '@/assets/icon/role-editor-item1-icon.svg';
import roleEditorItemIcon2 from '@/assets/icon/role-editor-item2-icon.svg';

import voxelEditorItemIcon1 from '@/assets/icon/voxel-editor-item1-icon.svg';
import voxelEditorItemIcon2 from '@/assets/icon/voxel-editor-item2-icon.svg';

import { ReactComponent as RoleEditorIcon } from '@/assets/icon/role-editor-icon.svg';
import { ReactComponent as SpaceEditorIcon } from '@/assets/icon/space-editor-icon.svg';
import { ReactComponent as VoxelEditorIcon } from '@/assets/icon/voxel-editor-icon.svg';

import editorJumpIcon from '@/assets/icon/editor-box-icon.svg';
import editorArrow from '@/assets/icon/role-editor-arrow.svg';

import spacePoster from '@/assets/img/space-poster.png';
import rolePoster from '@/assets/img/role-poster.png';
import voxelPoster from '@/assets/img/voxel-editor-poster.png';

import { Button } from '@/custom-ui/index';

const cx = classNames.bind(classes);

export default function Create() {
  const { tab } = useParams();

  return (
    <MainPage alpha>
      <div className={cx('create')}>
        <div className={cx('half-page')} />
        <Navigator tab={tab} />
        {tab === 'space' && <SpaceEditor />}
        {tab === 'voxel' && <VoxelEditor />}
        {tab === 'role' && <RoleEditor />}
      </div>
    </MainPage>
  );
}

const Navigator = ({ tab }) => {
  const { push } = useHistory();

  const jumpFn = useCallback(
    (path) => {
      push(`/create/${path}`);
    },
    [push]
  );

  return (
    <div className={cx('navigator')}>
      <ul>
        <li
          onClick={() => jumpFn('role')}
          className={cx({ selected: tab === 'role' })}
        >
          <RoleEditorIcon className={cx('icon')} />
          <span>RoleEditor</span>
        </li>
        <li
          onClick={() => jumpFn('space')}
          className={cx({ selected: tab === 'space' })}
        >
          <SpaceEditorIcon className={cx('icon')} />
          <span>SpaceEditor</span>
        </li>
        <li
          onClick={() => jumpFn('voxel')}
          className={cx({ selected: tab === 'voxel' })}
        >
          <VoxelEditorIcon className={cx('icon')} />
          <span>VoxelEditor</span>
        </li>
      </ul>
    </div>
  );
};

const SpaceEditor = () => {
  // const goToEditor = useCallback(() => {
  //   window.open('/space-editor');
  // }, []);

  return (
    <div className={cx('editor-page')}>
      <div className={cx('contents')}>
        <Title src={spaceEditorTitle} />
        <P>
          Space Editor is a totally free and easy-to-use Metaverse Space Editor.
        </P>
        <DescList>
          <DescItem
            icon={spaceEditorItemIcon1}
            text="Create your own metaverse building and invite friends to play together"
          />
          <DescItem
            icon={spaceEditorItemIcon2}
            text="Publish buildings to your land and enjoy the metaverse lifestyle"
          />
        </DescList>
        {/* <ChestTitle /> */}
        <Actions>
          <Link to="/space-editor">
            <MainBtn
            //  onClick={goToEditor}
            >
              Open SpaceEditor
            </MainBtn>
          </Link>
          <SecondBtn
            onClick={() =>
              window.open('https://opensea.io/collection/playeroneworld')
            }
          >
            Trade Now
          </SecondBtn>
        </Actions>
      </div>

      <div className={cx('contents')}>
        <Poster src={spacePoster} />
      </div>
    </div>
  );
};

const RoleEditor = () => {
  const handleOpenEditor = useCallback(() => {
    window.open('/role-editor');
  }, []);

  return (
    <div className={cx('editor-page')}>
      <div className={cx('contents')}>
        <Title src={roleEditorTitle} />
        <P>
          The Role Editor is a helpful tool for creating characters that may
          freely travel throughout PlayerOne Metaverse.
        </P>
        <DescList>
          <DescItem
            icon={roleEditorItemIcon1}
            text="Create your own PlayerOne character by combining various character voxel parts and races."
          />
          <DescItem
            icon={roleEditorItemIcon2}
            text="Collaborates with third-party IP to create customized characters."
          />
        </DescList>
        <Actions>
          <MainBtn onClick={handleOpenEditor}>Open RoleEditor</MainBtn>
          <SecondBtn
            onClick={() =>
              window.open('https://opensea.io/collection/voxelrole')
            }
          >
            View On Opensea
          </SecondBtn>
        </Actions>
      </div>
      <div className={cx('contents')}>
        <Poster src={rolePoster} />
      </div>
    </div>
  );
};

const VoxelEditor = () => {
  return (
    <div className={cx('editor-page')}>
      <div className={cx('contents')}>
        <Title src={voxelEditorTitle} />
        <P>Create unique voxel buildings, characters and other works</P>
        <DescList>
          <DescItem
            icon={voxelEditorItemIcon1}
            text="The VoxelEditor model has better granularity and can create finer things such as dolls and decorations. "
          />
          <DescItem
            icon={voxelEditorItemIcon2}
            text="Create your own Voxel props, cast them as NFT and publish them to the metaverse."
          />
        </DescList>
        <Actions>
          <MainBtn>Cooming Soon</MainBtn>
          <SecondBtn>Upload voxel</SecondBtn>
        </Actions>
      </div>
      <div className={cx('contents')}>
        <Poster src={voxelPoster} />
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

const MainBtn = ({ children, onClick }) => {
  return (
    <Button borderWeight="3px" bg="purple">
      <div onClick={onClick} className={cx('btn')}>
        {children}
      </div>
    </Button>
  );
};

const SecondBtn = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      bg="white"
      borderWeight="3px"
      type=""
      className={cx('second-button')}
    >
      <div className={cx('btn')}>{children}</div>
    </Button>
  );
};

const Poster = ({ src }) => (
  <div className={cx('poster')}>
    <div className={cx('poster-bg')}></div>
    <div style={{ aspectRatio: '1 / 1', width: '100%' }}>
      <img src={src} alt="" />
    </div>
  </div>
);

const ChestTitle = () => {
  return (
    <div className={cx('chest-title')}>
      <img src={editorJumpIcon} alt="" />
      <span>use Treasure Chest</span>
      <img src={editorArrow} alt="" />
    </div>
  );
};
