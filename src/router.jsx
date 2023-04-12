import React, { Suspense } from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import useLogin from './hooks/useLogin';

import Index from './pages/index/Index';
import Mobile from './pages/mobile/index';

import MysteryBox from './pages/mysteryBox/index';
import BoxDetail from './pages/mysteryBox/BoxDetail';

import Market from './pages/market/Market';
import Detail from './pages/market/Detail';

// import CreateOld from './pages/create/index';
// import Create from './pages/createV2/index';
// import Create from './pages/createV3/index';
import Create from './pages/createFinial/index';

import Map from './pages/map/index';

import Earn from './pages/earn/index';
import Profile from './pages/profile/index';
import AboutUs from './pages/aboutUs/index';
import Discover from './pages/discover/Discover';

import SpaceEditor from './pages/create/spaceEditor/index';
import Assets from './pages/myAssets/index';

import Media from './pages/media/index';
import ProfileStep from './pages/profileStep/index';
import ProfileEdit from './pages/profileEdit/index';
import Sterybox from './pages/sterybox/index';

// import { useSelector } from 'react-redux';

import isMobile from 'is-mobile';

import Blueprint from './pages/blueprint/index';
import { isPrev, isTest } from './utils/common';
import { AirDrop3 } from './pages/airdrop2/container';
import BindPage from './pages/airdrop2/bindPage';
// import Test from './pages/airdrop2/test';

const RoleEditor = React.lazy(() => import('./pages/role/index'));
const Editor = React.lazy(() => import('./pages/editor/index'));
const Preview = React.lazy(() => import('./pages/preview/WalletOrGuest'));
const EditParcel = React.lazy(() => import('./pages/map2/index'));
const Sample = React.lazy(() => import('./pages/sample/index'));
const AudioTest = React.lazy(() => import('./pages/audioTest/index'));
export default function AppRouter() {
  useLogin();

  // const userStatus = useSelector(({ user: { status } }) => status);

  return (
    <>
      {isMobile() ? (
        <Route exact path="/" component={Mobile} />
      ) : (
        <Route exact path="/" component={Index} />
      )}

      <Route exact path="/mysterybox" component={MysteryBox} />
      <Route exact path="/mysterybox/detail/:type/:id" component={BoxDetail} />

      {isTest && (
        <>
          <Route exact path="/sample" component={Index}>
            <Suspense fallback={''}>
              <Sample />
            </Suspense>
          </Route>

          <Route exact path="/audio" component={Index}>
            <Suspense fallback={''}>
              <AudioTest />
            </Suspense>
          </Route>
        </>
      )}

      <Route exact path="/market">
        <Redirect
          to={{
            pathname: '/market/parcel'
          }}
        />
      </Route>
      <Route exact path="/market/:tab" component={Market} />
      <Route exact path="/market/:tab/detail/:id" component={Detail} />

      <Route exact path="/role-editor">
        <Suspense fallback={''}>
          <RoleEditor />
        </Suspense>
      </Route>

      <Route exact path="/create">
        <Redirect
          to={{
            pathname: '/create/parcel'
          }}
        />
      </Route>
      <Route exact path="/create/:tab/detail/:id" component={Detail} />
      <Route exact path="/create/:tab" component={Create} />

      <Route exact path="/map" component={Map} />

      <Switch>
        <Redirect exact from="/editor/:id" to="/editor/space/:id" />
      </Switch>

      <Route exact path="/editor/:category/:id">
        <Suspense fallback={''}>
          <Editor />
        </Suspense>
      </Route>

      <Switch>
        <Redirect exact from="/preview/:id" to="/preview/space/:id" />
      </Switch>

      <Route exact path="/preview/:category/:id">
        <Suspense fallback={''}>
          <Preview />
        </Suspense>
      </Route>

      <Route exact path="/space-editor/:tab" component={SpaceEditor} />
      <Route exact path="/space-editor">
        <Redirect
          to={{
            pathname: '/space-editor/parcel'
          }}
        />
      </Route>

      <Route exact path="/assets">
        <Redirect
          to={{
            pathname: '/assets/parcel'
          }}
        />
      </Route>
      <Route exact path="/assets/:tab" component={Assets} />
      <Route exact path="/assets/:tab/:type" component={Assets} />
      <Route exact path="/assets/:tab/detail/:id" component={Detail} />

      <Route
        exact
        path="/blueprint-publish/:size/:uuid"
        component={Blueprint}
      />

      <Route exact path="/discover" component={Discover} />

      {isTest || isPrev}
      {
        <Route exact path="/edit-parcel-metadata">
          <Suspense fallback={''}>
            <EditParcel />
          </Suspense>
        </Route>
      }

      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profileStep" component={ProfileStep} />
      <Route exact path="/profileEdit" component={ProfileEdit} />


      {isTest && (
        <>
          <Route exact path="/earn" component={Earn} />

          <Route exact path="/press" component={Media} />

          


          <Route exact path="/sterybox" component={Sterybox} />

          <Route exact path="/aboutus" component={AboutUs} />

          <Route exact path="/airdrop" component={AirDrop3} />

          <Route exact path="/redirect/:type/:address" component={AirDrop3} />

          <Route
            exact
            path="/redirect/:type/:status/:address"
            component={BindPage}
          />
        </>
      )}
    </>
  );
}
