import { useCallback, useState } from 'react';

import imageLoading from '@/assets/icon/imageLoading.png';

export default function Image({ src, style }) {
  const [display, setDisplay] = useState('none');

  const show = useCallback(() => {
    setDisplay('block');
  }, []);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: style?.backgroundColor || '#2a2d32',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        onLoad={show}
        style={{ width: '100%', height: '100%', ...style, display: display }}
        src={src}
        alt=""
      />
      <img
        style={{
          display: display === 'none' ? 'block' : 'none',
          width: '60%'
        }}
        src={imageLoading}
        alt=""
      />
    </div>
  );
}
