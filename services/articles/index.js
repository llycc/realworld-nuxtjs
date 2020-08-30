import httpUtil from '../http';

export function getArticles(query) {
  return httpUtil.get('/articles', query);
}
