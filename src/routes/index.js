//import { createWebHistory, createRouter } from "vue-router";
//import {createRouter} from 'vue-router';
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import Content from '../components/Content'
import store from '../store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/content',
      name: 'Content',
      component: Content,
    },
    {
      path: '/link/token/create',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/item/public_token/exchange',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
})

setTimeout(() => {
  const user = store.getters.user
  console.log(user.loggedIn)
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !user.loggedIn) next({ name: 'login' })
    else next()
  })
}, 500)

export default router
