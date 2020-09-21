import {LocalStorageUtil} from '../utils/storageUtil';
import {ConstKey} from "../config";

export default function(ctx) {
  const token = ctx.$cookies.get(ConstKey.TokenCookieName);
  if (ctx.store.state.logined || !token) {
    return;
  }
  return ctx.$axios.$get('/user').then((data) => {
    ctx.store.commit('setLogined', true);
    ctx.store.commit('setUserInfo', data.user);
  }, (error) => {
    ctx.$cookies.remove(ConstKey.TokenCookieName);
  });
}