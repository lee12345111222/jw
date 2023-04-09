import Dialog from '@/ui/dialog/index';

import React, { useState, useCallback, useEffect } from 'react';
import { Drawer } from 'antd';

import { Flex, Box } from '@/components/Basic';

import { useApi2 } from '@/hooks/useApi';

import ArrowRightIcon from '@/assets/icon/right-arrow.svg';
import returnImg from '@/assets/icon/left-return.png';
import noticeLogo from '@/assets/icon/notice-logo.png';

import styles from './index.module.css';
import './index.css';

import classNames from 'classnames/bind';

import logo from '@/assets/icon/systerm-icon.png';
import logo2 from '@/assets/icon/reward-icon.png';
import logo3 from '@/assets/icon/func-icon.png';
import logo4 from '@/assets/icon/event-icon.png';
import styled from 'styled-components';

const cx = classNames.bind(styles);

const DrawerStyle = styled(Drawer)`
  .ant-drawer-content {
    border-radius: 8px;
    background-color: rgba(26, 32, 38, 0.96);
  }
  .ant-drawer-content-wrapper {
    right: 16px !important;
    top: 64px;
    bottom: 16px;
    width: 336px !important;
    height: auto;
    border-radius: 10px;
  }
  @media (min-width: 1980px) {
    .ant-drawer-content-wrapper {
      right: 16px !important;
      top: 64px;
      bottom: 16px;
      width: 336px !important;
      max-height: 1000px;
    }
  }
  .ant-drawer-header {
    border-bottom: 1px solid rgba(74, 80, 87, 0.4);
    //background-color: rgba(26, 32, 38, 0.04) !important;
    padding: 16px 18px 16px 24px;
  }
  .ant-drawer-body {
    padding: 0 24px;
    //background-color: rgba(26, 32, 38, 0.96) !important;
  }
  .ant-drawer-header,
  .ant-drawer-body {
    background: inherit;
  }
  .ant-drawer-header-title {
    flex-direction: row-reverse;
    .ant-drawer-close {
      margin-right: 0;
      color: #fff;
    }
  }
`;

const jsonData = {
  code: 200,
  list: [
    { title: 'hello world', isNew: true, id: '1' },
    { title: 'hello world', isNew: true, id: '2' },
    { title: 'hello world', isNew: true, id: '3' },
    { title: 'hello world', isNew: true, id: '4' },
    { title: 'hello world', isNew: true, id: '5' }
  ]
};

const articleData = {
  code: 200,
  list: [
    {
      id: '1',
      title: 'Hello My friend',
      article: `Every day of your life, it is important to take the time to “smell the
    roses” — to appreciate the experiences that lead to happiness. This is
    part of being truly happy. Happiness is a state of mind. It starts with
    accepting where you are, knowing where you are going and planning to enjoy
    every moment along the way. You know how to be happy, and feel that you
    have enough time or money or love or whatever you need to achieve your
    goals. And just feeling that you have enough of everything means that you
    do indeed have enough.`,
      author: {},
      authorName: 'PlayerOne Updates',
      icon: logo,
      new: true
    },
    {
      id: '2',
      title: 'This is the first time for you',
      article: `Every day of your life, it is important to take the time to “smell the
      roses” — to appreciate the experiences that lead to happiness. This is
      part of being trulyng, you will never be happy, as
      you have not learned to “smell the roses”.`,
      author: {},
      authorName: 'Reward Notification',
      icon: logo2,
      new: true
    },
    {
      id: '3',
      title: 'Hello world',
      article: `Every day of your life, it is important to take the time to “smell the
      roses” — to appreciate the experiences that lead to happiness. This is
      part of being truly happy. Happiness is a state of mind. It starts with
      accepting where you are, knowing whatever you need to achieve your
      goals. And just feeling that you have enough of everything means that you
      do indeed have enough. You have to choose to be happy, and focus upon
      being happy, in order to be happy. If you instead focus upon knowing that
      you will be happy if you achieve something, you will never be happy, as
      you have not learned to “smell the roses”.`,
      author: {},
      authorName: 'Functional Update',
      icon: logo3,
      new: true
    },
    {
      id: '4',
      title: 'Hello world',
      article: `Every day of your life, it is important to take the time to “smell the
      roses” — to appreciate the experiences that lead to happiness. This is
      part of being truly happy. Happiness is a state of mind. It starts with
      accepting where you are, knowing where you are going and planning to enjoy
      every moment along the way. You know how to be happy, and feel that you
      have enough time or money or love or whatever you need to achieve your
      goals. And just feeling that you have enough of everything means that you
      do indeed have enough. You have to choose to be happy, and focus upon
      being happy, in order to be happy. If you instead focus upon knowing that
      you will be happy if you achieve something, you will never be happy, as
      you have not learned to “smell the roses”.If you instead focus upon knowing that
      `,
      author: {},
      authorName: 'New Event Notification',
      icon: logo4,
      new: true
    },
    {
      id: '5',
      title: 'Hello world',
      article: `Every day of your life, it is important to take the time to “smell the
      roses” — to appreciate the experiences that lead to happiness. This is
      part of being truly happy. Happiness is a state of mind. It starts with
      accepting where you are, knowing where you are going and planning to enjoy
      every moment along the way. .`,
      author: {},
      authorName: 'PlayerOne_5',
      icon: logo2,
      new: true
    }
  ]
};

const MessageItem = ({ title, isNew, id, onClick = () => {} }) => {
  const [checked, setChecked] = useState(isNew);

  const onClickCallback = useCallback(
    (id, e) => {
      setChecked(false);
      onClick(id);
    },
    [onClick]
  );

  return (
    <>
      <div className={cx('item-container')} onClick={() => onClickCallback(id)}>
        <Flex jc="space-between" ai="center">
          <div className={cx({ checked, 'non-checked': !checked })}></div>
          <div className={cx('message-title')}>{title}</div>
          <>
            <img src={ArrowRightIcon} className={cx('arrow-icon')} alt="" />
          </>
        </Flex>
      </div>
    </>
  );
};

const MessageList = ({ setArticle, articleList }) => {
  const onClick = (id) => {
    const item = articleData?.list?.find((item) => {
      return item.id === id;
    });
    const index = articleList.findIndex((item) => item.id === id);
    console.log(item, index);
    articleList[index].isNew = false;
    setArticle(item);
  };
  return (
    <div className={cx('list-container')}>
      {articleList?.map((item) => (
        <MessageItem
          id={item.id}
          title={item.title}
          isNew={item.isNew}
          onClick={onClick}
          key={item.id}
        />
      ))}
    </div>
  );
};

const MessageBody = ({ data }) => (
  <Box className={cx('box-card')}>
    <Flex ai="center" gap="0px 20px">
      {/* <img  src="" alt="" /> */}
      <div className={cx('avatar-img')}></div>
      <div className={cx('avatar-title')}>{data.title}</div>
    </Flex>
    <div className={cx('card-title')}>Here is the message Title</div>
    <p className={cx('card-content')}>{data.article}</p>
    <div className={cx('signature')}>---{data.authorName}</div>
  </Box>
);

const NoticeItem = ({ data, toDetail, idx }) => {
  const onClick = () => {
    console.log(articleData.list, idx);
    articleData.list[idx].new = false;
    toDetail();
  };
  return (
    <div className={cx('notice-item')} onClick={onClick}>
      <Flex gap="12px">
        <div className={cx('notice-list-avatar', data.new ? 'has-info' : '')}>
          <img src={data.icon} alt="" className={cx('avatar-info')} />
        </div>
        <div className={cx('notice-content-container')}>
          <div className={cx('list-name', 'over-ellipsis')}>
            {data.authorName}
          </div>
          <div className={cx('list-title', 'over-ellipsis')}>{data.title}</div>
          <div className={cx('list-content')}>{data.article}</div>
        </div>
      </Flex>
    </div>
  );
};

const NoticeDetail = ({ data }) => (
  <div className={cx('notice')}>
    <Flex gap="12px">
      <div className={cx('notice-avatar')}>
        <img src={data.icon} alt="" className={cx('avatar-info')} />
      </div>
      <div>
        <div className={cx('notice-name')}>{data.authorName}</div>
        <div className={cx('notice-time')}>UTC 2022.03.24 12:30</div>
      </div>
    </Flex>
    <div className={cx('notice-title')}>{data.title}</div>
    <div className={cx('notice-content')}>
      <p>{data.article}</p>
    </div>
  </div>
);

export const NoticeDialog = ({ open, onCancel, setNoticeCssClose }) => {
  useEffect(() => {
    document.body.style.overscrollBehaviorY = 'none';
    return () => {
      document.body.style.overscrollBehaviorY = 'auto';
    };
  }, []);
  useEffect(() => {
    return () => {
      setNoticeCssClose(true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [detail, setDetail] = useState();
  console.log(open, 'open');
  return (
    <>
      <DrawerStyle
        title={
          detail ? (
            <div
              ai="flex-start"
              onClick={() => setDetail()}
              className={cx('return-back')}>
              <img src={returnImg} alt="" className={cx('return-back-icon')} />
              Return
            </div>
          ) : (
            'Message'
          )
        }
        placement="right"
        onClose={onCancel}
        visible={open}
        mask={false}
        className={cx('notice-container', !open ? 'drawerHiden' : '')}>
        <div className={cx('notice-list-container')}>
          {detail ? (
            <NoticeDetail data={detail} />
          ) : (
            articleData.list.map((data, idx) => (
              <NoticeItem
                data={data}
                idx={idx}
                toDetail={() => setDetail(data)}
              />
            ))
          )}
          {detail && (
            <img src={noticeLogo} alt="" className={cx('bottom-logo')} />
          )}
        </div>
      </DrawerStyle>
    </>
  );
};

export default function StationMessage({
  open,
  onCancel = () => {},
  onCallBack = () => {},
  account
}) {
  const [article, setArticle] = useState({});
  const articleList = jsonData.list || [];
  // const [articleList, setArticleLst] = useState();
  const { loading } = useApi2(
    () => {},
    {
      onSuccess: (res) => {
        if (res.code === 200) {
          // setArticleLst(res.list);
          // onCallBack(data.count);
        }
      }
    },
    [account]
  );

  useEffect(() => {
    return () => {};
  }, [account]);

  return (
    <StationMessageDialog
      open={open}
      onCancel={onCancel}
      article={article}
      setArticle={setArticle}
      articleList={articleList}
      loading={loading}
    />
  );
}
export function StationMessageDialog({
  open,
  onCancel,
  article,
  setArticle,
  articleList,
  loading = false
}) {
  return (
    <Dialog
      title="Message"
      open={open}
      className={cx('main-container')}
      onCancel={onCancel}
      footer={''}>
      {loading ? (
        <div style={{ height: 300 }}>loading</div>
      ) : (
        <Flex ai="flex-start" gap="20px">
          <MessageList setArticle={setArticle} articleList={articleList} />
          <MessageBody data={article} />
        </Flex>
      )}
    </Dialog>
  );
}
