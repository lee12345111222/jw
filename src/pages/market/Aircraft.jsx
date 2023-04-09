// import { useCallback, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import MarketTemp from './MarketTemp';

import ethIcon from '@/assets/icon/eth-icon-yellow.svg';

// import styles from './blueprint.module.css';
// import classNames from 'classnames/bind';

import { BasicCard } from '@/components/Cards/index';

import { Flex } from '@/components/Basic';

import { InfoBox2 } from '@/components/Cards/index';

// import AircraftImg5 from '@/assets/img/aircraft/aircraft-5.png';

// const cx = classNames.bind(styles);

export default function Aircraft() {
  return <MarketTemp minWidth="240px" ChildCard={ChildCard} slug="jetpack" />;
}

const ChildCard = ({
  node: {
    asset: {
      tokenId,
      imagePreviewUrl,
      name,
      tradeSummary: { bestAsk }
      // properties
    }
  }
}) => {
  return (
    <ChildTemp
      img={imagePreviewUrl}
      name={name}
      tokenId={tokenId}
      price={bestAsk?.bestAskPriceBase}
    />
  );
};

const ChildTemp = ({ name, img, price, tokenId }) => {
  const history = useHistory();
  return (
    <BasicCard
      title={name}
      img={img}
      onClick={() => history.push(`/market/jetpack/detail/${tokenId}`)}
    >
      <Flex ai="center" jc="space-between">
        <InfoBox2>Jetpack</InfoBox2>
        <Flex ai="center" gap="4px">
          {price ? (
            <>
              <img style={{ width: '18px' }} src={ethIcon} alt="" />
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
