export const  state = () => ({
  logined: false,
  userInfo: {}
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
  }
};
