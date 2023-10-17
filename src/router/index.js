import { createRouter, createWebHistory } from 'vue-router'


const routes = [
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
    component: () => import('../views/Publish.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
