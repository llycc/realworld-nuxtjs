export default function($axios) {
  return {
    getArticles: query => $axios.$get('/articles', {params: query}),
    getArticle: sulg => $axios.$get(`/articles/${sulg}`),
    postArticle: payload => $axios.$post('/articles', payload),
    putArticle: (slug, payload) => $axios.$put(`/articles/${slug}`, payload),
    deleteArticle: sulg => $axios.$get(`/articles/${sulg}`),
    getFeedArticles: params => $axios.$get('/articles/feed', {params}),
    favoriteArticle: id => $axios.$post(`/articles/${id}/favorite`),
    disfavorAritcle: id => $axios.$delete(`/articles/${id}/favorite`),
    getArticleComments: sulg => $axios.$get(`/articles/${sulg}/comments`),
    postArticleComments: (sulg, payload) => $axios.$post(`/articles/${sulg}/comments`, payload),
    deleteArticleComments: (sulg,id) => $axios.$delete(`/articles/${sulg}/comments/${id}`)
  }
}

