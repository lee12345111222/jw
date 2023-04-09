import { useMemo, useState, useRef, useCallback } from 'react';

import CardList from '@/components/CardList/index';

import { BasicCard } from '@/components/Cards/index';

import { Title } from '@/components/BasicComponents';

import { useTranslation } from 'react-i18next';

// import useHistory from '@/hooks/useHistory';
import { useHistory } from 'react-router-dom';

import { message, Modal, Dropdown, Menu } from 'antd';

import unionIcon from '@/assets/icon/union.png';
import copyIcon from '@/assets/icon/copy2.png';
import editIcon from '@/assets/icon/edit.png';
import downIcon from '@/assets/icon/download.png';
import dropIcon from '@/assets/icon/delete.png';
import addIcon from '@/assets/icon/add.png';
// import uploadIcon from '@/assets/icon/upload.png';
import closeIcon from '@/assets/icon/closeIcon.png';
import showMore from '@/assets/icon/show-more.png';

import createTemp from '@/assets/img/create-temp.png';

import Dialog from '@/components/proto-ui/dialog/index';

import BorderedBtn from '@/components/BorderedBtn2/index';

import { server } from '@/constant/env/index';

import Tooltip from '@/ui/tooltip/index';

import {
  getSpaceList,
  dropSpace,
  create,
  copySpace
  // buildingTemp
} from '@/api/user';

import { useApi2 } from '@/hooks/useApi';

import spaceTemp from '@/assets/img/create-temp.png';

import styles from './space.module.css';

const { confirm } = Modal;
const { Item } = Menu;

const opts = ['10 × 10', '20 × 20', '30 × 30', '40 × 40', '50 × 50'];

export default function Space({ account, getToken }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [
    tempLoading
    // , setTempLoading
  ] = useState(false);

  const {
    data: { data: { space_list: data } } = { data: { space_list: [] } },
    run,
    loading
  } = useApi2(() => getSpaceList({ address: account }), {}, [account]);

  const { run: createSPace } = useApi2(create, {
    manual: true,
    tokenKey: 'login_token'
  });
  const { run: cpSPace } = useApi2(copySpace, {
    manual: true,
    tokenKey: 'login_token'
  });
  const { run: drpSPace } = useApi2(dropSpace, {
    manual: true,
    tokenKey: 'login_token'
  });

  const { t } = useTranslation();

  const history = useHistory();

  const handlePublish = useCallback(
    (size, uuid) => {
      history.push(`/blueprint-publish/${size}/${uuid}`);
    },
    [history]
  );

  const handleCreate = useCallback(
    async ({ name, size: sizeStr }) => {
      setDialogLoading(true);
      const size = sizeStr.split(' × ');
      const res = await createSPace({
        name,
        long: size[1],
        width: size[0],
        height: size.sort((a, b) => a - b)[0],
        address: account
      });

      console.log('res >>>', res);

      if (res?.code !== 200) {
        setDialogLoading(false);
        return;
      }

      await run({ address: account });
      setDialogLoading(false);
      setOpenDialog(false);
    },
    [account, createSPace, run]
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

  const handleOpenEditor = useCallback(
    (uuid) => {
      if (!account) {
        return message.info('Connect Wallet first');
      }
      window.open(`/editor/${uuid}`);
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

  const spaceList = useMemo(
    () =>
      data?.map(({ uuid, head_img, name, width, long, height }) => (
        <BasicCard
          key={uuid}
          img={head_img || spaceTemp}
          title={<span className={styles['card-title']}>{name}</span>}
          pointer={false}
        >
          <div className={styles['space-size']}>
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
              }}
            >
              <Dropdown overlay={menu(uuid, width)} trigger={['click']}>
                <img src={showMore} alt="" style={{ cursor: 'pointer' }} />
              </Dropdown>
            </div>
            {/* )} */}
          </div>
          <div className={styles['action-list']}>
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
    <div className={styles.column}>
      <StatusBar
        count={data?.length || 0}
        onCreate={() => setOpenDialog(true)}
      />
      <CardList loading={loading || tempLoading}>{spaceList}</CardList>;
      <CreateDialog
        loading={dialogLoading}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

const StatusBar = ({ count, onCreate }) => {
  const { t } = useTranslation();

  return (
    <Title title={count + ' ' + t('statusbar.results')}>
      <div className={styles.statusbar}>
        <Tooltip title="Create">
          <img src={addIcon} onClick={onCreate} alt="" />
        </Tooltip>
        {/* <Tooltip title="Upload">
          <img src={uploadIcon} alt="" />
        </Tooltip> */}
      </div>
    </Title>
  );
};

const CreateDialog = ({ open, onClose, onCreate, loading }) => {
  const { t } = useTranslation();

  const nameInput = useRef();
  const selectElement = useRef();

  const options = useMemo(
    () => opts.map((item, index) => <option key={index}>{item}</option>),
    []
  );

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
      <div className={styles.dialog}>
        <div className={styles['dialog-header']}>
          <span>{t('create.create')}</span>
          <img src={closeIcon} alt="" onClick={onClose} />
        </div>

        <div className={styles['dialog-Body']}>
          <div className={styles['input-container']}>
            <input
              ref={nameInput}
              className={styles.input}
              placeholder={t('create.input_place1')}
            />

            <select ref={selectElement} className={styles.select}>
              {options}
            </select>
          </div>

          <div className={styles.templist}>
            <TempItem />
          </div>

          <div className={styles['dialog-footer']}>
            <BorderedBtn
              bgColor=""
              borderWidth="1px"
              width="128px"
              onClick={onClose}
            >
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

const TempItem = () => {
  const { t } = useTranslation();
  return (
    <div
      className={styles['item-temp']}
      // onClick={() => selectItem(null)}
    >
      <img src={createTemp} alt="" />
      <div className={styles['temp-info-container']}>
        <div className={styles['temp-info']}>
          <div>{t('create.default')}</div>
          <div>0 {t('create.frames')}</div>
        </div>
        <div
          className={styles['temp-info']}
          style={{ fontSize: '12px', color: 'rgba(255, 255, 255, .65)' }}
        >
          <div>By @ehr_wolfgang</div>
          <div>{t('create.free')}</div>
        </div>
      </div>
    </div>
  );
};
