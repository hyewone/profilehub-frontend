import {loginComplete, logoutComplete} from './loginComm'

export const initialState = {
    isLogin: false,
    userInfo: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'isLogin': {
            loginComplete(action.token, action.data);
            return {
                ...state,
                isLogin: true,
                userInfo: action.data
            };
        }
        case 'isNonLogin': {
            logoutComplete()
            return {
                ...state,
                isLogin: false,
                userInfo: {}
            };
        }
        default:
            return state;
    }
};

export default reducer;