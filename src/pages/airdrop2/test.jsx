import React, { useEffect, useState } from 'react';
export default function Test() {
  //   const [url, setUrl] = useState('');

  //   useEffect(() => {
  //     // window.addEventListener('message', ({ data }) => {
  //     //   if (data?.type === 'airdrop') {
  //     //     setUrl(data.url);
  //     //   }
  //     // });

  useEffect(() => {
    // 判断是否授权，如果授权设置twitterBindStatus 为true
    localStorage.setItem('twitterBindStatus', true);

    // console.log(window.opener);
    // window.opener.postMessage({ info: '12321321' }, '*');
    // console.log('finish');
  }, []);

  //   window.addEventListener('message', (event) => {
  //     if (event.data.info) console.log(event.data);
  //   });
  return (
    <div>
      <div>21123213211</div>
    </div>
  );
}
