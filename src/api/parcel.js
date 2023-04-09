import request from '../utils/request';

export const getSettleStatus = async (tokenId) =>
  await request('/asset/settleparcelstatus', { data: { token_id: tokenId } });

export const setSettleStatus = async (data) =>
  await request('/zone/user/settleparcel', { data });

export const claimSettleReward = async (data) =>
  await request('/zone/user/claimsettleparcel', { data });

export const prebuildingfitparcels = async (data) =>
  await request('/zone/user/prebuildingfitparcels', { data });

export const prebuildingpublish = async (data) =>
  await request('/zone/user/prebuildingpublish', { data });
