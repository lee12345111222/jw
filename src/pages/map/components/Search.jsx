import { useState, useMemo, useRef } from 'react';

import { useDebounce, useInfiniteScroll } from 'ahooks';

import styles from './index.module.css';

import ToolContainer from './ToolContainer';

import { useTranslation } from 'react-i18next';

import searchIcon from './../images/search_icon.png';
import { useCallback } from 'react';

const Search = ({ buildings = [], onSelect }) => {
  const { t } = useTranslation();

  const listEl = useRef();

  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, { wait: 500 });

  const filteredBuildings = useMemo(
    () =>
      debouncedSearchText
        ? buildings.filter(
            ({ name }) =>
              (name || '')
                .toLowerCase()
                .indexOf(debouncedSearchText.toLowerCase()) !== -1
          )
        : [],
    [buildings, debouncedSearchText]
  );

  const getLoadMoreList = useCallback(
    (nextId, limit) => {
      let start = 0;
      if (nextId) {
        start = filteredBuildings.findIndex((i) => i === nextId);
      }
      const end = start + limit;
      const list = filteredBuildings.slice(start, end);
      const nId =
        filteredBuildings.length >= end ? filteredBuildings[end] : undefined;
      return {
        list,
        nextId: nId
      };
    },
    [filteredBuildings]
  );

  const { data: listData } = useInfiniteScroll(
    (d) => getLoadMoreList(d?.nextId, 4),
    {
      reloadDeps: [filteredBuildings.length],
      target: listEl,
      isNoMore: (d) => d?.nextId === undefined
    }
  );

  const list = useMemo(
    () =>
      !listData ||
      listData.list.map((b) => (
        <li onClick={() => onSelect(b)} key={b.name}>
          {b.name}
        </li>
      )),
    [listData, onSelect]
  );

  return (
    <>
      <ToolContainer className={styles.search}>
        <input
          onChange={({ target }) => setSearchText(target.value)}
          onBlur={() => setSearchText('')}
          value={searchText}
          placeholder={t('map.input_place')}
          type="text"
        />
        <div>
          <img src={searchIcon} alt="" />
        </div>
      </ToolContainer>

      <ToolContainer
        className={`${styles['filtered-search']} ${
          filteredBuildings.length ? styles.visible : ''
        }`}
      >
        <ul ref={listEl}>{list}</ul>
      </ToolContainer>
    </>
  );
};

export default Search;
