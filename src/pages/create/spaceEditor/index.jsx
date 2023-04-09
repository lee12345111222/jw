import { useCallback } from 'react';

import MainPage from '@/components/MainPage/index';

// import Header from '@/components/header/index';
import { Nav, NavItem } from '@/custom-ui/index';

// import spaceEditorLogo from '@/assets/icon/space-editor-logo.svg';

import { ParcelIcon, BlueprintIcon, DrivingIcon } from './Icons';

import DrivingRange from './DrivingRange';
import Parcel from './Parcel';
// import Land from '../tabs/Land';

import classes from './index.module.css';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

const cx = classNames.bind(classes);

export default function SpaceEditor() {
  const { tab } = useParams();

  const handleNotOpen = useCallback((e) => {
    e.preventDefault();
    message.info('Coming soon');
  }, []);

  return (
    <MainPage title="Create" goBack>
      <div className={cx('editor')}>
        <div className={cx('page')}>
          <div className={cx('content')}>
            {tab === 'parcel' && <Parcel />}
            {tab === 'playground' && <DrivingRange />}
            {tab === 'blueprint' && <div>blueprint</div>}
          </div>
        </div>

        <Sidebar>
          <Nav>
            <NavItem replace icon={ParcelIcon} to="/space-editor/parcel">
              Parcel
            </NavItem>
            <NavItem replace icon={DrivingIcon} to="/space-editor/playground">
              Playground
            </NavItem>
            <div className={cx('line')}></div>
            <NavItem
              onClick={handleNotOpen}
              style={{ cursor: 'not-allowed' }}
              replace
              icon={BlueprintIcon}
              to="/space-editor/blueprint"
            >
              Blueprint
            </NavItem>
          </Nav>
        </Sidebar>
      </div>
    </MainPage>
  );
}

const Sidebar = ({ children }) => {
  return <div className={cx('sidebar')}>{children}</div>;
};

export const StatusBar = ({ count = 0, children }) => {
  return (
    <div className={cx('statusbar')}>
      <span>{count} Results</span>
      <div>{children}</div>
    </div>
  );
};
