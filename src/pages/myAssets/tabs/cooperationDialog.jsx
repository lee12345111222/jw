import React, { useState, useCallback, useEffect, useRef } from 'react';

import styles from './cooperationDialog.module.css';
import classNames from 'classnames/bind';
import {
  addCollaborator as addCollaboratorAPI,
  removeCollaborator as removeCollaboratorAPI,
  getMyCollaborator as getMyCollaboratorAPI
} from '@/api/user';

import { Input } from 'antd';

import Dialog from '@/ui/dialog/index';
import Empty from '@/components/CardList/components/Empty/index';
import Loading from '@/components/CardList/components/Loading/index';
import { Flex } from '@/components/Basic';

import { Button } from '@/custom-ui/index';
import { ArrowDownIcon, CheckMarkIcon } from '@/components/BorderedBtn2/index';
import { Dropdown } from '@/custom-ui/dropdown/index';

import useApi from '@/hooks/useApi';
import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';

import cooperation from '@/assets/icon/cooperation.png';
import cooperationIcon from '@/assets/icon/cooperation-icon.png';
import InviteSuccessicon from '../assets/invite-success.png';
import InviteErroricon from '../assets/invite-error.png';
import tempAutor from '@/assets/img/author.png';

import { showShortAddress, fillAddress } from '@/utils/common';
import CloseIcon from '@/icons/close/index';

const cx = classNames.bind(styles);

export default function CooperationDialogImg({ parcelId }) {
  const [showCooperations, setShowCooperations] = useState(false);
  return (
    <>
      <img
        src={cooperation}
        className={cx('cooperation-img')}
        alt=""
        onClick={() => setShowCooperations(true)}
      />
      {showCooperations && (
        <CooperationDialog
          open={showCooperations}
          onCancel={() => setShowCooperations(false)}
          parcelId={parcelId}
        />
      )}
    </>
  );
}

export const CooperationDialog = ({ open, onCancel, parcelId }) => {
  const [collaborators, setCollaborator] = useState();
  const cooperationRef = useRef();
  const [currentRemover, setcurrentRemover] = useState();
  const [showDoubleConfirm, setDoubleConfirm] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const [getToken] = useLoginToken();

  const { account } = useWallet();

  const { run: addCollaborator, loading: inviteLoading } = useApi(
    addCollaboratorAPI,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 200) {
          setShowSuccessDialog(true);
          getMyCollaboratorCallback();
          cooperationRef.current.state.value = '';
        } else {
          setShowErrorDialog(true);
        }
      }
    }
  );

  const addCollaboratorCallback = useCallback(
    async ({ collaborator }) => {
      const token = await getToken();
      if (!token || !account) return;
      let params = {
        login_token: token,
        address: account,
        parcel_id: parcelId,
        collaborator
      };
      addCollaborator(params);
    },
    [getToken, addCollaborator, account, parcelId]
  );

  const { run: removeCollaborator, loading: removeLoading } = useApi(
    removeCollaboratorAPI,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 200) {
          setDoubleConfirm(false);
          getMyCollaboratorCallback();
        }
      }
    }
  );

  const removeCollaboratorCallback = useCallback(
    async ({ collaborator }) => {
      const token = await getToken();
      if (!token || !account) return;
      let params = {
        login_token: token,
        address: account,
        collaborator,
        parcel_id: parcelId
      };
      removeCollaborator(params);
    },
    [getToken, account, removeCollaborator, parcelId]
  );

  const { run: getMyCollaborator, loading: getCollaboratorLoading } = useApi(
    getMyCollaboratorAPI,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 200) {
          const { collaborators } = res.data;
          setCollaborator(() => collaborators);
        }
        return;
      }
    }
  );

  const getMyCollaboratorCallback = useCallback(async () => {
    if (!account) return;
    let params = {
      address: account,
      parcel_id: parcelId
    };
    getMyCollaborator(params);
  }, [getMyCollaborator, account, parcelId]);

  useEffect(() => {
    getMyCollaboratorCallback();
  }, [getMyCollaboratorCallback]);

  const handleClick = () => {
    const inputValue = cooperationRef?.current?.state?.value ?? '';
    if (!inputValue) {
      return;
    }
    addCollaboratorCallback({
      collaborator: inputValue
    });
  };

  const handleConfirm = () => {
    removeCollaboratorCallback({
      collaborator: fillAddress(currentRemover)
    });
  };

  const handleRemove = (value) => {
    setDoubleConfirm(true);
    setcurrentRemover(value);
  };
  // 0x842391a5a2FB4C75d9d3169BD70183331d2A75FE
  return (
    <>
      <Dialog
        title="Invite"
        footer=""
        open={open}
        onCancel={onCancel}
        className={cx('dialogChange')}
        animate={false}
        style={{ width: 400 }}
      >
        <div className={cx('cooperation-container')}>
          <InputArea
            ref={cooperationRef}
            loading={inviteLoading}
            disabled={getCollaboratorLoading}
            onClick={handleClick}
          />
          <CooperationSubtitle />
          <CooperationListTitle />
          <div className={cx('result-container')}>
            <Result
              loading={getCollaboratorLoading}
              member={collaborators?.length}
              collaborators={collaborators}
              onRemove={(value) => handleRemove(value)}
            />
          </div>
        </div>
      </Dialog>
      {showDoubleConfirm && (
        <DoubleConfirmDialog
          open={showDoubleConfirm}
          onCancel={() => setDoubleConfirm(false)}
          onConfirm={handleConfirm}
          loading={removeLoading}
          address={currentRemover}
        />
      )}
      {showSuccessDialog && (
        <InviteSuccessDialog
          open={showSuccessDialog}
          onCancel={() => setShowSuccessDialog(false)}
        />
      )}
      {showErrorDialog && (
        <InviteErrorDialog
          open={showErrorDialog}
          onCancel={() => setShowErrorDialog(false)}
        />
      )}
    </>
  );
};

const InviteDialog = ({ src, result, open, onCancel }) => {
  return (
    <Dialog header={null} footer={null} open={open} onCancel={onCancel}>
      <Flex
        fd="column"
        ai="center"
        jc="center"
        gap="24px"
        style={{ width: 439, height: 182 }}
      >
        <div className={cx('invite-dialog')}>
          <CloseIcon onClick={onCancel} />
        </div>
        <img src={src} alt="" />
        <div className={cx('invite-result')}>{result}</div>
      </Flex>
    </Dialog>
  );
};

const InviteSuccessDialog = ({ open, onCancel }) => {
  return (
    <InviteDialog
      open={open}
      onCancel={onCancel}
      src={InviteSuccessicon}
      result="invitation succeeded!"
    />
  );
};

const InviteErrorDialog = ({ open, onCancel }) => {
  return (
    <InviteDialog
      open={open}
      onCancel={onCancel}
      src={InviteErroricon}
      result="invitation failed!"
    />
  );
};

const DoubleConfirmDialog = ({
  open,
  onCancel,
  onConfirm,
  loading,
  address
}) => {
  const DoubleFooter = ({ onConfirm, onCancel, loading }) => {
    return (
      <div className={cx('remove-dialog-footer')}>
        <Button
          height="28px"
          width="132px"
          purple2
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          height="28px"
          width="132px"
          onClick={onConfirm}
          loading={loading}
        >
          Confirm
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      title="Are you sure?"
      onCancel={onCancel}
      footer={
        <DoubleFooter
          onCancel={onCancel}
          onConfirm={onConfirm}
          loading={loading}
        />
      }
    >
      <div style={{ width: '400px' }}>
        {`Are you sure you want to remove ${showShortAddress(
          address
        )} ? They may not be able toaccess this parcel anymore.`}
      </div>
    </Dialog>
  );
};

const RemoveComponent = () => {
  return (
    <div
      className={cx(
        'cooperation-item',
        'cooperation-remove-color',
        'TextCenter'
      )}
    >
      Remove
    </div>
  );
};

const CreateComponent = ({ name, flag }) => {
  return (
    <div className={cx('cooperation-item', { TextCenter: !flag })}>
      {flag ? <CheckMarkIcon /> : null}
      {name}
    </div>
  );
};

const LinkItem = ({ collaborator, currentPosition = 'Editor', onRemove }) => {
  const options = [
    {
      component: <CreateComponent name="Editor" flag={true} />,
      name: 'Editor'
    },
    {
      component: <RemoveComponent />,
      name: 'Remove'
    }
  ];

  const handleRemove = () => {
    onRemove(collaborator);
  };
  const handleSelect = (e) => {
    if (e.name !== 'Remove') {
      return;
    }
    handleRemove();
  };
  return (
    <Flex ai="center" jc="space-between">
      <Flex ai="center" jc="center" gap="0 16px">
        <img src={tempAutor} alt="" style={{ width: '28px', height: '28px' }} />
        <div className={cx('cooperation-desc')}>
          {showShortAddress(collaborator)}
        </div>
      </Flex>
      <Dropdown
        options={options}
        className={cx('dropdown')}
        onSelect={handleSelect}
      >
        <div
          style={{
            width: '140px'
          }}
        >
          <Flex
            ai="center"
            jc="flex-end"
            gap="0px 8px"
            className={cx('cooperation-hover')}
          >
            <div>{currentPosition}</div>
            <ArrowDownIcon />
          </Flex>
        </div>
      </Dropdown>
    </Flex>
  );
};

const InputArea = React.forwardRef(({ onClick, loading, disabled }, ref) => {
  return (
    <Flex ai="center" jc="center" gap="0 10px">
      <Input
        style={{
          borderColor: '#2C3742',
          borderRadius: '4px'
        }}
        ref={ref}
        placeholder="Enter the wallet address here"
        type="text"
      />
      <Button
        width="88px"
        onClick={onClick}
        loading={loading}
        disabled={disabled}
      >
        Invite
      </Button>
    </Flex>
  );
});

const CooperationSubtitle = () => {
  return (
    <div className={cx('cooperation-text')}>
      Everyone at VisionTeam can access this file.
    </div>
  );
};

const CooperationListTitle = () => {
  return (
    <Flex ai="center" gap="0 8px" style={{ margin: '20px 0px' }}>
      <img
        src={cooperationIcon}
        alt=""
        style={{ width: '14px', height: '14px' }}
      />
      <div className="cooperation-title">Anyone with the link：</div>
    </Flex>
  );
};

const LinkList = ({ collaborators, onRemove }) => {
  return (
    <Flex fd="column" gap="16px 0px" className={cx('link-container')}>
      {collaborators?.map((item) => (
        <LinkItem
          key={item?.address}
          collaborator={item?.address}
          onRemove={onRemove}
        ></LinkItem>
      ))}
    </Flex>
  );
};

const Result = ({ loading, member, collaborators, onRemove }) => {
  if (loading) {
    return <Loading loading={loading} />;
  }
  if (member > 0) {
    return (
      <>
        <LinkList collaborators={collaborators} onRemove={onRemove} />
        {/* <div style={{height: 40}}></div> */}
      </>
    );
  }
  if (!member) {
    return <Empty show={!member} emptyMsg="no collaborators" />;
  }
  return null;
};
