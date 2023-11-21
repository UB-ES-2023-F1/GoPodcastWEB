<template>
  <div class="col-12 d-flex justify-content-between align-items-start">
    <div class="search col-6">
      <input type="text" v-model="nameQuery" placeholder="Search by name">
      <input type="text" v-model="authorQuery" placeholder="Search by author" style="border-bottom-left-radius: 0%; border-top-left-radius: 0%; border-left: 2px solid rgba(136, 136, 136, 0.555);">
      <button @click="$emit('search', nameQuery, authorQuery)">Search</button>
    </div>

    <div class="d-flex align-items-center">
      <div v-if="!userIsLoggedIn">
        <button class="btn btn-dark me-2" @click="$router.push('/login')">Sign in</button>
        <button class="btn btn-primary me-2" @click="$router.push('/register')">Sign up</button>
      </div>

      <!-- Se mostrará solo si el usuario está logueado -->
      <div v-if="userIsLoggedIn">
        <button class="btn btn-success me-2" @click="$router.push('/publish/podcast')">Publish Podcast</button>
        <button class="btn btn-dark me-2" @click="signOut">Sign out</button>
        <button class="btn btn-light" @click="$router.push('/profile/' + this.userId)">
          <i class="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>



<script>

import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
export default {
  name: 'Home',
  emits: ["search"],
  data() {
    return {
      authorQuery: '',
      nameQuery: '',
      userId: null
    }
  },
  computed: {
    ...mapState(['userIsLoggedIn']),
  },
  methods: {
    ...mapMutations(['setUserIsLoggedIn']),
    signOut() {
      this.setUserIsLoggedIn(false);
    },
    getIdProfile() {
      const userPath = import.meta.env.VITE_API_URL + '/protected'

      const axiosConfig = {
          withCredentials: true
      }

      axios.get(userPath, axiosConfig).then((res) => {
          this.userId = res.data.logged_in_as;
          console.log(res.data);
      })
      .catch((error) => {
          console.error(error);
      });
  },
  },
  components: {
  },
  created(){
    if(this.$store.state.userIsLoggedIn){
      this.getIdProfile();
    }
    
  }

};
</script>

<style scoped>
/* Puedes mantener algunos de tus estilos personalizados aquí */
.search {
  display: flex;
}

.search input {
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 50px 0 0 50px;
  padding: 0 20px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.625);
  color: #fff;
}

.search button {
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 0 50px 50px 0;
  background-color: #2933ff;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}


.btn-dark {
  border-radius: 50px;
  font-size: 18px;
}

.btn-primary {
  border-radius: 50px;
  font-size: 18px;
}

.btn-light{
  border-radius: 50px;
  font-size: 20px;
}

.btn-success{
  border-radius: 50px;
  font-size: 18px;
}

/* Puedes ajustar otros estilos según tus preferencias */
</style>