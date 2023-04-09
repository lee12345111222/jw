import request from '../utils/request';

export const list = async (data) =>
  await request('/index/sharedspaces', {
    data
  });

export const mythumb = async (address) =>
  await request('/asset/mythumbbuildings', {
    data: { address }
  });

export const thumbPlus = async (data) =>
  await request('/zone/user/thumbbuilding', {
    data
  });

// 设置分享封面图
export const customSpaceInfo = async (data) =>
  await request('/zone/user/customsharedspaceinfo', {
    data
  });

// 删除自己的分享
export const dropOwnSpcae = async (data) =>
  await request('/zone/user/changesharedspacestatus', {
    data: {
      ...data,
      delete: 1
    }
  });

// 隐藏自己的分享
export const hideOwnSpcae = async (data) =>
  await request('/zone/user/changesharedspacestatus', {
    data: {
      ...data,
      delete: 0
    }
  });

// 获取KV配置
export const getkv = async () => await request('/index/getallconfigkv');

// 获取分享详情
export const spaceDetail = async (uuid) =>
  await request('/index/sharedspacedetail', {
    data: { uuid }
  });
