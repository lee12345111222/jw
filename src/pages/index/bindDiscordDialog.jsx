import Dialog from '@/components/proto-ui/dialog/index';
import { Flex } from '@/components/Basic';
import { useMemo } from 'react';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import BorderedBtn from '@/components/BorderedBtn2/index';
import bindIcon from '@/assets/icon/bind.svg';
import Loading from '@/components/CardList/components/Loading/index';
import Logo from 'src/assets/img/index/logo.png';
import AvatarLogo from 'src/assets/img/box/avatar-logo.png';
import ErrorIcon from 'src/assets/img/box/error-icon.png';
import { showShortAddress } from '@/utils/common';

import usePersonalSign from '@/hooks/usePersonalSign';

import { useCallback } from 'react';

import styled from 'styled-components';

const cx = classNames.bind(styles);

export function BindDiscordDialog({
  userInfo = {},
  onClose,
  onConfirm,
  open,
  loading,
  account,
  type,
  userInfoError,
  bindError,
  status
}) {
  const { username, avatar, code } = userInfo;

  const isDiscord = useMemo(() => {
    if (type === 'binddiscord') return 'Discord';
    if (type === 'bindtwitter') return 'Twitter';
    return undefined;
  }, [type]);

  const title = useMemo(() => {
    return `Please check you address & ${isDiscord} account`;
  }, [isDiscord]);

  const bindErrorTitle = useMemo(() => {
    return `The ${isDiscord} has been bound, please check again`;
  }, [isDiscord]);

  const userInfoErrorTitle = useMemo(() => {
    return `Did not get your ${isDiscord} authorization information, please check again`;
  }, [isDiscord]);

  const { getPersonalSign } = usePersonalSign();

  const handleConfirm = useCallback(async () => {
    if (!account) return;
    if (!isDiscord) return;
    let sign;
    const signStr = `Click "Sign" to bind ${isDiscord} account ${username} to ${account}`;
    try {
      sign = await getPersonalSign(signStr);
      const params = {
        address: account,
        code,
        sign
      };
      onConfirm(params);
    } catch (e) {}
  }, [account, isDiscord, username, getPersonalSign, code, onConfirm]);

  return (
    <>
      <Dialog title="none" footer="none" header="" open={open}>
        <Flex fd="column" ai="center">
          <img src={Logo} alt="" height="80px" />
          <Subtitle>{title}</Subtitle>

          {userInfoError && (
            <div className={cx('bindDialog-error')}>
              <Flex ai="center" jc="center" gap="20px" fd="column">
                <img src={ErrorIcon} alt="" />
                <ErrorContent>{userInfoErrorTitle}</ErrorContent>
                <BorderedBtn onClick={onClose}>Confirm</BorderedBtn>
              </Flex>
            </div>
          )}

          {bindError && (
            <div className={cx('bindDialog-error')}>
              <Flex ai="center" jc="center" gap="20px" fd="column">
                <img src={ErrorIcon} alt="" />
                <ErrorContent>{bindErrorTitle}</ErrorContent>
                <BorderedBtn onClick={onClose}>Confirm</BorderedBtn>
              </Flex>
            </div>
          )}

          {loading && (
            <div className={cx('bindDialog')}>
              <Flex
                ai="center"
                jc="center"
                style={{ height: '100%', paddingBottom: 50 }}>
                <Loading loading={loading} />
              </Flex>
            </div>
          )}

          {!loading && !userInfoError && !bindError && (
            <div className={cx('bindDialog')}>
              <Flex ai="center" jc="center" gap="20px">
                <Flex ai="center" jc="center" fd="column" gap="8px">
                  <Avatar src={avatar} alt="" />
                  <LeftContent>{username ?? '-'}</LeftContent>
                </Flex>
                <div>
                  <Icon src={bindIcon} alt="" />
                </div>
                <Flex ai="center" jc="center" fd="column" gap="8px">
                  <Avatar src={AvatarLogo} alt="" />
                  <RightContent>{showShortAddress(account)}</RightContent>
                </Flex>
              </Flex>
              <div className={cx('dialog-content')}>
                Once authorized, you will connect PlayerOne and be directed
                to:https://playerone.world
              </div>
              <Flex ai="center" jc="center" gap="20px">
                <BorderedBtn
                  width="158px"
                  height="30px"
                  bgColor="none"
                  style={{ color: '#06C4FF' }}
                  onClick={onClose}>
                  Cancel
                </BorderedBtn>
                <BorderedBtn
                  width="158px"
                  height="30px"
                  disabled={status}
                  onClick={handleConfirm}>
                  Confirm
                </BorderedBtn>
              </Flex>
            </div>
          )}
        </Flex>
      </Dialog>
    </>
  );
}

// 高阶函数
// function HighBindDiscordDialog() {
//   let { type, address } = useParams();

//   const [userCode, setCode] = useState();

//   const [showDialog, setDialog] = useState(false);

//   const [discordInfo, setDiscordInfo] = useState();

//   const { account } = useWallet();

//   const { run: getDiscordInfo, loading } = useApi(getDiscordUserInfo, {
//     manual: true,
//     onSuccess(res) {
//       if (res.code === 200) {
//         setDiscordInfo(res.data);
//         return;
//       }
//       message.error(res.msg);
//     }
//   });
//   const { run: bindDiscord } = useApi(postAuthDiscordBind, {
//     manual: true,
//     onSuccess(res) {
//       if (res.code === 200) {
//         setDialog(false);
//         window.close();
//         return;
//       }
//       message.error(res.msg);
//     }
//   });

//   useEffect(() => {
//     if (type === 'binddiscord' && !!address) {
//       const code = address;
//       setCode(code);
//       getDiscordInfo({ code });
//       setDialog(true);
//     }
//   }, [address, getDiscordInfo, type]);

//   return (
//     <BindDiscordDialog
//       open={showDialog}
//       userInfo={discordInfo}
//       code={userCode}
//       onConfirm={bindDiscord}
//       account={account}
//       loading={loading}
//       onClose={() => setDialog(false)}
//     />
//   );
// }

const Subtitle = styled.div`
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
  opacity: 0.85;
  margin-top: 24px;
  margin-bottom: 56px;
`;

const Icon = styled.img`
  width: 26px;
  height: 26px;
`;

const Avatar = styled.img`
  width: 82px;
  height: 82px;
  border-radius: 50%;
`;

const RightContent = styled.p`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  color: #ffffff;
  width: 133px;
  text-align: center;
  white-space: nowrap;
  margin-bottom: 24px;
`;

const LeftContent = styled(RightContent)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrorContent = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
`;
