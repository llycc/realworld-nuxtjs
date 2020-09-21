import http from './http';

export function signIn(data) {
  return http.post('/users/login', data);
}
export function signUp(user) {
  return http.post('/users', user);
}
export function getUserInfo() {
  return http.get('/user');
}
export function updateUserInfo(data) {
  return http.put('/user', data);
}