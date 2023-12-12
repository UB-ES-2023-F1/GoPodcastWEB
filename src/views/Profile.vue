<template>
  <div class="container-fluid m-0 p-0 h-100 profile">
    <div class="row w-100 m-0">
      <Sidebar />
      <div class="publish col-lg-10 col-md-9 col-sm-12 p-0">
        <div class="profile-content p-5">
          <div class="row w-80">
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

          <div v-else class="profile-info" v-if="user">
            <img v-if="user.image_url !== undefined && user.image_url !== null && `${user.image_url}` !== 'data:image/jpeg;base64,'" :src="user.image_url" alt="profile" class="profile-img rounded-circle" style="width: 15vw; max-width: 15em;" />
            <img v-else src="../assets/redpanda.jpg" alt="profile" class="profile-img rounded-circle" style="width: 15vw; max-width: 15em;" />
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
          <div class="favorite-podcasts" v-if="isMyProfile && !searching">
            <h2 class="mt-5 mb-3">Favorite Podcasts</h2>
            <PodcastList :podcastList="favoriteList" v-if="favoriteList.length > 0" />
            <h4 class="label" v-else>It looks like you don't have any favorite podcast. <a :href="'/'">Go add some!</a>
            </h4>
          </div>
          <div class="streamlater-podcasts" v-if="isMyProfile && !searching">
            <h2 class="mt-5 mb-3">Watch Later</h2>
            <EpisodeList :podcastList="watchLaterList" v-if="watchLaterList.length > 0" />
            <h3 class="label" v-else>It looks like you don't have any episode in stream later. <a :href="'/'">Go add
                some!</a></h3>
          </div>
          <div class="my-podcasts" v-if="!searching">
            <h2 class="mt-5 mb-3">User's Podcasts</h2>
            <PodcastList :podcastList="myPodcasts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import EpisodeList from '../components/EpisodeList.vue'
import PodcastList from '../components/PodcastList.vue'
import TopBar from '../components/TopBar.vue'
import UserList from '../components/UserList.vue'
import axios from 'axios'

export default {
  components: {
    Sidebar,
    EpisodeList,
    PodcastList,
    UserList,
    TopBar
  },
  data() {
    return {
      user: null,
      userIdLooking: null,
      myId: null,
      isMyProfile: false,
      myPodcasts: [],
      favoriteList: [],
      watchLaterList: [],
      searching: false,
      podcastSearchList: [],
      userSearchList: [],
    }
  },
  methods: {
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
          this.getProfileImgSearch()
        })
        .catch((error) => {
          this.userSearchList = []
          console.error(error)
        })
    },
    blobToDataSearch(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    },
    getProfileImgSearch() {
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
    getUserInfo() {
      
      // Reiniciar variables relacionadas con el perfil
      this.user = null;
      this.isMyProfile = false;
      this.myPodcasts = [];
      this.favoriteList = [];
      this.watchLaterList = [];

      this.getIdProfile()
      const path = import.meta.env.VITE_API_URL + '/user/' + this.userIdLooking

      const axiosConfig = {
        withCredentials: true
      }
      axios.get(path)
        .then(response => {
          this.user = response.data
          console.log(this.user)
          console.log("IMG perfil",this.user.image_url)
          if (this.user.type === 'author') {
            this.getMyPodcasts()
          }
          this.getProfileImg()
          
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
        if (this.myId === this.userIdLooking) {
          this.isMyProfile = true;
          this.getFavorites()
          this.getWatchLater()
        }else{
          this.isMyProfile = false;
        }
        
      })
        .catch((error) => {
          console.error(error);
        });
    },
    getMyPodcasts() {
      const path = import.meta.env.VITE_API_URL + '/user/created_podcasts/' + this.userIdLooking

      axios.get(path)
        .then((res) => {
          this.myPodcasts = res.data
          console.log(this.myPodcasts)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getFavorites() {
      const path = import.meta.env.VITE_API_URL + '/favorites'

      const axiosConfig = {
        withCredentials: true
      }

      axios.get(path, axiosConfig)
        .then((res) => {
          this.favoriteList = res.data
        })
        .catch((error) => {
          console.log(error)
        })

    },
    getWatchLater() {
      const path = import.meta.env.VITE_API_URL + '/stream_later'

      const axiosConfig = {
        withCredentials: true
      }

      axios.get(path, axiosConfig)
        .then((res) => {
          this.watchLaterList = res.data
        })
        .catch((error) => {
          console.log(error)
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
          alert("Bio Updated Successfully!")
        })
        .catch((error) => {
          console.log(error)
          alert("Error Updating Bio!")
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
      const pathProfileImg = import.meta.env.VITE_API_URL + '/users/' + this.userIdLooking + '/image'

      axios.get(pathProfileImg, { responseType: "blob" })
        .then(async (res) => {
          const base64data = await this.blobToData(res.data)
          this.user.image_url = base64data
        })
        .catch((error) => {
          console.error(error)
        })

    },
    
  },
  watch: {
    '$route.params.id': function (newId, oldId) {
      // Se llama cuando el parámetro de la ruta cambia
      this.userIdLooking = newId;
      this.getUserInfo();
      //this.getProfileImg();
    }
  },
  created() {
    this.userIdLooking = this.$route.params.id;
    if (this.$store.state.userIsLoggedIn) {
      this.getIdProfile()
      this.getUserInfo()
      
      
    }
    // Uncomment when endpoints are ready
    


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
  