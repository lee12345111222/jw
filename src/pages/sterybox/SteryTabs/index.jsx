import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import styles from './Game.modules.css';
import { useEffect } from 'react';

import leftimg from './img/Vector.png';
import rightimg from './img/Frame1432.png';
const Box = styled.div`
  display: flex;
  flex-direction: row;

`;

const FontBox = styled.span`

    margin-left: 6px;
    font-family: 'SF Pro Display';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`;

const SteryTabs = ({
  items,
  defaultActiveKey,
  minWidth = 110,
  showLength = 4,
  changeTabs,
  children,
  setPropsKey,
}) => {
  let ref = useRef();
  let show = null;
  if (showLength < items.length) {
    show = true;
  } else {
    show = false;
  }

  let [tabState, setTableState] = useState(preItems => {
    console.log(123);
    return items;
  });

  // useEffect(()=>{
  //     setTableState(items)
  // },[items])
  // {console.log('xxxxxxxxxxxxxxx',tabState)}

  const [ActiveKey, setActiveKey] = useState(defaultActiveKey);
  useEffect(() => {
    if (changeTabs) {
      changeTabs(ActiveKey);
    }
    setTableState(
      tabState.map(item => {
        if (item.key === ActiveKey) {
          return {
            ...item,
            status: 'select',
          };
        }
        return {
          ...item,
          status: 'default',
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ActiveKey]);

  return (
    <section className="gameTables">
      <div style={{ display: 'flex', alignItems: ' center' }}>
        <span
          onClick={e => {
            ref.current.scrollLeft = ref.current.scrollLeft - (minWidth + 20);
          }}
          style={{
            marginRight: '20px',
            display: show ? 'block' : 'none',
            cursor: 'pointer',
          }}
        >
          <img src={leftimg} alt="" />
        </span>
        <Box
          ref={ref}
          style={{
            userSelect: 'inherit',
            maxWidth: showLength * (minWidth + 20) - 20,
            overflow: 'hidden',
          }}
          className={styles.TabHeadItem}
        >
          {tabState.map(tabhead => {
            return (
              <div
                style={{ minWidth: minWidth }}
                key={tabhead.key}
                className="tabHeaditem"
                onClick={() => {
                  setTableState(
                    tabState.map(items => {
                      if (tabhead.key === items.key) {
                        return {
                          ...items,
                          status: 'click',
                        };
                      } else {
                        return {
                          ...items,
                        };
                      }
                    })
                  );
                  setTimeout(() => {
                    setActiveKey(tabhead.key);
                    setPropsKey(tabhead.key);
                  }, 100);
                }}
              >
                <img src={tabhead.header.img[tabhead.status]} alt=""></img>
                <FontBox
                  style={{ color: tabhead.header.color[tabhead.status] }}
                >
                  {tabhead.header.label}
                </FontBox>
              </div>
            );
          })}
        </Box>
        <span
          style={{ display: show ? 'block' : 'none', cursor: 'pointer' }}
          onClick={e => {
            ref.current.scrollLeft = ref.current.scrollLeft + (minWidth + 20);
          }}
        >
          <img src={rightimg} alt="" />
        </span>
      </div>

      <div style={{ position: 'relative', top: '10px', height: '412px' }}>
        <div
          style={{
            background: 'rgba(74, 80, 87, 0.2)',
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            display: 'flex',
            borderRadius: '4px',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

SteryTabs.propTypes = {
  items: PropTypes.any.isRequired,
  defaultActiveKey: PropTypes.string,
};

export default SteryTabs;
