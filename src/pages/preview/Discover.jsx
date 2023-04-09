import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import { Spin } from 'antd';

import { debounce } from 'lodash-es';

import { Grid } from '@/components/Basic';

import { list as getList } from '@/api/share';
import useApi from '@/hooks/useApi';

import DiscoverItem from '@/pages/discover/DiscoverItem';

export default function Discover() {
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(0);
  const [limit] = useState(15);
  const [list, setList] = useState([]);

  const gridElement = useRef();

  const { loading, run } = useApi(getList, {
    manual: true,
    onSuccess: (res) => {
      if (res.code !== 200) return;
      if (page === 1) {
        setAmount(res.data.paging.amount);
        setList(res.data.space_list);
      } else {
        setList([...list, ...res.data.space_list]);
      }
    }
  });

  useEffect(() => {
    run({ page, limit });
  }, [limit, page, run]);

  const handleItemClick = useCallback((uuid) => {
    window.open(`/preview/${uuid}`, '_self');
  }, []);

  const ItemList = useMemo(
    () =>
      list.map((item) => (
        <div key={item.uuid}>
          <DiscoverItem
            onClick={() => handleItemClick(item.uuid)}
            item={item}
          />
        </div>
      )),
    [handleItemClick, list]
  );

  const scroll = useCallback(() => {
    const scrollTop = gridElement.current.scrollTop;
    const scrollHeight = gridElement.current.scrollHeight;
    const clientHeight = gridElement.current.clientHeight;

    const distance = 5;
    if (
      scrollTop + clientHeight >= scrollHeight - distance &&
      amount / limit > page &&
      !loading
    ) {
      setPage(page + 1);
    }
  }, [limit, page, amount, loading]);

  const handleScroll = debounce(scroll, 200);

  return (
    <>
      <Grid
        ref={gridElement}
        onScroll={handleScroll}
        h="100%"
        gg="24px"
        gc="repeat(auto-fill, minmax(360px, 1fr))"
        style={{ overflowY: 'auto' }}
      >
        {ItemList}
      </Grid>
      <Spin style={{ margin: '16px', display: loading ? 'block' : 'none' }} />
    </>
  );
}
