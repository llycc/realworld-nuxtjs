export default function($axios) {
  return {
    signIn: payload => $axios.$post('/users/login', payload),
    signUp: payload => $axios.$post('/users', payload),
    getUserInfo: () => $axios.$get('/user'),
    updateUserInfo: payload => $axios.$put('/user', payload)
  }
}

