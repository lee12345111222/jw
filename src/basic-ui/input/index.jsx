import { forwardRef } from 'react';

// import styles from './index.module.css';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
