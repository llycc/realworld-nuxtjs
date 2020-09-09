import axios from 'axios';
import {LocalStorageUtil} from '../utils/storageUtil';
import {environment, LocalStorageKey} from "../config";


const http = axios.create({
  baseURL: environment.baseURL,
  timeout: environment.requestTimeout
});
let currentToken = LocalStorageUtil.getItem(LocalStorageKey.Token);


/**
 * 请求拦截器
 * */
http.interceptors.request.use(function(config) {
  if (currentToken) {
    config.headers['Authorization'] = `Token ${currentToken}`;
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

/**
 * 响应拦截器
 * */
http.interceptors.response.use(function(response) {
  return response.data;
}, function(error) {
  return Promise.reject(error.response.data);
});

export function setToken(token) {
  currentToken = token;
  LocalStorageUtil.setItem(LocalStorageKey.Token, currentToken);
}
export function getToken() {
  currentToken = LocalStorageUtil.getItem(LocalStorageKey.Token);
  return currentToken;
}

export default {
  axios,
  http,
  get: function(path, params, headers) {
    return http.request({
      url: path, method: 'get',params, headers
    });
  },
  post: function(path, data, params, headers) {
    return http.request({
      url: path, method: 'post', params, headers, data
    });
  }
}
