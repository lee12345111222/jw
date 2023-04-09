import styled from 'styled-components';
import { Tabs } from 'antd';

export const StyledTabbar = styled(Tabs)`
  color: rgba(255, 255, 255, 0.45);
  flex-shrink: 0;
  height: 100%;
  & .ant-tabs-content {
    height: 100%;
  }
  & .ant-tabs-nav-list {
    margin-left: 24px;
  }
  & .ant-tabs-tab {
    &:hover {
      color: rgba(133, 195, 250, 0.85);
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #85c3fa;
  }
  & .ant-tabs-top > .ant-tabs-nav,
  .ant-tabs-bottom > .ant-tabs-nav,
  .ant-tabs-top > div > .ant-tabs-nav,
  .ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 100px;
  }
`;
