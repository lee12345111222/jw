import request from '../utils/request';

export const treasureList = async (address) =>
  await request(`/asset/getmytreasurebox?my_address=${address}`);
