import {LocalStorageUtil} from '../utils/storageUtil';
import {ConstKey} from "../config";
import Cookie from 'js-cookie';
export const  state = () => ({
  logined: false,
  userInfo: {},
  userToken: null,
});

export const getters = {
  isLogined:state => state.logined,
  curUserInfo: state => state.userInfo,
};

export const mutations = {
  setLogined(state, logined) {
    state.logined = logined;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setUserToken(state, token) {
    if (process.client) {
      Cookie.set(ConstKey.TokenCookieName, token);
    }
  }
};
