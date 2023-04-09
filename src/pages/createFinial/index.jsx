import React from 'react';

import styles from './index.module.css';

import classNames from 'classnames/bind';

import { CreateTabber } from '@/components/Tabbar';

import MainPage from '@/components/MainPage/index';

import { Tabs } from 'antd';

import { useParams, useHistory } from 'react-router-dom';

import {
  VoxelEditorHeader,
  RoleEditorHeader,
  SpaceEditorHeader
} from '@/pages/createFinial/createV2/index';
import {
  VoxelDisplayComponent,
  VoxelEditorComponent,
  RoleEditorVideoComponent,
  RoleEditorDisplayComponent,
  RoleEditorComponent,
  BlueprintDisplayComponent,
  SpaceEditorComponent,
  SpaceEditorVideoComponent
} from '@/pages/createFinial/createV3/components/combination-components/index';
import {
  VoxelSubFooter,
  RoleSubFooter,
  SpaceSubFooter,
  Footer
} from '@/pages/createFinial/createV3/components/basic-components/index';

const cx = classNames.bind(styles);

const { TabPane } = Tabs;

const style = { width: 1280, margin: 'auto' };

export default function Create() {
  const { tab } = useParams();
  const { push } = useHistory();

  const handleTabChange = (e) => {
    push(`/create/${e}`);
  };
  return (
    <MainPage title="create">
      <div style={ { height: '100%', overflowY: 'auto' } }>
        <NavigatorHeader tab={ tab } />
        <CreateTabber
          defaultActiveKey={ tab }
          centered
          tabBarGutter="180px"
          size="large"
          onChange={ handleTabChange }
        >
          <TabPane
            tab={ <div className={ cx('tab-pane-item') }>RoleEditor</div> }
            key="role"
          >
            <RoleEditor />
            <Footer />
          </TabPane>
          <TabPane
            tab={ <div className={ cx('tab-pane-item') }>SpaceEditor</div> }
            key="space"
          >
            <SpaceEditor />
            <Footer />
          </TabPane>
          <TabPane
            tab={ <div className={ cx('tab-pane-item') }>VoxelEditor</div> }
            key="voxel"
          >
            <VoxelEditor />
            <Footer />
          </TabPane>
        </CreateTabber>
      </div>
    </MainPage>
  );
}

const NavigatorHeader = ({ tab }) => {
  return (
    <>
      { tab === 'voxel' && <VoxelEditorHeader /> }
      { tab === 'role' && <RoleEditorHeader /> }
      { tab === 'space' && <SpaceEditorHeader /> }
    </>
  );
};

const VoxelEditor = () => {
  return (
    <>
      <VoxelEditorPart01 />
      <VoxelEditorPart02 />
      <VoxelSubFooter />
    </>
  );
};

const RoleEditor = () => {
  return (
    <>
      <RoleEditorPart01 />
      <RoleEditorPart02 />
      <RoleEditorPart03 />
      <RoleSubFooter />
    </>
  );
};

const SpaceEditor = () => {
  return (
    <>
      <SpaceEditorPart01 />
      <SpaceEditorPart02 />
      <SpaceEditorPart03 />
      <SpaceSubFooter />
    </>
  );
};

const VoxelEditorPart01 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <VoxelDisplayComponent style={ { width: 1024, margin: 'auto' } } />
    </Wrapper>
  );
};

const VoxelEditorPart02 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <VoxelEditorComponent style={ style } />
    </Wrapper>
  );
};

const RoleEditorPart01 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <RoleEditorVideoComponent style={ style } />
    </Wrapper>
  );
};

const RoleEditorPart02 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <RoleEditorDisplayComponent style={ style } />
    </Wrapper>
  );
};

const RoleEditorPart03 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <RoleEditorComponent style={ style } />
    </Wrapper>
  );
};

const SpaceEditorPart02 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <BlueprintDisplayComponent style={ style } />
    </Wrapper>
  );
};

const SpaceEditorPart03 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <SpaceEditorComponent style={ style } />
    </Wrapper>
  );
};

const SpaceEditorPart01 = () => {
  return (
    <Wrapper className={ cx('voxel-editor-container') }>
      <SpaceEditorVideoComponent style={ style } />
    </Wrapper>
  );
};

const Wrapper = (props) => <div { ...props }></div>;
