//import { createWebHistory, createRouter } from "vue-router";
//import {createRouter} from 'vue-router';
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import Content from '../components/Content'
import store from '../store.js'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  await firebase.getCurrentUser()
  const user = await store.getters.user
  console.log(to, from)
  if (requiresAuth && !user.loggedIn && to.path != '/login') {
    next('login')
  } else if (['/login', '/register'].includes(to.path) && user.loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
