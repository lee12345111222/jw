import { useMemo, useState, useCallback, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import useMyHistory from '@/hooks/useHistory';

import { Dropdown, Menu, Modal, message, notification } from 'antd';

import CardList from '@/components/CardList/index';

import { getMainRole, setMainRole as setMain, setMeebit } from '@/api/role';
import { myMeebits } from '@/api/nft';

import { Flex } from '@/components/Basic';

import { VideoCard } from '@/components/Cards/index';

import { SelectorItem } from '@/components/Filter';

import { Title } from '@/components/BasicComponents';

import useApi from '@/hooks/useApi';

import { InfoBox1 } from '@/components/Cards/index';

import NftList from '@/components/CardList/NftList';

import { useTranslation } from 'react-i18next';

import showMore from '@/assets/icon/show-more.png';
import humanIcon from '@/assets/icon/human.png';
import checked from '@/assets/icon/checked.png';
import unChecked from '@/assets/icon/unChecked.png';
import addIcon from '@/assets/icon/add.png';

import { BasicCard } from '@/components/Cards/index';

import {
  opensea,
  PlayerOneRoleAddress,
  video_server
} from '@/constant/env/index';

import styles from './voxelRole.module.css';
import classNames from 'classnames/bind';

import Tooltip from '@/ui/tooltip/index';

const cx = classNames.bind(styles);

const { Item } = Menu;
const { confirm } = Modal;

export default function VoxelRole({ getToken, account }) {
  const { tab, type, msg } = useParams();

  const history = useHistory();

  useEffect(() => {
    if (msg) {
      notification.error({
        message: 'Authorization Faild',
        description: msg
      });
      history.push('/assets/voxelrole/meebit');
    }
  }, [history, msg]);

  useEffect(() => {
    if (tab === 'voxelrole' && type !== 'role' && type !== 'meebit') {
      history.push('/assets/voxelrole/role');
    }
  }, [history, tab, type]);

  const [count, setCount] = useState(0);

  const [currentId, setCurrentId] = useState();

  const handlePlay = useCallback(
    (val) => {
      val === currentId ? setCurrentId(undefined) : setCurrentId(val);
    },
    [currentId]
  );

  const { run, data: { token_id: mainCharacterTokenId, category } = {} } =
    useApi(getMainRole, {
      manual: true,
      formatResult: (res) => res.data
    });

  useEffect(() => {
    if (!account) return;
    run(account);
  }, [account, run]);

  const { run: set } = useApi(setMain, {
    manual: true,
    onSuccess() {
      run(account);
    }
  });

  const { run: setMeebitRole } = useApi(setMeebit, { manual: true });

  const handleSetMainMeebit = useCallback(
    async (token, tokenId, address) => {
      const { code, data, msg } = await setMeebitRole({
        login_token: token,
        token_id: tokenId,
        address
      });

      if (code !== 200) {
        return message.error(msg);
      }

      const { status, url } = data;

      if (status !== 'auth') {
        return run(account);
      }

      confirm({
        title: 'You need authorization to set the main role, sure to go?',
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk() {
          window.location.href = url;
        }
      });
    },
    [account, run, setMeebitRole]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <StatusBar count={count} type={type} />
      {type === 'meebit' && (
        <Meebits
          address={account}
          onSuccess={(val) => setCount(val)}
          set={handleSetMainMeebit}
          getToken={getToken}
          selectedTokenId={mainCharacterTokenId}
          category={category}
        />
      )}
      {type === 'role' && (
        <NftList
          slug="role"
          minWidth="200px"
          owner={account || false}
          ChildCard={PartItem}
          onPlay={handlePlay}
          currentId={currentId}
          getToken={getToken}
          account={account}
          set={set}
          selectedTokenId={mainCharacterTokenId}
          category={category}
          onSuccess={({ totalCount }) => {
            setCount(totalCount);
          }}
        />
      )}
    </div>
  );
}

const StatusBar = ({ count, type }) => {
  const nativeHistory = useHistory();
  const history = useMyHistory();

  return (
    <Title
      title={
        <div className={cx('selector-list')}>
          <SelectorItem
            onClick={() => nativeHistory.push('/assets/voxelrole/role')}
            className={cx('selector', { selected: type === 'role' })}
          >
            VoxelRole
          </SelectorItem>
          <SelectorItem
            onClick={() => nativeHistory.push('/assets/voxelrole/meebit')}
            className={cx('selector', { selected: type === 'meebit' })}
          >
            Meebit
          </SelectorItem>
          <div>{count} results</div>
        </div>
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img
          style={{ width: '22px', cursor: 'pointer' }}
          src={addIcon}
          onClick={() => history.open('/role-editor')}
          alt=""
        />
      </div>
    </Title>
  );
};

const PartItem = ({
  node: {
    asset: { name, properties, tokenId, tradeSummary }
  },
  currentId,
  onPlay,
  getToken,
  account,
  selectedTokenId,
  category,
  set
}) => {
  const price = useMemo(
    () => tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2),
    [tradeSummary]
  );

  const history = useHistory();
  const { t } = useTranslation();

  const menu = useMemo(
    () => (
      <Menu>
        <Item key="0">
          <div
            onClick={() => history.push(`/assets/voxelrole/detail/${tokenId}`)}
          >
            {t('statusbar.detail')}
          </div>
        </Item>
        {!price && (
          <Item key="1">
            <a
              target="_blank"
              href={`${opensea.polygon}/${PlayerOneRoleAddress}/${tokenId}`}
              rel="noreferrer"
            >
              {t('statusbar.sell')}
            </a>
          </Item>
        )}
      </Menu>
    ),
    [history, price, t, tokenId]
  );

  const setMainRole = useCallback(
    (status) => {
      confirm({
        title: status
          ? 'Are you sure to reset the main role?'
          : 'Are you sure you want to set this role as the main role?',
        okText: 'Confirm',
        cancelText: 'Cancel',
        async onOk() {
          const token = await getToken();
          await set({
            login_token: token,
            token_id: tokenId,
            address: account
          });
          return 1;
        }
      });
    },
    [account, getToken, set, tokenId]
  );

  return (
    <VideoCard
      title={
        <div className={styles['card-title']}>
          <span>{name}</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <img src={showMore} alt="" />
          </Dropdown>
        </div>
      }
      pointer={false}
      tokenId={tokenId}
      currentId={currentId}
      onPlay={onPlay}
      poster={`${video_server}/images/${tokenId}.png`}
      video={`${video_server}/videos/${tokenId}.mp4`}
    >
      <Flex ai="center" jc="space-between">
        <InfoBox1>
          <img src={humanIcon} alt="" />
          {properties?.find(({ key }) => key === 'body')?.value || '-'}
        </InfoBox1>

        {price ? (
          <span style={{ color: 'rgba(255, 255, 255, .45)' }}>On sale</span>
        ) : (
          <Tooltip
            title={
              category === 'voxelrole' && +tokenId === +selectedTokenId
                ? 'Reset'
                : 'Set Main Role'
            }
          >
            <img
              onClick={() =>
                setMainRole(
                  category === 'voxelrole' && +tokenId === +selectedTokenId
                )
              }
              src={
                category === 'voxelrole' && +tokenId === +selectedTokenId
                  ? checked
                  : unChecked
              }
              style={{ cursor: 'pointer' }}
              alt=""
            />
          </Tooltip>
        )}
      </Flex>
    </VideoCard>
  );
};

const Meebits = ({
  address,
  onSuccess,
  getToken,
  set,
  selectedTokenId,
  category
}) => {
  const [{ hasNextPage, endCursor }, setPageInfo] = useState({});
  const [data, setData] = useState([]);

  const { run, loading } = useApi(myMeebits, {
    manual: true,
    formatResult({ data } = {}) {
      const { amount, meebits, pageInfo } = data;
      setPageInfo(pageInfo || {});
      onSuccess(amount);
      return meebits;
    }
  });

  useEffect(() => {
    if (!address) {
      return;
    }

    (async () => {
      const res = await run({
        address
      });
      setData(res);
    })();
  }, [address, run]);

  const getNextPage = useCallback(async () => {
    if (!hasNextPage) {
      return;
    }
    const res = await run({ address, cursor: endCursor });
    setData((val) => {
      return [...val, ...res];
    });
  }, [address, endCursor, hasNextPage, run]);

  const meebitsList = useMemo(() => {
    return data.map(({ token_id, name, image, type }) => {
      return (
        <MeebitItem
          name={name}
          image={image}
          type={type}
          tokenId={token_id}
          key={token_id}
          account={address}
          getToken={getToken}
          set={set}
          selectedTokenId={selectedTokenId}
          category={category}
        />
      );
    });
  }, [address, category, data, getToken, selectedTokenId, set]);

  return (
    <CardList minWidth="200px" onScrollToBottom={getNextPage} loading={loading}>
      {meebitsList}
    </CardList>
  );
};

const MeebitItem = ({
  name,
  image,
  type,
  tokenId,
  getToken,
  account,
  selectedTokenId,
  category,
  set
}) => {
  const setMainRole = useCallback(
    (status) => {
      confirm({
        title: status
          ? 'Are you sure to reset the main role?'
          : 'Are you sure you want to set this role as the main role?',
        okText: 'Confirm',
        cancelText: 'Cancel',
        async onOk() {
          const token = await getToken();
          await set(token, tokenId, account);
          return 1;
        }
      });
    },
    [account, getToken, set, tokenId]
  );

  return (
    <BasicCard
      title={
        <>
          <div className={styles['card-title']}>{name}</div>
          <Flex ai="center" jc="space-between" style={{ marginTop: '16px' }}>
            <div style={{ padding: '1px' }}>
              <InfoBox1>
                <img src={humanIcon} alt="" />
                {type || '-'}
              </InfoBox1>
            </div>
            <Tooltip
              title={
                category === 'meebit' && +tokenId === +selectedTokenId
                  ? 'Reset'
                  : 'Set Main Role'
              }
            >
              <img
                onClick={() =>
                  setMainRole(
                    category === 'meebit' && +tokenId === +selectedTokenId
                  )
                }
                src={
                  category === 'meebit' && +tokenId === +selectedTokenId
                    ? checked
                    : unChecked
                }
                style={{ cursor: 'pointer' }}
                alt=""
              />
            </Tooltip>
          </Flex>
        </>
      }
      img={image}
      pointer={false}
      aspectRatio={'15 / 17'}
    />
  );
};
