export default function($axios) {
  return {
    getUserProfile: (user) => $axios.$get(`/profiles/${user}`),
    followUser: (user) => $axios.$post(`/profiles/${user}/follow`),
    unFollowUser: (user) => $axios.$delete(`/profiles/${user}/follow`)
  }
}

