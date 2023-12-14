<template>
  <div class="home container-fluid m-0 p-0">
    <div class="row w-100 m-0">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main content-->
      <div class="home-content col-lg-10 col-md-9 col-sm-12 p-0">
        <div class="row w-100 mt-5 ps-5">
          <TopBar @search="search"/>
        </div>
        <!-- If user is searching -->
        <div v-if="searching">
          <h1 class="ps-5">Search results. <a @click="searching=false" style="color: rgb(206, 206, 206); cursor: pointer;">Go back.</a></h1>
          <div class="featured">
            <h2 class="ps-5">Podcasts</h2>
            <PodcastList :podcastList="podcastSearchList" v-if="podcastSearchList.length > 0" />
            <h4 class="ps-5 fw-lighter" v-else>No podcasts found.</h4>
          </div>
          <div class="featured">
            <h2 class="ps-5">Authors</h2>
            <UserList :userList="userSearchList" v-if="userSearchList.length > 0" />
            <h4 class="ps-5 fw-lighter" v-else>No users found.</h4>
          </div>
        </div>

        <div v-else>
          <div class="featured">
            <h2 class="ps-5">Featured Podcasts</h2>
            <PodcastList :podcastList="podcastsList"/>
          </div>
          <div class="more-content ps-5 pt-4">
            <CategoryList />
            <div class="mt-5 pt-2">
              <h2>Most Listened Podcasts</h2>
              <PodcastList :podcastList="popularList" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
import CategoryList from '../components/CategoryList.vue';
import PodcastList from '../components/PodcastList.vue';
import UserList from '../components/UserList.vue';
import Sidebar from '../components/Sidebar.vue';
import ProgressBar from '../components/ProgressBar.vue';
import TopBar from '../components/TopBar.vue';

import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import { h } from 'vue';

console.log(import.meta.env.VITE_API_URL);

export default {
  name: 'Home',
  data() {
    return {
      podcastsList: [],
      popularList: [],
      podcastSearchList: [],
      userSearchList: [],
      searching: false
    }
  },
  computed: {
    userIsLoggedIn() {
      return this.$store.state.userIsLoggedIn;
    },
    ...mapState(['userIsLoggedIn']),
  },
  methods: {
    ...mapMutations(['setUserIsLoggedIn']),
    signOut() {
      this.setUserIsLoggedIn(false);
      this.$store.commit('setUserIsLoggedIn', false);
    },
    search(nameQuery, authorQuery) {
      console.log(nameQuery, authorQuery)
      if (nameQuery) {
        this.getName(nameQuery)
      } else {
        this.podcastSearchList = []
      }
      if (authorQuery) {
        this.getAuthor(authorQuery)
      } else {
        this.userSearchList = []
      }
        
      this.searching = true;
    },
    getName(nameQuery) {
      const pathSearch = import.meta.env.VITE_API_URL + "/search/podcast/" + nameQuery

      axios.get(pathSearch)
        .then((res) => {
          this.podcastSearchList = res.data
        })
        .catch((error) => {
          this.podcastSearchList = []
          console.error(error)
        })
    },
    getAuthor(authorQuery) {
      const pathSearch = import.meta.env.VITE_API_URL + "/search/user/" + authorQuery

      axios.get(pathSearch)
        .then((res) => {
          this.userSearchList = res.data
          this.getProfileImg()
        })
        .catch((error) => {
          this.userSearchList = []
          console.error(error)
        })
    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    },
    getProfileImg() {
      this.userSearchList.forEach(user => {
        console.log("Usuario:", user.id, user.username, user.image_url)
        const pathProfileImg = import.meta.env.VITE_API_URL + '/users/' + user.id + '/image'

        axios.get(pathProfileImg, { responseType: "blob" })
          .then(async (res) => {
            const base64data = await this.blobToData(res.data)
            user.image_url = base64data
            console.log("IMAGE_URL ACTUALIZADO:",user.image_url)
            if(user.image_url === "data:image/jpeg;base64"){
              user.image_url = null
            }
            
          })
          .catch((error) => {
            console.error(error)
          })
      })
    },

    getPodcasts() {
      console.log("Getting podcasts")
      const pathPodcasts = import.meta.env.VITE_API_URL + "/podcasts"

      console.log("Podcasts path: " + pathPodcasts);
      
      axios.get(pathPodcasts)
        .then((res) => {
          this.podcastsList = res.data
        })
        .catch((error) => {
          this.podcastsList = []
          console.error(error)
        })
    },
    getPopular() {
      console.log("Getting populars")
      const pathPopular = import.meta.env.VITE_API_URL + "/populars"

      console.log("Populars path: " + pathPopular);
      
      axios.get(pathPopular)
        .then((res) => {
          this.popularList = res.data
        })
        .catch((error) => {
          this.popularList = []
          console.error(error)
        })
    }
  },
  /*
  beforeRouteEnter(to, from, next) {
    const store = app.$store;
    store.commit('setUserIsLoggedIn', store.state.userIsLoggedIn);
    next();
  },

  beforeCreate() {
    const store = this.$store;
    store.commit('setUserIsLoggedIn', store.state.userIsLoggedIn);
  },
  */
  created() {
    this.getPopular()
    this.getPodcasts()
  },

  components: {
    PodcastList,
    CategoryList,
    UserList,
    Sidebar,
    ProgressBar,
    TopBar,
    h
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

</style>
