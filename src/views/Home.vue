<template>
  <div class="home container-fluid m-0 p-0">
    <div class="row w-100 m-0">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main content-->
      <div class="home-content col-lg-10 col-md-9 col-sm-12 p-0">
        <div class="row w-100 mt-5 ps-5">
          <div class="search col-6">
            <input type="text" placeholder="Search">
            <button>Search</button>
          </div>
          <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <div class="signin d-flex justify-content-end me-3" v-if="!this.userIsLoggedIn">
              <button @click="$router.push('/login');">Sign in</button>
            </div>
            <div class="signup d-flex me-2" v-if="!this.userIsLoggedIn">
              <button @click="$router.push('/register');">Sign up</button>
            </div>
            <!-- Se mostrará solo si el usuario está logueado -->
            <div class="publish-podcast d-flex justify-content-end me-2" v-if="this.userIsLoggedIn">
              <button @click="$router.push('/publish/podcast');">Publish Podcast</button>
            </div>
            <div class="signin d-flex me-2" v-if="this.userIsLoggedIn">
              <button @click="this.signOut()">Sign out</button>
            </div>

          </div>
        </div>
        <div class="featured">
          <h2 class="ps-5">Featured Podcasts</h2>
          <PodcastList />
        </div>
        <div class="more-content ps-5 pt-4">
          <CategoryList />
          <div class="mt-5 pt-2">
            <h2>Most Listened Podcasts</h2>
            <PopularList />
          </div>
        </div>
      </div>
    </div>

    <!-- Progress bar -->
    <ProgressBar />
  </div>
</template>
  
<script>
import CategoryList from '../components/CategoryList.vue';
import PodcastList from '../components/PodcastList.vue';
import PopularList from '../components/PopularList.vue';
import Sidebar from '../components/Sidebar.vue';
import ProgressBar from '../components/ProgressBar.vue';

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['userIsLoggedIn']),
  },
  methods: {
    ...mapMutations(['setUserIsLoggedIn']),
    signOut() {
      this.setUserIsLoggedIn(false);
    },
  },
  components: {
    PodcastList,
    CategoryList,
    PopularList,
    Sidebar,
    ProgressBar,
  },
};
</script>
  
<style>
.home {
  height: 100%;
  /* overflow: hidden; */
}

.home-content {
  height: inherit;
  overflow: hidden;
  align-items: start;
  justify-content: flex-start;
}

.home-content .more-content {
  width: 100%;
  height: 100%;
  padding-left: 0px;
  background-color: #04001d;
}

.home-content .more-content h2 {
  color: #525dff;
}

.search {
  display: flex;
  margin-bottom: 50px;
}

.search input {
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 50px 0 0 50px;
  padding: 0 20px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.625);
  color: white;
}

.search button {
  width: 5em;
  height: 50px;
  border: none;
  border-radius: 0 50px 50px 0;
  background-color: #2933ff;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}


.signup button {
  width: 10vw;
  height: 50px;
  border: none;
  border-radius: 50px;
  background-color: #2933ff;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.signup button:hover {
  transform: scale(1.1);
  transition: all 0.35s ease-in-out;
}

.signin button {
  width: 10vw;
  height: 50px;
  border: none;
  border-radius: 50px;
  background-color: #000000;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
}

.signin button:hover {
  background-color: #ffffff;
  color: #000000;
  transition: all 0.35s ease-in-out;
}

@media (max-width: 768px) {
  .signup button,
  .signin button {
    width: 20vw;
  }
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.featured {
  margin-top: 30px;
  margin-bottom: 35px;
  width: inherit;
}

/*
.publish-button {
  position: fixed;
  bottom: 50px;
  z-index: 9999;
}


.publish-button button{
  width: 7em;
  height: 7em;
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  border: none;
  box-shadow: #d2d5ff 0px 2px 5px 2px;
}

.publish-button button:hover {
  background-color: #ffffff;
  color: #000000;
  transition: all 0.35s ease-in-out;
}
*/
.publish-podcast button {
  width: 10vw;
  height: 50px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.35s ease-in-out;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
}

.publish-podcast button:hover {
  background-color: #fff;
  color: #000;
}
</style>
