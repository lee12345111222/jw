import styles from './index.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Button({
  children,
  outline,
  onClick = (v) => v,
  width,
  height,
  borderWidth = '1px',
  borderWeight = '2px',
  disabled = false
}) {
  return (
    <div
      onClick={() => (disabled ? '' : onClick())}
      style={{ height, width }}
      className={cx('container', { disable: disabled })}
    >
      <div className={cx('border')}>
        <Corner borderWeight={borderWeight} />
        <Border1
          borderWidth={borderWidth}
          borderWeight={borderWeight}
          className="border-top"
          outline={outline}
        />
        <Corner borderWeight={borderWeight} />
      </div>
      <div className={cx('border', 'grow', 'height')}>
        <Border2
          borderWidth={borderWidth}
          borderWeight={borderWeight}
          className="border-left"
          outline={outline}
        />
        <div className={cx('grow', 'button', { outline })}>{children}</div>
        <Border2
          borderWidth={borderWidth}
          borderWeight={borderWeight}
          className="border-right"
          outline={outline}
        />
      </div>
      <div className={cx('border')}>
        <Corner borderWeight={borderWeight} />
        <Border1
          borderWidth={borderWidth}
          borderWeight={borderWeight}
          className="border-bottom"
          outline={outline}
        />
        <Corner borderWeight={borderWeight} />
      </div>
    </div>
  );
}

const Corner = ({ borderWeight }) => {
  return <div style={{ width: borderWeight }} className={cx('corner')}></div>;
};

const Border1 = ({ borderWidth, borderWeight, className, outline }) => {
  return (
    <div
      style={{ borderWidth, height: borderWeight }}
      className={cx('grow', className, 'borders', { outline })}
    ></div>
  );
};

const Border2 = ({ borderWidth, borderWeight, className, outline }) => {
  return (
    <div
      style={{
        borderWidth,
        width: `calc(${borderWidth} + ${borderWeight})`
      }}
      className={cx(className, 'borders', { outline })}
    ></div>
  );
};
