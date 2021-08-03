//import { createApp } from 'vue'
import Vue from 'vue'
//import vuetify from './plugins/vuetify'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App.vue'
import router from './routes/index'
import firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'

//Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyCcgHeuQcD5MPS_XxqXEfo5DIoRsM5a16A',
  authDomain: 'plaid-7344d.firebaseapp.com',
  projectId: 'plaid-7344d',
  storageBucket: 'plaid-7344d.appspot.com',
  messagingSenderId: '82717047803',
  appId: '1:82717047803:web:d9a7784f2d82adabdda95e',
  measurementId: 'G-YNSB8GSW3Q',
}

firebase.initializeApp(firebaseConfig)
//console.log(firebase);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
      store.dispatch('fetchUser', user)
    }, reject)
  })
}

//const app = createApp(App);
//app.use(vuetify).use(router).use(store).mount("#app");

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
