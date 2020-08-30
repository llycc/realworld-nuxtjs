export const  state = () => ({
  logined: false
});

export const getters = {
  isLogined(state) {
    return state.logined
  }
};

export const mutations = {
  setLogined(state, logined) {
    state.logined = logined;
  }
};
