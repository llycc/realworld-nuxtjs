import http from './http';

export function getArticles(query) {
  return http.get('/articles', query);
}