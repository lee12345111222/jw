import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef
} from 'react';

import { useApi2 } from '@/hooks/useApi';

import { postPaction, getTaskDetail } from '@/api/user';

import { message } from 'antd';

import { getWindow } from './utils';

import { Container, Box, Flex } from '@/components/Basic';

import BorderedBtn from '@/components/BorderedBtn2/index';

import styles from './AirdropScore.module.css';

import successIcon from '@/assets/icon/finish.png';

import failIcon from '@/assets/icon/error-icon.png';

import { ReactComponent as NecessaryIcon } from '@/assets/icon/necessary_icon.svg';

import { Input } from '@/custom-ui/index';

import Dialog from '@/ui/dialog/index';

import loadingIcon from '@/assets/icon/loading.png';

import proMptIcon from '@/assets/icon/prompt-icon.png';
import closeIcon from '@/assets/icon/closeIcon.png';
import UploadFailImage from 'src/assets/img/upload-video-img.png';

export const Item = ({
  icon,
  score,
  title,
  btnText,
  status,
  necessary = 'true',
  id,
  account,
  token,
  sub,
  refresh
}) => {
  const isClick = useMemo(() => status !== 2, [status]);

  const [uploadShow, setUploadShow] = useState(false);

  const [inputValue, setInputValue] = useState('');

  // 信息反馈dialog
  const [infoDialog, setInfoDialog] = useState(false);

  // 信息反馈flag
  const [infoFlag, setInfoFlag] = useState();

  const params = useMemo(() => {
    return {
      task_id: id,
      address: account,
      login_token: token
    };
  }, [id, account, token]);

  const { run: submit, loading } = useApi2(postPaction, {
    manual: true,
    onSuccess: (res, params) => {
      const param = params[0];
      if (res.code === 200) {
        const { url } = res.data;
        const { task_id } = param;

        // 分享任务不需要跳转url
        if (task_id === '7') {
          if (navigator.clipboard) {
            message.success(
              `Copied to clipboard, invite friends to complete tasks to earn bonus scores`
            );
            navigator.clipboard.writeText(url);
          }
          return;
        }
        // telegram 和 youtube 任务
        getWindow(url);
        refresh();
      }
    }
  });

  // 上传视频任务
  const { run: uploadVideo, loading: uploadLoading } = useApi2(postPaction, {
    manual: true,
    onBefore() {
      setUploadShow(false);
      setInfoDialog(true);
      return;
    },
    onSuccess(res) {
      const { code } = res;
      if (code === 200) {
        setInfoFlag(true);
      } else {
        setInfoFlag(false);
      }
    },
    onError() {
      setInfoFlag(false);
    }
  });

  const handleInfoDialogClick = useCallback(() => {
    refresh();
    setInfoDialog(false);
    setInfoFlag(false);
  }, [refresh]);

  const handleInfoDialogClose = useCallback(() => {
    setInfoDialog(false);
    setInfoFlag(false);
    setUploadShow(true);
  }, []);

  const handleClick = useCallback(() => {
    if (sub === 1) {
      return setUploadShow(true);
    }
    submit(params);
  }, [params, submit, sub]);

  // 上传视频链接
  const submitInfo = useCallback(() => {
    uploadVideo({ ...params, data: inputValue });
  }, [inputValue, params, uploadVideo]);

  const closeUpload = useCallback(() => {
    setUploadShow(false);
  }, []);

  const shouldVerify = useMemo(() => {
    return ['1', '2', '3', '4'].includes(id);
  }, [id]);

  return (
    <>
      <Box className={styles['hoverable']}>
        <Flex ai="center" jc="space-between">
          <Flex ai="center" gap="16px">
            <Flex ai="center">
              <img className={styles['img-icon-small']} src={icon} alt="" />
              <Box className={styles['task-content']}>{title}</Box>
            </Flex>
            {necessary && (
              <Flex ai="center" gap="8px" className={styles['task-necessary']}>
                <NecessaryIcon />
                <Box>Mandatory tasks</Box>
              </Flex>
            )}
          </Flex>
          <Flex gap="24px">
            <span className={styles['task-content']}>{score}</span>

            <Flex gap="16px">
              {shouldVerify && (
                <VerifyButton
                  status={status}
                  params={params}
                  refresh={refresh}
                />
              )}

              {isClick ? (
                shouldVerify ? (
                  <RedirectButton
                    params={params}
                    status={status}
                    btnText={btnText}
                  />
                ) : (
                  <BorderedBtn
                    width="140px"
                    height="28px"
                    onClick={handleClick}
                    loading={loading}>
                    <div>{btnText}</div>
                  </BorderedBtn>
                )
              ) : (
                <>
                  <BorderedBtn
                    width="140px"
                    height="28px"
                    bgColor="#FFB801"
                    borderColor="#FFB801">
                    Success!
                  </BorderedBtn>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {infoDialog && (
        <InfoDialog
          open={infoDialog}
          loading={uploadLoading}
          onConfirm={handleInfoDialogClick}
          onClose={handleInfoDialogClose}
          flag={infoFlag}
        />
      )}

      {uploadShow && (
        <UpdateVideoDialog
          open={uploadShow}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onCancel={closeUpload}
          submitInfo={submitInfo}
        />
      )}
    </>
  );
};

// 验证按钮
const VerifyButton = ({ status, params, refresh }) => {
  const [countdown, setCountDown] = useState(0);

  const [verifyTime] = useState(10);

  useEffect(() => {
    if (countdown === 0) {
      return;
    }
    const timer = setInterval(() => {
      setCountDown((v) => v - 1);
      if (countdown === 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const { run: submit, loading } = useApi2(postPaction, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        const { status = 0 } = res.data;
        // 1,2,3,4 需要验证的任务
        switch (status) {
          case -1:
          case 0: {
            message.warn('Please make sure you have completed this task');
            setCountDown(verifyTime);
            break;
          }
          case 1: {
            message.info('result verifying...');
            setCountDown(verifyTime);
            break;
          }
          case 2: {
            refresh();
            break;
          }
          default:
            break;
        }
        return;
      }
      if (res.code === 10033) {
        message.error('verify fail, please retry');
      }
      if (res.code === 10034) {
        message.error('max limit reached, please wait');
      }
    }
  });

  const onClick = useCallback(() => {
    submit(params);
  }, [params, submit]);

  const isCountDown = useMemo(() => {
    return countdown !== 0;
  }, [countdown]);

  const verifyButton = useMemo(() => {
    switch (status) {
      case -1:
      case 0:
      case 1:
        return (
          <BorderedBtn
            width="68px"
            height="28px"
            onClick={onClick}
            borderColor={isCountDown ? '#4A5057' : '#06C4FF'}
            bgColor={isCountDown ? '#2f3841' : 'transparent'}
            borderWidth="1px"
            disabled={isCountDown}
            loading={loading}>
            {!isCountDown ? (
              <div className={styles['task-verify']}>Verify</div>
            ) : (
              <div className={styles['task-verify-disabled']}>{countdown}s</div>
            )}
          </BorderedBtn>
        );

      case 2:
        return (
          <BorderedBtn
            width="68px"
            height="28px"
            borderColor="#4A5057"
            bgColor="#2f3841"
            borderWidth="1px"
            disabled>
            <div className={styles['task-verify-disabled']}>Verify</div>
          </BorderedBtn>
        );
      default:
        return null;
    }
  }, [countdown, onClick, isCountDown, loading, status]);

  return <>{verifyButton}</>;
};
// 上传视频反馈弹窗
const InfoDialog = ({ flag, loading, onConfirm, onClose }) => {
  return (
    <>
      {loading && <Loading />}
      {!loading &&
        (flag ? (
          <Success onConfirm={onConfirm} />
        ) : (
          <Failed onClose={onClose} />
        ))}
    </>
  );
};

const Loading = () => {
  return (
    <Dialog header="" footer="" open={true} style={{ width: '360px' }}>
      <Flex ai="center" jc="center" fd="column" gap="20px">
        <img src={loadingIcon} className={styles['loading-icon']} alt="" />
        <div>Please wait, uploading</div>
      </Flex>
    </Dialog>
  );
};

const Success = ({ onConfirm }) => {
  return (
    <Dialog header="" footer="" open={true} style={{ width: '360px' }}>
      <Flex ai="center" jc="center" fd="column" gap="20px">
        <img src={successIcon} alt="" />
        <div>Congratulations, successfully upload</div>
        <BorderedBtn onClick={onConfirm}>Confirm</BorderedBtn>
      </Flex>
    </Dialog>
  );
};

const Failed = ({ onClose }) => {
  return (
    <Dialog header="" footer="" open={true} style={{ width: '560px' }}>
      <Flex jc="flex-end">
        <img
          src={closeIcon}
          width="16px"
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={onClose}
        />
      </Flex>
      <Flex ai="center" jc="center" fd="column" gap="20px">
        <div>
          Submission failed, please check the format of the link you submitted
        </div>
        <img src={UploadFailImage} alt="" />
      </Flex>
    </Dialog>
  );
};

// 更新youtube Video弹窗
const UpdateVideoDialog = ({
  open,
  onCancel,
  submitInfo,
  inputValue,
  setInputValue
}) => {
  const inputRef = useRef();

  const handleClick = useCallback(() => {
    if (inputValue.trim() === '') {
      message.error('please input url');
      return;
    }
    submitInfo();
  }, [inputValue, submitInfo]);

  return (
    <Dialog
      open={open}
      backdrop={false}
      title={<div>Upload YouTube Video</div>}
      footer=""
      onCancel={onCancel}>
      <Container w="577px">
        <Flex gap="24px" fd="column">
          <Flex gap="16px" fd="column">
            <div
              className={styles['update-dialog-text']}
              style={{ color: '#FF5CD1' }}>
              To verify the video author, PlayerOne has specific requirements
              for the video introduction format.
            </div>

            <div
              className={styles['update-dialog-text']}
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              The format is: 0x000...000(your address) + Introduction text
            </div>
          </Flex>
          <Flex ai="center" jc="center" gap="8px" md="8px">
            <span>Link:</span>
            <Input
              value={inputValue}
              ref={inputRef}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onClick={() => {
                inputRef.current.focus();
              }}
              placeholder="Click to enter your link address"
            />
            <BorderedBtn width="95px" onClick={handleClick}>
              confirm
            </BorderedBtn>
          </Flex>
        </Flex>
      </Container>
    </Dialog>
  );
};

// twitter / discord 重定向按钮
const RedirectButton = ({ btnText, status, params }) => {
  const isBind = useMemo(() => status === -1, [status]);

  const [showBindDialog, setshowBindDialog] = useState(false);

  const [bindDialogUrl, setbindDialogUrl] = useState('');

  const [bindId, setBindId] = useState('');

  const { run: getUrl, loading } = useApi2(getTaskDetail, {
    manual: true,
    onSuccess(res, params) {
      if (res.code === 200) {
        const { url } = res.data;
        const { task_id } = params[0];
        if (isBind) {
          setshowBindDialog(true);
          setbindDialogUrl(url);
          setBindId(task_id);
          return;
        }
        getWindow(url);
      }
    }
  });

  const onClick = useCallback(() => {
    getUrl(params);
  }, [getUrl, params]);

  const closeBind = useCallback(() => {
    setshowBindDialog(false);
  }, []);

  return (
    <>
      <BorderedBtn
        width="140px"
        height="28px"
        onClick={onClick}
        loading={loading}>
        <div>{btnText}</div>
      </BorderedBtn>
      {showBindDialog && (
        <BindConfirmDialog
          open={showBindDialog}
          bindUrl={bindDialogUrl}
          onCancel={closeBind}
          bindId={bindId}
        />
      )}
    </>
  );
};

// twitter / discord 提示绑定弹窗
const BindConfirmDialog = ({ open, onCancel, bindUrl, bindId }) => {
  const handClick = useCallback(() => {
    getWindow(bindUrl);
    onCancel();
  }, [onCancel, bindUrl]);

  const title = useMemo(() => {
    if (['1', '2', '3'].includes(bindId)) {
      return `Please link your Twitter and Bind your wallet address`;
    }
    if (bindId === '4') {
      return `Please link your Discord and Bind your wallet address`;
    }
  }, [bindId]);

  return (
    <Dialog open={open} footer="" header="">
      <Flex
        fd="column"
        ai="center"
        style={{
          position: 'relative',
          marginTop: 16
        }}>
        <div className={styles['task-dialog-close']} onClick={onCancel}>
          <img src={closeIcon} width="16px" alt="" />
        </div>
        <img src={proMptIcon} alt="" width="42px" height="42px" />
        <div className={styles['task-dialog-content']}>{title}</div>
        <BorderedBtn onClick={handClick}>Link & Bind</BorderedBtn>
      </Flex>
    </Dialog>
  );
};
