import request from '../utils/request';

export const getrecommandedblueprint = async (tokenId) =>
  await request(`/index/recommandbuildingtemplates?token_id=${tokenId}`);

export const blueprintbyparcel = async (data) =>
  await request('/asset/blueprintbyparcel', {
    data
  });

export const blueprintinfo = async (data) =>
  await request('/asset/blueprintinfo', {
    data
  });
