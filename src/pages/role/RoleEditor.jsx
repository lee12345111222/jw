import { useState, useCallback, useMemo, useEffect } from 'react';

import UnityBox, { unityContent } from './UnityBox';

import { useInterval, useMap } from 'ahooks';
import useApi from '@/hooks/useApi';
import { useTranslation } from 'react-i18next';

import { useWallet } from 'use-wallet';

import { notification } from 'antd';

import { Loading } from './components';

import { PlayerOneRoleAddress } from '@/constant/env/index';

import { showShortAddress } from '@/utils/common';
// import WalletOrGuest from '../preview/WalletOrGuest';

import { roldIdSyntByPartId } from '@/utils/tokenIdAdapter';

import useQueryPartTotalPro from '@/hooks/useQueryPartTotalPro';
import useQueryPartBalance from '@/hooks/useQueryPartBalance';
import useQueryRoldExist from '@/hooks/useQueryRoldExist';

import usePlayerOneRoleContract from '@/hooks/usePlayerOneRoleContract';
import { getRoleCount, myCharacterParts } from '@/api/role';

import { Grid, Flex } from '@/components/Basic';

import listData from '@/assets/role-editor/mapData.json';

import { MintDIalog } from './components';

import BorderedBtn from '@/components/borderedBtn/index';

import Dialog from '@/components/proto-ui/dialog/index';
import loadingIcon from '@/assets/icon/loading.png';

import Tooltip from '@/ui/tooltip/index';

import useSwitchNetwork from '@/hooks/useSwitchNetwork';
import { supported_chains } from '@/constant/env/index';

import {
  Box,
  Box2,
  Title,
  TitleBox,
  Page,
  Icon,
  Between,
  P,
  OutLink,
  StyledModal,
  CheckList,
  Grow,
  CheckListTitle,
  StyledSelection,
  StyledCheckbox,
  MintModal,
  Loading2
} from './components';

import load from '@/utils/load';
import useHistory from '@/hooks/useHistory';
import { Tag } from '@/custom-ui/index';

import styles from './role.module.css';
import classNames from 'classnames/bind';

import parts from '@/pages/mysteryBox/partsList.json';
import Button from '@/ui/button/index';

import warningIcon from '@/assets/icon/warning-icon.svg';
import finishIcon from '@/assets/icon/finish.png';

const editorToPartContract = (item, subItem) => {
  if (item === 0 && subItem === 0) return 0;
  if (undefined === item || undefined === subItem) return 0;

  return (
    Object.values(parts)
      .flat()
      .find(
        ({ client_part_id, part_index }) =>
          +item === client_part_id && +subItem === part_index
      )?.token_id || 0
  );
};

const cx = classNames.bind(styles);

const {
  body: bodyImg,
  hair: hairImg,
  clothe,
  shoe: shoeImg,
  jew,
  act: actImg
} = load('role-editor');

const bodyList = load('role-editor/body');
const hairList = load('role-editor/hair');
const beardList = load('role-editor/beard');
const shirtList = load('role-editor/inside');
const coatList = load('role-editor/coat');
const pantsList = load('role-editor/pants');
const shoesList = load('role-editor/shose');
const necklaceList = load('role-editor/necklace');
const earringsList = load('role-editor/studs');
const glassesList = load('role-editor/glasses');
const hatList = load('role-editor/hat');
const actionsList = load('role-editor/act');

const { currect, incurrect, errorIcon, noticeIcon } = load('icon');

// random settings, templates for different bodys
const roleList = [
  {
    name: 'Human',
    list: [0, 1, 3, 4, 6, 7, 8, 9]
  },
  {
    name: 'Alien',
    list: [1, 4, 6, 7]
  },
  {
    name: 'Monkey',
    list: [2, 3, 4, 7]
  },
  {
    name: 'Robot',
    list: [3, 4, 6, 7]
  },
  {
    name: 'Elves',
    list: [4, 4, 6, 7, 8, 9]
  },
  {
    name: 'Zombie',
    list: [5, 4, 5, 7]
  },
  {
    name: 'Skull',
    list: [6, 5, 6, 7]
  }
];

export default function RoleEditor() {
  const getTotalPro = useQueryPartTotalPro();
  const getPartBalance = useQueryPartBalance();
  const checkRoleExit = useQueryRoldExist();

  const [duration, setDuration] = useState(0);

  const [isUnityOnload, setIsUnityOnload] = useState(false);

  const [type, setType] = useState('body');

  // selected parts
  const [selectedParts, { set: setParts, setAll: setAllParts, get: getParts }] =
    useMap([
      ['0', '0'], // body
      ['1', undefined], // hair
      ['2', undefined], // beard
      ['3', undefined], // glasses
      ['4', undefined], // shirt
      ['5', undefined], // necklace
      ['6', undefined], // shoes
      ['7', undefined], // pants
      ['8', undefined], // hat
      ['9', undefined], // earrings
      ['10', undefined], // coat
      ['action', '0']
    ]);

  const [selectedCount, hasPants] = useMemo(() => {
    const parts = Array.from(selectedParts);
    const hasPants = parts?.[7]?.[1] !== undefined ? 1 : 0;

    const count =
      parts.reduce(
        (num, [index, id]) =>
          +index !== 0 && +index !== 7 && index !== 'action'
            ? id !== undefined
              ? num + 1
              : num
            : num,
        1
      ) + hasPants;

    return [count, hasPants];
  }, [selectedParts]);

  // randable parts
  const [, { setAll: setAllRandable }] = useMap([
    ['0', '0'], // body
    ['1', true], // hair
    ['2', false], // beard
    ['3', true], // glasses
    ['4', true], // shirt
    ['5', false], // necklace
    ['6', true], // shoes
    ['7', true], // pants
    ['8', true], // hat
    ['9', true], // earrings
    ['10', false] // coat
  ]);

  // temprary template for randable parts
  const [
    randTemp,
    { set: setRandTemp, setAll: setAllRandTemp, get: getRandTemp }
  ] = useMap([
    ['0', '0'], // body
    ['1', true], // hair
    ['2', false], // beard
    ['3', true], // glasses
    ['4', true], // shirt
    ['5', false], // necklace
    ['6', true], // shoes
    ['7', true], // pants
    ['8', true], // hat
    ['9', true], // earrings
    ['10', false] // coat
  ]);

  const changeRandTemp = useCallback(
    (val) => {
      const temp = Array.from(randTemp).map(([item]) => [item, false]);

      roleList
        .find(({ name }) => name === val)
        .list.forEach((id, index) => {
          if (index !== 0) {
            temp[id][1] = true;
          } else {
            temp[0][1] = id;
          }
        });

      setAllRandTemp(temp);
    },
    [randTemp, setAllRandTemp]
  );

  const [step, setStep] = useState(0);

  const { t } = useTranslation();

  const { mintEstimateGasfee, totalSupply } = usePlayerOneRoleContract();

  const { account, status, chainId } = useWallet();

  useEffect(() => {
    if (status === 'error') {
      notification.error({
        duration: null,
        key: 'connect_err',
        message: 'Connect Wallet Error',
        description: 'You need to connect your wallet and try again'
      });
    }
    if (status === 'connected') {
      notification.close('connect_err');
    }
  }, [status]);

  const [gasfee, setGasfee] = useState(0);

  const { data: roleCounter } = useApi(getRoleCount);
  const { data: characterParts, run: getCharacterParts } = useApi(
    myCharacterParts,
    {
      manual: true,
      formatResult: (res) => res.data.part_list
    }
  );

  const persentages = useMemo(() => {
    if (!roleCounter) return;
    return Object.values(roleCounter)
      .map(({ items }) => Object.values(items))
      .flat(Infinity);
  }, [roleCounter]);

  useEffect(() => {
    if (!account) return;
    getCharacterParts(account);
  }, [account, getCharacterParts]);

  const getMyParts = useCallback(
    (item, subItem) =>
      characterParts?.find(
        ({ token_id }) => +token_id === +editorToPartContract(item, subItem)
      )?.amount || 0,
    [characterParts]
  );

  const [bodyData, { set: setBodyData, get: getBodyData }] = useMap([]);

  useEffect(() => {
    if (!account) return;

    const getBodyData = async (bodyId) => {
      const tokenId = editorToPartContract('0', bodyId);

      // get all minted count by tokenid
      const totalPro = await getTotalPro(tokenId);

      // get all owned count by tokenid
      const partBalance = await getPartBalance(tokenId);

      setBodyData(bodyId, { totalSupply: 0, totalPro, partBalance });
    };

    for (let i = 0; i <= 6; i++) {
      getBodyData(i.toString());
    }
  }, [account, getPartBalance, getTotalPro, setBodyData]);

  const mintedAmount = useMemo(() => {
    const bodyDataArray = Array.from(bodyData);
    let amount = 0;
    bodyDataArray.forEach(
      (body) => (amount += body[1] ? +body[1].totalPro : 0)
    );
    return amount;
  }, [bodyData]);

  useEffect(() => {
    if (account) {
      mintEstimateGasfee().then((res) => setGasfee(res));
    }
  }, [account, mintEstimateGasfee, totalSupply]);

  useInterval(() => {
    mintEstimateGasfee().then((res) => setGasfee(res));
  }, 6000);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showMintDialog, setShowMintDialog] = useState(false);
  const [showSwitchNetworkDialog, setShowSwitchNetworkDialog] = useState(false);
  const [shwoErrorDialog, setShwoErrorDialog] = useState(false);
  const [shwoNoBodyDialog, setShwoNoBodyDialog] = useState(false);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  /**
   * send Batch Edit request
   */
  const changePart = useCallback((partArr) => {
    const partStr = partArr
      .map(([k, v]) => [k, v === undefined ? '0' : v].toString())
      .join('|');

    console.log('partStr >>>', partStr);

    unityContent.send('WebApi', 'WebApiChangePart', partStr);
  }, []);

  const doRand = useCallback(() => {
    // if (!roleCounter) {
    //   return;
    // }

    // const randableArr = Array.from(randable);

    // console.log('randableArr >>>', randableArr);

    // const randableList = randableArr.filter(([item, id]) => {
    //   return !!+item && !!+id;
    // });

    // console.log('randableList >>>', randableList);

    const randRes = [
      ['0', '0'],
      ['1', undefined],
      ['2', undefined],
      ['3', undefined],
      ['4', undefined],
      ['5', undefined],
      ['6', undefined],
      ['7', undefined],
      ['8', undefined],
      ['9', undefined],
      ['10', undefined]
      // ['action', '0']
    ]; // randableArr.map(([item, id]) => [item, +id + '']);

    console.log('randRes >>>', randRes);

    // randableList.forEach(([item]) => {
    //   const ids = Object.keys(listData[item].list);
    //   randRes.find(([it]) => it === item)[1] = randomPart(
    //     item,
    //     ids,
    //     roleCounter
    //   );
    // });

    changePart(randRes);
    setAllParts(randRes);
  }, [changePart, setAllParts]);

  const [showOwned, setShowOwned] = useState(false);

  /**
   *  show random settings
   */
  const showModal = useCallback(() => {
    // setAllRandTemp(Array.from(randable));
    // setIsModalVisible(true);
    setShowOwned((v) => !v);
  }, []);

  // save template settings
  const handleOk = useCallback(() => {
    setAllRandable(Array.from(randTemp));
    setIsModalVisible(false);
  }, [randTemp, setAllRandable]);

  const selectItem = useCallback(
    (item, id = 0) => {
      const actionList = {
        0(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `0, ${id || 0}`);
          setParts('0', id || 0);
        },
        1(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `1, ${id || 0}`);
          setParts('1', id);
        },
        2(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `2, ${id || 0}`);
          setParts('2', id);
        },
        3(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `3, ${id || 0}`);
          setParts('3', id);
        },
        4(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `4, ${id || 0}`);
          setParts('4', id);
        },
        5(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `5, ${id || 0}`);
          setParts('5', id);
        },
        6(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `6, ${id || 0}`);
          setParts('6', id);
        },
        7(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `7, ${id || 0}`);
          setParts('7', id);
        },
        8(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `8, ${id || 0}`);
          setParts('8', id);
        },
        9(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `9, ${id || 0}`);
          setParts('9', id);
        },
        10(id) {
          unityContent.send('WebApi', 'WebApiChangePart', `10, ${id || 0}`);
          setParts('10', id);
        },
        action(id) {
          unityContent.send(
            'WebApi',
            'WebApiChangeAnimate',
            (id || 0).toString()
          );
          setParts('action', id || 0);
        }
      };

      if (getParts(item.toString()) === id) {
        actionList[item]();
      } else {
        actionList[item](id);
      }
    },
    [setParts, getParts]
  );

  const history = useHistory();

  const jumpToBuy = useCallback(
    (item, id) => {
      const tokenId = editorToPartContract(item, id);
      history.open(`/market/voxelpart/detail/${tokenId}`);
    },
    [history]
  );

  const makeList = useCallback(
    (type) => {
      // console.log('Object.keys(bdList) >>>', Object.keys(listData[1].list));
      switch (type) {
        case 'body':
          const bdList = listData[0].list;
          return (
            <Grid gg="10px" gc="repeat(3, 1fr)">
              {Object.keys(bdList)
                .filter((key) => !showOwned || !!getMyParts(0, key))
                .map((key) => (
                  <Box
                    onClick={() => {
                      selectItem(0, key);
                    }}
                    onBuy={() => {
                      jumpToBuy(0, key);
                    }}
                    item={'body'}
                    count={getMyParts(0, key)}
                    selected={getParts('0') === key}
                    key={bdList[key]}
                    src={bodyList[`body${+key + 1}`]}
                  />
                ))}
            </Grid>
          );
        case 'hair':
          const hList = listData[1].list;
          const bList = listData[2].list;
          return (
            <div>
              <Title>Hair Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(hList)
                  .filter((key) => !showOwned || !!getMyParts(1, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(1, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(1, key);
                      }}
                      count={getMyParts(1, key)}
                      selected={getParts('1') === key}
                      key={hList[key]}
                      src={hairList[`hair${key}`]}
                    />
                  ))}
              </Grid>
              <Title>Beard Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(bList)
                  .filter((key) => !showOwned || !!getMyParts(2, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(2, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(2, key);
                      }}
                      count={getMyParts(2, key)}
                      selected={getParts('2') === key}
                      key={bList[key]}
                      src={beardList[`beard${key}`]}
                    />
                  ))}
              </Grid>
            </div>
          );

        case 'clothe':
          const sList = listData[4].list;
          const cList = listData[10].list;
          const pList = listData[7].list;
          return (
            <div>
              <Title>Shirt Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(sList)
                  .filter((key) => !showOwned || !!getMyParts(4, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(4, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(4, key);
                      }}
                      count={getMyParts(4, key)}
                      selected={getParts('4') === key}
                      key={sList[key]}
                      src={shirtList[`inside${+key}`]}
                    />
                  ))}
              </Grid>

              <Title>Coat Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(cList)
                  .filter((key) => !showOwned || !!getMyParts(10, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(10, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(10, key);
                      }}
                      count={getMyParts(10, key)}
                      selected={getParts('10') === key}
                      key={cList[key]}
                      src={coatList[`coat${+key}`]}
                    />
                  ))}
              </Grid>

              <Title>Pants Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(pList)
                  .filter((key) => !showOwned || !!getMyParts(7, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(7, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(7, key);
                      }}
                      count={getMyParts(7, key)}
                      selected={getParts('7') === key}
                      key={pList[key]}
                      src={pantsList[`pants${+key}`]}
                    />
                  ))}
              </Grid>
            </div>
          );

        case 'shoe':
          const sdList = listData[6].list;
          return (
            <Grid gg="10px" gc="repeat(3, 1fr)">
              {Object.keys(sdList)
                .filter((key) => !showOwned || !!getMyParts(6, key))
                .map((key) => (
                  <Box
                    onClick={() => {
                      selectItem(6, key);
                    }}
                    onBuy={() => {
                      jumpToBuy(6, key);
                    }}
                    count={getMyParts(6, key)}
                    selected={getParts('6') === key}
                    key={sdList[key]}
                    src={shoesList[`shose${key}`]}
                  />
                ))}
            </Grid>
          );
        case 'jew':
          const nList = listData[5].list;
          const eList = listData[9].list;
          const gList = listData[3].list;
          const htList = listData[8].list;
          return (
            <div>
              <Title>Necklace Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(nList)
                  .filter((key) => !showOwned || !!getMyParts(5, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(5, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(5, key);
                      }}
                      count={getMyParts(5, key)}
                      selected={getParts('5') === key}
                      key={nList[key]}
                      src={necklaceList[`necklace${key}`]}
                    />
                  ))}
              </Grid>

              <Title>Earrings Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(eList)
                  .filter((key) => !showOwned || !!getMyParts(9, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(9, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(9, key);
                      }}
                      count={getMyParts(9, key)}
                      selected={getParts('9') === key}
                      key={eList[key]}
                      src={earringsList[`studs${key}`]}
                    />
                  ))}
              </Grid>

              <Title>Glasses Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(gList)
                  .filter((key) => !showOwned || !!getMyParts(3, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(3, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(3, key);
                      }}
                      count={getMyParts(3, key)}
                      selected={getParts('3') === key}
                      key={gList[key]}
                      src={glassesList[`glasses${key}`]}
                    />
                  ))}
              </Grid>

              <Title>Hat Style</Title>
              <Grid gg="10px" gc="repeat(3, 1fr)">
                {Object.keys(htList)
                  .filter((key) => !showOwned || !!getMyParts(8, key))
                  .map((key) => (
                    <Box
                      onClick={() => {
                        selectItem(8, key);
                      }}
                      onBuy={() => {
                        jumpToBuy(8, key);
                      }}
                      count={getMyParts(8, key)}
                      selected={getParts('8') === key}
                      key={htList[key]}
                      src={hatList[`hat${key}`]}
                    />
                  ))}
              </Grid>
            </div>
          );

        case 'act':
          const actList = listData.action.list;
          return (
            <Grid gg="10px" gc="repeat(3, 1fr)">
              {Object.keys(actList).map((key) => (
                <Box
                  onClick={() => {
                    selectItem('action', key);
                  }}
                  selected={getParts('action') === key}
                  item={'action'}
                  key={key}
                  src={
                    +key === 9
                      ? actionsList.act2
                      : actionsList[`act${+key + 1}`]
                  }
                />
              ))}
            </Grid>
          );
        default:
          return '';
      }
    },
    [getMyParts, getParts, jumpToBuy, selectItem, showOwned]
  );

  const getPersent = useCallback(
    (item) => {
      const subItem = getParts(item.toString());
      if (subItem === undefined) {
        return 0;
      }
      const tokenId = editorToPartContract(item, subItem);

      return (
        persentages?.find((part) => part.part_index === tokenId)?.percentage ||
        0
      );
    },
    [getParts, persentages]
  );

  const handleLink = useCallback(
    ({ preventDefault, target }) => {
      if (target.getAttribute('target') === '_blank') {
        return;
      }

      preventDefault();
      history.push(target.getAttribute('href'));
    },
    [history]
  );

  /**
   * data for template filter
   */
  const selection = useMemo(() => roleList.map(({ name }) => name), []);
  const defaultRole = useMemo(
    () => roleList[getRandTemp('0')].name,
    [getRandTemp]
  );

  const isRoleExist = useMemo(() => {
    if (!account) {
      return true;
    }

    const parts = Array.from(selectedParts)
      .filter((p) => p[0] !== 'action')
      .map((part) => editorToPartContract(...part) || 0);

    const extraId = roldIdSyntByPartId(parts);

    checkRoleExit(extraId).then((res) => {
      return res;
    });
  }, [account, checkRoleExit, selectedParts]);

  const [selectedPartList, hasAllparts, partList] = useMemo(() => {
    let hasAllparts = true;
    const partList = Array.from(selectedParts).filter(
      (part) => part[0] > 0 && part[1] > 0 && part[0] !== 'act'
    );

    const parts = Array.from(selectedParts)
      .filter((p) => p[0] !== 'action')
      .map((part) => editorToPartContract(...part) || 0);

    const list = partList.map((p) => {
      let src = '';
      const count = getMyParts(...p);
      if (count < 1) {
        hasAllparts = false;
      }
      switch (+p[0]) {
        case 1:
          src = hairList[`hair${p[1]}`];
          break;
        case 2:
          src = beardList[`beard${p[1]}`];
          break;
        case 4:
          src = shirtList[`inside${p[1]}`];
          break;
        case 10:
          src = coatList[`coat${p[1]}`];
          break;
        case 7:
          src = pantsList[`pants${p[1]}`];
          break;
        case 6:
          src = shoesList[`shose${p[1]}`];
          break;
        case 5:
          src = necklaceList[`necklace${p[1]}`];
          break;
        case 9:
          src = earringsList[`studs${p[1]}`];
          break;
        case 3:
          src = glassesList[`glasses${p[1]}`];
          break;
        case 8:
          src = hatList[`hat${p[1]}`];
          break;

        default:
          break;
      }
      return (
        <div
          key={p.toString()}
          style={{
            width: '98px',
            height: '136px',
            backgroundColor: '#3c4195',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
          <img style={{ width: '80%' }} src={src} alt="" />
          <img
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px'
            }}
            src={count > 0 ? currect : incurrect}
            alt=""
          />
        </div>
      );
    });

    return [list, hasAllparts, parts];
  }, [getMyParts, selectedParts]);

  const handleShowMintDialog = useCallback(() => {
    // if (
    //   process.env.REACT_APP_ENV !== 'test' ||
    //   process.env.REACT_APP_ENV !== 'preview'
    // ) {
    //   return message.info('Coming soon');
    // }

    const parts = Array.from(selectedParts);

    if (getBodyData(getParts('0'))?.partBalance < 1) {
      console.log('partBalance >>>', getBodyData(getParts('0'))?.partBalance);
      return setShwoNoBodyDialog(true);
    }
    if (
      parts.filter(
        (part) => +part[0] !== 0 && part[0] !== 'action' && part[1] > 0
      ).length <= 4 ||
      !parts.find((part) => +part[0] === 7)[1]
    ) {
      return setShwoErrorDialog(true);
    }

    if (+chainId !== +supported_chains.polygon) {
      return setShowSwitchNetworkDialog(true);
    }

    setShowMintDialog(true);
  }, [chainId, getBodyData, getParts, selectedParts]);

  const switchNetwork = useSwitchNetwork();

  const handleSwitchNetwork = useCallback(async () => {
    const res = await switchNetwork(supported_chains.polygon);
    if (res === undefined) {
      return;
    }

    setShowSwitchNetworkDialog(false);
    setShowMintDialog(true);
  }, [switchNetwork]);

  const handleMintStart = useCallback(() => {
    setShowMintDialog(false);
    setStep(5);
  }, []);

  const [tx, setTx] = useState();
  const handleMintFinish = useCallback(
    (tx) => {
      setTx(tx);
      setStep(6);
      setTimeout(() => {
        getCharacterParts(account);
      }, 3000);
    },
    [getCharacterParts, account]
  );

  const handleMintFail = useCallback((e) => {
    setStep(0);
  }, []);

  return (
    <>
      {/* {!account && <WalletOrGuest />} */}

      {!!account && (
        <UnityBox
          onLoad={() => setIsUnityOnload(true)}
          duration={duration}
          onProgress={(val) => setDuration(val)}
        />
      )}

      <Page style={{ display: isUnityOnload ? 'flex' : 'none' }}>
        <Flex
          fd="column"
          ai="flex-start"
          style={{
            zIndex: 1,
            pointerEvents: 'none'
          }}>
          <Flex jc="space-between" w="320px" style={{ pointerEvents: 'auto' }}>
            <Icon
              onClick={() => setType('body')}
              selected={type === 'body'}
              title={t('editor.body')}
              src={bodyImg}
              alt=""
            />
            <Icon
              onClick={() => setType('hair')}
              selected={type === 'hair'}
              title={t('editor.hairs')}
              src={hairImg}
              alt=""
            />
            <Icon
              onClick={() => setType('clothe')}
              selected={type === 'clothe'}
              title={t('editor.clothe')}
              src={clothe}
              alt=""
            />
            <Icon
              onClick={() => setType('shoe')}
              selected={type === 'shoe'}
              title={t('editor.shoe')}
              src={shoeImg}
              alt=""
            />
            <Icon
              onClick={() => setType('jew')}
              selected={type === 'jew'}
              title={t('editor.jew')}
              src={jew}
              alt=""
            />
            <Icon
              onClick={() => setType('act')}
              selected={type === 'act'}
              title={t('editor.act')}
              src={actImg}
              alt=""
            />
          </Flex>

          <TitleBox
            style={{
              flexGrow: '1',
              overflowY: 'auto',
              marginTop: '20px',
              marginBottom: '40px',
              pointerEvents: 'auto',
              paddingRight: '2px'
            }}>
            <div
              style={{
                display: type === 'body' ? 'block' : 'none'
              }}>
              {makeList('body')}
            </div>

            <div
              style={{
                display: type === 'hair' ? 'block' : 'none'
              }}>
              {makeList('hair')}
            </div>

            <div
              style={{
                display: type === 'clothe' ? 'block' : 'none'
              }}>
              {makeList('clothe')}
            </div>

            <div
              style={{
                display: type === 'shoe' ? 'block' : 'none'
              }}>
              {makeList('shoe')}
            </div>

            <div
              style={{
                display: type === 'jew' ? 'block' : 'none'
              }}>
              {makeList('jew')}
            </div>

            <div
              style={{
                display: type === 'act' ? 'block' : 'none'
              }}>
              {makeList('act')}
            </div>
          </TitleBox>

          <Flex
            w="150%"
            ai="center"
            gap="16px"
            // jc="space-between"
            style={{ pointerEvents: 'auto' }}>
            <BorderedBtn
              onClick={doRand}
              width="160px"
              height="44px"
              style={{
                fontSize: '20px',
                fontWeight: '600',
                position: 'relative'
              }}>
              RESET
            </BorderedBtn>
            <BorderedBtn
              onClick={showModal}
              width="160px"
              height="44px"
              bgColor="rgba(255, 255, 255, 0)"
              border="solid 1px #C0DAFE"
              style={{
                fontSize: '20px',
                // fontWeight: '600',
                position: 'relative'
              }}
              // style={{
              //   width: '160px',
              //   margin: '0 24px',
              //   fontSize: '20px',
              //   fontWeight: '400',
              //   textAlign: 'center',
              //   color: '#06C4FF',
              //   cursor: 'pointer'
              // }}
            >
              {/* {t('editor.random_setting')} */}
              {showOwned ? 'SHOW ALL' : 'SHOW OWNED'}
            </BorderedBtn>

            {/* <div
              onClick={() => getCharacterParts(account)}
              style={{
                cursor: 'pointer'
              }}>
              <img
                style={{
                  width: '24px'
                }}
                src={refresh}
                alt=""
              />
            </div> */}
          </Flex>
        </Flex>

        <div
          style={{
            zIndex: 1,
            alignSelf: 'flex-start',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Flex style={{ pointerEvents: 'auto' }}>
            <BorderedBtn
              width="160px"
              height="44px"
              style={{
                fontSize: '20px',
                fontWeight: '600'
              }}>
              PlayerOne
            </BorderedBtn>
            <BorderedBtn
              bgColor="rgba(255, 255, 255, 0)"
              width="160px"
              height="44px"
              border="solid 2px #C0DAFE"
              style={{
                color: '#C0DAFE',
                marginLeft: '24px',
                fontSize: '20px',
                fontWeight: '400'
              }}>
              {t('editor.co_branded')}
            </BorderedBtn>
          </Flex>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
            <Tag
              bg="deep"
              bgColor="#252557"
              borderColor="#252557"
              className={cx('number-of-parts', {
                selected: !!hasPants && selectedCount > 5
              })}
              filled>
              <div
                style={{
                  position: 'relative',
                  padding: '3px 8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  pointerEvents: 'auto'
                }}>
                <span>Number of parts: {selectedCount}</span>
                <Tooltip
                  title={
                    <span>
                      Six parts are enough MINT
                      <br />
                      Parts must have body and pants
                      <br />
                      Up to mint10 pieces
                    </span>
                  }
                  top>
                  <img src={noticeIcon} alt="" />
                </Tooltip>
              </div>
            </Tag>

            <div style={{ color: 'rgba(255,255,255,.6)' }}>MIN: 6</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            pointerEvents: 'none'
          }}>
          <div
            // ref={scrollBox}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: '1',
              overflowY: 'auto',
              marginBottom: '40px'
            }}>
            <Title style={{ marginTop: 0 }}>{t('editor.attr')}</Title>
            <Grid gg="10px" gc="repeat(3, 1fr)">
              <Box2
                type="Body Style"
                name={roleList[+getParts('0')].name}
                persent={getPersent(0)}
              />
              <Box2
                type="Hair Style"
                persent={getPersent(1)}
                name={listData[1].list[getParts('1')]}
              />
              <Box2
                type="Beard Style"
                persent={getPersent(2)}
                name={listData[2].list[getParts('2')]}
              />
              <Box2
                type="Shirt Style"
                persent={getPersent(4)}
                name={listData[4].list[getParts('4')]}
              />
              <Box2
                type="Coat Style"
                persent={getPersent(10)}
                name={listData[10].list[getParts('10')]}
              />
              <Box2
                type="Pants Style"
                persent={getPersent(7)}
                name={listData[7].list[getParts('7')]}
              />
              <Box2
                type="Shoes Style"
                persent={getPersent(6)}
                name={listData[6].list[getParts('6')]}
              />
              <Box2
                type="Necklace Style"
                persent={getPersent(5)}
                name={listData[5].list[getParts('5')]}
              />
              <Box2
                type="Earrings Style"
                persent={getPersent(9)}
                name={listData[9].list[getParts('9')]}
              />
              <Box2
                type="Glasses Style"
                persent={getPersent(3)}
                name={listData[3].list[getParts('3')]}
              />
              <Box2
                type="Hat Style"
                persent={getPersent(8)}
                name={listData[8].list[getParts('8')]}
              />
            </Grid>

            <Title>{t('editor.contract')}</Title>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flexGrow: '1'
              }}>
              <Between>
                <P>{t('editor.contract_addr')}</P>
                <OutLink
                  target="_blank"
                  href={`https://bscscan.com/address/${PlayerOneRoleAddress}`}>
                  {showShortAddress(PlayerOneRoleAddress)}
                </OutLink>
              </Between>
              <Between>
                <P>{t('editor.standard')}</P>
                <P>ERC - 721</P>
              </Between>
              <Between>
                <P>{t('editor.chain')}</P>
                <P>Polygon</P>
              </Between>
              <Between>
                <P>{t('editor.total')}</P>
                <P>{mintedAmount}</P>
              </Between>
            </div>
          </div>

          <Flex
            style={{
              alignItems: 'center',
              gap: '80px'
            }}>
            <BorderedBtn
              width="160px"
              height="44px"
              onClick={handleShowMintDialog}
              style={{
                fontSize: '20px',
                fontWeight: '600',
                pointerEvents: 'auto'
                // opacity: getBodyData(getParts('0'))?.partBalance > 0 ? 1 : 0.6
              }}>
              MINT NOW
            </BorderedBtn>
            <P>
              Gas Fee: {((gasfee * 100000) >> 0) / 100000}
              {' MATIC'}
            </P>
          </Flex>
        </div>

        <StyledModal
          title={
            <div
              style={{
                textAlign: 'center',
                color: '#06C4FF',
                fontSize: '20px',
                fontWeight: '600'
              }}>
              {t('editor.random_setting')}
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCancel}>
          <CheckList
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Grow>
              <CheckListTitle>
                <img src={bodyImg} alt="" />
                <span>{t('editor.body')}</span>
              </CheckListTitle>

              <StyledSelection
                dropdownClassName="role-select"
                onChange={(val) => {
                  changeRandTemp(val);
                }}
                default={defaultRole}
                selection={selection}
              />
            </Grow>

            <Grow>
              <CheckListTitle>
                <img src={hairImg} alt="" />
                <span>{t('editor.hairs')}</span>
              </CheckListTitle>

              <StyledCheckbox
                onChange={(e) => {
                  setRandTemp('1', e.target.checked);
                }}
                checked={getRandTemp('1')}>
                Hair
              </StyledCheckbox>
              <StyledCheckbox
                onChange={(e) => setRandTemp('2', e.target.checked)}
                checked={getRandTemp('2')}>
                Beard
              </StyledCheckbox>
            </Grow>

            <Grow>
              <CheckListTitle>
                <img src={clothe} alt="" />
                <span>{t('editor.clothe')}</span>
              </CheckListTitle>

              <StyledCheckbox
                onChange={(e) => setRandTemp('4', e.target.checked)}
                checked={getRandTemp('4')}>
                Shirt
              </StyledCheckbox>
              <StyledCheckbox
                onChange={(e) => setRandTemp('10', e.target.checked)}
                checked={getRandTemp('10')}>
                Coat
              </StyledCheckbox>
              <StyledCheckbox
                onChange={(e) => setRandTemp('7', e.target.checked)}
                checked={getRandTemp('7')}>
                Pants
              </StyledCheckbox>
            </Grow>

            <Grow>
              <CheckListTitle>
                <img src={shoeImg} alt="" />
                <span>{t('editor.shoe')}</span>
              </CheckListTitle>

              <StyledCheckbox
                onChange={(e) => setRandTemp('6', e.target.checked)}
                checked={getRandTemp('6')}>
                Shoes
              </StyledCheckbox>
            </Grow>

            <Grow>
              <CheckListTitle style={{ alignItems: 'center' }}>
                <img src={jew} alt="" />
                <span>{t('editor.jew')}</span>
              </CheckListTitle>

              <StyledCheckbox
                onChange={(e) => setRandTemp('3', e.target.checked)}
                checked={getRandTemp('3')}>
                Glasses
              </StyledCheckbox>
              <StyledCheckbox
                onChange={(e) => setRandTemp('5', e.target.checked)}
                checked={getRandTemp('5')}>
                Necklace
              </StyledCheckbox>
              <StyledCheckbox
                onChange={(e) => setRandTemp('9', e.target.checked)}
                checked={getRandTemp('9')}>
                Earrings
              </StyledCheckbox>
              <StyledCheckbox
                onChange={(e) => setRandTemp('8', e.target.checked)}
                checked={getRandTemp('8')}>
                Hat
              </StyledCheckbox>
            </Grow>
          </CheckList>
          <div
            style={{
              marginTop: '75px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <BorderedBtn onClick={handleOk} height="30px" width="108px">
              {t('editor.save')}
            </BorderedBtn>
          </div>
        </StyledModal>

        <MintModal
          noHeader={step >= 3 ? true : false}
          visible={step > 0}
          onCancel={() => setStep(0)}
          width="428px"
          head={t('editor.view')}>
          {step === 5 && (
            <div
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px'
              }}>
              <img className={cx('loading-icon')} src={loadingIcon} alt="" />
              <Loading2 text={t('editor.mint_msg5')} />
            </div>
          )}

          {step === 6 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                padding: '20px 0',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, .6)'
              }}>
              <img src={finishIcon} alt="" />
              <div>
                <p>
                  <span>VoxelRole minting request is submitted! </span>
                  <a
                    href={`https://polygonscan.com/tx/${tx}`}
                    target="_blank"
                    rel="noreferrer">
                    View on polygon &gt;&gt;
                  </a>
                </p>
                <p>
                  <div>
                    Within three minutes of a successful polygon interaction,
                  </div>
                  <div>
                    <span>you can click here to </span>
                    <a onClick={handleLink} href="/assets/voxelrole/role">
                      View the VoxelRole &gt;&gt;
                    </a>
                  </div>
                </p>
              </div>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Button outline onClick={() => setStep(0)}>
                  <div
                    style={{
                      color: '#06C4FF',
                      height: '28px',
                      width: '128px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    Cancel
                  </div>
                </Button>
                <BorderedBtn onClick={() => setStep(0)} height="28px">
                  <div style={{ width: '128px' }}>Confirm</div>
                </BorderedBtn>
              </div>
            </div>
          )}
        </MintModal>

        <Dialog open={shwoErrorDialog}>
          <div
            style={{
              width: '440px',
              height: '220px',
              backgroundColor: '#4747A4',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '24px',
              fontSize: '14px'
            }}>
            <img style={{ width: '42px' }} src={errorIcon} alt="" />
            <div style={{ color: 'rgba(255, 255, 255, .65)' }}>
              Required parts are missing: pants + 4 other parts
            </div>
            <BorderedBtn
              onClick={() => setShwoErrorDialog(false)}
              height="32px"
              width="108px">
              Confirm
            </BorderedBtn>
          </div>
        </Dialog>

        <Dialog open={shwoNoBodyDialog}>
          <div
            style={{
              width: '440px',
              height: '220px',
              backgroundColor: '#4747A4',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '24px',
              fontSize: '14px'
            }}>
            <img style={{ width: '42px' }} src={errorIcon} alt="" />
            <div style={{ color: 'rgba(255, 255, 255, .65)' }}>
              There is no available number for the currently selected body
            </div>
            <BorderedBtn
              onClick={() => setShwoNoBodyDialog(false)}
              height="32px"
              width="108px">
              Confirm
            </BorderedBtn>
          </div>
        </Dialog>

        <MintDIalog
          data={selectedPartList}
          open={showMintDialog}
          hasAllparts={hasAllparts}
          isRoleExist={isRoleExist}
          parts={partList}
          onStart={handleMintStart}
          onFinish={handleMintFinish}
          onFail={handleMintFail}
          onClose={() => setShowMintDialog(false)}
        />

        <SwitchNetworkDialog
          onConfirm={handleSwitchNetwork}
          onClose={() => setShowSwitchNetworkDialog(false)}
          open={showSwitchNetworkDialog}
        />
      </Page>

      {duration < 1 ? <Loading duration={duration * 100} /> : ''}
    </>
  );
}

const SwitchNetworkDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open}>
    <div
      style={{
        width: '440px',
        padding: '24px 0',
        backgroundColor: '#4747A4',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
        fontSize: '14px'
      }}>
      <img src={warningIcon} alt="" />
      <div style={{ color: 'rgba(255, 255, 255, .65)' }}>
        <span>You need to switch your wallet to the polygon network</span>
        <br />
        <span>to continue your current operations.Are you sure to switch?</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
        <Button outline onClick={onClose}>
          <div
            style={{
              color: '#06C4FF',
              width: '168px',
              textAlign: 'center',
              fontSize: '16px'
            }}>
            Cancel
          </div>
        </Button>
        <Button onClick={onConfirm}>
          <div
            style={{
              color: '#fff',
              width: '168px',
              textAlign: 'center',
              fontSize: '16px'
            }}>
            Confirm
          </div>
        </Button>
      </div>
    </div>
  </Dialog>
);
