import http from './http';

export function login(data) {
  return http.post('/users/login', data);
}
