export default function($axios) {
  return {
    getUserProfile: (user) => $axios.$get(`/profiles/${user}`),
  }
}

