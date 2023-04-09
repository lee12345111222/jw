import React from 'react';
import PropTypes from 'prop-types';
import SmallBoxItem from './SmallBoxItem/index.jsx';
const SmallBoxList = ({ smallBoxList, height }) => {
  return (
    <div
      style={{
        height: height + 'px',

        backgroundColor: '#4A505773',
        border: '1px solid rgba(74, 80, 87, 0.45)',
        borderRadius: '4px',
        display: 'flex',
        //justifyContent: 'space-around',
        gap: '66px',
        //paddingLeft: '28px',
        //paddingRight: '28px',
        padding: '3px 28px',
        marginTop: '-16px',
        alignItems: 'center'
      }}>
      {smallBoxList.map((item) => {
        console.log(item);
        return <SmallBoxItem smallImg={item.smallimg} count={item.count} />;
      })}

      {/* <span style={{ lineHeight: '60px', color: "#FFFFFF", fontWeight: 500, opacity: 0.65 }}>
                        <img src={voxelrole2} /> 2
                    </span>
                    <span style={{ lineHeight: '60px', color: "#FFFFFF", fontWeight: 500, opacity: 0.65 }}>
                        <img src={voxelrole3} /> 9
                    </span>
                    <span style={{ lineHeight: '60px', color: "#FFFFFF", fontWeight: 500, opacity: 0.65 }}>
                        <img src={voxelrole4} /> 1
                    </span> */}
    </div>
  );
};
SmallBoxList.defaultProps = {
  height: 60
};
SmallBoxList.propTypes = {
  smallBoxList: PropTypes.array.isRequired,
  height: PropTypes.number
};

export default SmallBoxList;
