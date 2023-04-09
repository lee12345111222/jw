import classNames from 'classnames/bind';
import styles from './index.module.css';

const cx = classNames.bind(styles);

/**
 * @param {*} props
 * text=> 按钮文案
 * @returns
 */
export default function DownBtn({ text, src, name }) {
  return (
    <a download={name} href={src} className={cx('down-btn')}>
      .{text}
    </a>
  );
}
