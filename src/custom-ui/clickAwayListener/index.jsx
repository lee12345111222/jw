import { useRef, useCallback, useEffect } from 'react';

import styles from './index.module.css';

export const ClickAwayListener = ({ children, onClickAway }) => {
  const listenerRef = useRef();

  const handleClickAway = useCallback(
    (e) => {
      if (listenerRef.current && !listenerRef.current.contains(e.target)) {
        onClickAway(true);
      }
    },
    [onClickAway]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [handleClickAway]);
  return (
    <div className={styles.container} ref={listenerRef}>
      {children}
    </div>
  );
};
