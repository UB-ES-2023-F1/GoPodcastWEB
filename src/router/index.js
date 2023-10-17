import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import PublishPodcast from '../views/PublishPodcast.vue'



const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/publish',
    name: 'PublishPodcast',
    component: PublishPodcast
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
