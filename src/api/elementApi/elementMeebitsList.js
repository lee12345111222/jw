import { req } from '../../utils/request';

import { createListQueryStr, createHeader } from './graphql';

import config from './../../constant/env/element/index';

const { graphql_url, collectionSlug, appKey, appSecret } = config;

export default async function elementMeebitsList(args, slug = 'meebits') {
  const graphQLBodyStr = createListQueryStr(args, collectionSlug[slug]);
  const graphQLHeader = createHeader(appKey, appSecret);

  console.log('graphql_url >>>', graphql_url);
  console.log('config >>>', config);

  return await req(
    graphql_url,
    {
      method: 'POST',
      headers: graphQLHeader,
      data: {
        query: graphQLBodyStr
      }
    }
    // 'element'
  );
}
