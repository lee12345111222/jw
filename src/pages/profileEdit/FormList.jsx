import { useState, memo } from 'react';

import BorderedBtn from '@/components/BorderedBtn2/index';

import styles from './index.module.css';
import styled from 'styled-components';

import { Input, Checkbox, Radio } from 'antd';

import Avatar from './assets/avatar.png';

const Btn = styled(Radio)`
  margin-right: 16px !important;
  width: 16px;
  height: 16px;
  & .ant-checkbox {
    background: rgba(74, 80, 87, 0.2);
    top: 0;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background: #06c4ff;
    border: none;
  }
`;
const Radius = styled(Checkbox)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  align-items: center;
  & .ant-checkbox {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(74, 80, 87, 0.2);
    top: 0;
  }
  & .ant-checkbox-inner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background: #06c4ff;
    border: none;
  }
  & .ant-checkbox-checked .ant-checkbox-inner::after {
    color: #000;
    border: 2px solid #000;
    border-top: 0;
    border-left: 0;
  }
`;
export const FormList = memo(({ btnText, setVisible, handleSendClick }) => {
  const [userName, setUserName] = useState('Lian');
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [change, setChange] = useState(false);
  const [userOption, setUserOption] = useState('btn1');
  const [value, setValue] = useState('');

  const handleChangeName = (e) => {
    setUserName(e.target.value);
    setChange(true);
  };
  const checkOnChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const getFormEle = () => {
    return change ? (
      <div className="edit-form-antd">
        <div className={styles['edit-form-item']}>
          <div className={styles['edit-form-title']}>Username</div>
          <Radio.Group value={value} onChange={checkOnChange}>
            <div className={styles['edit-form-flex']}>
              <Btn value={'btn1'}></Btn>
              <Input
                placeholder="Please enter"
                value={userName}
                onChange={handleChangeName}
              />
            </div>
            <div className={styles['edit-form-tag']}>
              <Btn
                value={'btn2'}
                onChange={(e) => setUserOption(e.target.checked)}></Btn>
              <div
                className={
                  styles['edit-form-tag-name'] +
                  ' ' +
                  (userOption
                    ? styles[userOption ? 'edit-form-tag-active' : '']
                    : '')
                }>
                voxelmaster.bnb
              </div>
            </div>
          </Radio.Group>
        </div>
        <div className={styles['edit-form-item']}>
          <div className={styles['edit-form-title']}>
            <span>Email Address</span>
            <div className={styles['edit-form-title-btn']}>
              <div className={styles['edit-form-btn-name']}>Remove</div>
              <div className={styles['edit-form-btn-name']}>Change</div>
            </div>
          </div>
          <div className={styles['edit-form-flex']}>
            <Input
              placeholder="Please enter"
              disabled
              className={styles['edit-input']}
              onChange={(e) => {
                e.stopPropagation();
                setEmail(e.target.value);
              }}
              value={email}
              prefix={
                <Radius
                  className={styles['edit-prefix-checkbox']}
                  onChange={checkOnChange}></Radius>
              }
            />
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className={styles['edit-form-item']}>
          <div className={styles['edit-form-title']}>Username</div>
          <Input
            placeholder="Please enter"
            value={userName}
            onChange={handleChangeName}
          />
        </div>
        <div className={styles['edit-form-item']}>
          <div className={styles['edit-form-title']}>Email Address</div>
          <Input
            placeholder="Please enter"
            className={styles['edit-input']}
            onChange={(e) => {
              e.stopPropagation();
              setEmail(e.target.value);
            }}
            value={email}
            suffix={
              <div
                className={
                  styles['edit-text-btn'] +
                  ' ' +
                  (email ? styles['edit-text-btn-active'] : '')
                }
                onClick={handleSendClick}>
                {btnText}
              </div>
            }
          />
          <div className={styles['edit-form-code']}>
            <Input
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ marginRight: 16 }}
            />
            <BorderedBtn width="88px" disabled={code ? false : true}>
              Verify
            </BorderedBtn>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className={styles['edit-content']}>
      <div className={styles['edit-content-top']}>
        <div className={styles['edit-user-avatar']}>
          <img src={Avatar} alt="" />
        </div>
        <div className={styles['edit-user-btn']}>
          <BorderedBtn width="88px" onClick={() => setVisible(true)}>
            Select
          </BorderedBtn>
        </div>
      </div>
      <div className={styles['edit-form']}>
        {getFormEle()}

        <div className={styles['edit-form-btn']}>
          <BorderedBtn width="128px">Save</BorderedBtn>
        </div>
      </div>
    </div>
  );
});
