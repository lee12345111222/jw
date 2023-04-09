import styles from './Empty.module.css';
import coming from './images/coming.png';

/**
 *
 * @export
 * @param {Object} props
 * @param {string} props.emptyMsg
 * @param {boolean} props.show
 * @returns {JSX.Element} Empty
 */
export default function Empty({ emptyMsg, show }) {
  if (!show) return '';
  return (
    <div className={styles.container}>
      <img style={{ width: '290px' }} src={coming} alt="" />
      <p className={styles.info}>{emptyMsg || 'no content'}</p>
    </div>
  );
}
