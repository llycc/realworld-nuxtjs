export default function($axios) {
  return {
    getTags: query => $axios.$get('/tags', query)
  }
}