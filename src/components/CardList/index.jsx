import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

import { debounce } from 'lodash-es';

import Empty from './components/Empty/index';
import Loading from './components/Loading/index';

import styles from './CardList.module.css';

/**
 *
 * @param {object} props
 * @param {Array} props.children
 * @param {boolean} props.loading
 * @param {string} props.minWidth
 * @param {string} props.gridGap - style.gridGap
 * @param {Function} props.onScrollToBottom
 * @returns {JSX.Element}
 */
export default function CardList({
  children,
  loading,
  minWidth,
  gridGap,
  onScrollToBottom = () => {},
  emptyMsg,
  headers,
  onScroll = () => {},
  style,
  listStyle
}) {
  const containerElement = useRef();
  const [canEmpty, setCanEmpty] = useState(false);

  useEffect(() => {
    if (canEmpty) {
      return;
    }

    if (loading) {
      setCanEmpty(true);
    }
  }, [canEmpty, loading]);

  const isEmpty = useMemo(
    () => canEmpty && !loading && !children?.length,
    [canEmpty, children?.length, loading]
  );

  const callOnScrollToBottom = useCallback(
    (el) => {
      const { clientHeight, scrollTop, scrollHeight } = el || {};
      if (!loading && scrollTop + clientHeight + 1 >= scrollHeight) {
        onScrollToBottom();
      }
    },
    [loading, onScrollToBottom]
  );

  const handleScroll = useMemo(
    () => debounce((el) => callOnScrollToBottom(el), 50),
    [callOnScrollToBottom]
  );

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return (
    <div
      onScroll={({ target }) => {
        onScroll(target);
        handleScroll(target);
      }}
      ref={containerElement}
      className={styles.container}
      style={style}>
      <div>{headers}</div>
      <div
        className={styles.list}
        style={{
          ...listStyle,
          gridGap: gridGap || '24px',
          gridTemplateColumns: `repeat(auto-fill, minmax(${
            minWidth || '220px'
          }, 1fr))`
        }}>
        {children}
      </div>
      <Empty emptyMsg={emptyMsg} show={isEmpty} />
      {loading ? <Loading loading={loading} /> : ''}
    </div>
  );
}
