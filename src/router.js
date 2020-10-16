import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Job from './views/Job'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        component: Login
    },{
        path: '/jobs',
        component: Home
    },{

        path:'/jobs/:id',
        component:Job
    }]
})