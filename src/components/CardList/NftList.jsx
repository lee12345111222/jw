import { useEffect, useMemo, useState } from 'react';

import CardList from '@/components/CardList/index';

import { useElementGoodList } from '@/api/elementApi/graphqlHooks';

// import { partContractToEditor } from '@/utils/tokenIdAdapter';
// import listData from '@/assets/role-editor/mapData.json';

// import {
// editorToPartContract
// roldIdSyntByPartId
// } from '@/utils/tokenIdAdapter';

import parts from '@/pages/mysteryBox/partsList.json';

const partTitles = {
  0: 'Body',
  1: 'Hair',
  2: 'Beard',
  3: 'Glasses',
  4: 'Shirt',
  5: 'Necklace',
  6: 'Shoes',
  7: 'Pants',
  8: 'Hat',
  9: 'Earrings',
  10: 'Coat'
};

const myPartList = Object.values(parts).flat();

const filterList = { 1: 'BUY_NOW', 2: 'ON_AUCTION', 3: 'IS_NEW' };

export default function NftList({
  slug,
  price,
  sort,
  toggle,
  owner,
  ChildCard,
  onSuccess,
  minWidth,
  partList,
  ...props
}) {
  const { data, run, loading, getNextPage, ...res } = useElementGoodList(slug, {
    onSuccess: partList ? () => {} : onSuccess
  });

  const { edges } = useMemo(() => data || res || {}, [data, res]);

  const [loadingTemp, setLoadingTemp] = useState(false);

  const toggles = useMemo(
    () =>
      toggle
        ? toggle
            .split(',')
            .map((i) => filterList[i])
            .toString()
        : null,
    [toggle]
  );

  useEffect(() => {
    if (owner) {
      setLoadingTemp(false);
    }
    if (owner === false) {
      setLoadingTemp(true);

      const timer = setTimeout(() => {
        if (owner === false) {
          setLoadingTemp(false);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [owner]);

  useEffect(() => {
    if (owner === false || partList) {
      return;
    }
    run({ toggles, price, sort, owner });
  }, [owner, partList, price, run, sort, toggles]);

  const PartsList = useMemo(() => {
    if (partList) {
      const filledPartsList = partList.reduce(
        (previous, current) => [
          ...previous,
          ...new Array(current.amount).fill({
            amount: 1,
            token_id: current.token_id
          })
        ],
        []
      );

      onSuccess({
        data: {
          search: { totalCount: filledPartsList.length }
        }
      });
      return filledPartsList.map(({ token_id }, index) => {
        // const [type, id] = partContractToEditor(token_id);

        // const [type, id] = partContractToEditor(1615);

        const part = myPartList.find(
          ({ token_id: tokenId }) => +tokenId === +token_id
        );

        const { name, client_part_id } = part;

        // const name = listData[type].list[id];
        const myType = partTitles[client_part_id];
        const node = {
          asset: {
            name: name,
            properties: [{ value: myType }],
            tokenId: token_id
          }
        };

        return <ChildCard node={node} key={token_id + index} />;
      });
    }
    return edges?.map((child) => (
      <ChildCard {...props} key={child.cursor} {...child} />
    ));
  }, [edges, onSuccess, partList, props]);

  return (
    <CardList
      minWidth={minWidth}
      onScrollToBottom={getNextPage}
      loading={loading || loadingTemp}>
      {PartsList}
    </CardList>
  );
}

export const NftList2 = function ({
  owner,
  ChildCard,
  ChildCard2,
  minWidth,
  partList,
  partList2,
  loading,
  ...props
}) {
  const [loadingTemp, setLoadingTemp] = useState(false);

  useEffect(() => {
    if (owner) {
      setLoadingTemp(false);
    }
    if (owner === false) {
      setLoadingTemp(true);

      const timer = setTimeout(() => {
        if (owner === false) {
          setLoadingTemp(false);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [owner]);

  const PartsList = useMemo(
    () =>
      partList?.map((part) => {
        const { token_id } = part;
        return <ChildCard part={part} key={token_id} {...props} />;
      }),
    [partList, props]
  );

  const PartsList2 = useMemo(
    () =>
      partList2?.map((part) => {
        const { token_id } = part;
        return <ChildCard2 part={part} key={token_id} {...props} />;
      }),
    [partList2, props]
  );

  return (
    <CardList minWidth={minWidth} loading={loadingTemp || loading}>
      {PartsList.flat()}
      {PartsList2}
    </CardList>
  );
};
