import React, { useState } from 'react';

import styled from 'styled-components';

import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';
import useSwitchNetwork from '@/hooks/useSwitchNetwork';
import { detectMetaMask } from '@/utils/common';
import { supported_chains } from '@/constant/env/index';

import MainPage from '@/components/MainPage/index';

import walletIcon from '@/assets/img/wallet-icon.png';
import guestIcon from '@/assets/img/guest-icon.png';

import backgroundImage from '@/assets/img/walletOrGuest-bg.png';

import load from '@/utils/load';

import MyUnity from './Unity';

const { logo } = load('img/index');

export default function WalletOrGuest({ guest = true }) {
  const [isEnter, toggleEnter] = useState(false);
  const [isGuest, toggleGuest] = useState(false);
  const [user_token, setToken] = useState();

  const { connect, status } = useWallet();
  const [getToken] = useLoginToken();

  const switchNetwork = useSwitchNetwork();

  window.updateplayerpositions = (val) => {
    if (window.updateplayerposition) {
      window.updateplayerposition(val);
    }
  };

  return isEnter ? (
    <>{guest && <MyUnity user_token={user_token} guest={isGuest} />}</>
  ) : (
    <MainPage>
      <Page
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Layer
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            height: '100vh',
            boxSizing: 'border-box'
          }}
        >
          <img id="logo-img" style={{ height: '90px' }} src={logo} alt="" />
          <h1
            style={{
              fontSize: '26px',
              margin: '2vh 0',
              fontFamily: 'Roboto',
              opacity: 0.85,
              marginBottom: '3vh'
            }}
          >
            {/* Sign in or Play as guest */}
            Connect your wallet
          </h1>
          <Container>
            <Card
              onClick={async () => {
                if (status !== 'connected') {
                  const currentProvider = detectMetaMask();

                  try {
                    if (
                      typeof currentProvider === 'undefined' ||
                      +currentProvider.chainId !== supported_chains.ethereum
                    ) {
                      await switchNetwork(supported_chains.ethereum);
                    }

                    connect('injected');
                  } catch (err) {
                    console.error(err);
                  }
                }

                const token = await getToken(); // 应该做错误处理
                setToken(token);
                toggleGuest(false);
                toggleEnter(true);
              }}
            >
              <Title>Connect to metamask</Title>
              <Image src={walletIcon}></Image>
              <Content>Connect your account to fully enjoy PlayerOne!</Content>
            </Card>
            {guest && (
              <Card
                onClick={() => {
                  setToken('guest');
                  toggleGuest(true);
                  toggleEnter(true);
                }}
              >
                <Title>Play as guest</Title>
                <Image src={guestIcon}></Image>
                <Content>
                  Your information will be locally stored and your experience
                  limited.
                </Content>
              </Card>
            )}
          </Container>
        </Layer>
      </Page>
    </MainPage>
  );
}

const Page = styled.div`
  width: 100%;
  height: 100%;
  min-width: 750px;
  overflow-y: hidden;
  position: relative;
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0 76px;
`;

const Card = styled.div`
  width: 286px;
  height: 378px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #6442ab;
  border: 2px solid #100625;
  box-shadow: 4px 4px 0px #2b1b4e;
  border-radius: 12px;
  transition: all 0.16s ease-out;
  :hover {
    box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 32%), -2px 6px 12px 0 rgb(0 0 0 / 32%);
    transform: translateY(-4px);
  }
  :active {
    border: 2px solid #06c4ff;
  }
  cursor: pointer;
`;

const Title = styled.div`
  width: 197px;
  height: 23px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
  text-align: center;
`;

const Image = styled.img`
  margin-top: 49px;
  margin-bottom: 55px;
  width: 140px;
  height: 140px;
`;

const Content = styled.div`
  width: 219px;
  height: 32px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;
