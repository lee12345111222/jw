import React from 'react';
import PropTypes from 'prop-types';

import './sterybox.css';

const ShowContentAdr = ({ content, title, contentHover }) => {
  return (
    <>
      <p
        style={{
          fontWeight: '600',
          fontfamily: 'SF Pro Display',
          fontstyle: 'normal',
          //marginTop: '24px',
          fontSize: '14px',
          lineHeight: '16.8px',
          color: '#FFFFFFD9'
        }}>
        Contract address
      </p>
      <p
        className={contentHover ? 'underline' : ''}
        style={{
          fontWeight: '400',
          fontfamily: 'SF Pro Text',
          fontstyle: 'normal',
          fontSize: '14px',
          lineHeight: '16.8px',
          color: '#FFFFFF73',
          cursor: 'pointer'
        }}>
        {content}
      </p>
    </>
  );
};

ShowContentAdr.propTypes = {};

export default ShowContentAdr;
