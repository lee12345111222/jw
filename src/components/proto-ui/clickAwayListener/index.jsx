import { useRef, useCallback, useEffect } from 'react';

import styles from './index.module.css';

export default function ClickAwayListener({ children, onClickAway }) {
  const element = useRef();

  const handleClickAway = useCallback(
    (e) => {
      if (element.current && !element.current.contains(e.target)) {
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
    <div className={styles.container} ref={element}>
      {children}
    </div>
  );
}
