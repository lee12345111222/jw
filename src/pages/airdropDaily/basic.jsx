import React, { useState, useCallback, useEffect, useRef } from 'react';

import { AirDropDefault } from './index';

import { useWallet } from 'use-wallet';

import { Flex } from '@/components/Basic';

import { Login } from '@/components/header/index';

import Model from '@/ui/modal/index.jsx';

import loadingIcon from '@/assets/icon/loading.png';

import proMptIcon from '@/assets/icon/prompt-icon.png';

import successIcon from '@/assets/icon/finish.png';

import styles from './AirdropScore.module.css';

import { showShortAddress } from '@/utils/common';

import { Button } from '@/custom-ui/index';

import Dialog from '@/ui/dialog/index';

import useApi from '@/hooks/useApi';

import { postConfirmInvite } from '@/api/user';

import { message } from 'antd';

import useLoginToken from '@/hooks/useLoginToken';

import { useParams } from 'react-router-dom';

export default function AirdropContainer({ clickStatus, onClose }) {
  const { type, address: comingAddress } = useParams();
  const [address, setAddress] = useState();
  const [showStatus, setShowStatus] = useState(clickStatus);

  const onlyOnceRef = useRef(false);

  useEffect(() => {
    if (clickStatus) {
      return setAddress();
    }
    setAddress(() => comingAddress);
  }, [clickStatus, comingAddress]);

  useEffect(() => {
    setShowStatus(clickStatus);
  }, [clickStatus]);

  useEffect(() => {
    if (onlyOnceRef.current === true) {
      return;
    }
    if (type === 'confirminvite' && address) {
      setShowStatus(true);
      onlyOnceRef.current = true;
    }
  }, [address, type, clickStatus, onlyOnceRef]);

  const handleClose = useCallback(() => {
    setShowStatus(false);
    onClose();
  }, [onClose]);

  return (
    <div>
      {showStatus && <ClickAirdrop2 onClose={handleClose} address={address} />}
    </div>
  );
}

const ClickAirdrop2 = ({ onClose, address }) => {
  const { account, status } = useWallet();
  const [getToken, , token] = useLoginToken();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (status === 'disconnected' || status === 'error') {
      return setShowLogin(true);
    }
    setShowLogin(false);
  }, [status]);

  const handleGetToken = useCallback(async () => {
    setLoading(true);
    let myToken;
    try {
      myToken = await getToken();
    } catch (error) {
      myToken = null;
    }

    if (!myToken) {
      setRetryCount((v) => v + 1);
    }

    setLoading(false);

    return myToken;
  }, [getToken]);

  useEffect(() => {
    if (!address && status === 'connected' && !token) {
      handleGetToken();
    }
  }, [address, handleGetToken, status, token]);

  useEffect(() => {
    if (retryCount > 1) {
      onClose();
    }
  }, [onClose, retryCount]);

  return (
    <div>
      <AirDropDefault show={true} closeCallback={onClose} token={token} />
      <DialogLogin open={showLogin} />
      {!retryCount && !address && <ModelAndLoading loading={loading} />}

      <DialogConfirm
        address={address}
        account={account}
        token={token}
        onGetToken={handleGetToken}
        loading={loading}
      />

      {!!retryCount && !token && (
        <RetryDialog
          onCancel={onClose}
          onRetry={handleGetToken}
          loading={loading}
        />
      )}
    </div>
  );
};

export function RetryDialog({ loading, onCancel, onRetry }) {
  return (
    <Dialog
      footer={
        <div style={{ padding: '16px 0px' }}>
          <Flex ai="center" jc="center" gap="20px">
            <Button
              height="28px"
              width="132px"
              type="gray"
              outline
              disabled={loading}
              onClick={onCancel}>
              Cancel
            </Button>
            <Button
              height="28px"
              width="132px"
              loading={loading}
              onClick={onRetry}>
              Retry
            </Button>
          </Flex>
        </div>
      }
      header={null}
      open={true}
      style={{ width: '400px' }}>
      <Flex ai="center" jc="center" fd="column" gap="20px">
        <img src={proMptIcon} alt="" width="36px" height="36px" />
        <div>Signing failed, please try again</div>
      </Flex>
    </Dialog>
  );
}

export function DialogLogin({ open }) {
  return (
    open && (
      <Dialog
        open={true}
        header={null}
        style={{ width: '400px' }}
        footer={
          <Flex
            ai="center"
            jc="center"
            fd="column"
            style={{ marginBottom: '24px' }}>
            <Login />
          </Flex>
        }>
        <Flex ai="center" jc="center" fd="column" gap="20px">
          <img src={proMptIcon} alt="" width="36px" height="36px" />
          <div>
            Please Log In first! then you can participate in airdrop missions to
            earn points to get rich rewards!
          </div>
        </Flex>
      </Dialog>
    )
  );
}

export function DialogConfirm({
  address,
  account,
  onGetToken,
  token,
  loading
}) {
  const [open, setOpen] = useState(false);

  const [currentLoading, setCurrentLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (!cancelLoading) {
      setCurrentLoading(loading);
    }
  }, [cancelLoading, loading]);

  useEffect(() => {
    if (address && account && address !== account) {
      setOpen(true);
    }
  }, [account, address]);

  const { run: confirmInvite, loading: confirmLoading } = useApi(
    postConfirmInvite,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 200) {
          message.info('Accept the invitation successfully');
        } else {
          message.error(res.msg);
        }
        setOpen(false);
      }
    }
  );

  useEffect(() => {
    setCurrentLoading(confirmLoading);
  }, [confirmLoading]);

  const handleConfirm = useCallback(async () => {
    if (!token) {
      return onGetToken();
    }

    confirmInvite({ address: account, login_token: token, invitor: address });
  }, [account, address, confirmInvite, onGetToken, token]);

  const handleCancel = useCallback(async () => {
    setCancelLoading(true);
    const res = await onGetToken();
    if (res) {
      setCancelLoading(false);
      setOpen(false);
    }
  }, [onGetToken]);

  return (
    open && (
      <Dialog
        footer={
          <div style={{ padding: '16px 0px' }}>
            <Flex ai="center" jc="center" gap="20px">
              <Button
                height="28px"
                width="132px"
                type="gray"
                outline
                loading={cancelLoading}
                disabled={currentLoading}
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                height="28px"
                width="132px"
                onClick={handleConfirm}
                disabled={cancelLoading}
                loading={currentLoading}>
                Confirm
              </Button>
            </Flex>
          </div>
        }
        header={null}
        open={true}
        style={{ width: '400px' }}>
        <Flex ai="center" jc="center" fd="column" gap="20px">
          <img src={successIcon} alt="" width="36px" height="36px" />
          <div>
            {`Whether to confirm ${showShortAddress(
              address
            )} invites you to complete the daily airdrop mission`}
          </div>
        </Flex>
      </Dialog>
    )
  );
}

export function ModelAndLoading({ loading }) {
  return (
    loading && (
      <Model open={loading} backdrop={true} className={styles['model']}>
        <div className={styles['model-icon']}>
          <img src={loadingIcon} className={styles['loading-icon']} alt="" />
        </div>
      </Model>
    )
  );
}
