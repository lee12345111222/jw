import request from '../utils/request';

export const eventinfo = async (data) =>
  await request('/index/eventinfo', {
    data
  });

export const geteventinfo = async (data) =>
  await request('/index/geteventinfo', {
    data
  });

export const shareogpasscard = async (data) =>
  await request('/event/shareogpasscarddata', {
    data
  });

export const sharestatus = async (data) =>
  await request('/event/shareogpasscardstatus', {
    data
  });

export const getmgbalance = async (data) => {
  return await request('/asset/getmgbalance', {
    data
  });
};
