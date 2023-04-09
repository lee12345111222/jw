import { useState, useMemo, useCallback, useEffect } from 'react';

import CardList from '@/components/CardList/index';

import { Title } from '@/components/BasicComponents';

import styles from './share.module.css';
import classNames from 'classnames/bind';

import BorderedBtn from '@/components/BorderedBtn2/index';

import Dialog from '@/components/proto-ui/dialog/index';

import { Poster, ItemInfo, TitleBox, UserInfo } from '../discover/DiscoverItem';
import likeIcon from '@/assets/icon/like-icon.png';
import previewCount from '@/assets/icon/preview-count.png';
import showMore from '@/assets/icon/show-more.png';
import changeIcon from '@/assets/icon/change-icon.png';
import hideIcon from '@/assets/icon/hide-icon.png';
import showIcon from '@/assets/icon/show-icon.png';
import deleteIcon from '@/assets/icon/delete-icon.png';

import drag from '@/assets/icon/drag.png';
import closeIcon from '@/assets/icon/closeIcon.png';

import { message, Dropdown, Menu, Modal } from 'antd';

import useApi from '@/hooks/useApi';

import {
  list as getList,
  customSpaceInfo,
  dropOwnSpcae,
  hideOwnSpcae
} from '@/api/share';

import useSetState from '@/hooks/useSetState';

const { confirm } = Modal;

const cx = classNames.bind(styles);

const { Item } = Menu;

const Share = ({ account, getToken }) => {
  const [img, setImg] = useState();
  const [cover, setCover] = useState();
  const [uuid, setUUID] = useState();
  const [dropUUID, setDropUUID] = useState();

  const [{ page, limit, dataFilter, sorter }, setState] = useSetState({
    page: 1,
    limit: 15,
    dataFilter: 'all',
    sorter: 'newer'
  });

  const { loading, run } = useApi(getList, {
    manual: true,
    onSuccess: (res) => {
      if (res.code !== 200) {
        return;
      }
      setAmount(res.data.paging.amount);
      if (page === 1) {
        setList(res.data.space_list);
      } else {
        setList([...list, ...res.data.space_list]);
      }
    }
  });

  const { run: drop } = useApi(dropOwnSpcae, { manual: true });

  const { run: hide } = useApi(hideOwnSpcae, { manual: true });

  useEffect(() => {
    if (!dropUUID || !account) {
      return;
    }

    confirm({
      title: 'Are you sure to delete this space ?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        const login_token = await getToken();
        const { code } = await drop({
          uuid: dropUUID,
          login_token,
          address: account
        });
        if (code === 200) {
          run({
            page: page,
            limit,
            data_filter: dataFilter,
            sorter,
            owner: account
          });
        }
        return 1;
      },
      onCancel() {
        setDropUUID();
      }
    });
  }, [account, dataFilter, drop, dropUUID, getToken, limit, page, run, sorter]);

  const [amount, setAmount] = useState(0);

  const [list, setList] = useState([]);

  const handleClose = useCallback(() => {
    setImg();
    setCover();
    setUUID();
  }, []);

  const { run: upFile, loading: loading2 } = useApi(customSpaceInfo, {
    manual: true,
    formatResult: async (res) => {
      const waiter = async () =>
        new Promise((resolve) => {
          setTimeout(() => {
            run({
              page: page,
              limit,
              data_filter: dataFilter,
              sorter,
              owner: account
            });
            resolve();
          }, 1000);
        });

      handleClose();

      if (page === 1) {
        await waiter();
      }
      return res;
    },
    onSuccess: async (res) => {
      const { code } = await res;
      if (code !== 200) {
        return;
      }

      if (page !== 1) {
        setState({ page: 1 });
      }
    }
  });

  useEffect(() => {
    if (!account) {
      return;
    }
    run({
      page: page,
      limit,
      data_filter: dataFilter,
      sorter,
      owner: account
    });
  }, [account, dataFilter, limit, page, run, sorter]);

  const handleHide = useCallback(
    async (uuid, status) => {
      const login_token = await getToken();
      const { code } = await hide({
        uuid,
        status,
        login_token,
        address: account
      });
      if (code === 200) {
        run({
          page: page,
          limit,
          data_filter: dataFilter,
          sorter,
          owner: account
        });
      }
    },
    [account, dataFilter, getToken, hide, limit, page, run, sorter]
  );

  const itemList = useMemo(
    () =>
      list.map((item) => (
        <div key={item.uuid}>
          <ShareItem
            item={item}
            onChange={setUUID}
            onDrop={setDropUUID}
            onHide={handleHide}
            loading={loading2}
          />
        </div>
      )),
    [handleHide, list, loading2]
  );

  const getNextPage = useCallback(() => {
    const hasNextPage = () => amount > limit * page;
    !loading &&
      hasNextPage() &&
      setState(({ page }) => {
        return { page: page + 1 };
      });
  }, [amount, limit, loading, page, setState]);

  const loadFile = useCallback((e) => {
    e.stopPropagation();
    const file = e.target.files[0];

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      return message.error(
        'The file format is wrong, please upload pictures in png, jpeg format'
      );
    }

    setCover(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setImg(e.target.result);
  }, []);

  const upload = useCallback(async () => {
    const token = await getToken();
    upFile({ address: account, uuid, login_token: token, upfile: cover });
  }, [account, cover, getToken, upFile, uuid]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
        <StatusBar count={amount} />
        <CardList
          onScrollToBottom={getNextPage}
          loading={loading}
          minWidth="360px">
          {itemList}
        </CardList>
      </div>

      <Dialog open={uuid}>
        <div className={styles.dialog}>
          <div className={styles['dialog-title']}>
            <div>Upload cover image</div>
            <img
              onClick={handleClose}
              className={styles['close-icon']}
              src={closeIcon}
              alt=""
            />
          </div>
          <div className={styles['dialog-content']}>
            <div className={styles['dialog-img-box']}>
              <img src={drag} style={{ width: '72px' }} alt="" />
              <div className={styles.drag}>Drag & drop file</div>
              <div className={styles['drag-text']}>
                <div>Only supports png, jpg, the size limit is 1M,</div>
                <div>
                  <span>
                    Please upload pictures according to the proportion{' '}
                  </span>
                  <span style={{ color: 'rgba(110, 145, 251, 0.85)' }}>
                    420*230
                  </span>
                </div>
                <div>Otherwise, it will affect the final effect</div>
              </div>

              {img && <img className={styles['dialog-img']} src={img} alt="" />}

              <input
                onChange={loadFile}
                className={styles['dialog-input']}
                type="file"
                accept="image/png, image/jpeg"
              />
            </div>
            <div className={styles.actions}>
              <BorderedBtn
                loading={loading2}
                onClick={upload}
                height="26px"
                width="200px">
                Confirm
              </BorderedBtn>
              <BorderedBtn
                onClick={handleClose}
                height="26px"
                bgColor="rgba(0,0,0,0)"
                borderWidth="1px"
                width="200px">
                Cancel
              </BorderedBtn>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Share;

const StatusBar = ({ count }) => {
  return (
    <Title title={count + ' results'}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}></div>
    </Title>
  );
};

const ShareItem = ({
  item: {
    head_img,
    name,
    thumb_counter,
    uuid,
    view_counter,
    owner,
    owner_name,
    owner_tid,
    status
  } = {},
  loading,
  onChange,
  onDrop,
  onHide
}) => {
  const menu = useMemo(
    () => (
      <Menu className={cx('dropdown')}>
        <Item
          onClick={() => onChange(uuid)}
          className={cx('dropdown-item-container')}
          key="0">
          <div className={cx('dropdown-item')}>
            <img src={changeIcon} alt="" />
            <div>Change COver</div>
          </div>
        </Item>
        {status === 1 ? (
          <Item
            onClick={() => onHide(uuid, 2)}
            className={cx('dropdown-item-container')}
            key="1">
            <div className={cx('dropdown-item')}>
              <img src={hideIcon} alt="" />
              <div>Hide Space</div>
            </div>
          </Item>
        ) : (
          <Item
            onClick={() => onHide(uuid, 1)}
            className={cx('dropdown-item-container')}
            key="1">
            <div className={cx('dropdown-item')}>
              <img src={showIcon} alt="" />
              <div>Show Space</div>
            </div>
          </Item>
        )}
        <Item
          onClick={() => onDrop(uuid)}
          className={cx('dropdown-item-container')}
          key="2">
          <div className={cx('dropdown-item')}>
            <img src={deleteIcon} alt="" />
            <div>Delete Space</div>
          </div>
        </Item>
      </Menu>
    ),
    [onChange, onDrop, onHide, status, uuid]
  );

  return (
    <div className={styles['discover-item']}>
      <div className={cx('head-img')}>
        <Poster src={`${head_img}?r=${new Date()}${loading}`} />
        {status === 2 && (
          <div className={cx('img-mask')}>
            <div></div>
            <div className={cx('img-mask-text')}>Hidden Space</div>
            <div></div>
          </div>
        )}
      </div>
      <ItemInfo>
        <TitleBox>
          <span>{name || '-'}</span>
          <div className={styles['info-list']}>
            <div>
              <img src={likeIcon} alt="" />
              <span>{thumb_counter}</span>
            </div>
            <div>
              <img src={previewCount} alt="" />
              <span>{view_counter}</span>
            </div>
          </div>
        </TitleBox>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <UserInfo name={owner_name} owner={owner} tokenId={owner_tid} />
          {/* <BorderedBtn onClick={() => onChange(uuid)} height="24px">
          Change Cover
        </BorderedBtn> */}
          <Dropdown overlay={menu} trigger={['click']}>
            <img style={{ cursor: 'pointer' }} src={showMore} alt="" />
          </Dropdown>
        </div>
      </ItemInfo>
    </div>
  );
};
