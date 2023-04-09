import request from '../utils/request';

export const login = async (data) =>
  await request('/index/login', {
    data
  });

export const create = async (data) =>
  await request('/zone/user/createspace', {
    data
  });

export const copySpace = async (data) =>
  await request('/zone/user/duplicatespace', {
    data
  });

export const dropSpace = async (data) =>
  await request('/zone/user/deletespace', {
    data
  });

export const getSpaceList = async (data) =>
  await request('/asset/getspacelist', {
    data
  });
// ?.data?.space_list || [];

export const getGoodList = async (data) =>
  await request('/shop/list', {
    data
  });

export const getGoodDetail = async (data) =>
  await request('/shop/detail', {
    data
  });

// // 获取地块详细信息
// export const getLandInfo = async (data) =>
//   await request('/asset/parcelinfo', {
//     data
//   });

export const setLandInfo = async (data) =>
  await request('/zone/user/customparcelinfo', {
    data
  });

export const myParcels = async (address) =>
  await request('/asset/myparcels', {
    data: {
      address
    }
  });

export const buildingTemp = async () =>
  await request('/index/fetchbuildingtemplate', {
    method: 'post'
  });

export const isAllowed = async (data) =>
  await request('/event/allowtest1', {
    data
  });
export const getTaskList = async (data) =>
  await request('/zone/task/plist', {
    data
  });

export const postPaction = async (data) =>
  await request('/zone/task/paction', {
    data
  });

export const getTaskDetail = async (data) =>
  await request('/zone/task/pdetail', {
    data
  });

export const getAccountInfo = async (data) =>
  await request('/zone/account/info', {
    data
  });

export const getReward = async (data) =>
  await request('/zone/account/reward', {
    data
  });

export const addCollaborator = async (data) =>
  await request('/zone/user/setcollaborator', {
    data
  });

export const removeCollaborator = async (data) =>
  await request('/zone/user/removecollaborator', {
    data
  });

export const getMyCollaborator = async (data) =>
  await request('/asset/mycollaborator', {
    data
  });

export const getDiscordUserInfo = async (data) =>
  await request('/auth/discorduser', {
    data
  });

export const postAuthDiscordBind = async (data) =>
  await request('/auth/discordbinduser', {
    data
  });

export const postConfirmInvite = async (data) =>
  await request('/zone/account/confirminvite', {
    data
  });

export const ReceiveDailyAward = async (data) =>
  await request('/zone/account/claimdailyairdrop', {
    data
  });

export const getTwitterUserInfo = async (data) =>
  await request(`/auth/gettwitteruser?code=${data.code}`);

export const postAuthTwitterBind = async (data) =>
  await request('/auth/twitterbinduser', {
    data
  });
