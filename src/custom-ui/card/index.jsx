import classes from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

export const Card = ({ hoverable = true, onClick, className, ...props }) => {
  return (
    <div>
      <div
        onClick={onClick}
        className={cx(className, 'card', { hoverable, pointer: onClick })}
        {...props}
      />
    </div>
  );
};
