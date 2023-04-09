import request from '../utils/request';

export const upFile = async (data) =>
  await request('/zone/user/uploadgamefile', {
    data
  });
