import { useCallback, useMemo } from 'react';

import styled from 'styled-components';

import { Modal, Tabs } from 'antd';

import { Text, Icon, Flex } from '@/components/Basic';

import { voxels } from '@/api/editor';

import useApi from '@/hooks/useApi';

import Markdown from './Markdown';

const { TabPane } = Tabs;

export default function UI({ unityContext, open, onHide }) {
  const { data } = useApi(voxels, {
    formatResult: ({ code, data }) => (code === 200 ? data.voxels : undefined)
  });

  const handleSelect = useCallback(
    (voxelUrl, defaultScale) => {
      onHide();
      unityContext.requestPointerLock();
      setTimeout(() => {
        unityContext.send(
          'UICtrlInst',
          'WebglSetVoxelModel',
          voxelUrl
          //   defaultScale
        );
      }, 200);
    },
    [onHide, unityContext]
  );

  const PaneList = useMemo(() => {
    if (!data) return;
    return Object.keys(data).map((pane) => {
      const ItemList = data[pane].map(
        ({
          image,
          voxel
          // default_scale
        }) => (
          <Icon
            onClick={() =>
              handleSelect(
                voxel
                // default_scale
              )
            }
            key={image}
            src={image}
            w="108px"
          />
        )
      );
      return (
        <TabPane style={{ height: '456px' }} tab={pane} key={pane}>
          <Flex
            style={{ overflowY: 'auto' }}
            ai="flex-start"
            fw="wrap"
            gap="8px 16px"
          >
            {ItemList}
          </Flex>
        </TabPane>
      );
    });
  }, [data, handleSelect]);

  return (
    <>
      <StyledModal
        onCancel={onHide}
        maskClosable={false}
        centered
        width="780px"
        footer=""
        bodyStyle={{
          padding: 0
        }}
        title={
          <Text fw="700" fs="18px" lh="30px">
            Voxel Market
          </Text>
        }
        visible={open}
      >
        <StyledTabbar tabBarGutter="22px">{PaneList}</StyledTabbar>
      </StyledModal>

      <Markdown unityContext={unityContext} />
    </>
  );
}

const StyledModal = styled(Modal)`
  & .ant-modal-header {
    border-bottom: solid 1px #434447;
    background-color: #222327;
  }
`;

const StyledTabbar = styled(Tabs)`
  color: rgba(255, 255, 255, 0.65);
  height: 100%;
  & .ant-tabs-content {
    height: 100%;
    background-color: #192026;
    padding: 24px;
  }
  & .ant-tabs-nav {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    background-color: #222327;
  }
  & .ant-tabs-nav::before {
    border-bottom: none !important;
  }
  & .ant-tabs-nav-list {
    margin-left: 24px;
    user-select: none;
  }
  & .ant-tabs-tab {
    &:hover {
      color: rgba(255, 255, 255, 0.85);
    }
  }
  & .ant-tabs-ink-bar {
    background: #2f5b8e;
    /* height: 2px; */
  }
  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
  }
`;
