import React from 'react';

import Rectangle1 from './asstes/Rectangle1.png';
import Rectangle2 from './asstes/Rectangle2.png';
import Rectangle3 from './asstes/Rectangle3.png';
import Rectangle4 from './asstes/Rectangle4.png';

import './index.css';

let themObj = {
  yellow: Rectangle1,
  orange: Rectangle2,
  blueq: Rectangle3,
  blues: Rectangle4,
};

const WakeButon = ({ type, title, click }) => {
  let img = themObj[type] ? themObj[type] : themObj['blues'];
  return (
    <div
      onClick={click}
      className={type}
      style={{
        backgroundImage: `url(${img})`,
        width: '104px',
        height: '32px',
        fontFamily: 'Proto Sans',
        fontSize: '14px',
        //lineHeight: '16.8px',
        cursor: 'pointer',
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: '32px',
      }}
    >
      {title}
    </div>
  );
};

export default WakeButon;
