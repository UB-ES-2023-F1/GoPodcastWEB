<template>
  <div class="container-fluid m-0 p-0 h-100 profile">
    <div class="row w-100 m-0">
      <Sidebar />
      <div class="publish col-lg-10 col-md-9 col-sm-12 p-0">
        <div class="profile-content p-5">
          <div class="row w-80">
            <TopBar />
          </div>
          <div class="profile-info" v-if="user">
            <img src="../assets/redpanda.jpg" alt="profile" class="profile-img rounded-circle"
              style="width: 15vw; max-width: 15em;" />
            <div style="display: inline-block;" class="ms-4">
              <h1 class="profile-name mt-1">{{ user.name }}</h1>
              <p class="type opacity-50">{{ user.type }}</p>
              <div v-if="!isMyProfile">
                <p class="profile-bio mb-0 wrap">{{ user.bio }}</p>
              </div>
              <div style="display: flex; flex-direction: column;" v-else>
                <textarea class="bio-text" type="text" v-model="user.bio" placeholder="Specify your bio here."></textarea>
                <button class="bio-confirm" @click="updateBio()">Confirm bio</button>
              </div>
            </div>
          </div>
          <div class="favorite-podcasts">
            <h2 class="label mt-5 mb-3">Favorite Podcasts</h2>
            <FavoriteList />
          </div>
          <div class="streamlater-podcasts">
            <h2 class="label mt-5 mb-3">Watch Later</h2>
            <StreamLaterList />
          </div>
          <div class="my-podcasts">
            <h2 class="label mt-5 mb-3">My Podcasts</h2>
            <PodcastList :podcastList="myPodcasts"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Sidebar from '../components/Sidebar.vue'
import StreamLaterList from '../components/StreamLaterList.vue'
import FavoriteList from '../components/FavoriteList.vue'
import PodcastList from '../components/PodcastList.vue'
import TopBar from '../components/TopBar.vue'
import axios from 'axios'

export default {
  components: {
    Sidebar,
    StreamLaterList,
    FavoriteList,
    PodcastList,
    TopBar
  },
  data() {
    return {
      user: null,
      userId: null,
      myId: null,
      isMyProfile: false,
      myPodcasts: []
    }
  },
  methods: {
    getUserInfo() {
      const path = import.meta.env.VITE_API_URL + '/user/' + this.userId

      const axiosConfig = {
        withCredentials: true
      }

      axios.get(path)
        .then(response => {
          this.user = response.data
          console.log(this.user)
          if (this.user.type === 'author') {
            this.getMyPodcasts()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIdProfile() {
      const userPath = import.meta.env.VITE_API_URL + '/protected'

      const axiosConfig = {
        withCredentials: true
      }

      axios.get(userPath, axiosConfig).then((res) => {
        this.myId = res.data.logged_in_as;
        if (this.myId === this.userId){
          this.isMyProfile = true;
        }
      })
        .catch((error) => {
          console.error(error);
        });
    },
    getMyPodcasts() {
      const path = import.meta.env.VITE_API_URL + '/user/created_podcasts/' + this.userId

      axios.get(path)
      .then((res) => {
        this.myPodcasts = res.data
        console.log(this.myPodcasts)
      })
      .catch((error) => {
        console.error(error)
      })
    },
    updateBio() {
      const path = import.meta.env.VITE_API_URL + '/user/bio'

      var formData = new FormData();
      
      formData.append('bio', this.user.bio);

      const axiosConfig = {
        withCredentials: true
      }

      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      axios.put(path, formData, axiosConfig, headers)
      .then((res) => {
        console.log("Bio updated", res.data)
      })
      .catch((error) => {
        console.log(error)
      })

    }
  },
  created() {
    this.userId = this.$route.params.id;
    if (this.$store.state.userIsLoggedIn) {
      this.getIdProfile()
    }
    // Uncomment when endpoints are ready
    this.getUserInfo()

    
  }
}
</script>
  
<style>
.profile {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.559);
}

.profile-content {
  background-color: rgba(0, 0, 0, 0.559);
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.form-content {
  height: 120vh;
}

.container-fluid {
  background-color: #1C1C1C;
  height: 100%;
}

.label {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile .btn-submit-bold {
  font-size: 1.2rem;
  font-weight: normal;
  border-radius: 10px;
  padding: 10px;
  background-color: #000000;
  border: none;
  color: #fff;
}

.profile .btn-submit-bold:hover {
  background-color: #ffffff;
  color: #000000;
  transition: all 0.35s ease-in-out;
}

.my-podcasts {
  color: rgb(119, 0, 255);
}

/* Added styles for profile-info */
.profile-info {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.bio-text {
  width: 300px;
  min-height: 50px;
  border: none;
  border-radius: 10px 10px 10px 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.253);
  color: #fff;
  margin-bottom: 10px;
}

.bio-confirm {
  padding: 1px 10px 1px 10px;
  border: none;
  border-radius: 50px 50px 50px 50px;
  background-color: #2933ff;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>
  