import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import MainPage from '@/components/MainPage/index';

import { Footer } from '@/pages/createFinial/createV3/components/basic-components/index';
import { Flex } from '@/components/Basic';
import AirdropTaskBox from '@/pages/airdropDaily/AirdropTaskBox';
import AirdropBox from '@/pages/airdropDaily/AirdropBox';
import AirdropScore from '@/pages/airdropDaily/AirdropScore';

import { useWallet } from 'use-wallet';
// import { useRequest } from 'ahooks';
import { getAccountInfo } from '@/api/user';
import useApi from '@/hooks/useApi';

export default function Airdrop({ token, getToken }) {
  const history = useHistory();

  const [boxList, setBoxList] = useState([]);
  const [scoreObj, setScoreObj] = useState({});
  const { account } = useWallet();

  const { run, loading: infoLoading } = useApi(getAccountInfo, {
    manual: true,
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

  const handleGoBack = useCallback(() => {
    history.goback();
  }, [history]);

  return (
    <MainPage title="Airdrop" goBack={handleGoBack}>
      <Flex ai="center" jc="space-between" fd="column" style={{ flex: 1 }}>
        <MainContent>
          <Flex gap="16px" fd="column">
            <StyleTitle>Welcome to Airdrops Mission</StyleTitle>
            <Subtitle>
              Score unlocks rewards and increases your chances of getting a
              Mystery box on your next airdrop
            </Subtitle>
          </Flex>
          <AirdropScore
            scoreObj={scoreObj}
            refresh={getuserInfo}
            account={account}
            token={token}
          />
          <AirdropBox loading={infoLoading} boxList={boxList} />
          <AirdropTaskBox
            account={account}
            getToken={getToken}
            token={token}
            refresh={getuserInfo}
          />
          <Content>
            The task is being updated constantly, please look forward to it
          </Content>
        </MainContent>
        <Footer />
      </Flex>
    </MainPage>
  );
}

const MainContent = styled.div`
  margin: 48px 160px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const colorfullText = keyframes`
  0% {
    background-position: 100%;
  }

  100% {
    background-position: 0;
  }
`;

const StyleTitle = styled.div`
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  display: flex;
  align-items: center;
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 300% 100%;
  animation: ${colorfullText} 1.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    alternate infinite;
`;

const Subtitle = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.45);
`;

const Content = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 120%;
  color: #232c34;
  text-align: center;
`;
