import { useState, useEffect, useMemo, useCallback } from 'react';
//import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useApi from '@/hooks/useApi';

import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';

import { list as getList, mythumb, getkv, spaceDetail } from '@/api/share';

import { PageMain } from '../create/StyledComponents';
import MainPage from '@/components/MainPage/index';
import styles from './index.module.css';

import classNames from 'classnames/bind';

import CardList from '@/components/CardList/index';

import CardItem from './CardItem';
import { Footer } from '@/pages/createFinial/createV3/components/basic-components/index';
import { UserMsg } from './UserMsg';

import useSetState from '@/hooks/useSetState';

// import Avatar from './assets/avatar.png';
// import Eth from './assets/eth.png';
// import Polygan from './assets/polygan.png';
// import Maket from './assets/maket.png';

import WalletCard from 'src/pages/profileStep/WalletCard/index.jsx';

const cx = classNames.bind(styles);

export default function ProfileStep({ hideMain }) {
  const [{ page, limit, dataFilter, sorter }] = useSetState({
    page: 1,
    limit: 15,
    dataFilter: 'recommend',
    sorter: 'newer',
  });
  const { t } = useTranslation();

  const { account } = useWallet();

  const [topSpace, setTopSpace] = useState({});

  useEffect(() => {
    const getSpace = async () => {
      const { data } = await getkv();
      const uuid = data['share-space-top-uuid'];
      if (!uuid) {
        return;
      }
      const {
        data: { space },
      } = await spaceDetail(uuid);
      setTopSpace(space);
    };

    getSpace();
  }, []);

  //const history = useHistory();

  const [amount, setAmount] = useState(0);

  const [list, setList] = useState([]);

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

    onSuccess: res => {
      if (res.code !== 200) {
        return;
      }
      setAmount(res.data.paging.amount);
      if (page === 1) {
        setList(res.data.space_list);
      } else {
        setList([...list, ...res.data.space_list]);
      }
    },
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
    formatResult: res => (res?.code === 200 ? res.data.list : []),
  });

  useEffect(() => {
    account && getThumbList(account);
  }, [account, getThumbList]);

  const handleItemClick = useCallback(uuid => {
    // window.open(`/preview/${uuid}`);
  }, []);

  const ItemList = useMemo(
    () =>
      list.map(item => {
        return (
          <div key={item.uuid}>
            <CardItem
              onClick={() => handleItemClick(item.uuid)}
              item={item}
              token={getLoginToken}
              thumbList={thumbList || []}
              account={account}
              src={item.height}
            />
          </div>
        );
      }),
    [account, getLoginToken, handleItemClick, list, thumbList]
  );

  // const ImgList = useMemo(
  //   () =>
  //     List.map((item, idx) => {
  //       return (
  //         <div key={idx}>
  //           <CardItem
  //             // onClick={() => handleItemClick(item.uuid)}
  //             hideAccount={true}
  //             src={item}
  //           />
  //         </div>
  //       );
  //     }),
  //   []
  // );
  //const [scrollTop, setScrollTop] = useState(0);

  // const handleScroll = useCallback(
  //   ({ scrollTop }) => setScrollTop(scrollTop),
  //   []
  // );

  // const getNextPage = useCallback(() => {
  //   const hasNextPage = () => amount > limit * page;
  //   !loading &&
  //     hasNextPage() &&
  //     setState(({ page }) => {
  //       return { page: page + 1 };
  //     });
  // }, [amount, limit, loading, page, setState]);

  const Main = useMemo(
    () =>
      hideMain
        ? ({ children }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {children}
            </div>
          )
        : MainPage,
    [hideMain]
  );

  return (
    <Main title={t('profile')}>
      <PageMain fd="column">
        <div style={{ width: '1193px', margin: 'auto' }}>
          <UserMsg />
          <CardList
            minWidth="100%"
            style={{
              padding: '40px 81px 64px',
              height: 'auto',
              borderBottom: 'solid 1px rgba(74, 80, 87, 0.2)',
              gridTemplateColumns: 'auto',
            }}
            headers={<div className={cx('card-list-title')}>My wallet</div>}
            // loading={loading}
          >
            {/* {ImgList} */}
            <WalletCard></WalletCard>
          </CardList>
          <CardList
            // onScroll={handleScroll}
            // onScrollToBottom={getNextPage}
            minWidth="320px"
            style={{
              padding: '40px 81px 43px',
              height: 'auto',
              gridgap: '24px',
            }}
            headers={<div className={cx('card-list-title')}>share</div>}
            loading={loading}
          >
            {ItemList}
          </CardList>
        </div>
        <Footer bgColor="#1A2026" />
      </PageMain>
    </Main>
  );
}
