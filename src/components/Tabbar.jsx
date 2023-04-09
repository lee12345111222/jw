import styled from 'styled-components';
import { Tabs } from 'antd';

const StyledTabbar = styled(Tabs)`
  color: rgba(255, 255, 255, 0.45);
  min-height: 100%;
  flex-shirnk: 0;
  & .ant-tabs-content {
    height: 100%;
    overflow: hidden;
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

const CreateStyledTabbar = styled(Tabs)`
  color: rgba(255, 255, 255, 0.45);
  min-height: 100%;
  flex-shirnk: 0;

  & .ant-tabs-content {
    height: 100%;
    overflow: hidden;
  }
  & .ant-tabs-ink-bar {
    background-color: #06c4ff;
  }
  & .ant-tabs-nav-list {
    margin-left: 24px;
  }
  & .ant-tabs-nav-wrap {
    background: #13181d;
  }
  & .ant-tabs-tab {
    color: rgba(255, 255, 255, 0.6);
    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  & .ant-tabs-tab-btn:focus,
  .ant-tabs-tab-remove:focus,
  .ant-tabs-tab-btn:active,
  .ant-tabs-tab-remove:active {
    color: rgba(255, 255, 255, 0.5);
  }
  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgba(255, 255, 255, 0.9);
  }
  & .ant-tabs-top > .ant-tabs-nav,
  .ant-tabs-bottom > .ant-tabs-nav,
  .ant-tabs-top > div > .ant-tabs-nav,
  .ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 100px;
  }
`;

export const CreateTabber = (props) => (
  <CreateStyledTabbar tabBarGutter="56px" {...props} />
);
/**
 *
 * @description
 *
 * @param {object} props
 * @returns {JSX.Element}
 */
export const Tabbar = (props) => (
  <StyledTabbar tabBarGutter="56px" {...props} />
);
