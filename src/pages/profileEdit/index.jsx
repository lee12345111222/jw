import { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '../create/StyledComponents';
import { FormList } from './FormList';
import { Social } from './Socical';
import MainPage from '@/components/MainPage/index';

import classNames from 'classnames/bind';

//import { useHistory } from "react-router-dom";

import Modal from './modal/index';

import styles from './index.module.css';

//import { Form } from "antd";

import Img1 from './assets/1.png';
import Img2 from './assets/avatar2.png';
import CloseImg from './assets/2.png';
import Close from './assets/close.png';
import Img3 from './assets/3.png';

const modalImgList = [Img1, Img2, Img3, Img2, Img3];

const cx = classNames.bind(styles);

export default function ProfileEdit({ hideMain }) {
  const { t } = useTranslation();

  //const history = useHistory();

  //const [form] = Form.useForm();
  const [tabKey, setTabkey] = useState(1);
  const [imgKey, setImgkey] = useState();
  const [visible, setVisible] = useState(false);
  const [btnText, setBtnText] = useState('Send a code');
  const btnTextRef = useRef(60);
  const onKeyChange = val => {
    console.log(val, 'onValuesChange');
    setTabkey(val);
  };
  const handleSendClick = e => {
    e.stopPropagation();
    setBtnText('pedding');
    console.log(btnTextRef);
    let timer = setInterval(() => {
      setBtnText(btnTextRef.current);

      if (btnTextRef.current === 0) {
        clearInterval(timer);
        setBtnText('Send a code');
        return;
      }
      btnTextRef.current -= 1;
    }, 1000);
  };

  const dom = (
    <div className={styles['edit-modal-container']}>
      <div className={styles['modal-top']}>
        <div className={styles['modal-top-left']}>
          <img className={styles['modal-top-img']} src={CloseImg} alt="" />
          <div className={styles['modal-top-title']}>select NFT</div>
        </div>
        <img
          className={styles['modal-top-close']}
          src={Close}
          onClick={() => {
            setVisible(false);
          }}
          alt=""
        ></img>
      </div>
      <div className={styles['modal-content']}>
        {modalImgList.map((ele, idx) => (
          <img
            className={imgKey === idx ? styles['img-active'] : ''}
            key={idx}
            src={ele}
            alt="img"
            onClick={() => {
              setImgkey(idx);
              setVisible(false);
            }}
          />
        ))}
      </div>
    </div>
  );

  const Main = useMemo(
    () =>
      hideMain
        ? ({ children }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {children}
            </div>
          )
        : MainPage,
    [hideMain]
  );

  const getTabName = idx => {
    switch (Math.abs(idx - tabKey)) {
      case 0:
        return 'edit-tab-top';
      case 1:
        return 'edit-tab-middle';
      default:
        return '';
    }
  };

  return (
    <Main title={t('Edit')} goBack={true}>
      <Page fd="column">
        <Modal
          open={visible}
          backdrop={styles['edit-modal']}
          onEscape={() => setVisible(false)}
        >
          {dom}
        </Modal>
        <div className={styles['edit-main']}>
          <div className={styles['edit-tab']}>
            <div
              className={styles[getTabName(1)]}
              onClick={() => onKeyChange(1)}
            >
              <div></div>
              General
            </div>
            <div
              className={styles[getTabName(2)]}
              onClick={() => onKeyChange(2)}
            >
              <div></div>
              Social Profiles
            </div>
            <div className={styles['edit-tab-bottom']}>
              <div></div>
              Email Notifications
            </div>
          </div>
          {tabKey === 1 ? (
            <FormList
              btnText={btnText}
              modalImgList={modalImgList}
              imgKey={imgKey}
              setVisible={setVisible}
              handleSendClick={handleSendClick}
            ></FormList>
          ) : null}
          {tabKey === 2 ? (
            <Social
              btnText={btnText}
              setVisible={setVisible}
              handleSendClick={handleSendClick}
            ></Social>
          ) : null}
        </div>
      </Page>
    </Main>
  );
}
