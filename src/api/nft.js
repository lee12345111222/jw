import request from '@/utils/request';

export const mycharacterparts = async (data) =>
  await request('/asset/mycharacterparts', {
    data
  });

export const myMeebits = async (data) =>
  await request('/asset/mymeebits', {
    data
  });

export const makebuildingtemplate = async (data) =>
  await request('/zone/user/makebuildingtemplate', {
    data
  });
