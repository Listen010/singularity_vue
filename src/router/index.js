import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Search from '../components/search/search_home'
import Singularity from '../components/user/singularity'
import UserHome from '../components/user/user_home'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/singularity',
    component: Singularity
  },
  {
    path: '/user',
    component: UserHome
  }
]

const router = new VueRouter({
  routes
})

export default router
