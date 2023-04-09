import { useHistory } from 'react-router-dom';

import MarketTemp from './MarketTemp';

import { BasicCard } from '@/components/Cards/index';

import { Flex } from '@/components/Basic';

// import BNBIcon from '@/assets/icon/usdt-icon.png';

import { InfoBox1, InfoBox2 } from '@/components/Cards/index';

import union from '@/assets/icon/union.png';
import area from '@/assets/icon/area_name.png';
import location from '@/assets/icon/location.png';

export default function Land() {
  return <MarketTemp ChildCard={ChildCard} slug="parcel" />;
}

const ChildCard = ({
  node: {
    asset: {
      name = '-',
      stats = [],
      imagePreviewUrl = '',
      properties = [],
      tokenId = '',
      tradeSummary = {}
    } = {}
  } = {}
} = {}) => {
  const history = useHistory();

  // const price = useMemo(
  //   () => tradeSummary?.bestAsk?.bestAskPriceUSD?.toFixed(2),
  //   [tradeSummary]
  // );

  return (
    <BasicCard
      title={name}
      onClick={() => history.push(`/market/parcel/detail/${tokenId}`)}
      img={imagePreviewUrl}
    >
      <Flex ai="center" jc="space-between">
        <Flex ai="center" gap="8px">
          <img height="16" style={{}} src={union} alt="" />
          <span style={{ fontSize: '16px' }}>
            {stats ? `${stats?.[1]?.value} × ${stats?.[2]?.value}` : '-'}
          </span>
        </Flex>

        {/* {price ? (
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
        )} */}
      </Flex>

      <Flex gap="16px">
        <InfoBox1>
          <img src={location} alt="" />
          {name.split(' ')[1]}
        </InfoBox1>
        <InfoBox2>
          <img src={area} alt="" />
          <span style={{ whiteSpace: 'nowrap' }}>
            {properties?.[0]?.value || '-'}
          </span>
        </InfoBox2>
      </Flex>
    </BasicCard>
  );
};
