import React from 'react';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import {
  CreateSubtitle,
  CreateTitle,
  VoxelPartArea,
  VoxelEditorCardArea,
  RoleEditorVideoArea,
  Image,
  VideoPlayerArea
} from '../basic-components/index.jsx';
import { Flex } from '@/components/Basic';
import RoleDisplayImg from '@/assets/img/create/role-display.png';

import {
  RoleEditorVideoList,
  RoleEditorFeaturesList,
  SpaceEditorVideoList,
  SpaceEditorFeaturesList,
  VoxelEditorFeaturesList,
  BulePointVideoList
} from './const';

const cx = classNames.bind(styles);

export default function index() {
  return <div>index</div>;
}

export const VoxelDisplayComponent = ({ style }) => {
  return (
    <Flex
      fd="column"
      ai="center"
      gap="46px"
      style={{ width: '100%', ...style }}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>Voxel Display</CreateTitle>
        <CreateSubtitle>
          Create ERC-1155 voxel objects for your use or place orders to sell to
          others for commission.
        </CreateSubtitle>
      </Flex>
      <VoxelPartArea />
    </Flex>
  );
};

export const VoxelEditorComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="40px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>VoxelEditor Features</CreateTitle>
        <CreateSubtitle>
          VoxelEditor model has better granularity and can create finer things.
        </CreateSubtitle>
      </Flex>
      <VoxelEditorCardArea cardList={VoxelEditorFeaturesList} />
    </Flex>
  );
};

export const RoleEditorVideoComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="36px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>RoleEditor Video Tutorial</CreateTitle>
        <CreateSubtitle>
          Players may alter the role's appearance and publish it as NFT with a
          single click.
        </CreateSubtitle>
      </Flex>
      <RoleEditorVideoArea list={RoleEditorVideoList} />
    </Flex>
  );
};

export const RoleEditorDisplayComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="36px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>VoxelRole Display</CreateTitle>
        <CreateSubtitle>
          Users can generate billions of exclusive NFT roles according to their
          preferences.
        </CreateSubtitle>
      </Flex>
      <div className={cx('role-editor-display')}>
        <Image src={RoleDisplayImg} width="100%" />
      </div>
    </Flex>
  );
};
export const RoleEditorComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="36px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>RoleEditor Features</CreateTitle>
        <CreateSubtitle>
          Create your own PlayerOne VoxelRoles by combining various VoxelRole
          Parts and races.
        </CreateSubtitle>
      </Flex>
      <VoxelEditorCardArea cardList={RoleEditorFeaturesList} />
    </Flex>
  );
};

export const SpaceEditorVideoComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="36px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>SpaceEditor Video Tutorial</CreateTitle>
        <CreateSubtitle>
          Here is a series of tutorials to help you create creative buildings.
        </CreateSubtitle>
      </Flex>
      <RoleEditorVideoArea list={SpaceEditorVideoList} />
    </Flex>
  );
};

export const BlueprintDisplayComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="36px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>Blueprint Display</CreateTitle>
        <CreateSubtitle>
          Blueprints are a handy way for users to develop building in PlayerOne.
        </CreateSubtitle>
      </Flex>
      <VideoPlayerArea videoList={BulePointVideoList} />
    </Flex>
  );
};

export const SpaceEditorComponent = ({ style }) => {
  return (
    <Flex fd="column" ai="center" gap="36px" style={style}>
      <Flex fd="column" ai="center" gap="16px">
        <CreateTitle>SpaceEditor Features</CreateTitle>
        <CreateSubtitle>
          SpaceEditor is a totally free and easy-to-use Metaverse Space Editor.
        </CreateSubtitle>
      </Flex>
      <VoxelEditorCardArea cardList={SpaceEditorFeaturesList} />
    </Flex>
  );
};
