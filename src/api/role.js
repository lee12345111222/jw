import request from '../utils/request';

export const myCharacters = async (address) =>
  await request('/asset/mycharacters', { data: { address } });

export const getMainRole = async (address) =>
  await request('/asset/getmainrole', { data: { address } });

export const myCharacterParts = async (address) =>
  await request('/asset/mycharacterparts', { data: { address } });

export const getRoleCount = async () =>
  await request('/index/characterpartcounter', {
    method: 'post'
  });

export const getCharacterHashes = async () =>
  await request('/index/characterhashes', {
    method: 'post'
  });

export const setMainRole = async (data) => {
  return await request('/zone/user/setmainrole', {
    data
  });
};

export const setMeebit = async (data) => {
  return await request('/zone/user/setmeebitrole', {
    data
  });
};
