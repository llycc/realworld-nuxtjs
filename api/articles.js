export default function($axios) {
  return {
    getArticles: query => $axios.$get('/articles', {params: query}),
    getArticle: sulg => $axios.$get(`/articles/${sulg}`),
    getFeedArticles: params => $axios.$get('/articles/feed', {params}),
    favoriteArticle: id => $axios.$post(`/articles/${id}/favorite`),
    disfavorAritcle: id => $axios.$delete(`/articles/${id}/favorite`),
  }
}

