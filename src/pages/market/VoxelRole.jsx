import { useMemo, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import MarketTemp from './MarketTemp';

import { VideoCard } from '@/components/Cards/index';

import { video_server } from '@/constant/env/index';

import { Flex } from '@/components/Basic';

import BNBIcon from '@/assets/icon/usdt-icon.png';
import humanIcon from '@/assets/icon/human.png';

import { InfoBox1 } from '@/components/Cards/index';

export default function VoxelRole() {
  const [currentId, setCurrentId] = useState();

  const handlePlay = useCallback(
    (val) => {
      val === currentId ? setCurrentId(undefined) : setCurrentId(val);
    },
    [currentId]
  );

  return (
    <MarketTemp
      onPlay={handlePlay}
      currentId={currentId}
      minWidth="200px"
      ChildCard={ChildCard}
      slug="role"
    />
  );
}

const ChildCard = ({
  node: {
    asset: { name, tokenId, tradeSummary, properties }
  },
  currentId,
  onPlay
}) => {
  const history = useHistory();

  const price = useMemo(
    () => tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2),
    [tradeSummary]
  );

  return (
    <VideoCard
      title={name}
      tokenId={tokenId}
      currentId={currentId}
      onPlay={onPlay}
      onClick={() => history.push(`/market/voxelrole/detail/${tokenId}`)}
      poster={`${video_server}/images/${tokenId}.png`}
      video={`${video_server}/videos/${tokenId}.mp4`}
    >
      <Flex ai="center" jc="space-between">
        <InfoBox1>
          <img src={humanIcon} alt="" />
          {properties?.find(({ key }) => key === 'body').value || '-'}
        </InfoBox1>
        {price ? (
          <Flex ai="center" gap="4px">
            <img
              src={BNBIcon}
              style={{
                width: '18px'
              }}
              width="9"
              alt=""
            />
            <span>{price}</span>
          </Flex>
        ) : (
          <span>Not on sale</span>
        )}
      </Flex>
    </VideoCard>
  );
};
