import { useMemo, useState, useCallback, useEffect } from 'react';

import { myCharacters, setMainRole as setMain } from '@/api/role';

import { useHistory } from 'react-router-dom';

import useApi from '@/hooks/useApi';

import { useTranslation } from 'react-i18next';

import { Title } from '@/components/BasicComponents';

import { Spin, Menu, Dropdown, Modal } from 'antd';

import styled from 'styled-components';

import { Flex, Grid, Icon } from '@/components/Basic';

import { ActionSheet } from '../StyledComponents';

import VideoPlayer from '@/components/VideoPlayer';

import load from '@/utils/load';

import { Btn } from '@/components/BasicComponents';

const { showMore, voxel, checked, unChecked, add } = load('icon');

const { confirm } = Modal;

const { Item } = Menu;

const StatusBar = (props) => {
  const { t } = useTranslation();

  return (
    <Title title={props.count + ' ' + t('statusbar.results')}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Icon
          src={add}
          onClick={() => window.open('/role-editor')}
          style={{ width: '21px', marginRight: '18px', cursor: 'pointer' }}
        />
      </div>
    </Title>
  );
};

const MCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
`;

const GoodCard = ({
  img,
  video,
  name,
  index,
  current,
  onPlay,
  role,
  mainRole,
  setMainRole
}) => {
  const { t } = useTranslation();

  const history = useHistory();

  const menu = useMemo(
    () => (
      <Menu>
        <Item key="0">
          <div onClick={() => history.push(`/market/voxel/detail/${index}`)}>
            {t('statusbar.detail')}
          </div>
        </Item>
        <Item key="1">
          <a
            target="_blank"
            href={`${process.env.REACT_APP_OPENSEA_VOXEL_REDIRECT}${index}`}
            rel="noreferrer"
          >
            {t('statusbar.sell')}
          </a>
        </Item>
      </Menu>
    ),
    [history, index, t]
  );

  return (
    <MCard>
      <VideoPlayer
        auto
        controls
        src={video}
        poster={img}
        index={index}
        current={current}
        onPlay={onPlay}
        preload="metadata"
        loop
        muted
      />
      <ActionSheet>
        <Flex ai="center" jc="space-between">
          <div>{name}</div>
          <Dropdown overlay={menu} trigger={['click']}>
            <img
              style={{ width: '20px', cursor: 'pointer' }}
              src={showMore}
              alt=""
            />
          </Dropdown>
        </Flex>
        <Flex ai="center" gap="32px" jc="space-between">
          <Btn
            style={{
              flexShrink: 0,
              padding: '0 8px 0 4px',
              fontSize: '15px',
              height: '20px',
              background: '#FFB801'
            }}
          >
            <img
              style={{
                height: '14px',
                margin: '4px'
              }}
              src={voxel}
              alt=""
            />
            {roleList[role]}
          </Btn>
          <img
            onClick={setMainRole}
            src={mainRole ? checked : unChecked}
            style={{ cursor: 'pointer', width: '20px' }}
            alt=""
          />
        </Flex>
      </ActionSheet>
    </MCard>
  );
};

const roleList = {
  1000: 'Human',
  1001: 'Alien',
  1002: 'Monkey',
  1003: 'Robot',
  1004: 'Elves',
  1005: 'Zombie',
  1006: 'Skull'
};

export default function Voxel({ account, getToken }) {
  const { run, data, loading } = useApi(myCharacters, {
    manual: true,
    formatResult: (res) => res.data.list
  });

  useEffect(() => {
    if (!account) {
      return;
    }

    run(account);
  }, [account, run]);

  const { run: set } = useApi(setMain, {
    manual: true,
    onSuccess: () => run(account)
  });

  const [current, setCurrent] = useState();

  const { t } = useTranslation();

  const setMainRole = useCallback(
    (tokenId) => {
      confirm({
        title: t('create.set_main'),
        okText: t('create.confirm'),
        cancelText: t('create.cancel'),
        async onOk() {
          const token = await getToken();
          set(token, tokenId, account);
          return new Promise((resolve, reject) => {
            setTimeout(resolve, 800);
          }).catch(() => console.log('Oops errors!'));
        }
      });
    },
    [account, getToken, set, t]
  );

  const GoodList = useMemo(() => {
    if (!data) return [];
    data.find(({ main_role }) => main_role) || (data[0].main_role = true);
    return data.map((good, index) => (
      <GoodCard
        img={good.image_url}
        video={good.video_url}
        index={good.token_id}
        current={current}
        name={good.token_name || '-'}
        key={index}
        role={good.part_map?.[6] || 0}
        mainRole={good.main_role}
        setMainRole={() => setMainRole(good.token_id)}
        onPlay={(val) => setCurrent(val)}
      />
    ));
  }, [current, data, setMainRole]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <StatusBar count={data?.length || 0} />
      <div
        style={{
          padding: '24px',
          overflowY: 'auto',
          boxSizing: 'border-box',
          flexGrow: 1
        }}
      >
        <Grid gc="repeat(auto-fill, minmax(200px, 1fr))" gg="24px" mb="40px">
          {GoodList}
        </Grid>
      </div>
      <Spin spinning={loading} />
    </div>
  );
}
