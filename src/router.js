import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Job from './views/Job'
import JobCreate from './views/JobCreate'
import Description from './components/job/Description'
import Apply from './components/job/Apply'
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
        path: '/jobs/create',
        component: JobCreate
    },{
        path: '/jobs/:id',
        component: Job,
        props: true,
        children: [
            { path:'', component: Description, props: true },
            { path:'apply', component: Apply, props: true }
        ]
    }]
})