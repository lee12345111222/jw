import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef
} from 'react';

import styles from './treasure.module.css';

import treasureIcon from '@/assets/icon/treasure-icon.png';

import Dialog from '@/components/proto-ui/dialog/index';

import BorderedBtn from '@/components/BorderedBtn2/index';

import closeIcon from '@/assets/icon/closeIcon.png';
import loadingIcon from '@/assets/icon/loading.png';
import successIcon from '@/assets/icon/success-icon.png';

import { DatePicker, message } from 'antd';

import styled from 'styled-components';

import useTreasureBox from '@/hooks/useTreasureBox';

import { treasureList } from '@/api/treasure';

import useApi from '@/hooks/useApi';

import { useWallet } from 'use-wallet';

import CardList from '@/components/CardList/index';

import { getDisplayBalance2ETH } from '@/utils/common';

import { confirmTransaction } from '@/utils/common';

import Web3 from 'web3';

import ERC20ContractAbi from '../../../constant/abi/ERC20.json';
import { TreasureBox as TreasureBoxContractAddress } from '@/constant/env/index';

import { sleep } from '@/utils/common';

import useChainShouldChange from '@/hooks/useChainShouldChange';
import useERC20Handle from '@/hooks/useERC20Handle';

const { RangePicker } = DatePicker;

const Treasure = () => {
  const { account, ethereum } = useWallet();
  const {
    run,
    data: { data: { boxs: list } } = { data: { boxs: [] } },
    loading: loading2
  } = useApi(treasureList, {
    manual: true
    // onSuccess(res) {}
  });

  useEffect(() => {
    if (account) {
      run(account.toLowerCase());
    }
  }, [account, run]);

  const { createBox, deleteBox } = useTreasureBox();
  const chainShouldChange = useChainShouldChange();
  const { decimals } = useERC20Handle();

  const [showDialog, setShowDialog] = useState();
  const [loading, setLoading] = useState();
  const [delLoading, setDelLoading] = useState();
  const [success, setSuccess] = useState();

  const handleDrop = useCallback(
    async (pid) => {
      await chainShouldChange();
      setDelLoading(true);
      try {
        const { transactionHash } = await deleteBox(pid);
        const web3 = new Web3(ethereum);
        await confirmTransaction(web3, transactionHash);
        await sleep(10000);
        run(account.toLowerCase());
        setDelLoading();
        message.success('successfully deleted');
      } catch (e) {
        setDelLoading();
        message.error('failed to delete');
      }
    },
    [account, chainShouldChange, deleteBox, ethereum, run]
  );

  const [checkId, setCheckId] = useState();
  const [detail, setDetail] = useState();

  const ItemList = useMemo(
    () =>
      list
        .sort(({ pid: id1 }, { pid: id2 }) => id1 - id2)
        .map((item) => {
          const { start_time, end_time, per_reward_amount, pid } = item;
          return (
            <Item
              startTime={start_time}
              endTime={end_time}
              amount={per_reward_amount}
              onDrop={() => handleDrop(pid)}
              key={pid}
              pid={pid}
              onCheck={() => setCheckId(pid)}
              onDetail={() => setDetail(item)}
            />
          );
        }),
    [handleDrop, list]
  );

  const handleCreate = useCallback(
    async ({
      date,
      tokenAddress,
      maxCount,
      duration,
      perRewardAmount,
      allAmount
    }) => {
      const res = await chainShouldChange();
      console.log('res >>>', res);
      setShowDialog();
      setLoading(true);
      try {
        // 如需切换网络，chainName 可设置为 state
        const tokenDecimals = await decimals(tokenAddress, 'polygon');

        const web3 = new Web3(ethereum);
        const erc20Contract = new web3.eth.Contract(
          ERC20ContractAbi,
          tokenAddress
        );
        const allowanceAmout = await erc20Contract.methods
          .allowance(account.toLowerCase(), TreasureBoxContractAddress)
          .call();

        const presetAmount = new web3.utils.BN(Math.ceil(allAmount)).mul(
          new web3.utils.BN(10).pow(new web3.utils.BN(tokenDecimals))
        );

        // console.log(allAmount, 'presetAmount >>>', presetAmount.toString());

        if (new web3.utils.BN(allowanceAmout).lt(presetAmount)) {
          const gasAmount = await erc20Contract.methods
            .approve(TreasureBoxContractAddress, presetAmount.toString())
            .estimateGas({ from: account.toLowerCase(), to: tokenAddress });

          const gasPrice = await web3.eth.getGasPrice();

          const approveResult = await erc20Contract.methods
            .approve(TreasureBoxContractAddress, presetAmount.toString())
            .send({
              from: account.toLowerCase(),
              to: tokenAddress,
              gasLimit: gasAmount,
              gasPrice
            });

          await confirmTransaction(web3, approveResult.transactionHash);
        }

        const result = await createBox(
          tokenAddress,
          new Date(date[0]).getTime() / 1000,
          new Date(date[1]).getTime() / 1000,
          duration,
          maxCount,
          perRewardAmount,
          tokenDecimals
        );

        const { transactionHash } = result;
        await confirmTransaction(web3, transactionHash);
        const pid = result.events.CreateBoxEvt.returnValues.pid;
        await sleep(10000);
        run(account.toLowerCase());
        setLoading();
        setSuccess(pid);
      } catch ({ reason }) {
        setLoading();
        if (reason) {
          return message.error(reason.split('(')[0]);
        }
        message.error('Add failed');
      }
    },
    [account, chainShouldChange, createBox, decimals, ethereum, run]
  );

  const handleCopy = useCallback(() => {
    setSuccess((val) => {
      // navigator.clipboard.writeText(val);
      // message.success('Copy successfully');
      return;
    });
  }, []);

  const handleCopy2 = useCallback(() => {
    setCheckId((val) => {
      // navigator.clipboard.writeText(val);
      // message.success('Copy successfully');
      return;
    });
  }, []);

  return (
    <div className={styles.page}>
      <Header count={list.length} onClick={() => setShowDialog(true)} />
      <CardList gridGap="0" minWidth="100%" loading={loading2}>
        {ItemList}
      </CardList>
      <CreateDialog
        onCreate={handleCreate}
        onCancel={() => setShowDialog(false)}
        open={showDialog}
      />

      <Detail detail={detail} onCancel={() => setDetail()} />

      <Loading
        open={loading}
        text="Please wait, the new treasure chest contract is being saved"
      />
      <Loading
        open={delLoading}
        text="Please wait, the chest is being deleted"
      />

      <Success id={success} onCopy={handleCopy} />
      <Adress id={checkId} onCopy={handleCopy2} />
    </div>
  );
};

export default Treasure;

const Header = ({ onClick, count = 0 }) => (
  <div className={styles.header}>
    <div>{count} results</div>
    <BorderedBtn onClick={onClick} height="28px" width="88px">
      New
    </BorderedBtn>
  </div>
);

const Item = ({
  startTime,
  endTime,
  amount,
  onDrop,
  onCheck,
  onDetail,
  pid
}) => {
  const getDate = useCallback((time) => {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`;
  }, []);

  const duration = useMemo(() => {
    const t1 = new Date().getTime() / 1000 - startTime;
    if (t1 < 0) {
      return 0;
    }
    return t1 / (endTime - startTime);
  }, [endTime, startTime]);

  return (
    <div className={styles.item}>
      <div className={styles['title-container']}>
        <img className={styles.icon} src={treasureIcon} alt="" />
        <div>
          <div className={styles.title}>BOX {pid}</div>
          {/* <div>奖励类型：拼手气红包</div> */}
        </div>
      </div>

      <div onClick={onCheck} className={styles.link}>
        View ID
      </div>
      <div className={styles.timeline}>
        <Duration duration={duration} />
        <div className={styles['time-container']}>
          <div>Start time: {getDate(startTime * 1000)}</div>
          <div>End time: {getDate(endTime * 1000)}</div>
        </div>
      </div>
      <div className={styles.amount}>
        Rewards: {getDisplayBalance2ETH(amount, true)}/Each time
      </div>
      <div className={styles.actions}>
        <div onClick={onDetail} className={styles.link}>
          Details
        </div>
        <div onClick={onDrop} className={styles.link}>
          Delete
        </div>
      </div>
    </div>
  );
};

export const Duration = ({ duration = 0, color = '#1890ff' }) => (
  <div className={styles.duration}>
    <div
      className={styles['duration-active']}
      style={{ width: `${100 * duration}%`, backgroundColor: color }}
    ></div>

    <div className={styles.circle}></div>
    <div className={`${styles.circle} ${styles.circle2}`}></div>
    <div className={`${styles.circle} ${styles.circle3}`}></div>
  </div>
);

const CreateDialog = ({ open, onCancel, onCreate }) => {
  const dateEl = useRef();
  const tokenAddressInputEl = useRef();
  const maxCountInputEl = useRef();
  // const perMaxCountInputEl = useRef();
  const durationInputEl = useRef();
  const perRewardAmountInputEl = useRef();

  useEffect(() => {
    if (open) {
      delete dateEl?.current?.value;
    }
  }, [open]);

  const handleConfirm = useCallback(() => {
    const date = dateEl.current?.value;
    const tokenAddress = tokenAddressInputEl.current?.value;
    const maxCount = +maxCountInputEl.current?.value;
    const duration = +durationInputEl.current?.value;
    const perRewardAmount = +perRewardAmountInputEl.current?.value;

    if (!date) {
      return message.error('Time required');
    }

    if (!tokenAddress) {
      return message.error('Token Contract required');
    }

    if (!perRewardAmount) {
      return message.error('Reward each time required');
    }

    if (!maxCount) {
      return message.error('Max count required');
    }

    if (!duration) {
      return message.error('Cooldown required');
    }

    const days =
      (new Date(date[1]).getTime() - new Date(date[0]).getTime()) /
      (1000 * 60 * 60 * 24);

    const allAmount = days * maxCount * perRewardAmount;

    onCreate({
      date,
      tokenAddress,
      maxCount,
      duration,
      perRewardAmount,
      allAmount
    });
  }, [onCreate]);

  return (
    <Dialog open={open}>
      <div className={styles.dialog}>
        <div className={styles['dialog-header']}>
          <div className={styles['dialog-title']}>Create</div>
          <img onClick={onCancel} src={closeIcon} alt="" />
        </div>
        <div className={styles['dialog-content']}>
          <div className={styles.reward}>
            <div style={{ width: '128px' }}>Time：</div>
            <CostumPicker
              showTime
              onChange={(e, f) => {
                dateEl.current = { value: f };
              }}
            />
          </div>

          <Input
            type="text"
            ref={tokenAddressInputEl}
            label="Token Contract:"
            placeholder=""
          />
          <Input
            min={0.0001}
            step={0.0001}
            ref={perRewardAmountInputEl}
            label="Reward each time"
            placeholder="number of rewards received by each address each time"
          />
          <Input
            min={1}
            max={24}
            ref={durationInputEl}
            label="Cooldown(hour):"
            placeholder="Single address claim cycle"
          />
          <Input
            min={1}
            ref={maxCountInputEl}
            label="Max count: "
            placeholder="Total number of chests"
          />
        </div>

        <div className={styles.actions}>
          <BorderedBtn onClick={handleConfirm} height="28px" width="208px">
            Confirm
          </BorderedBtn>
          <BorderedBtn
            onClick={onCancel}
            height="28px"
            width="208px"
            borderWidth="1px"
            bgColor="rgba(255, 255, 255, 0)"
          >
            Cancel
          </BorderedBtn>
        </div>
      </div>
    </Dialog>
  );
};

const Detail = ({ onCancel, detail = {} }) => {
  const { start_time, end_time, max_count, duration, per_reward_amount, pid } =
    detail;

  console.log('detail >>>', detail);

  const getDate = useCallback((time) => {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${(
      '0' + date.getMinutes()
    ).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  }, []);

  return (
    <Dialog open={pid}>
      <div className={styles.dialog}>
        <div className={styles['dialog-header']}>
          <div className={styles['dialog-title']}>Details</div>
          <img onClick={onCancel} src={closeIcon} alt="" />
        </div>
        <div className={styles['dialog-content']}>
          <DetaiItem
            label="time:"
            value={`${getDate(start_time * 1000)} to ${getDate(
              end_time * 1000
            )}`}
          />
          <DetaiItem
            label="Reward each time:"
            value={`${getDisplayBalance2ETH(
              per_reward_amount,
              true
            )}/Each time`}
          />
          <DetaiItem label="Cooldown:" value={`${duration} hour`} />
          <DetaiItem label="Max count: " value={max_count} />
          <DetaiItem
            label="Total value"
            value={`${Math.ceil(
              max_count * getDisplayBalance2ETH(per_reward_amount)
            )}`}
          />
        </div>

        <div className={styles.actions}>
          <BorderedBtn onClick={onCancel} height="28px" width="208px">
            Confirm
          </BorderedBtn>
          <BorderedBtn
            onClick={onCancel}
            height="28px"
            width="208px"
            borderWidth="1px"
            bgColor="rgba(255, 255, 255, 0)"
          >
            Cancel
          </BorderedBtn>
        </div>
      </div>
    </Dialog>
  );
};

export const Loading = ({ open, text }) => (
  <Dialog open={open}>
    <div className={styles.loading}>
      <img src={loadingIcon} alt="" />
      <div>
        <span>{text}</span>
        {open && <Dots />}
      </div>
    </div>
  </Dialog>
);

const Success = ({ id, onCopy }) => (
  <Dialog open={!!id}>
    <div className={styles.loading}>
      <span>
        <img width="42px" src={successIcon} alt="" />
      </span>
      <div className={styles['box-text']}>
        <div>Contract saved successfully!</div>
        <div>
          <span>Your chest ID is: </span>
          <span className={styles['box-id']}>{id}</span>
        </div>
      </div>
      <BorderedBtn onClick={onCopy} width="130px" height="26px">
        Close
      </BorderedBtn>
    </div>
  </Dialog>
);

const Adress = ({ id, onCopy }) => (
  <Dialog open={!!id}>
    <div className={styles.loading}>
      <div className={styles['box-text']}>
        <div>
          <span>Your chest ID is: </span>
          <span className={styles['box-id']}>{id}</span>
        </div>
      </div>
      <BorderedBtn onClick={onCopy} width="130px" height="26px">
        Close
      </BorderedBtn>
    </div>
  </Dialog>
);

const Dots = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((dots) => {
        if (dots.length === 3) {
          return '.';
        }
        return `${dots}.`;
      });
    }, 666);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return <span className={styles.dots}>{dots}</span>;
};

const CostumPicker = styled(RangePicker)`
  width: 380px;
  border-radius: 4px;
  border: 1px solid #2a333a;
  background-color: #1f2830;
  color: rgba(255, 255, 255, 0.25);
  box-shadow: none;
  &:hover {
    border-color: #2a333a;
  }
`;

const Input = forwardRef(
  (
    {
      type = 'number',
      label = '',
      placeholder = '',
      min,
      max,
      step,
      value = '',
      readOnly
    },
    ref
  ) => {
    const [val, setVal] = useState(value);

    const handleInput = useCallback(
      ({ target: { value } }) => {
        if (step < 1) {
          const xsd = value.toString().split('.')[1];
          if (xsd && xsd.length > 4) {
            return setVal((+value).toFixed(4));
          }
        }
        setVal(value);
      },
      [step]
    );

    return (
      <div className={styles.input}>
        <div>{label}</div>
        <input
          value={val}
          ref={ref}
          min={min}
          max={max}
          step={step}
          type={type}
          onInput={handleInput}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </div>
    );
  }
);

const DetaiItem = ({ label, value }) => (
  <div className={styles.input}>
    <div>{label}</div>
    <div className={styles['detail-item']}>{value}</div>
  </div>
);
