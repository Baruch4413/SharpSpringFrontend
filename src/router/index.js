import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
    },
    {
        path: '/create',
        name: 'Create',
        component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue')
    },
    {
        path: '/edit',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
