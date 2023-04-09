import { useState, useEffect } from 'react';

import headerPosterImg from 'src/assets/img/create-header-poster.png';

import voxelEditorPosterImg from 'src/assets/img/voxel-editor-poster.png';
import roleEditorPosterImg from 'src/assets/img/role-editor-poster.png';
import spaceEditorPosterImg from 'src/assets/img/space-editor-poster.png';

import voxelEditorPosterImg_thumb from 'src/assets/img/voxel-editor-poster_thumb.png';
import roleEditorPosterImg_thumb from 'src/assets/img/role-editor-poster_thumb.png';
import spaceEditorPosterImg_thumb from 'src/assets/img/space-editor-poster_thumb.png';

import BorderedBtn from '@/components/BorderedBtn2/index';

import classes from './index.module.css';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

const cx = classNames.bind(classes);

export default function Create() {
  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <PageHeader
        img={voxelEditorPosterImg}
        thumb={voxelEditorPosterImg_thumb}
        title="RoleEditor: Create roles and freely travel in PlayerOne."
        text="Create your own PlayerOne VoxelRoles by combining various VoxelRole Parts and races."
      />
      <div>next</div>

      <PageHeader
        img={roleEditorPosterImg}
        thumb={roleEditorPosterImg_thumb}
        title="SpaceEditor: easy-to-use Metaverse Space Editors"
        text="Create your own metaverse and uploaded to the PlayerOne or invite friends to play together."
      />
      <p>next</p>

      <PageHeader
        img={spaceEditorPosterImg}
        thumb={spaceEditorPosterImg_thumb}
        title="VoxelEditor: Voxel object creator from the future"
        text="Create ERC-1155 voxel objects for your use or place orders to sell to others for commission"
      />
      <p>next</p>
    </div>
  );
}

const PageHeader = ({ title, text, action, actionText, img, thumb }) => {
  return (
    <div className={cx('header')}>
      <img src={headerPosterImg} alt="" />
      <div className={cx('header-container')}>
        <div>
          <HaderTitle>{title}</HaderTitle>
          <p className={cx('header-text')}>{text}</p>
          <BorderedBtn
            width="200px"
            height="44px"
            bgColor="rgba(43, 29, 73, 0.7)"
            borderColor="rgba(255,255,255,0.7)"
            style={{ fontSize: 20 }}
            onClick={action}
          >
            {actionText}
          </BorderedBtn>
        </div>
        <Poster
          className={cx('header-poster')}
          img={img}
          thumb={thumb}
          scaleBy="height"
        />
      </div>
    </div>
  );
};

const HaderTitle = ({ children }) => (
  <Title className={cx('header-title')}>{children}</Title>
);

/**
 *
 * @param {object} props
 * @param {'width' | 'height'} props.scaleBy
 * @returns
 */
const Poster = ({ img, thumb, classNames, scaleBy = 'width' }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = img;

    const loadListener = () => {
      setLoaded(true);
    };

    image.addEventListener('load', loadListener);

    return () => {
      image.removeEventListener('load', loadListener);
    };
  }, [img]);

  return (
    <div className={cx('poster-container')}>
      <div className={cx('poster-background')}></div>
      <img
        className={cx(
          classNames,
          'poster',
          { poster_loaded: loaded },
          `poster-scaleby-${scaleBy}`
        )}
        src={loaded ? img : thumb}
        alt=""
      />
    </div>
  );
};

const Title = ({ component = 'h2', className, ...res }) => {
  const Tag = component;
  return <Tag className={cx(className, 'title')} {...res} />;
};

export const VoxelEditorHeader = (props) => {
  return (
    <PageHeader
      img={voxelEditorPosterImg}
      thumb={voxelEditorPosterImg_thumb}
      title="VoxelEditor: Voxel object creator from the future"
      text="Create ERC-1155 voxel objects for your use or place orders to sell to others for commission"
      actionText="Open VoxelEditor"
      action={() => {
        message.info('Coming soon');
      }}
    />
  );
};

export const RoleEditorHeader = (props) => {
  return (
    <PageHeader
      img={roleEditorPosterImg}
      thumb={roleEditorPosterImg_thumb}
      title="RoleEditor: Create roles and freely travel in PlayerOne"
      text="Create your own PlayerOne VoxelRoles by combining various VoxelRole Parts and races."
      actionText="Open RoleEditor"
      action={() => {
        window.open('/role-editor');
      }}
    />
  );
};

export const SpaceEditorHeader = (props) => {
  const history = useHistory();

  return (
    <PageHeader
      img={spaceEditorPosterImg}
      thumb={spaceEditorPosterImg_thumb}
      title="SpaceEditor: easy-to-use Metaverse Space Editors"
      text="Create your own metaverse and uploaded to the PlayerOne or invite friends to play together."
      actionText="Open SpaceEditor"
      action={() => {
        history.push('/space-editor/parcel');
      }}
    />
  );
};
