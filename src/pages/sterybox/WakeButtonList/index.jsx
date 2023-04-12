import React, { useState } from 'react';
import PropTypes from 'prop-types';

import WakeButton from '../WakeButton/index.jsx';
import BorderedBtn from '@/components/BorderedBtn2/index.jsx';
import Dialog from '@/ui/dialog/index.jsx';
import Title from './assets/content.png';
import styled from 'styled-components';
import CloseIcon from '@/icons/close/index';
import Button from '@/ui/button/index.jsx';
import Content1 from './assets/Coat.png';
import Content2 from './assets/1000.png';
import Content3 from './assets/1001.png';
import Content4 from './assets/1002.png';
import Content5 from './assets/1003.png';
import Content6 from './assets/1004.png';
import Content7 from './assets/1005.png';
import Loading from './assets/loading.png';

const ImgArr = [
  Content1,
  Content2,
  Content3,
  Content4,
  Content5,
  Content6,
  Content7
];

const WakeButtonList = ({ buttonList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(modalVisible, 'modalVisible');
  const onCancel = () => {
    setModalVisible(false);
  };
  const onConfirm = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Div
        className="btnDialag"
        open={modalVisible}
        headerStyle={{ width: 680 }}
        header={
          loading ? (
            <></>
          ) : (
            <Header>
              <img className="btnDialogTitle" src={Title} alt="" />
              <CloseIcon onClick={onCancel} className="close-icon" />
            </Header>
          )
        }
        footer={
          loading ? (
            <></>
          ) : (
            <Footer>
              <Button height="28px" width="132px" onClick={onConfirm}>
                conform
              </Button>
              <div className="footerBtnText">{'View on Polygon >>'}</div>
            </Footer>
          )
        }>
        {loading ? (
          <LoaddingContent>
            <img src={Loading} alt="" />
            <div>Opening the Mystery box</div>
          </LoaddingContent>
        ) : (
          <DialogContent>
            {ImgArr.map((ele, idx) => (
              <img className="contentItem" src={ele} alt="" />
            ))}
          </DialogContent>
        )}
      </Div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '35px'
        }}>
        {buttonList.map((item, index) => (
          <WakeButton
            type={item.theme}
            title={item.title}
            key={index}
            click={() => {
              setLoading(true);
              setModalVisible(true);

              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
          />
        ))}
      </div>
    </>
  );
};

WakeButtonList.propTypes = {
  buttonList: PropTypes.array.isRequired
};

export default WakeButtonList;

const Div = styled(Dialog)`
  box-sizing: border-box;
  .content {
    padding: 20px;
  }
`;
const DialogContent = styled.div`
  display: flex;
  width: 640px;
  flex-wrap: wrap;
  .contentItem {
    width: 104px;
    margin: 0 12px 23px;
  }
`;
const LoaddingContent = styled.div`
  width: 374px;
  height: 194px;
  text-align: center;
  padding-top: 43px;
  img {
    margin-bottom: 30px;
  }
  div {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    color: rgba(255, 255, 255, 0.85);
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 680px;
  padding: 24px;
  box-sizing: border-box;
  .close-icon {
    position: absolute;
    width: 16px;
    top: 24px;
    right: 24px;
    cursor: pointer;
  }
  img {
    width: 206px;
  }
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 24px;
  .footerBtnText {
    position: absolute;
    top: 24px;
    right: 24px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #06c4ff;
    cursor: pointer;
  }
`;
