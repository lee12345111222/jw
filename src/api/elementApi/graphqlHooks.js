import { useState, useCallback } from 'react';

import {
  graphql_url,
  collectionSlug,
  appKey,
  appSecret
} from '@/constant/env/index';

import {
  createListQueryStr,
  createDetailQueryStr,
  createHistoryQueryStr,
  createHeader
} from './graphql';

import { req } from '../../utils/request';

import useApi from '@/hooks/useApi';

import elementMeebitsList from './elementMeebitsList';

export const useElementGoodList = (slug, { onSuccess } = {}) => {
  const [lastRequestParams, setLastRequestParams] = useState({});

  const [data, setData] = useState(undefined);

  const {
    data: { hasNextPage, endCursor, ...res } = {},
    loading,
    run: get
  } = useApi((args) => elementGoodList(args, slug), {
    manual: true,
    formatResult: (res) => {
      const search = res?.data?.search || {};
      const pageInfo = search?.pageInfo || {
        hasNextPage: false,
        endCursor: null
      };
      return Object.assign(search, pageInfo);
    },
    onSuccess
  });

  const run = useCallback(
    async (args) => {
      setData(undefined);
      setLastRequestParams(args);
      const data = await get(args);
      setData(data);
    },
    [get]
  );

  const getNextPage = useCallback(async () => {
    if (!hasNextPage || !endCursor || loading) {
      return;
    }

    const res = await get({ ...lastRequestParams, cursor: endCursor });
    res.edges = [...data?.edges, ...res?.edges];
    setData(res);
  }, [data?.edges, endCursor, get, hasNextPage, lastRequestParams, loading]);

  const result = { ...res, data, run, loading, hasNextPage, getNextPage };
  return result;
};

export const useElementGoodDetail = (type, id, opts = {}) => {
  const res = useApi(() => elementGoodDetail(type, id), {
    formatResult: (res) => res.data.asset,
    ...opts
  });

  return res;
};

export const useElementGoodHistory = (type, id, opts = {}) => {
  const res = useApi(() => ElementGoodHistory(type, id), {
    formatResult: (res) => res.data.assetEvents.edges,
    ...opts
  });

  return res;
};

const elementGoodList = async (args, slug) => {
  if (slug === 'meebits') {
    return await elementMeebitsList(args);
  }

  const graphQLBodyStr = createListQueryStr(args, collectionSlug[slug]);
  const graphQLHeader = createHeader(appKey, appSecret);

  return await req(
    graphql_url,
    {
      method: 'POST',
      headers: graphQLHeader,
      data: {
        query: graphQLBodyStr
      }
    },
    'element'
  );
};

const elementGoodDetail = async (type, id) => {
  const graphQLBodyStr = createDetailQueryStr(type, id);
  const graphQLHeader = createHeader(appKey, appSecret);

  return await req(
    graphql_url,
    {
      method: 'POST',
      headers: graphQLHeader,
      data: {
        query: graphQLBodyStr
      }
    },
    'element'
  );
};

const ElementGoodHistory = async (type, id) => {
  const graphQLBodyStr = createHistoryQueryStr(type, id);
  const graphQLHeader = createHeader(appKey, appSecret);

  return await req(
    graphql_url,
    {
      method: 'POST',
      headers: graphQLHeader,
      data: {
        query: graphQLBodyStr
      }
    },
    'element'
  );
};
