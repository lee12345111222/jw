// import { useCallback, useState } from 'react';

import styles from './MainPage.module.css';
import classNames from 'classnames/bind';

import SideBar from '@/components/Sidebar/index';
import Header from '@/components/header/index';

// import CloseIcon from '@/icons/close';

const cx = classNames.bind(styles);

export default function MainPage({
  children,
  alpha,
  title,
  goBack,
  onGoBack,
  className
}) {
  // const [hidden, setHidden] = useState();

  // const handleHide = useCallback(() => {
  //   setHidden(true);
  // }, []);

  // const handleScroll = useCallback(() => {
  //   setHidden(true);
  //   window.location.href = '/#pass';
  // }, []);

  return (
    <>
      {/* <Alert
        onHide={handleHide}
        hidden={hidden}
        message={
          <>
            <span>Mint Pass sales are about to start.</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              onClick={handleScroll}
              style={{ color: '#6B76F7', cursor: 'pointer' }}
            >
              Click to start &gt;&gt;
            </span>
          </>
        }
        closable
      /> */}
      <div
        className={cx(
          'container'
          // { 'container-hidden': !hidden }
        )}>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.page}>
          <div className={styles.header}>
            <Header
              alpha={alpha}
              title={title}
              goBack={goBack}
              onGoBack={onGoBack}
            />
          </div>
          <main className={cx('main', className)}>{children}</main>
        </div>
      </div>
    </>
  );
}

// const Alert = ({ message, closable, onHide, hidden }) => {
//   // const [isHidden, setIshidden] = useState();

//   return (
//     <div className={cx('alert', { 'hidden-alert': hidden })}>
//       <div style={{ width: '24px' }}></div>
//       <div>{message}</div>
//       {closable && (
//         <div
//           onClick={() => {
//             onHide();
//             // setIshidden(true);
//           }}
//           className={cx('close-icon')}
//         >
//           <CloseIcon />
//         </div>
//       )}
//     </div>
//   );
// };
