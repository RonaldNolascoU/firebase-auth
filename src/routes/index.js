//import { createWebHistory, createRouter } from "vue-router";
//import {createRouter} from 'vue-router';
import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Content from '../components/Content';

Vue.use(Router);

const router = new Router({
    routes: [
        
        {
        path: '/login',
        name: 'login',
        component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/content',
            name: 'Content',
            component: Content
        },
        {
            path: '/link/token/create',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/item/public_token/exchange',
            name: 'Dashboard',
            component: Dashboard
        }
]
});

export default router;