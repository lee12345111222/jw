import { useMemo, useState, useCallback } from 'react';

import { Page, PageColumn } from '../create/StyledComponents';

import StatusBar from '@/components/StatusBar';

import Filter from '@/components/Filter';

import { useTranslation } from 'react-i18next';

import NftList from '@/components/CardList/NftList';

export default function MarketTemp(props) {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState();
  const [price, setPrice] = useState();
  const [sort, setSort] = useState();
  const { t } = useTranslation();

  const statusList = useMemo(
    () => [
      { name: t('statusbar.newly_launch'), vlaue: 'RecentlyListed' },
      { name: t('statusbar.earliest_launch'), vlaue: 'Oldest' },
      { name: t('statusbar.price_low2high'), vlaue: 'PriceLowToHigh' },
      { name: t('statusbar.price_high2low'), vlaue: 'PriceHighToLow' }
    ],
    [t]
  );

  const handleSortChange = useCallback(
    (val) => {
      setSort(statusList.find(({ name }) => name === val).vlaue);
    },
    [statusList]
  );

  return (
    <Page
      style={{
        height: '100%'
      }}
    >
      <Filter onChange={setToggle} onSelect={setPrice} />

      <PageColumn
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <StatusBar
          onChange={handleSortChange}
          count={count}
          default={statusList[0].name}
          selection={statusList.map((s) => s.name)}
        />

        <NftList
          sort={sort}
          toggle={toggle}
          price={price}
          onSuccess={({ totalCount }) => {
            setCount(totalCount);
          }}
          {...props}
        />
      </PageColumn>
    </Page>
  );
}
