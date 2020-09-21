import {environment, ConstKey} from "../config";
import Cookie from 'js-cookie';

export default function(ctx) {
  ctx.$axios.baseURL = environment.baseURL;
  ctx.$axios.onRequest((config) => {
    const token = process.server ? ctx.$cookie.get(ConstKey.TokenCookieName) : Cookie.get(ConstKey.TokenCookieName);    
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  });
  ctx.$axios.onResponse((response) => {
    
  });
  ctx.$axios.onResponseError((error) => {
    
  });
}