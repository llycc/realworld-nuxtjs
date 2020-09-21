import http from './http';

export function getArticles(query) {
  return http.get('/articles', query);
}
export function getFeedArticles(query) {
  return http.get('/articles/feed', query);
}
export function toggleFavoriteArticles(id, isDeleted = false) {
  const path = `articles/${id}/favorite`;
  if (isDeleted) {
    return http.delete(path)
  }
  return http.post(path);
}