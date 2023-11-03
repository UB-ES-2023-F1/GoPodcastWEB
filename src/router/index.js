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
    path: '/publish/podcast',
    name: 'PublishPodcast',
    component: () => import('../views/PublishPodcast.vue')
  },

  /*
  {
    path: '/visualize/:podcastId',
    name: 'VisualizePodcast',
    component: () => import('../views/VisualizePodcast.vue')
  }
*/
  {
    path: '/visualize/:id',
    name: 'VisualizePodcast',
    component: () => import('../views/VisualizePodcast.vue')
  },
  {
    path: '/publish/episode',
    name: 'PublishEpisode',
    component: () => import('../views/PublishEpisode.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
