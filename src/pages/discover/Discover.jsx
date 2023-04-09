import { useState, useEffect, useMemo, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import useApi from '@/hooks/useApi';

import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';

import { list as getList, mythumb, getkv, spaceDetail } from '@/api/share';

import MainPage from '@/components/MainPage/index';

import { Page } from '../create/StyledComponents';
import { StyledTabbar } from '@/components/StyledTabbar';

import { Selection, Title } from '@/components/BasicComponents';

import CardList from '@/components/CardList/index';

import DiscoverItem, {
  Poster,
  ItemInfo,
  TitleBox,
  UserInfo
} from './DiscoverItem';

import { Tabs } from 'antd';

import useSetState from '@/hooks/useSetState';

import BorderedBtn from '@/components/BorderedBtn2/index';

import styles from './index.module.css';

import bg from '@/assets/img/discover-bg.png';

const { TabPane } = Tabs;

export default function Discover({ hideMain }) {
  const [{ page, limit, dataFilter, sorter }, setState] = useSetState({
    page: 1,
    limit: 15,
    dataFilter: 'recommend',
    sorter: 'newer'
  });

  const [topSpace, setTopSpace] = useState({});

  useEffect(() => {
    const getSpace = async () => {
      const { data } = await getkv();
      const uuid = data['share-space-top-uuid'];
      if (!uuid) {
        return;
      }
      const {
        data: { space }
      } = await spaceDetail(uuid);
      setTopSpace(space);
    };

    getSpace();
  }, []);

  const history = useHistory();

  const [amount, setAmount] = useState(0);

  const [list, setList] = useState([]);

  const { account } = useWallet();

  const { t } = useTranslation();

  const [getToken] = useLoginToken();

  const getLoginToken = useCallback(async () => {
    if (!account) {
      return;
    }
    const token = getToken();
    return token;
  }, [account, getToken]);

  const { loading, run } = useApi(getList, {
    manual: true,
    onSuccess: (res) => {
      if (res.code !== 200) {
        return;
      }
      setAmount(res.data.paging.amount);
      if (page === 1) {
        setList(res.data.space_list);
      } else {
        setList([...list, ...res.data.space_list]);
      }
    }
  });

  useEffect(() => {
    const params = { page, limit, data_filter: dataFilter };
    if (dataFilter !== 'recommend') {
      params.sorter = sorter;
    }

    run(params);
  }, [dataFilter, limit, page, run, sorter]);

  const { data: thumbList, run: getThumbList } = useApi(mythumb, {
    manual: true,
    formatResult: (res) => (res?.code === 200 ? res.data.list : [])
  });

  useEffect(() => {
    account && getThumbList(account);
  }, [account, getThumbList]);

  const handleItemClick = useCallback((uuid) => {
    // if (!account) {
    //   return message.info('Connect Wallet first');
    // }
    window.open(`/preview/${uuid}`);
  }, []);

  const ItemList = useMemo(
    () =>
      list.map((item) => {
        return (
          <div key={item.uuid}>
            <DiscoverItem
              onClick={() => handleItemClick(item.uuid)}
              item={item}
              token={getLoginToken}
              thumbList={thumbList || []}
              account={account}
            />
          </div>
        );
      }),
    [account, getLoginToken, handleItemClick, list, thumbList]
  );

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback(
    ({ scrollTop }) => setScrollTop(scrollTop),
    []
  );

  const handleTabChange = useCallback(
    (index) => {
      const filterList = {
        1: 'recommend',
        2: 'all',
        3: 'today',
        4: 'week',
        5: 'month'
      };
      setAmount(0);
      setState({ page: 1, dataFilter: filterList[index] });
    },
    [setState]
  );

  const handleSorter = useCallback(
    (sorter) => {
      const sorterList = [
        { name: 'Newly created', value: 'newer' },
        { name: 'Visitors', value: 'visit_count' },
        { name: 'Name', value: 'name' },
        { name: 'Size', value: 'size' }
      ];

      setAmount(0);
      setState({
        page: 1,
        sorter: sorterList.find((item) => item.name === sorter).value
      });
    },
    [setState]
  );

  const getNextPage = useCallback(() => {
    const hasNextPage = () => amount > limit * page;
    !loading &&
      hasNextPage() &&
      setState(({ page }) => {
        return { page: page + 1 };
      });
  }, [amount, limit, loading, page, setState]);

  const Main = useMemo(
    () =>
      hideMain
        ? ({ children }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
              {children}
            </div>
          )
        : MainPage,
    [hideMain]
  );

  return (
    <Main title={t('discover.title')} alpha>
      <Page fd="column">
        <CardList
          onScroll={handleScroll}
          onScrollToBottom={getNextPage}
          minWidth="360px"
          headers={
            <>
              <div className={styles['page-poster-bg']}>
                <img src={bg} alt="" />
              </div>

              <div className={styles['page-poster']}>
                <div className={styles['poster-left']}>
                  <div className={styles['poster-title']}>
                    3D experiences to show your NFTs
                  </div>
                  <div className={styles['poster-text']}>
                    The easiest way for artists and collectors to show their
                    NFTs in fully immersive experiences, for free.
                  </div>
                  <div>
                    <BorderedBtn onClick={() => history.push('/create/space')}>
                      <span style={{ fontSize: '20px', padding: '4px 16px' }}>
                        Create an Experience
                      </span>
                    </BorderedBtn>
                  </div>
                </div>
                <div style={{ width: '536px' }}>
                  <div
                    onClick={() => handleItemClick(topSpace?.uuid)}
                    className={styles['discover-item']}>
                    <Poster src={topSpace?.head_img} />
                    <ItemInfo>
                      <TitleBox>
                        <UserInfo owner={topSpace?.owner} />
                        <span>{topSpace?.name}</span>
                      </TitleBox>
                    </ItemInfo>
                  </div>
                </div>
              </div>
              <StyledTabbar
                tabBarGutter="56px"
                style={{ height: 'auto', gridColumn: 1 / 3 }}
                defaultActiveKey="1"
                onChange={handleTabChange}>
                <TabPane tab="Featured" key="1"></TabPane>
                <TabPane tab={t('discover.newest')} key="2"></TabPane>
                <TabPane tab={t('discover.today')} key="3"></TabPane>
                <TabPane tab={t('discover.week')} key="4"></TabPane>
                <TabPane tab={t('discover.month')} key="5"></TabPane>
              </StyledTabbar>
              <StatusBar
                onChange={handleSorter}
                count={amount}
                sortable={dataFilter !== 'recommend'}
              />
            </>
          }
          loading={loading}>
          {ItemList}
        </CardList>
        {!hideMain && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              height: '56px',
              width: '100%',
              backgroundColor: `rgba(25, 32, 38, ${scrollTop / 343})`,
              zIndex: 0
            }}></div>
        )}
      </Page>
    </Main>
  );
}

const StatusBar = (props) => {
  const { t } = useTranslation();
  return (
    <Title title={props.count + ' ' + t('statusbar.results')} bb="none">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexShrink: 0
        }}>
        {props.sortable && (
          <Selection
            onChange={(val) => props.onChange(val)}
            default={t('discover.new')}
            selection={[
              t('discover.new'),
              t('discover.visitor'),
              t('discover.name'),
              t('discover.size')
            ]}
            style={{
              width: '140px',
              padding: 0
            }}
          />
        )}
      </div>
    </Title>
  );
};
