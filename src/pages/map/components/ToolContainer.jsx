import styles from './index.module.css';

const ToolContainer = ({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default ToolContainer;
