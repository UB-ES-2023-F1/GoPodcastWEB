import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/publish',
    name: 'PublishPodcast',
    component: () => import('../views/PublishPodcast.vue')
  },
  {
    path: '/visualize',
    name: 'VisualizePodcast',
    component: () => import('../views/VisualizePodcast.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
