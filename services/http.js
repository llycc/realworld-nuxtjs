import axios from 'axios';
import {environment} from "../config";
import {state, getters} from '../store/user';

const http = axios.create({
  baseURL: environment.baseURL,
  timeout: environment.requestTimeout
});

/**
 * 请求拦截器
 * */
http.interceptors.request.use(function(config) {
  const userToken = getters.getUserToken(state());
  if (userToken) {
    config.headers['Authorization'] = `Token ${userToken}`;
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
  console.log(error);
  //return Promise.reject(error.response.data);
});


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
  },
  delete: function(path, data, params, headers) {
    return http.request({
      url: path, method: 'delete', params, headers, data
    });
  },
  put: function(path, data, params, headers) {
    return http.request({
      url: path, method: 'put', params, headers, data
    });
  }
}
