import { useMemo, useCallback, Fragment } from 'react';

import MainPage from '../MainPage/index';

import styles from './Detail.module.css';

import BorderedBtn from '../BorderedBtn2/index';

import { getDisplayBalance2ETH } from '@/utils/common';

import { ethExplorer as blockExplorer } from '@/constant/env/index';

import { useElementGoodHistory } from '@/api/elementApi/graphqlHooks';

import { useTranslation } from 'react-i18next';

import ImageBox from '../ImageBox/index';

import VideoPlayer from '@/components/videoPlayer/index';

import { showShortAddress } from '@/utils/common';

export default function Detail({
  pageTitle,
  title,
  img,
  video,
  videoWidth,
  poster,
  action,
  disable,
  msg,
  detailTitle,
  details,
  tableTitle,
  onAction,
  onGoBack,
  table,
  loading
}) {
  return (
    <MainPage
      title={pageTitle}
      goBack
      onGoBack={onGoBack}
      className={styles.main}
    >
      <Header
        msg={msg}
        loading={loading}
        title={title}
        onAction={onAction}
        action={action}
        disable={disable}
      />

      <div className={styles.page}>
        <div
          className={styles['poster-container']}
          style={{ width: videoWidth || '400px' }}
        >
          {video ? (
            <VideoPlayer video={video} poster={poster} loop />
          ) : (
            <ImageBox src={img} />
          )}
        </div>

        <div className={styles.row}>
          <div className={styles['detail-box']} style={{ flexShrink: 0 }}>
            <div className={styles['detail-title']}>{detailTitle}</div>
            <div className={styles.details}>{details}</div>
          </div>
          <div className={`${styles['detail-box']} ${styles['table-box']}`}>
            <div className={styles['detail-title']}>{tableTitle}</div>
            <div className={`${styles.details} ${styles.table}`}>{table}</div>
          </div>
        </div>
      </div>
    </MainPage>
  );
}

export const Info = ({ title, children }) => (
  <div className={styles.info}>
    <Label>{title}</Label>
    <div>{children}</div>
  </div>
);

export const Label = ({ children, className }) => (
  <span className={`${styles.label} ${className}`}>{children}</span>
);

export const Content = ({ children }) => (
  <div className={styles.content}>{children}</div>
);

export const Address = ({ children, href, size }) => {
  const Tag = href ? 'a' : 'span';
  return (
    <Tag
      className={`${styles.address} ${styles[size]}`}
      href={href ? `${blockExplorer}/${href}` : ''}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
    </Tag>
  );
};

export const ColorfulText1 = ({ children }) => (
  <span className={styles['colorful-text1']}>{children}</span>
);

export const ColorfulText2 = ({ children }) => (
  <span className={styles['colorful-text2']}>{children}</span>
);

export const TableRow = ({ chilred, className }) => (
  <div className={`${styles['table-row']} ${className}`}>{chilred}</div>
);

export const HistoryList = ({ slug, id }) => {
  const { t } = useTranslation();

  const { data } = useElementGoodHistory(slug, id);

  const getDate = useCallback((time) => {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${(
      '0' + date.getMinutes()
    ).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  }, []);

  const tableList = useMemo(
    () =>
      data?.map(
        (
          { node: { eventName, eventTime, fromAddress, price, toAddress } },
          index
        ) => (
          <Fragment key={index}>
            <div>{eventName}</div>
            <div>{getDisplayBalance2ETH(price, true) || '-'}</div>
            <Address size="small" href={fromAddress}>
              {showShortAddress(fromAddress)}
            </Address>
            <Address size="small" href={toAddress}>
              {showShortAddress(toAddress)}
            </Address>
            <div className={styles['table-last-row']}>{getDate(eventTime)}</div>
          </Fragment>
        )
      ),
    [data, getDate]
  );

  return (
    <div className={styles['history-table']}>
      <Label>{t('detail.event')}</Label>
      <Label>{t('detail.price')}</Label>
      <Label>{t('detail.sender')}</Label>
      <Label>{t('detail.reciever')}</Label>
      <Label className={styles['table-last-row']}>{t('detail.date')}</Label>
      {tableList}
    </div>
  );
};

const Header = ({ title, onAction, msg, action, disable, loading }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles['action-box']}>
        <span>{msg}</span>
        <BorderedBtn
          height="26px"
          onClick={onAction}
          disabled={disable}
          loading={loading}
        >
          <div className={styles.action}>{action}</div>
        </BorderedBtn>
      </div>
    </div>
  );
};
