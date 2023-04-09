import React from 'react';
import PropTypes from 'prop-types';

const FooterBox = ({ children, leftBoxWidth, rightBoxWidth }) => {
  let slotArray = React.Children.toArray(children);
  let leftElement = slotArray.find((item) => {
    return item.props.slot === 'left';
  });
  let rightElement = slotArray.find((item) => {
    return item.props.slot === 'right';
  });

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: leftBoxWidth + '%' }}>{leftElement}</div>
      <div
        style={{
          width: rightBoxWidth + '%',
          background: 'rgba(74, 80, 87, 0.2)',
          padding: '32px'
        }}>
        {rightElement}
      </div>
    </div>
  );
};

FooterBox.defaultProps = {
  leftBoxWidth: 47,
  rightBoxWidth: 53
};

FooterBox.propTypes = {
  leftBoxWidth: PropTypes.number,
  rightBoxWidth: PropTypes.number
};

export default FooterBox;
