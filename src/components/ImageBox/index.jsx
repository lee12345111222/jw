import { useState } from 'react';

import styles from './ImageBox.module.css';

import imageLoading from './assets/imageLoading.png';

export default function ImageBox({ src, aspectRatio = '1', lightSrc }) {
  const [onLoaded, setOnLoaded] = useState();
  return (
    <div
      className={styles['image-box']}
      style={{
        backgroundImage: `url(${imageLoading})`,
        aspectRatio: aspectRatio
      }}>
      <img
        onLoad={() => setOnLoaded(true)}
        className={`${styles.poster} ${onLoaded ? styles.onload : ''}`}
        src={src}
        alt=""
      />
      {lightSrc && (
        <img
          src={lightSrc}
          alt=""
          className={`${styles.poster} ${styles.light}`}
        />
      )}
    </div>
  );
}
