import { useMemo, useCallback, useRef, useState } from 'react';

import { useWallet } from 'use-wallet';
// import useHistory from '@/hooks/useHistory';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { StatusBar } from './index';
import CardList from '@/components/CardList/index';
import { BasicCard } from '@/components/Cards/index';
import Tooltip from '@/ui/tooltip/index';

import BorderedBtn from '@/components/BorderedBtn2/index';

import { useApi2 } from '@/hooks/useApi';
import useLoginToken from '@/hooks/useLoginToken';

import { getSpaceList, dropSpace, create, copySpace } from '@/api/user';
import { server } from '@/constant/env/index';

import { message, Modal, Dropdown, Menu } from 'antd';

import classes from './DrivingRange.module.css';
import classNames from 'classnames/bind';

import spaceTemp from '@/assets/img/create-temp.png';
import unionIcon from '@/assets/icon/union.png';
import showMore from '@/assets/icon/show-more.png';
import editIcon from '@/assets/icon/edit.png';
import copyIcon from '@/assets/icon/copy2.png';
import downIcon from '@/assets/icon/download.png';
import dropIcon from '@/assets/icon/delete.png';
import addIcon from '@/assets/icon/add.png';
import createTemp from '@/assets/img/create-temp.png';
import closeIcon from '@/assets/icon/closeIcon.png';

import Dialog from '@/components/proto-ui/dialog/index';

const cx = classNames.bind(classes);
const { Item } = Menu;
const { confirm } = Modal;

export default function DrivingRange() {
  const { account } = useWallet();
  const history = useHistory();
  const { t } = useTranslation();
  const [getToken] = useLoginToken();

  const {
    data: { data: { space_list: data } } = { data: { space_list: [] } },
    run,
    loading
  } = useApi2(() => getSpaceList({ address: account }), {}, [account]);

  const { run: cpSPace } = useApi2(copySpace, {
    manual: true,
    tokenKey: 'login_token'
  });

  const { run: drpSPace } = useApi2(dropSpace, {
    manual: true,
    tokenKey: 'login_token'
  });

  const handlePublish = useCallback(
    (size, uuid) => {
      history.push(`/blueprint-publish/${size}/${uuid}`);
    },
    [history]
  );

  const handleOpenEditor = useCallback(
    (uuid) => {
      if (!account) {
        return message.info('Connect Wallet first');
      }
      // window.open(`/editor/space/${uuid}`);
      window.open(`https://editor-test.beboldcap.com/s/${uuid}`);
    },
    [account]
  );

  const menu = useCallback(
    (uuid, size) => (
      <Menu>
        <Item key="0">
          <div onClick={() => handlePublish(size, uuid)}>Publish Blueprint</div>
        </Item>
        <Item key="1">
          <div onClick={() => handleOpenEditor(uuid)}>Edit Space</div>
        </Item>
      </Menu>
    ),
    [handleOpenEditor, handlePublish]
  );

  const handleCopy = useCallback(
    async (space_uuid) => {
      confirm({
        title: 'Are you sure to copy this space ?',
        okText: t('create.confirm'),
        cancelText: t('create.cancel'),
        async onOk() {
          const { code } = await cpSPace({
            space_uuid,
            address: account
          });

          if (code === 200) {
            run({ address: account });
          }
          return 1;
        }
      });
    },
    [account, cpSPace, run, t]
  );

  const handleDownload = useCallback(
    async (uuid) => {
      message.info(t('app.message.downloading'));

      const token = await getToken();

      const formTemp = document.createElement('form');
      formTemp.action = `${server}/zone/user/downloadjson?uuid=${uuid}&login_token=${token}&address=${account}`;
      formTemp.method = 'post';
      formTemp.style.display = 'none';

      const params = { uuid, login_token: token, address: account };
      Object.keys(params).forEach((key) => {
        const input = document.createElement('input');
        input.name = key;
        input.value = params[key];
      });

      document.body.appendChild(formTemp);
      formTemp.submit();

      document.body.removeChild(formTemp);
    },
    [account, getToken, t]
  );

  const handleDrop = useCallback(
    async (space_uuid) => {
      confirm({
        title: 'Are you sure to delete this space ?',
        okText: 'Confirm',
        cancelText: t('create.cancel'),
        async onOk() {
          const { code } = await drpSPace({
            space_uuid,
            address: account
          });

          if (code === 200) {
            await run({ address: account });
          }
          return 1;
        }
      });
    },
    [account, drpSPace, run, t]
  );

  const handleCreate = useCallback(async () => {
    await run({ address: account });
  }, [account, run]);

  const spaceList = useMemo(
    () =>
      data?.map(({ uuid, head_img, name, width, long, height }) => (
        <BasicCard
          key={uuid}
          img={head_img || spaceTemp}
          title={<span className={cx('card-title')}>{name}</span>}
          pointer={false}>
          <div className={cx('space-size')}>
            <img src={unionIcon} alt="" />
            <span>
              {width} × {long} × {height}
            </span>

            {/* {process.env.REACT_APP_ENV === 'test' && ( */}
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
              <Dropdown overlay={menu(uuid, width)} trigger={['click']}>
                <img src={showMore} alt="" style={{ cursor: 'pointer' }} />
              </Dropdown>
            </div>
            {/* )} */}
          </div>
          <div className={cx('action-list')}>
            <Tooltip title="Edit">
              <img
                src={editIcon}
                onClick={() => handleOpenEditor(uuid)}
                alt=""
              />
            </Tooltip>
            <Tooltip title="Duplicate">
              <img onClick={() => handleCopy(uuid)} src={copyIcon} alt="" />
            </Tooltip>
            <Tooltip title="Download">
              <img src={downIcon} onClick={() => handleDownload(uuid)} alt="" />
            </Tooltip>
            <Tooltip title="Delete">
              <img onClick={() => handleDrop(uuid)} src={dropIcon} alt="" />
            </Tooltip>
          </div>
        </BasicCard>
      )),
    [data, handleCopy, handleDownload, handleDrop, handleOpenEditor, menu]
  );

  return (
    <div className={cx('page')}>
      <StatusBar count={(data || []).length}>
        <Creator onCreate={handleCreate} />
      </StatusBar>
      <div className={cx('list')}>
        <CardList loading={loading}>{spaceList}</CardList>
      </div>
    </div>
  );
}

const Creator = ({ onCreate }) => {
  const { account } = useWallet();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);

  const { run } = useApi2(create, {
    manual: true,
    tokenKey: 'login_token'
  });

  const handleCreate = useCallback(
    async ({ name, size: sizeStr }) => {
      setDialogLoading(true);
      const size = sizeStr.split(' × ');
      const res = await run({
        name,
        long: size[1],
        width: size[0],
        height: size.sort((a, b) => a - b)[0],
        address: account
      });

      if (res?.code !== 200) {
        setDialogLoading(false);
        return;
      }

      await onCreate();
      setDialogLoading(false);
      setOpenDialog(false);
    },
    [account, onCreate, run]
  );

  return (
    <div>
      <div onClick={() => setOpenDialog(true)} className={cx('creator')}>
        <img src={addIcon} alt="" />
        <span>Create Playground</span>
      </div>

      <CreateDialog
        loading={dialogLoading}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

const options = ['10 × 10', '20 × 20', '30 × 30', '40 × 40', '50 × 50'].map(
  (item, index) => <option key={index}>{item}</option>
);

const CreateDialog = ({ open, onClose, onCreate, loading }) => {
  const { t } = useTranslation();

  const nameInput = useRef();
  const selectElement = useRef();

  const handleCreate = useCallback(() => {
    const name = nameInput.current.value;
    const size = selectElement.current.value;

    if (!name) {
      return message.error(t('app.message.space_name_needed'));
    }
    onCreate({ name, size });
  }, [onCreate, t]);

  return (
    <Dialog open={open}>
      <div className={cx('dialog')}>
        <div className={cx('dialog-header')}>
          <span>{t('create.create')}</span>
          <img src={closeIcon} alt="" onClick={onClose} />
        </div>

        <div className={cx('dialog-Body')}>
          <div className={cx('input-container')}>
            <input
              ref={nameInput}
              className={cx('input')}
              placeholder={t('create.input_place1')}
            />

            <select ref={selectElement} className={cx('select')}>
              {options}
            </select>
          </div>

          {/* <div className={cx('templist')}>
            <TempItem />
          </div> */}

          <div className={cx('dialog-footer')}>
            <BorderedBtn
              bgColor=""
              borderWidth="1px"
              width="128px"
              onClick={onClose}>
              <span style={{ color: 'rgb(6, 196, 255)' }}>Cancel</span>
            </BorderedBtn>
            <BorderedBtn loading={loading} onClick={handleCreate} width="128px">
              Create
            </BorderedBtn>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

// const TempItem = () => {
//   const { t } = useTranslation();
//   return (
//     <div className={cx('item-temp')}>
//       <img src={createTemp} alt="" />
//       <div className={cx('temp-info-container')}>
//         <div className={cx('temp-info')}>
//           <div>{t('create.default')}</div>
//           <div>0 {t('create.frames')}</div>
//         </div>
//         <div
//           className={cx('temp-info')}
//           style={{ fontSize: '12px', color: 'rgba(255, 255, 255, .65)' }}>
//           <div>By @ehr_wolfgang</div>
//           <div>{t('create.free')}</div>
//         </div>
//       </div>
//     </div>
//   );
// };
