import axios from 'axios';
import handleError from './ultis/handleError';

const instance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

instance.interceptors.response.use(
  response => response,
  ({message, response: {data, status}}) => {
    return handleError({message, data, status});
  },
);

export default instance;