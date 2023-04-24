import React from 'react';
import PropTypes from 'prop-types';
import './GameTable.css';

const GameTable = ({ gameTableHeader, gameTableBody, theme }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '0px 32px 0px 32px'
      }}>
      <table
        style={{
          width: '100%',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '16.8px'
        }}>
        <thead>
          <tr style={{ lineHeight: '60px' }}>
            {gameTableHeader.map((item, index) => {
              return (
                <th
                  key={index}
                  style={{
                    textAlign: item.textAlign,
                    opacity: item.opacity,
                    width: '33%'
                  }}>
                  {item.name}
                </th>
              );
            })}
            {/* <th style={{ textAlign: 'left', opacity: 0.65, width: "33%" }}>Name</th>
                        <th style={{ textAlign: 'center', width: "33%" }}>Rarity</th>
                        <th style={{ textAlign: 'right', opacity: 0.65, width: "33%" }}>Probability</th> */}
          </tr>
        </thead>
        <tbody>
          {gameTableBody.map((item, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    textAlign: 'left',
                    opacity: 0.65,
                    fontWeight: 400,
                    lineHeight: '60px'
                  }}>
                  {item.Name}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontWeight: 400,
                    pacity: 0.65
                  }}>
                  {' '}
                  <span
                    className={
                      theme === 'yello' ? 'szxfontjb' : 'szxfontjbtow'
                    }>
                    {item.Rarity}
                  </span>
                </td>
                <td
                  style={{
                    textAlign: 'right',
                    opacity: 0.65,
                    fontWeight: 400
                  }}>
                  {item.Probability}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

GameTable.defaultProps = {
  theme: 'yellow'
};

GameTable.propTypes = {
  gameTableHeader: PropTypes.array.isRequired,
  gameTableBody: PropTypes.array.isRequired
};

export default GameTable;
