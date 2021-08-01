import Api from '@/services/Api'

export default {
  register(credentials) {
    return Api().post('registerUser', credentials)
  },

  login(credentials) {
    return Api().post('login', credentials)
  },

  getPlaidToken() {
    return Api().post('createToken')
  },
}
