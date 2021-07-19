import {createRouter, createWebHistory} from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Plaid from '../components/Plaid';
import Exchange from '../components/Exchange';
import Fire from '../components/Fire';

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Fire',
            component: Fire
        },
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
            path: '/create-link-token',
            name: 'Link',
            component: Plaid
        },
        {
            path: '/token-exchange',
            name: 'Exchange',
            component: Exchange
        }
]
});

export default router;