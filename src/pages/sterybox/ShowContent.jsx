import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import Exclamation from './img-h/ExclamationCircle.png';

import './sterybox.css';

const ShowContent = ({ content, title, contentHover, toolTip }) => {
  return (
    <>
      <p
        style={{
          fontWeight: '600',
          fontfamily: 'SF Pro Display',
          fontstyle: 'normal',
          //marginTop: '24px',
          marginBottom: '16px',
          fontSize: '14px',
          lineHeight: '16.8px',
          color: '#FFFFFFD9'
        }}>
        {title}
        {toolTip ? (
          <Tooltip
            title={toolTip}
            color="#1A2026"
            placement="topLeft"
            arrowPointAtCenter={true}
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode || document.body;
            }}
            overlayInnerStyle={{
              width: 320,
              fontSize: 14
            }}>
            <img
              style={{
                width: 14,
                marginLeft: 7,
                position: 'relative',
                cursor: 'pointer'
              }}
              src={Exclamation}
              alt=""></img>
          </Tooltip>
        ) : null}
      </p>
      <p
        className={contentHover ? 'underline' : ''}
        style={{
          fontWeight: '400',
          fontfamily: 'SF Pro Text',
          fontstyle: 'normal',
          fontSize: '14px',
          lineHeight: '16.8px',
          marginBottom: '32px',
          color: '#FFFFFF73',
          cursor: 'pointer'
        }}>
        {content}
      </p>
    </>
  );
};

ShowContent.propTypes = {};

export default ShowContent;
