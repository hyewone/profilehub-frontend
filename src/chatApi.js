
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

  instance.interceptors.response.use(
    (response) => {
      // 응답 성공 시 처리할 로직
      return response;
    },
    (error) => {
      console.error('[_axios.interceptors.response] Error:', error); // 응답 에러 발생 시 에러 메시지 출력
      return Promise.reject(error);
    }
  );

export default instance;