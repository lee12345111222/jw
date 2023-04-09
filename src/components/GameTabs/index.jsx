import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import styles from './Game.modules.css'
import { useEffect } from 'react';

import leftimg from './img/Vector.png'
import rightimg from './img/Frame1432.png'
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

const GameTabs = ({items,defaultActiveKey , minWidth = 110,showLength = 4,changeTabs}) => {
    
    let ref =  useRef();
    let show = null;
    if(showLength < items.length){
        show = true;
    }else{
        show = false
    }

    
   
    let [tabState,setTableState] = useState((preItems)=>{
        console.log(123);
        return items;
    })

    // useEffect(()=>{
    //     setTableState(items)
    // },[items])
    // {console.log('xxxxxxxxxxxxxxx',tabState)}

    const [ActiveKey,setActiveKey] = useState(defaultActiveKey);
    useEffect(()=>{
        if(changeTabs){
            changeTabs(ActiveKey.split('|')[0])
        }
        setTableState(tabState.map(item=>{
            if(item.key === ActiveKey.split('|')[0]){
                return {
                    ...item,
                    status:'select'
                }
            }
           return {
                ...item,
                status:'default'
           }
        }))
    },[ActiveKey])

    return (
        <section className='gameTables'>
            <div style={{display: 'flex',alignItems:' center'}}>
                <span onClick={(e)=>{
                  ref.current.scrollLeft = ref.current.scrollLeft - (minWidth + 20)
                }}  style={{marginRight:'20px',display:show? 'block' : 'none',cursor:'pointer'}}>
                    <img src={leftimg}  />
                </span>
            <Box
            ref={ref}
            style={{userSelect:'inherit', maxWidth:(showLength * (minWidth + 20)) - 20 , overflow:'hidden'}} className={styles.TabHeadItem} >
                {tabState.map(tabhead => {
                    return  <div style={{minWidth:minWidth}} key={tabhead.key}  className='tabHeaditem'
                    onClick={()=>{
                    setTableState(tabState.map(items=>{
                        if(tabhead.key === items.key){
                            return {
                                ...items,
                                status:'click'
                            }
                        }else{
                            return {
                                ...items
                            }
                        }
                    }))
                        setTimeout(() => {
                            
                            setActiveKey(tabhead.key +'|' +Math.random());
                        }, 100);
                    }
                    }  
                    onMouseLeave={()=>{
                        setTableState(tabState.map(items=>{
                            if(tabhead.key === items.key){
                                if(items.status === 'select'){
                                    return {
                                        ...items,status:'select'
                                    }
                                }else{
                                    return {
                                        ...items,status:'default'
                                    }
                                }
                            }else{
                                return {
                                    ...items
                                }
                            }
                        }))
                    }} 
                    onMouseEnter={()=>{
                        setTableState(tabState.map(items=>{
                            if(tabhead.key === items.key ){
                                if(items.status === 'select'){
                                    return {
                                        ...items,status:'select'
                                    }
                                }else{
                                    return {
                                        ...items,status:'flot'
                                    }
                                }
                            }else{
                                return {
                                    ...items
                                }
                            }
                        }))
                    }}>    
                    <img src={tabhead.header.img[tabhead.status]}></img> 
                    <FontBox style={{color:tabhead.header.color[tabhead.status]}}>{tabhead.header.label}</FontBox>
                </div>
                })}
            </Box>
                <span style={{display:show? 'block' : 'none',cursor:'pointer'}} onClick={(e)=>{
                  ref.current.scrollLeft = ref.current.scrollLeft + (minWidth + 20)
                }}>
                    <img src={rightimg}  />
                </span>
            </div>
           
            <div style={{position:'relative',top:'10px', height:'412px'}}>
                {tabState.map(item=>{
                    return <div key={item.key}  style={{visibility:ActiveKey.split('|')[0]!==item.key ? 'hidden' : 'visible',background: 'rgba(74, 80, 87, 0.2)', position:'absolute',left:'0',top:'0',width:'100%',display:'flex',borderRadius:'4px'}}>
                           {item.children()}
                    </div>
                })}
            </div>
        </section>
    );
}

GameTabs.propTypes = {
    items: PropTypes.any.isRequired,
    defaultActiveKey:PropTypes.string
};

export default GameTabs;