import { useState, useEffect, useCallback, useMemo } from 'react';

import { useRequest, useMemoizedFn } from 'ahooks';

import useLoginToken from './useLoginToken';

/**
 * @description useRequest 自定义封装
 *
 * @param {Function} request - 网络请求函数
 * @param {{formatResult: Function, tokenKey: string, manual: boolean, ...res: {}}} settings - 配置参数
 * @param settings.formatResult - 请求结果格式化函数
 * @param settings.tokenKey - 网络请求参数 登录 token 的 key 值，若此参数存在则自动获取 登录 token
 * @param settings.manual - 同 useRequest manual, 默认为 false
 * @param settings.res - 同 useRequest 第二个参数的其他选项
 * @param {[]} req - 当 manual 为 false 时，等到该数组成员都不为空时会开始请求
 * @returns
 */
export const useApi2 = (
  request,
  { formatResult = (v) => v, tokenKey = null, manual = false, ...config },
  req = []
) => {
  // 对 req 参数 memoized
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const required = useMemo(() => req, req);
  const formatter = useMemoizedFn(formatResult);

  const [getToken, reset] = useLoginToken();

  const { run, runAsync, loading, ...res } = useRequest(request, {
    ...config,
    manual: true
  });

  // token 过期时重新获取 token 期间 延长 loading 时间
  const [handling, setHandling] = useState(false);

  // run 和 run async 方法的替代品， 所有请求都实际通过该函数发出
  const handleRunAsync = useCallback(
    async (args = {}) => {
      const params = { ...args };

      //  自动添加 token
      if (tokenKey) {
        const token = await getToken();
        if (!token) {
          return;
        }
        params[tokenKey] = token;
      }
      const data = await runAsync(params);
      const { msg } = data || {};

      // token 过期重新获取
      if (
        msg === 'token expired' ||
        msg === 'wrong token' ||
        msg === 'wrong address'
      ) {
        setHandling(true);
        reset();
        return await handleRunAsync(args);
      }
      setHandling(false);
      return data ? formatter(data) : data;
    },
    [formatter, getToken, reset, runAsync, tokenKey]
  );

  // 处理自动运行的逻辑
  // manual为false时 且
  // 当依赖数组的值都不为空的时候发起请求
  useEffect(() => {
    if (manual) {
      return;
    }

    if (required.findIndex((param) => (param ?? true) === true) !== -1) {
      return;
    }

    handleRunAsync();
  }, [handleRunAsync, manual, required]);

  return {
    ...res,
    run: handleRunAsync,
    loading: loading || handling
  };
};

export default function useApi(
  url,
  { formatResult, onSuccess, manual = false, pollingInterval, ...config } = {}
) {
  const {
    runAsync,
    data: res,
    ...result
  } = useRequest(url, { manual: true, pollingInterval, ...config });
  const [data, setData] = useState();

  useEffect(() => {
    if (!pollingInterval || !data) {
      return;
    }

    const d = formatResult?.(res) || res;
    setData(d);
    onSuccess?.(d);
  }, [data, formatResult, onSuccess, pollingInterval, res]);

  const [getToken, reset] = useLoginToken();

  const run = useMemoizedFn(async (args) => {
    try {
      const res = await runAsync(args);

      const { msg } = res;
      if (
        msg === 'token expired' ||
        msg === 'wrong token' ||
        msg === 'wrong address'
      ) {
        await reset();
        const token = await getToken();
        const params = { ...args, login_token: token };
        return await run(params);
      }
      const data = formatResult?.(res) || res;
      setData(data);
      onSuccess?.(data);
      return data;
    } catch (e) {
      console.log('error >>>', e);
    }
  });

  useEffect(() => {
    if (!manual) {
      run();
    }
  }, [manual, run]);

  return { ...result, run, data };
}
