import { useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';

import RoleEditor from './RoleEditor';

import WalletOrGuest from '../preview/WalletOrGuest';

export default function Index() {
  //   return <Container />;

  const { status, account } = useWallet();
  const [readyStatus, setReadyStatus] = useState(false);

  useEffect(() => {
    setReadyStatus((readyStatus) => {
      if (!readyStatus && status !== 'disconnected') {
        return status;
      }

      if (!readyStatus) {
        return readyStatus;
      }

      return status;
    });
  }, [status]);

  return (
    <>
      {readyStatus !== 'connecting' && !account && (
        <WalletOrGuest guest={false} />
      )}
      {readyStatus !== 'connecting' && !!account && <RoleEditor />}
    </>
  );
}

// const UnstyledLink = ({ children, href, onClick, push, replace }) => {
//   const handleClick = useCallback(
//     (e) => {
//       e.preventDefault();

//       const event = {
//         ...e,
//         defaultPrevented: false,
//         isDefaultPrevented() {
//           return this.defaultPrevented;
//         },
//         preventDefault() {
//           this.defaultPrevented = true;
//         }
//       };

//       onClick(e);

//       if (event.isDefaultPrevented()) {
//         return;
//       }

//       const url = e.target.getAttribute('href');
//       push(url);
//     },
//     [onClick, push]
//   );

//   return (
//     <a onClick={handleClick} href={href}>
//       {children}
//     </a>
//   );
// };
