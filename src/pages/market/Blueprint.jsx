import { useCallback, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import MarketTemp from './MarketTemp';

import {
  Poster,
  ItemInfo,
  TitleBox
  // , UserInfo
} from '../discover/DiscoverItem';

import { InfoBox2 } from '@/components/Cards/index';

import ethIcon from '@/assets/icon/eth-icon.svg';

import styles from './blueprint.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Blueprint() {
  return <MarketTemp minWidth="360px" ChildCard={ChildCard} slug="bluePrint" />;
}

const ChildCard = ({
  node: {
    asset: {
      tokenId,
      imagePreviewUrl,
      name,
      tradeSummary: { bestAsk },
      properties
    }
  }
}) => {
  const history = useHistory();

  const handleOpenDetail = useCallback(() => {
    history.push(`/market/blueprint/detail/${tokenId}`);
  }, [history, tokenId]);

  const style = useMemo(
    () => properties?.find(({ key }) => key === 'style').value || '-',
    [properties]
  );

  return (
    <Child
      img={imagePreviewUrl}
      onOpenDetail={handleOpenDetail}
      name={name}
      style={style}
      price={bestAsk?.bestAskPriceBase}
    />
  );
};

export const Child = ({ img, name, price, style, onOpenDetail = (v) => v }) => (
  <div className={cx('discover-item')} onClick={onOpenDetail}>
    <Poster src={img} />
    <ItemInfo>
      <TitleBox>
        <span>{name}</span>
        {!!price && (
          <div className={cx('price')}>
            <img src={ethIcon} alt="" />
            <span>{price}</span>
          </div>
        )}
      </TitleBox>

      <div className={cx('category')}>
        <span></span>
        <InfoBox2>
          <span style={{ color: '#fff' }}>{style}</span>
        </InfoBox2>
      </div>
    </ItemInfo>
  </div>
);
