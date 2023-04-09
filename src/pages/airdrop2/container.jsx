import React, { useState, useCallback, useEffect } from 'react';

import { useWallet } from 'use-wallet';

import { Flex } from '@/components/Basic';

import { Login } from '@/components/header/index';

import Model from '@/ui/modal/index.jsx';

import loadingIcon from '@/assets/icon/loading.png';

import proMptIcon from '@/assets/icon/prompt-icon.png';

import successIcon from '@/assets/icon/finish.png';

import styles from '../airdropDaily/AirdropScore.module.css';

import { showShortAddress } from '@/utils/common';

import { Button } from '@/custom-ui/index';

import Dialog from '@/ui/dialog/index';

import useApi from '@/hooks/useApi';

import { postConfirmInvite } from '@/api/user';

import { message } from 'antd';

import useLoginToken from '@/hooks/useLoginToken';

import { useParams } from 'react-router-dom';
import Airdrop from './index';
export const AirDrop3 = () => {
  const { account, status } = useWallet();
  const [getToken, , token] = useLoginToken();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(1);

  // 获取网站的参数
  const { type, address } = useParams();

  const [retry, setRetry] = useState(false);

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

  const handleClose = useCallback(() => {
    setRetry(false);
  }, []);

  useEffect(() => {
    if (retryCount > 1) {
      setRetry(true);
    }
  }, [retryCount]);

  return (
    <>
      <Airdrop token={token} getToken={getToken} />
      <DialogLogin open={showLogin} />
      {!retryCount && !address && <ModelAndLoading loading={loading} />}

      {type === 'confirminvite' && (
        <DialogConfirm
          address={address}
          account={account}
          token={token}
          onGetToken={handleGetToken}
          loading={loading}
        />
      )}

      {!!retryCount && !token && (
        <RetryDialog
          open={retry}
          onCancel={handleClose}
          onRetry={handleGetToken}
          loading={loading}
        />
      )}
    </>
  );
};

// 登录错误重试
export function RetryDialog({ loading, onCancel, onRetry, open }) {
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
      open={open}
      style={{ width: '400px' }}>
      <Flex ai="center" jc="center" fd="column" gap="20px">
        <img src={proMptIcon} alt="" width="36px" height="36px" />
        <div>Signing failed, please try again</div>
      </Flex>
    </Dialog>
  );
}

// 登录弹窗
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
          <div
            style={{
              fontSize: 14,
              lineHeight: '18px',
              textAlign: 'center',
              textTransform: 'capitalize'
            }}>
            Please Log in first! then you can participate in airdrop missions to
            earn points to get rich rewards!
          </div>
        </Flex>
      </Dialog>
    )
  );
}

// 链接邀请
function DialogConfirm({ address, account, onGetToken, token, loading }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (address && account && address.toLowerCase() !== account.toLowerCase()) {
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
          message.error('You are not eligible to be invited');
        }
        setOpen(false);
      }
    }
  );

  const handleConfirm = useCallback(async () => {
    if (!token) {
      return onGetToken();
    }

    confirmInvite({ address: account, login_token: token, invitor: address });
  }, [account, address, confirmInvite, onGetToken, token]);

  const handleCancel = useCallback(async () => {
    setOpen(false);
  }, []);

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
                disabled={confirmLoading}
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                height="28px"
                width="132px"
                onClick={handleConfirm}
                loading={confirmLoading}>
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

// 全局loading
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
