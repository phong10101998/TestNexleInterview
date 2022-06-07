import {create} from 'apisauce';
import {getOAuthToken} from './handleToken';

const api = create({
  baseURL: 'http://streaming.nexlesoft.com:4000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

export const apiPost = async (url: string, data?: any) => {
  try {
    const token = await getOAuthToken();
    const res = await api
      .setHeaders({
        Authorization: `Bearer ${token}`,
      })
      .post(url, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiGet = async (url: string) => {
  try {
    const token = await getOAuthToken();
    api.setHeaders({Authorization: `Bearer ${token}`});
    const res = await api.get(url);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
