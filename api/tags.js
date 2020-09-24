export default function($axios) {
  return {
    getTags: params => $axios.$get('/tags', {params})
  }
}