import React from 'react';
import PropTypes from 'prop-types';

import a from './img/a.png';
import b from './img/b.png';
import c from './img/c.png';

import a1 from './img/a1.png';
import b1 from './img/b1.png';
import c1 from './img/c1.png';
import './index.css';

import Card from '../components/index';
const WalletCard = () => {
  const createData = [
    {
      title: 'Ethereum',
      number: 3.12344,
      type: 'ETH',
      bottomNumber: '3.75 USD',
      leftImg: a1,
      rightImg: a,
      theme: 'blue'
    },
    {
      title: 'Polygon',
      number: 3.0217,
      type: 'POLYGON',
      bottomNumber: '3.75 USD',
      leftImg: b1,
      rightImg: b,
      theme: 'purple'
    },
    {
      title: 'MG Token',
      number: 3.0217,
      type: 'MG',
      bottomNumber: '',
      leftImg: c1,
      rightImg: c,
      theme: 'pink'
    }
  ];

  return (
    <div className="mydiv">
      <div className="cardContainer">
        {createData.map((_) => {
          return <Card data={_} theme={_.theme} />;
        })}
      </div>
    </div>
  );
};

WalletCard.propTypes = {};

export default WalletCard;
