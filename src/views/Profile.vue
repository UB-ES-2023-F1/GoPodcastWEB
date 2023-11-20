<template>
    <div class="container-fluid m-0 p-0 h-100 profile">
      <div class="row w-100 m-0">
        <Sidebar />
        <div class="publish col-lg-10 col-md-9 col-sm-12 p-0">
          <div class="profile-content p-5">
            <div class="row w-80">
              <TopBar />
            </div>
            <div class="profile-info">
              <img src="../assets/redpanda.jpg" alt="profile" class="profile-img rounded-circle" style="width: 15vw; max-width: 15em;" />
              <div style="display: inline-block;" class="ms-4">
                <h1 class="profile-name mt-1">{{ user.name }}</h1>
                <p class="type opacity-50">{{ user.type }}</p>
                <p class="profile-bio mb-0 wrap">{{ user.bio }}</p>
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
              <MyPodcasts />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
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
  </style>
  
  <script>
  import Sidebar from '../components/Sidebar.vue'
  import StreamLaterList from '../components/StreamLaterList.vue'
  import FavoriteList from '../components/FavoriteList.vue'
  import MyPodcasts from '../components/MyPodcasts.vue'
  import TopBar from '../components/TopBar.vue'
  import axios from 'axios'
  
  export default {
    components: {
      Sidebar,
      StreamLaterList,
      FavoriteList,
      MyPodcasts,
      TopBar
    },
    data() {
      return {
        user: {
          name: 'Jaime Altozano',
          bio: 'Me gustan los podcasts y los pandas rojos, yey! Dame follow para ver mis playlist :D',
          type: 'USER'
        }
      }
    },
    methods: {
      getUserInfo() {
        axios.get('https://lively-rock-0b6486203.4.azurestaticapps.net/user/1')
          .then(response => {
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created() {
      // Uncomment when endpoints are ready
      // this.getUserInfo()
    }
  }
  </script>
  