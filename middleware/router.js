import {ConstKey} from "../config";

export default function(ctx) {
  const token = ctx.$cookies.get(ConstKey.TokenCookieName);
  if (ctx.store.state.logined || !token) {
    return;
  }
  return ctx.app.$users.getUserInfo().then((data) => {
    ctx.store.commit('user/setLogined', true);
    ctx.store.commit('user/setUserInfo', data.user);
  }, (error) => {
    ctx.$cookies.remove(ConstKey.TokenCookieName);
  });
}