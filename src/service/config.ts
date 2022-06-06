// showLastCommitMessageForThisLibrary.js
import {create} from 'apisauce';

// define the api
const api = create({
  baseURL: 'http://streaming.nexlesoft.com:4000/api',
  //   headers: { Accept: 'application/vnd.github.v3+json' }
  timeout: 3000,
});

export default api;
