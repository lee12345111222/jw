import { useRef, useCallback, useState } from 'react';

import MainPage from '@/components/MainPage/index';
import StatusBar from '@/components/StatusBar/index';

import {
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Flex,
  P,
  Upload,
  H4
} from '@/custom-ui/index';

import { LoadingDialog, ResultDialog } from '../passCard/index';

import {
  imageIcon,
  nameIcon,
  styleIcon,
  archIcon,
  issueIcon,
  descIcon
} from './assets';

import { useParams, useHistory } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import useLoginToken from '@/hooks/useLoginToken';
import useSwitchNetwork from '@/hooks/useSwitchNetwork';

import { supported_chains } from '@/constant/env/index';

import Web3 from 'web3';
import useBlueprint from '@/hooks/useBlueprint';
import { confirmTransaction } from '@/utils/common';

import useApi from '@/hooks/useApi';
import { makebuildingtemplate } from '@/api/nft';

import styles from './index.module.css';
import classNames from 'classnames/bind';
import { message } from 'antd';

const cx = classNames.bind(styles);

export default function Blueprint() {
  const uploadRef = useRef();

  const { run } = useApi(makebuildingtemplate, { manual: true });

  const history = useHistory();

  const { size, uuid } = useParams();
  const { account, ethereum } = useWallet();
  const [getToken] = useLoginToken();
  const [name, setName] = useState();
  const [style, setStyle] = useState();
  const [desc, setDesc] = useState();
  const [amount, setAmount] = useState();

  const [showFileError, setShowFileError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showStyleError, setShowStyleError] = useState(false);
  const [showAmountError, setShowAmountError] = useState(false);
  const [showDescError, setShowDescError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const switchNetwork = useSwitchNetwork();

  const { mint } = useBlueprint();

  const handleConfirm = useCallback(async () => {
    if (!account) {
      return;
    }

    if (!uploadRef.current.file) {
      return setShowFileError(true);
    } else {
      setShowFileError(false);
    }

    if (!name) {
      return setShowNameError('This field is required.');
    } else if (name.length > 25) {
      return setShowNameError('length cannot exceed 25 chars');
    } else {
      setShowNameError(false);
    }

    if (!style) {
      return setShowStyleError(true);
    } else {
      setShowStyleError(false);
    }

    if (!amount) {
      return setShowAmountError(true);
    } else {
      setShowAmountError(false);
    }

    if (desc && desc.length > 1024) {
      return setShowDescError(true);
    } else {
      setShowDescError(false);
    }

    setLoading(true);

    const token = await getToken();

    const params = {
      login_token: token,
      address: account,
      upfile: uploadRef.current.file,
      uuid,
      name,
      desc,
      style
    };

    const { code, data, msg } = await run(params);

    if (code !== 200) {
      setLoading(false);
      return message.error(msg);
    }

    try {
      await switchNetwork(supported_chains.ethereum);
      const { template_uuid } = data;
      const { transactionHash } = await mint(template_uuid, amount);

      const web3 = new Web3(ethereum);
      await confirmTransaction(web3, transactionHash);
    } catch (e) {
      setLoading(false);
      return setResult('fail');
    }
    setLoading(false);
    setResult('success');
  }, [
    account,
    amount,
    desc,
    ethereum,
    getToken,
    mint,
    name,
    run,
    style,
    switchNetwork,
    uuid
  ]);

  const handleFinish = useCallback(() => {
    const res = result;
    setResult();

    if (res === 'success') {
      history.push('/assets/blueprint');
    }
  }, [history, result]);

  return (
    <MainPage>
      <Flex fd="column" h="100" className={cx('page')}>
        <StatusBar title="Release" />

        <Flex grow="1" className={cx('container')} gap="32px">
          <Form grow="1">
            <H4 className={cx('title')}>Publish Blueprint</H4>
            <FormItem
              icon={imageIcon}
              label="Architectural cover"
              required
              subLabel="File types supported:JPG,PNG,GIF,SVG"
              topLabel
            >
              <Upload ref={uploadRef} error={showFileError} />
              {showFileError && (
                <div className={cx('error-text')}>This field is required.</div>
              )}
            </FormItem>

            <FormItem
              icon={nameIcon}
              label="Architecture name"
              required
              topLabel
            >
              <Input
                onChange={({ target: { value } }) => setName(value)}
                placeholder="Please enter the name of the building"
                error={showNameError}
              />
              {showNameError && (
                <div className={cx('error-text')}>{showNameError}</div>
              )}
            </FormItem>

            <FormItem
              icon={styleIcon}
              label="Architectural style"
              required
              subLabel="This is the classification collection of your project."
              topLabel
            >
              <Select
                placeholder="Selection style"
                onSelect={(v) => setStyle(v)}
                options={[
                  'Modern',
                  'Greek',
                  'Mediterranean',
                  'Gothic',
                  'Romanesaue',
                  'Rococo',
                  'Byzantine',
                  'Baroque',
                  'Other'
                ]}
                error={!!showStyleError}
              />
              {!!showStyleError && (
                <div className={cx('error-text')}>This field is required.</div>
              )}
            </FormItem>

            <FormItem icon={archIcon} label="Architecture" topLabel>
              <Input value={`${size} × ${size} × ${size}`} readOnly />
            </FormItem>

            <FormItem
              icon={issueIcon}
              label="Issue number"
              required
              subLabel="The number of items that can be minted. No gas cost to you!"
              topLabel
            >
              <Input
                onChange={({ target: { value } }) => setAmount(value)}
                error={showAmountError}
                min={1}
                // onMousewheel={(e) => e.preventDefault()}
                type="number"
                placeholder="Please enter the quantity"
              />
              {showAmountError && (
                <div className={cx('error-text')}>This field is required.</div>
              )}
            </FormItem>

            <FormItem
              icon={descIcon}
              label="Description"
              subLabel="The description will be included on the item's detail page underneath its image.Markdown syntax is supported."
              topLabel
            >
              <Input
                onChange={({ target: { value } }) => setDesc(value)}
                textarea
                rows="6"
                style={{ resize: 'none' }}
                placeholder="Provide a detailed description of your item."
                error={showDescError}
              />
              {showDescError && (
                <div className={cx('error-text')}>
                  length cannot exceed 1024 chars
                </div>
              )}
            </FormItem>

            <Flex jc="center">
              <Button onClick={handleConfirm} className={cx('btn')}>
                Confirmation
              </Button>
            </Flex>
          </Form>

          <Flex gap="16px" className={cx('intro')} fd="column">
            <H4>Notice</H4>
            <P>
              Blueprints are a handy way for users to develop building in
              PlayerOne. Builders may earn by selling blueprints of their
              structures, while consumers can easily produce buildings by
              purchasing required blueprints.
            </P>
            <P>
              After the blueprint is available, people may either sell it or
              utilize it in the plot. It should be noted that used blueprints
              will be connected to the appropriate plots and will not be
              available for sale independently.
            </P>
            <P>
              Advice for builders: Avoid using unpleasant materials and language
              to create a positive blueprint market environment. PlayerOne will
              disqualify you from constructing.
            </P>
          </Flex>
        </Flex>
      </Flex>

      <LoadingDialog open={loading} text="Publishing, please wait" />
      <ResultDialog
        open={!!result}
        success={result === 'success'}
        onConfirm={handleFinish}
        text={
          result === 'success' ? (
            <>
              <div>Published successfully ！</div>
              <div>For trading, please go to opensea for listing</div>
            </>
          ) : (
            <>
              <div>Published failed ！</div>
              <div>Please re-enter the publishing content</div>
            </>
          )
        }
      />
    </MainPage>
  );
}
