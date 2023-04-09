import styles from './index.module.css';

export const Social = () => {
  return (
    <div className={styles['social-content']}>
      <div className={styles['social-item']}>
        <div className={styles['social-title']}>Twitter</div>
        <div className={styles['social-type']}>
          https://twitter.com/PlayerOneWorld
        </div>
      </div>
      <div className={styles['social-item']}>
        <div className={styles['social-title']}>discord</div>
        <div className={styles['social-type_unv']}>temporarily unavailable</div>
      </div>
    </div>
  );
};
