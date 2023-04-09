import { useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import MarketTemp from './MarketTemp';

import { BasicCard } from '@/components/Cards/index';

import { Flex } from '@/components/Basic';

import BNBIcon from '@/assets/icon/usdt-icon.png';

import { InfoBox2 } from '@/components/Cards/index';

export default function VoxelPart() {
  return <MarketTemp ChildCard={ChildCard} slug="roleParts" />;
}

const ChildCard = ({
  node: {
    asset: { name = '-', properties = [], tokenId = '', tradeSummary = {} } = {}
  } = {}
} = {}) => {
  const history = useHistory();

  const price = useMemo(
    () => tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2),
    [tradeSummary]
  );

  return (
    <BasicCard
      title={name}
      img={`/voxel-parts/${tokenId}.png`}
      onClick={() => history.push(`/market/voxelpart/detail/${tokenId}`)}
    >
      <Flex ai="center" jc="space-between">
        <InfoBox2>{properties?.[0]?.value || '-'}</InfoBox2>
        <Flex ai="center" gap="4px">
          {price ? (
            <>
              <img style={{ width: '18px' }} src={BNBIcon} alt="" />
              <span>{price}</span>
            </>
          ) : (
            <span>Not on sale</span>
          )}
        </Flex>
      </Flex>
    </BasicCard>
  );
};
