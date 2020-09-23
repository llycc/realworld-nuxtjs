export default function($axios) {
  return {
    getArticles: query => $axios.$get('/articles', query),
    getFeedArticles: query => $axios.$get('/articles/feed', query),
    favoriteArticle: id => $axios.$post(`/articles/${id}/favorite`),
    disfavorAritcle: id => $axios.$delete(`/articles/${id}/favorite`)
  }
}

