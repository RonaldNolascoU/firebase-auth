import Api from '@/services/Api'

export default {
  register(credentials) {
    return Api().post('registerUser', credentials)
  },

  login(credentials) {
    return Api().post('login', credentials)
  },

  getPlaidToken(user) {
    return Api().post('createToken', user)
  },
  exchangeToken(data) {
    return Api().post('exchangeToken', data)
  },
}
