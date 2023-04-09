import request from '../utils/request';

export const jetpackinfo = async (data) =>
  await request('/asset/jetpackinfo', {
    data
  });

export const ownedjetpacks = async (data) =>
  await request('/asset/ownedjetpacks', {
    data
  });

export const setmainjetpack = async (data) =>
  await request('zone/user/setmainjetpack', {
    data
  });
