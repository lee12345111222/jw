import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Flex } from '@/components/Basic';

import useApi from '@/hooks/useApi';

import { getTaskList } from '@/api/user';

import styles from './AirdropScore.module.css';

import taskIcon from '@/assets/icon/task-icon.png';

import { ReactComponent as QuestionsIcon } from '@/assets/icon/question_icon.svg';

import { Tooltip } from 'antd';

import Loading from '@/components/CardList/components/Loading/index';
import useTwitterBindStatus from '@/hooks/useTwitterBindStatus';

import { formatResultTask } from './utils';

import { Item } from './AirdropTaskItem';

export default function AirdropTaskBox({ refresh, account, token }) {
  const [tasks, setTasks] = useState();

  const bindStatus = useTwitterBindStatus();

  const { run, loading: tasksLoading } = useApi(getTaskList, {
    manual: true,
    loadingDelay: 1000,
    onSuccess: (res) => {
      const results = formatResultTask(res);

      const tasks = results.slice();

      tasks.splice(1, 0, ...tasks.splice(3, 3));

      setTasks(tasks);
    }
  });

  const getList = useCallback(async () => {
    if (account && token) await run({ address: account, login_token: token });
  }, [account, token, run]);

  const onRefresh = useCallback(() => {
    refresh();
    getList();
  }, [getList, refresh]);

  // 当用户绑定twitter或discord时更新界面
  useEffect(() => {
    if (bindStatus === 'true') {
      onRefresh();
    }
  }, [bindStatus, onRefresh]);

  useEffect(() => {
    getList();
  }, [getList]);

  const TaskList = useMemo(() => {
    return tasks?.map((item) => (
      <Item
        {...item}
        key={item.title}
        id={item.task_id}
        token={token}
        account={account}
        refresh={onRefresh}
      />
    ));
  }, [account, onRefresh, tasks, token]);

  return (
    <>
      <Flex fd="column" gap="32px">
        <Flex fd="column" gap="16px">
          <Flex ai="center" gap="8px">
            <img className={styles['img-icon']} src={taskIcon} alt="" />
            <div className={styles['title']}>Task</div>
          </Flex>
          <Flex className={styles['content']} gap="8px">
            Complete assignments and help us advertise projects to earn points.
            The higher the score you have, the better your chance of winning the
            box
            <Tooltip
              overlayInnerStyle={{
                padding: 16,
                width: 382,
                background: '#30363C'
              }}
              title="* To receive the airdrop reward, you must complete the four marked tasks; otherwise, you may not receive the airdrop reward when the score meets the standard. If your score does not meet the requirements, PlayerOne will empty your score and award">
              <QuestionsIcon style={{ cursor: 'pointer' }} />
            </Tooltip>
          </Flex>
        </Flex>

        {tasksLoading ? (
          <Flex ai="center" jc="center">
            <Loading loading={tasksLoading} />
          </Flex>
        ) : (
          <div>{TaskList}</div>
        )}
      </Flex>
    </>
  );
}
