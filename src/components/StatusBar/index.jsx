import styles from './StatusBar.module.css';

export default function StatusBar({ title, children }) {
  return (
    <div className={styles.statusbar}>
      <div>{title}</div>
      {children}
    </div>
  );
}
