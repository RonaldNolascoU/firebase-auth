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
  apiKey: 'AIzaSyAi3WKDH2YHf42IGyAPWlnzouDg3ulZPcE',
  authDomain: 'plain-api.firebaseapp.com',
  projectId: 'plain-api',
  storageBucket: 'plain-api.appspot.com',
  messagingSenderId: '309014286089',
  appId: '1:309014286089:web:8aedbd70d03ff229f90dd8',
  measurementId: 'G-0CWWF05G5D',
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
