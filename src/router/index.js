import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';


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
    component: () => import('../views/PublishPodcast.vue'),
    beforeEnter: (to, from, next) => {
      const userIsLoggedIn = store.state.userIsLoggedIn;
      if (userIsLoggedIn) {
        next();
      } else {
        next('/login'); //Para restringir el acceso a este ednpoint, redirigimos al usuario a '/login' si no está loggeado 
      }
    }
  },
  {
    path: '/publish/episode',
    name: 'PublishEpisode',
    component: () => import('../views/PublishEpisode.vue'),
    beforeEnter: (to, from, next) => {
      const userIsLoggedIn = store.state.userIsLoggedIn;
      if (userIsLoggedIn) {
        next();
      } else {
        next('/login'); //Para restringir el acceso a este ednpoint, redirigimos al usuario a '/login' si no está loggeado 
      }
    }
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
    path: '/auxiliar',
    name: 'Auxi',
    component: () => import('../views/Auxi.vue')
  },
  
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
