import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
import firebase from 'firebase';
import store from './store';



//Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAi3WKDH2YHf42IGyAPWlnzouDg3ulZPcE",
  authDomain: "plain-api.firebaseapp.com",
  projectId: "plain-api",
  storageBucket: "plain-api.appspot.com",
  messagingSenderId: "309014286089",
  appId: "1:309014286089:web:8aedbd70d03ff229f90dd8",
  measurementId: "G-0CWWF05G5D"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

createApp(App).use(store).use(router).mount("#app");
