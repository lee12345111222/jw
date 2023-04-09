import { useState } from 'react';

import classes from './index.module.css';
import classNames from 'classnames/bind';

import imageLoading from './assets/imageLoading.png';

const cx = classNames.bind(classes);

export const Image = ({ src, ar = '1', fit = 'cover' }) => {
  const [onload, setOnload] = useState(false);
  return (
    <div
      className={cx('image-container')}
      style={{
        backgroundImage: `url(${imageLoading})`,
        aspectRatio: ar
      }}
    >
      <img
        onLoad={() => setOnload(true)}
        className={cx('poster', { onload })}
        style={{ objectFit: fit }}
        src={src}
        alt=""
      />
    </div>
  );
};
