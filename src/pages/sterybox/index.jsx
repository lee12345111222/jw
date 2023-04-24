import React, { useState } from 'react';
import MainPage from '@/components/MainPage/index';
import SteryTabs from './SteryTabs/index';
// left BigBox
import BigBox from './BigBox';
import ShowContent from './ShowContent.jsx';
//import ShowContentAdr from './ShowContentAdr.jsx';
import './sterybox.css';
import styled, { keyframes } from 'styled-components';

import { Footer } from '@/pages/createFinial/createV3/components/basic-components/index';

import red1 from './img-h/red1.png';
import red2 from './img-h/red2.png';
import red3 from './img-h/red3.png';
import red4 from './img-h/red4.png';

import yel1 from './img-h/yel1.png';
import yel2 from './img-h/yel2.png';
import yel3 from './img-h/yel3.png';
import yel4 from './img-h/yel4.png';

import pro1 from './img-h/pro1.png';
import pro2 from './img-h/pro2.png';
import pro3 from './img-h/pro3.png';
import pro4 from './img-h/pro4.png';

import blue1 from './img-h/blue1.png';
import blue2 from './img-h/blue2.png';
import blue3 from './img-h/blue3.png';
import blue4 from './img-h/blue4.png';

import genessisTag from './img-h/genesistag.png';
import voxeltag from './img-h/voxeltag.png';
import jetpacktag from './img-h/jetpacktag.png';
import blueprinttag from './img-h/blueprinttag.png';

import blueprint from './img-h/blueprint.png';
import blueprintDark from './img-h/blueprintDark.png';
import blueprint1 from './img-h/blueprint1.png';
import blueprint2 from './img-h/blueprint2.png';
import blueprint3 from './img-h/blueprint3.png';
import blueprint4 from './img-h/blueprint4.png';

import voxelrole from './img-h/voxelrole.png';
import voxelroleDark from './img-h/voxelroleDark.png';
import voxelrole1 from './img-h/voxelrole1.png';
import voxelrole2 from './img-h/voxelrole2.png';
import voxelrole3 from './img-h/voxelrole3.png';
import voxelrole4 from './img-h/voxelrole4.png';

import genesis from './img-h/genesis.png';
import genesisDark from './img-h/genesisDark.png';
import genesis1 from './img-h/genesis1.png';
import genesis2 from './img-h/genesis2.png';
import genesis3 from './img-h/genesis3.png';
import genesis4 from './img-h/genesis4.png';

import jetpack from './img-h/jetpack.png';
import jetpackDark from './img-h/jetpackDark.png';
import jetpack1 from './img-h/jetpack1.png';
import jetpack2 from './img-h/jetpack2.png';
import jetpack3 from './img-h/jetpack3.png';
import jetpack4 from './img-h/jetpack4.png';

import gailv from './img-h/gail.png';
////import wen from './img-h/wen.png';
//import WakeButon from './WakeButton/index';
import SmallBoxList from './SmallBoxList/index.jsx';
import FooterBox from './FooterBox';
import WakeButtonList from './WakeButtonList/index.jsx';

import click001 from './img-h/click001.png';
import click002 from './img-h/click002.png';
import click003 from './img-h/click003.png';
import click004 from './img-h/click004.png';

import select001 from './img-h/select001.png';
import select002 from './img-h/select002.png';
import select003 from './img-h/select003.png';
import select004 from './img-h/select004.png';

import xuanfu001 from './img-h/xuanfu001.png';
import xuanfu002 from './img-h/xuanfu002.png';
import xuanfu003 from './img-h/xuanfu003.png';
import xuanfu004 from './img-h/xuanfu004.png';

import default001 from './img-h/default001.png';
import default002 from './img-h/default002.png';
import default003 from './img-h/default003.png';
import default004 from './img-h/default004.png';
//import Dialog from '@/ui/modal/index';
import GameTable from './GameTable/index';

const Sterybox = () => {
  const tableData = [
    {
      Name: 'Black Skeleton Cap',
      Rarity: 'SSR',
      Probability: '33%',
    },
    {
      Name: 'Orange Cap',
      Rarity: 'SSR',
      Probability: '33%',
    },
    {
      Name: 'Little Punk Cap',
      Rarity: 'SSR',
      Probability: '33%',
    },
    {
      Name: 'Police Cap',
      Rarity: 'SSR',
      Probability: '33%',
    },
  ];
  const tableData2 = [
    {
      Name: 'Whiht Skeleton Cap',
      Rarity: 'SSR',
      Probability: '50%',
    },
    {
      Name: 'Blue Cap',
      Rarity: 'SSR',
      Probability: '50%',
    },
    {
      Name: 'Shoes',
      Rarity: 'SSR',
      Probability: '50%',
    },
    {
      Name: 'Police shoes',
      Rarity: 'SSR',
      Probability: '50%',
    },
  ];
  const TableHeader = [
    {
      opacity: 0.65,
      textAlign: 'left',
      name: 'Name',
    },
    {
      opacity: 0.65,
      textAlign: 'center',
      name: 'Rarity',
    },
    {
      opacity: 0.65,
      textAlign: 'right',
      name: 'Probability',
    },
  ];
  const smallBoxList = [
    {
      smallimg: voxelrole1,
      count: 5,
    },
    {
      smallimg: voxelrole2,
      count: 15,
    },
    {
      smallimg: voxelrole3,
      count: 9,
    },
    {
      smallimg: voxelrole4,
      count: 1,
    },
  ];
  const smallBoxListThree = [
    {
      smallimg: blueprint1,
      count: 5,
    },
    {
      smallimg: blueprint2,
      count: 15,
    },
    {
      smallimg: blueprint3,
      count: 9,
    },
    {
      smallimg: blueprint4,
      count: 1,
    },
  ];
  const smallBoxListTwo = [
    {
      smallimg: genesis1,
      count: 5,
    },
    {
      smallimg: genesis2,
      count: 15,
    },
    {
      smallimg: genesis3,
      count: 9,
    },
    {
      smallimg: genesis4,
      count: 1,
    },
  ];
  const smallBoxListFour = [
    {
      smallimg: jetpack1,
      count: 5,
    },
    {
      smallimg: jetpack2,
      count: 15,
    },
    {
      smallimg: jetpack3,
      count: 9,
    },
    {
      smallimg: jetpack4,
      count: 1,
    },
  ];
  const ShowContentData = [
    // {
    //   content: '0Xx013FB150ca2c42Ce8e81AA8EE31761313e086326',
    //   title: 'Contract address'
    // },
    {
      content:
        'The body will be divided into different levels of rarity according to the type of characters.The rarer the type,the higher the value of the body.The body will have different levels of rarity',
      title: 'Description',
      contentHover: false,
      toolTip:
        "10*10: Rubik's Cube、Hylaea、Lovely、Marble 20*20: Coffee、Bank、Restaurant、Shop 30*30: Moon、Country Style、Ocean、Church 40*40: Water Villa、Theater、Pizza、Hospital",
    },
    {
      title: 'Remaining quantity',
    },
  ];

  const ShowContentAdr = [
    {
      content: '0Xx013FB150ca2c42Ce8e81AA8EE31761313e086326',
      title: 'Contract address',
    },
  ];

  const ShowContentAdrJet = [
    {
      content: '8Xx01369750cas8e1Ce8e81AA8EE622625565686326',
      title: 'Contract address',
    },
  ];
  //const ShowContentAdrr = '0Xx013FB150ca2c42Ce8e81AA8EE31761313e086326';
  const ButtonData = [
    {
      title: '10*10',
      theme: 'blues',
    },
    {
      title: '20*20',
      theme: 'orange',
    },
    {
      title: '30*30',
      theme: 'blueq',
    },
    {
      title: '40*40',
      theme: 'yellow',
    },
  ];

  const items = [
    {
      status: 'default',
      key: '41',
      header: {
        label: `VoxelRole`,
        img: {
          default: red1,
          flot: red2,
          click: red3,
          select: red4,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
    {
      status: 'default',
      key: '42',
      header: {
        label: `Genesis`,
        img: {
          default: yel1,
          flot: yel2,
          click: yel3,
          select: yel4,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
    {
      status: 'default',
      key: '43',
      header: {
        label: `Blueprint`,
        img: {
          default: pro1,
          flot: pro2,
          click: pro3,
          select: pro4,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
    {
      status: 'default',
      key: '44',
      header: {
        label: `Jetpack`,
        img: {
          default: blue1,
          flot: blue2,
          click: blue3,
          select: blue4,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
  ];

  const items3 = [
    {
      status: 'default',
      key: '31',
      header: {
        label: `10*10`,
        img: {
          default: default001,
          flot: xuanfu001,
          click: click001,
          select: select001,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
    {
      status: 'default',
      key: '32',
      header: {
        label: `20*20`,
        img: {
          default: default002,
          flot: xuanfu002,
          click: click002,
          select: select002,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
    {
      status: 'default',
      key: '33',
      header: {
        label: `30*30`,
        img: {
          default: default003,
          flot: xuanfu003,
          click: click003,
          select: select003,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
    {
      status: 'default',
      key: '34',
      header: {
        label: `40*40`,
        img: {
          default: default004,
          flot: xuanfu004,
          click: click004,
          select: select004,
        },
        color: {
          default: '#FFFFFF73',
          flot: '#42CBF5',
          click: '#42CBF5',
          select: '#06C4FF',
        },
      },
    },
  ];

  const [showIs, setShowIS] = useState(false);

  return (
    <MainPage title="Mystery Box">
      <div className="content">
        <div style={{ width: '1030px' }} className="wwwsuzix">
          <div className="szxwai">
            <h1 className="suizhh1">
              <StyleTitle>Mystery Box Collection</StyleTitle>
            </h1>
            {/* <div className="toprightbox">
            <p style={{ marginBottom: '0px' }}>How To Get Mystery Box</p>
            <img src={wen} alt="" />{' '}
          </div> */}
          </div>
          <SteryTabs
            items={items}
            defaultActiveKey="41"
            changeTabs={indexkey => {
              if (indexkey === '41') {
                setShowIS(false);
              } else {
                setShowIS(true);
              }
            }}
          >
            <FooterBox>
              <BigBox
                slot="left"
                title={'VoxelRole Mystery Box 4'}
                bigImg={voxelroleDark}
                bigImg2={voxelrole}
                footerTitle="1 Blueprint"
                slogo={voxeltag}
              />
              <div slot="right">
                {ShowContentAdrJet.map(item => (
                  <ShowContent
                    content={item.content}
                    contentHover={true}
                    title={item.title}
                  />
                ))}
                {ShowContentData.map(item => (
                  <ShowContent
                    content={item.content}
                    title={item.title}
                    toolTip={item.toolTip}
                  />
                ))}
                <SmallBoxList smallBoxList={smallBoxList} />
                <WakeButtonList buttonList={ButtonData} />
              </div>
            </FooterBox>
          </SteryTabs>
          <p style={{ display: 'flex', marginTop: '40px' }}>
            <img width={30} src={gailv} alt="" />{' '}
            <span
              style={{
                marginLeft: '12px',
                fontFamily: 'SF Pro Display',
                fontSize: '20px',
                lineHeight: '30px',
                fontWeight: 500,
                color: '#FFFFFFD9',
              }}
            >
              Probability
            </span>
          </p>
          <p
            style={{
              fontFamily: 'SF Pro Text',
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '17px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.45)',
              marginBottom: '30px',
            }}
          >
            Mystery Box Rarity Ranking List, Click Classification To View Other{' '}
            {/* <img
            src={wen}
            alt=""
            style={{ cursor: 'pointer', marginLeft: '8px' }}
          />{' '} */}
          </p>
          {/* <div style={{ display: showIs ? 'block' : 'none' }}>
            <SteryTabs showLength={6} items={items3} defaultActiveKey="31" />
          </div> */}
          <div>
            <SteryTabs items={items3} defaultActiveKey="31">
              <GameTable
                gameTableHeader={TableHeader}
                gameTableBody={tableData}
                theme="blue"
              />
            </SteryTabs>
          </div>
        </div>
      </div>
      <Footer bgColor="background: rgba(28, 35, 41, 1);" />
    </MainPage>
  );
};

const colorfullText = keyframes`
  0% {
    background-position: 100%;
  }

  100% {
    background-position: 0;
  }
`;

const StyleTitle = styled.div`
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  display: flex;
  align-items: center;
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 300% 100%;
  animation: ${colorfullText} 1.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    alternate infinite;
`;

export default Sterybox;
