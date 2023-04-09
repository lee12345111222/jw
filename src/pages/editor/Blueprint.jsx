import { useEffect, useMemo, useCallback, useState, useRef } from 'react';

import Dialog, {
  ConfirmDialog,
  LoadingDialog,
  SuccessDialog,
  FailDialog
} from '@/ui/dialog/index';

// import Web3 from 'web3';
// import { confirmTransaction } from '@/utils/common';

import { etherscan } from '@/constant/env/index';

import { getblueprints, bindbuildingtemplate } from '@/api/editor';
import useApi from '@/hooks/useApi';

import { useWallet } from 'use-wallet';
import useBlueprint from '@/hooks/useBlueprint';

import useLoginToken from '@/hooks/useLoginToken';
import { message } from 'antd';

import { Card, Image, Dropdown, Input, Flex, Button } from '@/custom-ui/index';

import Loading from '@/components/CardList/components/Loading/index';
import Empty from '@/components/CardList/components/Empty/index';
// import Modal from '@/ui/modal/index';
import CloseIcon from '@/icons/close/index';
import refreshIcon from '@/assets/icon/refresh-icon.png';

import backpackIcon from '@/assets/icon/backpack-icon.png';

import classes from './Blueprint.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

export default function Blueprint({ open, onClose, tokenId, unityContext }) {
  const {
    data: result,
    run,
    loading
  } = useApi(getblueprints, { manual: true });

  const { account } = useWallet();
  const [getToken] = useLoginToken();

  const handleRefresh = useCallback(async () => {
    const loginToken = await getToken();
    if (!loginToken) {
      return;
    }

    run({ login_token: loginToken, address: account, parcel_id: tokenId });
  }, [account, getToken, run, tokenId]);

  useEffect(() => {
    if (!account || !tokenId) {
      return;
    }
    const asyncFn = async () => {
      const loginToken = await getToken();
      if (!loginToken) {
        return;
      }

      run({ login_token: loginToken, address: account, parcel_id: tokenId });
    };

    asyncFn();
  }, [account, getToken, run, tokenId]);

  const [selectorState, setSelectorState] = useState('All Blueprint');

  const blueprintList = useMemo(() => {
    if (!result) {
      return '';
    }
    const { code, data, msg } = result;
    if (code !== 200) {
      return message.error(msg);
    }

    const { blueprints = [] } = data;
    return blueprints
      .filter(({ is_bind }) => {
        switch (selectorState) {
          case 'All Blueprint':
            return true;
          case 'Bindable Blueprint':
            return !is_bind;
          case 'Usable Blueprint':
            return is_bind;
          default:
            return false;
        }
      })
      .map((blueprint) => (
        <div key={blueprint.token_id} className={cx('blueprint-item')}>
          <BlueprintCard
            tokenId={tokenId}
            unityContext={unityContext}
            {...blueprint}
          />
        </div>
      ));
  }, [result, selectorState, tokenId, unityContext]);

  const [selectedTabIndex, setSelectedTabIndex] = useState(1);

  return (
    <Dialog
      header={<DialogHeader onClose={onClose} />}
      className={cx('blueprint-dialog')}
      footer=""
      open={open}
    >
      <div className={cx('tab-container')}>
        <Tabbar
          onChange={setSelectedTabIndex}
          selected={selectedTabIndex}
          tabs={['Voxel', 'Blueprint']}
        />
        <div className={cx('tab-actions')}>
          <img
            onClick={handleRefresh}
            className={cx('refresh-icon')}
            src={refreshIcon}
            alt=""
          />
          <CustomSelect
            onSelect={setSelectorState}
            defaultValue="All Blueprint"
            options={[
              'All Blueprint',
              'Bindable Blueprint',
              'Usable Blueprint'
            ]}
          />
        </div>
      </div>

      <div className={cx('dialog-container')}>
        {selectedTabIndex === 1 && (
          <>
            {loading && (
              <div className={cx('loading')}>
                <Loading loading={loading} />
              </div>
            )}
            <div className={cx('blueprint-list')}>{blueprintList}</div>
            {!loading && blueprintList.length === 0 && (
              <div className={cx('blueprint-empty')}>
                <Empty show />
              </div>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
}

const BlueprintCard = ({
  name,
  image,
  style,
  is_bind,
  token_id,
  tokenId,
  unityContext
}) => {
  const [loading, setLoading] = useState(false);
  const [bindLoading, setBindLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const { account } = useWallet();
  const [getToken] = useLoginToken();

  const { run } = useApi(bindbuildingtemplate, {
    manual: true
  });

  const { bindBlueprint, isBindingBlueprint } = useBlueprint();

  const [bindConfirmStatus, setBindConfirmStatus] = useState(false);
  const [applyConfirmStatus, setApplyConfirmStatus] = useState(false);

  const [applySuccess, setApplySuccess] = useState(false);
  const [applyFail, setApplyFail] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const [bindFail, setBindFail] = useState(false);
  const [txHash, setTxHash] = useState('1');

  // const { ethereum } = useWallet();

  const handleBind = useCallback(async () => {
    setBindConfirmStatus(false);
    setLoading(true);

    // let tx;

    try {
      const { transactionHash } = await bindBlueprint(token_id, tokenId);
      // tx = transactionHash;
      setLoading(false);
      setTxHash(transactionHash);
      setBindLoading(true);
    } catch (e) {
      console.log('e >>>', e);
      setLoading(false);
      setBindFail(true);
    }

    // const web3 = new Web3(ethereum);
    // await confirmTransaction(web3, tx);
  }, [bindBlueprint, tokenId, token_id]);

  const handleUse = useCallback(async () => {
    setApplyConfirmStatus(false);
    setApplyLoading(true);
    const token = await getToken();
    if (!token) {
      setApplyLoading(false);
    }
    const { code } = await run({
      login_token: token,
      address: account,
      parcel_tid: tokenId,
      blueprint_tid: token_id
    });

    setApplyLoading(false);

    if (code === 200) {
      unityContext.send('BuildSurface', 'ReloadParcel');
      setApplySuccess(true);
    } else {
      setApplyFail(true);
    }
  }, [account, getToken, run, tokenId, token_id, unityContext]);

  const handleJump = useCallback(
    (e) => {
      e.preventDefault();
      window.open(`${etherscan}/tx/${txHash}`);
    },
    [txHash]
  );

  const handleCheck = useCallback(async () => {
    setCheckingStatus(true);
    const bindAlready = await isBindingBlueprint(tokenId, token_id);
    setCheckingStatus(false);

    if (bindAlready) {
      setTxHash('');
      setLoading(false);
      setBindLoading(true);
      return;
    }

    setBindConfirmStatus(true);
  }, [isBindingBlueprint, tokenId, token_id]);

  return (
    <Card className={cx('blueprint-card')}>
      <Image ar="7 / 4" src={image} />
      <div className={cx('card-details')}>
        <div className={cx('blueprint-title')}>{name || '-'}</div>

        <div className={cx('blueprint-tags')}>
          <div className={cx('style-container')}>
            <StyleIcon />
            <span>{style}</span>
          </div>

          {!!is_bind && (
            <Button purple2 onClick={() => setApplyConfirmStatus(true)}>
              <div className={cx('card-btn')}>Apply</div>
            </Button>
          )}
          {!is_bind && (
            <Button onClick={handleCheck}>
              <div className={cx('card-btn')}>Bind</div>
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog open={loading} msg="Binding" />
      <LoadingDialog open={checkingStatus} msg="Checking" />
      <LoadingDialog open={applyLoading} msg="Applying the Blueprint" />
      <SuccessDialog
        open={bindLoading}
        title="Binding..."
        onClose={() => setBindLoading(false)}
        msg={
          <div>
            <div>
              Already submitted the binding transaction to the chain, Please
              wait for 3 - 5 minutes.
            </div>
            <div
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, .5)',
                marginTop: '10px'
              }}
            >
              Click the refresh button to update the blueprint state.
            </div>
          </div>
        }
        footer={
          <>
            {!!txHash && (
              <div className={cx('success-dialog-footer')}>
                <a
                  onClick={handleJump}
                  target="_blank"
                  rel="noreferrer"
                  href={`${etherscan}/tx/${txHash}`}
                >
                  Click to View On Etherscan &gt;&gt;
                </a>
              </div>
            )}
          </>
        }
      />

      <SuccessDialog
        open={applySuccess}
        onClose={() => setApplySuccess(false)}
        title=""
        msg={
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, .5)'
            }}
          >
            Apply the Blueprint successfully!
          </div>
        }
        footer=""
      />

      <FailDialog
        open={applyFail}
        onClose={() => setApplyFail(false)}
        title=""
        msg={
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, .5)'
            }}
          >
            Failed to apply Blueprint, please check your network connection.
          </div>
        }
        footer=""
      />

      <FailDialog
        open={bindFail}
        onClose={() => setBindFail(false)}
        title=""
        msg={
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, .5)'
            }}
          >
            Failed to bind
          </div>
        }
        footer=""
      />

      <ConfirmDialog
        open={bindConfirmStatus}
        msg="Do you confirm to bind blueprint? unbinding is not allowed after binding."
        onConfirm={handleBind}
        onCancel={() => setBindConfirmStatus(false)}
      />

      <ConfirmDialog
        open={applyConfirmStatus}
        msg="Do you confirm to apply the blueprint? the original building will be overwritten after applying."
        onConfirm={handleUse}
        onCancel={() => setApplyConfirmStatus(false)}
      />
    </Card>
  );
};

const StyleIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9 12.8384H1.39999V4.43843H3.49999V1.63843H12.6V12.8384H11.9ZM4.19999 2.33843V10.7384H3.49999V5.13843H2.09999V12.1384H11.9V2.33843H4.19999ZM6.29999 9.68843V8.98843H9.79999V9.68843H6.29999ZM6.29999 6.88843H9.79999V7.58843H6.29999V6.88843ZM6.29999 4.78843H9.79999V5.48843H6.29999V4.78843Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.4"
    />
  </svg>
);

const DialogHeader = ({ onClose }) => {
  return (
    <div className={cx('dialog-header')}>
      <div className={cx('dialog-title')}>
        <img src={backpackIcon} alt="" />
        <span>My Backpack</span>
      </div>
      <div>
        <CloseIcon onClick={onClose} className={cx('close-icon')} />
      </div>
    </div>
  );
};

const Tabbar = ({ tabs, onChange, selected }) => {
  return (
    <ul className={cx('tabbar')}>
      {tabs.map((item, index) => (
        <li
          onClick={() => onChange(index)}
          className={cx('tabbar-item', {
            'tabbar-item_selected': selected === index
          })}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

const CustomSelect = ({
  onSelect,
  placeholder,
  defaultValue = '',
  options,
  error,
  ...props
}) => {
  const refEl = useRef();

  useEffect(() => {
    refEl.current.value = defaultValue;
  }, [defaultValue, refEl]);

  const handleSelect = useCallback(
    (val) => {
      refEl.current.value = val;
      onSelect?.(val);
    },
    [onSelect, refEl]
  );

  return (
    <Dropdown
      onSelect={handleSelect}
      options={options}
      className={cx('dropdown')}
    >
      <Flex ai="center">
        <Input
          className={cx('input')}
          placeholder={placeholder}
          ref={refEl}
          error={error}
          readOnly
        />
        <DropdownIcon className={cx('dropdown-icon')} />
      </Flex>
    </Dropdown>
  );
};

const DropdownIcon = ({ className }) => (
  <svg
    className={className}
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.81132 2H2.56604V2.75472H1.81132V2ZM2.71698 2H3.4717V2.75472H2.71698V2ZM3.62264 2H4.37736V2.75472H3.62264V2ZM4.5283 2H5.28302V2.75472H4.5283V2ZM5.43396 2H6.18868V2.75472H5.43396V2ZM1.81132 2.90566H2.56604V3.66038H1.81132V2.90566ZM0 2H0.754717V2.75472H0V2ZM0.90566 2H1.66038V2.75472H0.90566V2ZM7.24528 2H8V2.75472H7.24528V2ZM6.33962 2H7.09434V2.75472H6.33962V2ZM0.90566 2.90566H1.66038V3.66038H0.90566V2.90566ZM2.71698 2.90566H3.4717V3.66038H2.71698V2.90566ZM3.62264 2.90566H4.37736V3.66038H3.62264V2.90566ZM4.5283 2.90566H5.28302V3.66038H4.5283V2.90566ZM5.43396 2.90566H6.18868V3.66038H5.43396V2.90566ZM1.81132 3.81132H2.56604V4.56604H1.81132V3.81132ZM2.71698 3.81132H3.4717V4.56604H2.71698V3.81132ZM3.62264 3.81132H4.37736V4.56604H3.62264V3.81132ZM4.5283 3.81132H5.28302V4.56604H4.5283V3.81132ZM5.43396 3.81132H6.18868V4.56604H5.43396V3.81132ZM2.71698 4.71698H3.4717V5.4717H2.71698V4.71698ZM3.62264 4.71698H4.37736V5.4717H3.62264V4.71698ZM4.5283 4.71698H5.28302V5.4717H4.5283V4.71698ZM3.62264 5.62264H4.37736V6.37736H3.62264V5.62264ZM6.33962 2.90566H7.09434V3.66038H6.33962V2.90566Z"
      fill="currentColor"
    />
  </svg>
);
