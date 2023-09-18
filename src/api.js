
import axios from 'axios';
import { getTokenToSessionStorage } from './reducer/loginComm';

const instance = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL
})


/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
 instance.interceptors.request.use(
    (config) => {
        const token = getTokenToSessionStorage();
      try {
        config.headers.Authorization = `Bearer ${token}`;
        // config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        return config;
      } catch (err) {
        // console.error('[_axios.interceptors.request] config : ' + err);s
      }
      return config;
    },
    (error) => {
      // 요청 에러 직전 호출됩니다.
      return Promise.reject(error);
    }
  );

export default instance;