import axios from "axios";

/*
세션스토리지의 JwtToken 반환
 */
export const getTokenToSessionStorage = () => {
    const token = sessionStorage.getItem('mumo_access_token',null);
    return token;
}

/*
세션스토리지의 JwtToken  삭제
 */
export const removeTokenFromSessionStorage = () => {
    sessionStorage.removeItem('mumo_access_token',null);
}

/*
세션스토리지의 UserInfo 삭제
 */
export const removeUserInfoFromSessionStorage = () => {
    sessionStorage.removeItem('mumo_user_info');
}

/*
세션스토리지의 UserInfo 반환
 */
export const getUserInfoToSessionStorage = () => {
    const userInfo = sessionStorage.getItem('mumo_user_info');
    return JSON.parse(userInfo);
}

/*
axios 요청 헤더 Authorization 설정
 */
const setAuthorizationHeader = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
}

/*
세션 스토리지에 JwtToken 저장/삭제s
 */
const saveTokenToSessionStorage = (token) => {
    if (token) {
        sessionStorage.setItem('mumo_access_token', token);
    } else {
        sessionStorage.removeItem('mumo_access_token');
    }
}

/*
세션 스토리지에 UserInfo 저장/삭제
 */
const saveUserInfoToSessionStorage = (userInfo) => {
    if (userInfo) {
        sessionStorage.setItem('mumo_user_info', JSON.stringify(userInfo));
    } else {
        sessionStorage.removeItem('mumo_user_info');
    }
}

/*
로그인 시 세션스토리지 JwtToken 저장/axios 헤더 Authorization 세팅
 */
export const loginComplete = (token, userInfo) => {
    saveTokenToSessionStorage(token);
    saveUserInfoToSessionStorage(userInfo);
    setAuthorizationHeader(token);
}

/*
로그아웃 시 세션스토리지 JwtToken 삭제/axios 헤더 Authorization 제거
 */
export const logoutComplete = () => {
    saveTokenToSessionStorage();
    saveUserInfoToSessionStorage();
    setAuthorizationHeader();
}