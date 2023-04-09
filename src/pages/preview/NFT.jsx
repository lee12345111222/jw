import { useEffect, useCallback } from 'react';
import { message } from 'antd';
import styled from 'styled-components';

import { Flex } from '@/components/Basic';

import { Spin } from 'antd';

import Image from '@/components/Image';

import { nftInfo } from '@/api/editor';

import useApi from '@/hooks/useApi';

import { showShortAddress } from 'src/utils/common';

import { ReactComponent as NftCopyIcon } from '@/assets/preview/nft-copy-icon.svg';
import { ReactComponent as NftFormIcon } from '@/assets/preview/nft-form-icon.svg';
import { ReactComponent as NftUserIcon } from '@/assets/preview/nft-user-icon.svg';

export default function NFT({ url, setName }) {
  const { data, run, loading } = useApi(nftInfo, {
    manual: true,
    formatResult: (res) => {
      console.log('NFT >>>', res);
      if (res.code === 200) {
        setName(res.data.name);
      }
      return res?.data;
    }
  });

  useEffect(() => {
    run({ p_url: url });
  }, [run, url]);

  const handleCopy = useCallback((value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => message.info('Copied to clipboard!'));
  }, []);

  return (
    <Container>
      {loading ? (
        <Flex h="272px" ai="center" jc="center">
          <Spin spinning={loading} />
        </Flex>
      ) : (
        <Flex gap="32px" css="overflow: hidden" fd="column">
          <div
            style={{
              width: '272px',
              flexShrink: 0
            }}>
            <Image
              src={data?.resource}
              style={{
                height: loading ? '100%' : 'auto',
                backgroundColor: 'rgba(0,0,0,0)'
              }}
            />
          </div>

          {!!data?.url && (
            <Button onClick={() => window.open(data?.url)}>
              {/element/i.test(data?.url) && <span>view on Element</span>}
              {/element/i.test(data?.url) || <span>view on Opensea</span>}
            </Button>
          )}

          <Line />

          <Flex fd="column" gap="16px">
            <Flex ai="center" gap="8px">
              <NftFormIcon />
              <StyledTitle>Scale</StyledTitle>
            </Flex>
            <StyledPar>{data?.desc || '-'}</StyledPar>
          </Flex>

          <Line />

          <Flex fd="column" gap="16px">
            <Flex ai="center" gap="8px">
              <NftUserIcon />
              <StyledTitle>Owner</StyledTitle>
            </Flex>

            <Flex>
              <StyledPar>
                {showShortAddress(data?.owner)}
                {!!data?.owner && (
                  <NftCopyIcon
                    style={{ marginLeft: 8, cursor: 'pointer' }}
                    onClick={() => handleCopy(data?.owner)}
                  />
                )}
              </StyledPar>
            </Flex>
          </Flex>

          <Line />

          <Flex fd="column" gap="16px">
            <Flex ai="center" gap="8px">
              <NftUserIcon />
              <StyledTitle>Creater</StyledTitle>
            </Flex>
            <StyledPar>
              {showShortAddress(data?.creator)}
              {!!data?.creator && (
                <NftCopyIcon
                  style={{ marginLeft: 8, cursor: 'pointer' }}
                  onClick={() => handleCopy(data?.creator)}
                />
              )}
            </StyledPar>
          </Flex>
        </Flex>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-height: calc(100vh - 206px);
  overflow: scroll;
  position: relative;
`;

const StyledTitle = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
`;

const StyledPar = styled.p`
  color: rgba(255, 255, 255, 0.65);
  overflow: hidden;
  color: #fff;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #4a5057;
  opacity: 0.4;
`;

const Button = styled.button`
  width: 100%;
  outline: 0;
  border: none;
  height: 32px;
  background: #06c4ff;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border-radius: 4px;
  cursor: pointer;
`;
