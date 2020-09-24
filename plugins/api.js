import {environment, ConstKey} from "../config";

import articles from '../api/articles';
import users from '../api/users';
import tags from '../api/tags';
import profiles from '../api/profiles';

function injectApi(ctx,injector) {
  injector('articles', articles(ctx.$axios));
  injector('users' ,users(ctx.$axios));
  injector('tags', tags(ctx.$axios));
  injector('profiles', profiles(ctx.$axios));
}
export default function(ctx, injector) {
  ctx.$axios.baseURL = environment.baseURL;
  ctx.$axios.onRequest((config) => {
    const token = ctx.$cookies.get(ConstKey.TokenCookieName);    
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  });
  ctx.$axios.onResponse((response) => {
    
  });
  ctx.$axios.onResponseError((error) => {
    
  });
  injectApi(ctx,injector);
}
