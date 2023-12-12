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
              <PodcastList :podcastList="podcastSearchList" />
            </div>
            <div class="featured">
              <h2 class="ps-5">Authors</h2>
              <UserList :userList="userSearchList" />
            </div>
          </div>
  
          <div v-else>
            <div class="ps-5 pt-4">
                <div v-for="category in categories" :key="category.title" >
                    <CategoryAndPodcasts :category="category"/>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      
    <!-- Progress bar -->
    <ProgressBar />
  </div>
</template>

<script>
import CategoryAndPodcasts from '../components/CategoryAndPodcasts.vue';
import PodcastList from '../components/PodcastList.vue';
import UserList from '../components/UserList.vue';
import Sidebar from '../components/Sidebar.vue';
import ProgressBar from '../components/ProgressBar.vue';
import TopBar from '../components/TopBar.vue';

import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

console.log(import.meta.env.VITE_API_URL);

export default {
  name: 'Home',
  data() {
    return {
      podcastsList: [],
      popularList: [],
      podcastSearchList: [],
      userSearchList: [],
      searching: false,
      categories: []
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
    getCategories() {
        console.log('Getting categories')
        const pathCategories = import.meta.env.VITE_API_URL + '/categories'
        axios.get(pathCategories)
            .then((res) => {
                this.categories = res.data
                console.log("CATEGORIAS VIEW:", this.categories[0])
            })
            .catch((error) => {
                console.error(error)
            })
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
        })
        .catch((error) => {
          this.userSearchList = []
          console.error(error)
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
  },
  created() {
    this.getPodcasts()
    this.getCategories()
  },

  components: {
    PodcastList,
    CategoryAndPodcasts,
    UserList,
    Sidebar,
    ProgressBar,
    TopBar,
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



</style>
