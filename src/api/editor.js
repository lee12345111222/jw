import request from '../utils/request';

export const voxels = async (data) =>
  await request('/editorshop/getvoxels', {
    data
  });

export const nftInfo = async (data) =>
  await request('/index/nftinfo', {
    data
  });

export const getgameres = async (data) =>
  await request('/asset/getgameres', {
    data
  });

export const savegameres = async (data) =>
  await request('/zone/user/savegameres', {
    data
  });

export const getblueprints = async (data) =>
  await request('/zone/user/buildingtemplatesbyparcel', {
    data
  });

export const bindbuildingtemplate = async (data) =>
  await request('/zone/user/usebuildingtemplate', {
    data
  });
