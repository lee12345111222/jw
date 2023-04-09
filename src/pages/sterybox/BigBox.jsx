import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

//import Vector from './img-h/Vector.png';

const BigBox = ({ title, bigImg, bigImg2, footerTitle, slogo }) => {
  return (
    <div style={{ padding: '36px' }}>
      <p style={{ textAlign: 'center', fontSize: '16px', color: '#FFFFFFD9' }}>
        {title}
        {/* VoxelRole Mystery Box 4 */}
      </p>
      <div className={styles['box-container']}>
        <img src={bigImg} className={styles['box-img']} alt="" />
        <img src={bigImg2} className={styles['box-img2']} alt="" />
      </div>
      <p
        style={{
          fontfamily: 'SF Pro Display',
          fontweight: '600',
          fontSize: '14px',
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '0',
          color: ' rgba(255, 255, 255, 0.85)'
        }}>
        Quantity included:
        <span
          style={{
            //backgroundColor: '#7355BE',
            //padding: '2.4px',
            marginLeft: '16px',
            marginRight: '12px',
            borderRadius: '2px'
          }}>
          {' '}
          <img src={slogo} alt="" />
        </span>
        {footerTitle}
        {/* 1 Blueprint */}
      </p>
    </div>
  );
};

BigBox.propTypes = {};

export default BigBox;
