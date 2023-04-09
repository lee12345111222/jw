import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import classNames from 'classnames/bind';
import styles from './Card.css';
const cx = classNames.bind(styles);
const Card = ({
  theme = '',
  data = {
    title: 'Ethereum',
    leftImg: '',
    rightImg: '',
    number: 0,
    type: 'ETH',
    bottomNumber: ''
  }
}) => {
  const themes = {
    blue: 'linear-gradient(282.18deg, #3B56E6 -3.15%, #6B82F4 101.87%)',
    purple: 'linear-gradient(282.18deg, #5C10BF -3.15%, #932CFF 101.87%)',
    pink: 'linear-gradient(102.97deg, #FA8DDB 0%, #B02E8C 100%)'
  };

  return (
    <div
      className="Card d-flex justify-between"
      style={{ background: themes[theme] }}>
      <div className={'card_left '}>
        <p style={{ marginBottom: '24px' }} className={cx('title')}>
          {data.title}
        </p>
        <div className={cx('data')}>
          <img src={data.leftImg} className="wh30 leftImg" alt="" />
          <div className={cx('data-right')}>
            <p className={cx('number')}>{data.number}</p>
            <p className={cx('type')}>{data.type}</p>
            <p className={cx('bottomNumber')}>{data.bottomNumber}</p>
          </div>
        </div>
      </div>
      <div className="card_right">
        <img
          src={data.rightImg}
          className="rightImg d-flex items_end h80"
          alt=""
        />
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
