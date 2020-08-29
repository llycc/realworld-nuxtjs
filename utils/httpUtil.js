import axios from 'axios';
const http = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
});

/**
 * 请求拦截器
 * */
http.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
});

/**
 * 响应拦截器
 * */
http.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});

export default {
  http: http,
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
