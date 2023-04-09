import { useMemo } from 'react';

import ToolContainer from './ToolContainer';

import pendingIcon from '@/assets/icon/pending-order.svg';

import styles from './pending.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Pending({ map, houses, onSelect, account }) {
  const orders = useMemo(
    () =>
      houses
        .filter(
          ({ status, buyer }) =>
            status === 2 &&
            `0x${buyer}`?.toLowerCase() === account?.toLowerCase()
        )
        .map((house) => {
          const { tokenId } = house;
          return (
            <div key={tokenId} onClick={() => onSelect({ ...house })}>
              <img src={pendingIcon} alt="" />
              <span>Pending Order</span>
            </div>
          );
        }),
    [account, houses, onSelect]
  );

  if (!map || !houses) {
    return null;
  }

  return <ToolContainer className={cx('orders')}>{orders}</ToolContainer>;
}
