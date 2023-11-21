<template>
    <div class="search col-6">
      <input type="text" v-model="nameQuery" placeholder="Search by name">
      <input type="text" v-model="authorQuery" placeholder="Search by author" style="border-bottom-left-radius: 0%; border-top-left-radius: 0%; border-left: 2px solid rgba(136, 136, 136, 0.555);">
      <button @click="$emit('search', nameQuery, authorQuery)">Search</button>
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
</template>


<script>

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  emits: ["search"],
  data() {
    return {
      authorQuery: '',
      nameQuery: ''
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
  },
  components: {
  },
};
</script>

<style>


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