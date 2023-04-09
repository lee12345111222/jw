import React, { Suspense, useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';

import { Container } from '@/components/Basic';

import Dialog from '@/ui/dialog/index';

import AirdropTaskBox from './AirdropTaskBox';

import AirdropScore from './AirdropScore';

import useApi from '@/hooks/useApi';

import { useWallet } from 'use-wallet';

import { getAccountInfo } from '@/api/user';

import useLoginToken from '@/hooks/useLoginToken';

const AirdropBox = React.lazy(() => import('./AirdropBox'));

export function AirDropDefault({ show, closeCallback, token }) {
  const [boxList, setBoxList] = useState([]);
  const [scoreObj, setScoreObj] = useState({});
  const { account } = useWallet();
  const [getToken] = useLoginToken();

  const { run, loading: infoLoading } = useApi(getAccountInfo, {
    manual: true,
    loadingDelay: 1000,
    onSuccess: (res) => {
      if (res.code === 200) {
        let {
          score,
          score_total,
          reward,
          next_airdrop_at,
          airdrop_reward_num
        } = res.data;
        setBoxList(() => reward);
        setScoreObj(() => ({
          score,
          score_total,
          next_airdrop_at,
          airdrop_reward_num
        }));
      }
    }
  });
  const getuserInfo = useCallback(async () => {
    if (account && token) {
      let params = {
        address: account,
        login_token: token
      };
      run(params);
    }
    return;
  }, [account, run, token]);

  useEffect(() => {
    getuserInfo();
  }, [getuserInfo]);

  return (
    <Dialog
      open={show}
      backdrop={false}
      title={<StyleTitle>AirDrop</StyleTitle>}
      footer={null}
      onCancel={closeCallback}
      style={{ position: 'relative' }}>
      <Container w="940px" h="80vh">
        <AirdropScore
          scoreObj={scoreObj}
          refresh={getuserInfo}
          account={account}
          token={token}
        />
        <Suspense fallback={''}>
          <AirdropBox loading={infoLoading} boxList={boxList} />
        </Suspense>
        <AirdropTaskBox
          account={account}
          getToken={getToken}
          token={token}
          refresh={getuserInfo}
        />
      </Container>
    </Dialog>
  );
}
const StyleTitle = styled.div`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  background: linear-gradient(90deg, #e06a6a 0%, #706ead 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
