import React from 'react';
import PropTypes from 'prop-types';

const SmallBoxItem = ({ smallImg, count }) => {
  return (
    <span
      style={{
        lineHeight: '60px',
        color: 'rgba(255, 255, 255,0.45)',
        fontWeight: 500
        //opacity: 0.65
      }}>
      <img src={smallImg} alt="" /> {count}
    </span>
  );
};

SmallBoxItem.propTypes = {};

export default SmallBoxItem;
