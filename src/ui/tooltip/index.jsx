import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @returns
 */
export default function Tooltip({ children, title, top }) {
  return (
    <div className={cx('container', { top })}>
      {children}
      <div className={cx('tooltip')}>
        <div>{title}</div>
      </div>
    </div>
  );
}
