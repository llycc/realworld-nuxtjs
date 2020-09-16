import http from './http';

export function getTags(query) {
  return http.get('/tags', query);
}