import request from '../utils/request';

export const jsonData = async () => await request('/index/mapdb', {});

export const getparcelstatus = async () =>
  await request('/event/presaleparcelstatus', {
    method: 'post'
  });

export const getShareUrl = async (data) =>
  await request('/zone/user/shareparceldata', {
    data
  });

export const getogparcelproof = async (data) =>
  await request('/event/ogbuyparcel', {
    data
  });

export const regetogparcelproof = async (data) =>
  await request('/event/regetogparcelproof', {
    data
  });

export const ogpasscards = async (data) =>
  await request('/event/myogpasscards', {
    data
  });

export const isog = async (data) =>
  await request('/event/isogaddress', {
    data
  });

export const ogbuypasscard = async (data) =>
  await request('/event/ogbuypasscard', {
    data
  });

export const getparcelmetadata = async (data) =>
  await request('/zone/special/getparcelmetadata', {
    data
  });

export const saveparcelmetadata = async (data) =>
  await request('/zone/special/saveparcelmetadata', {
    data
  });

export const getsysdefaults = async (data) =>
  await request('/zone/special/sysdefaults', {
    data
  });
