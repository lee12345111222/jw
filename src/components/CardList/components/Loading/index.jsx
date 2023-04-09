import { forwardRef } from 'react';

import styles from './Loading.module.css';

/**
 *
 * @param {Object} props
 * @param {boolean} props.loading
 * @param {Object} ref
 * @returns {JSX.Element}
 */
export default forwardRef(({ loading }, ref) => (
  <div ref={ref} className={styles.container}>
    {loading ? (
      <div className={styles.box}>
        <Dot />
        <Dot
          style={{
            animationDelay: '.25s'
          }}
        />
        <Dot
          style={{
            animationDelay: '.5s'
          }}
        />
        <Dot
          style={{
            animationDelay: '.75s'
          }}
        />
      </div>
    ) : (
      ''
    )}
  </div>
));

const Dot = ({ className, ...props }) => (
  <div className={`${className} ${styles.dot}`} {...props}></div>
);
