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
            <div class="col-6 d-flex justify-content-end">
              <div class="signin d-flex justify-content-end me-3">
                <button @click="$router.push('/login');">Sign in</button>
              </div>
              <div class="signup d-flex me-2">
                <button @click="$router.push('/register');">Sign up</button>
              </div>
              <div class="publish-button">
                <button @click="abrirVentanaEmergente">Publicar Episodio</button>
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
    </div>
    <!-- Ventana emergente de publicación de episodios -->
    <PublishEpisodePopup v-if="mostrarPopup" @cerrarVentana="cerrarVentanaEmergente" />
  </template>
  
  <script>
  import CategoryList from '../components/CategoryList.vue';
  import PodcastList from '../components/PodcastList.vue';
  import PopularList from '../components/PopularList.vue';
  import Sidebar from '../components/Sidebar.vue';
  import PublishEpisodePopup from '../components/PublishEpisodePopup.vue'; // Asegúrate de importar el componente
  
  export default {
    name: 'Home',
    components: {
      PodcastList,
      CategoryList,
      PopularList,
      Sidebar,
      PublishEpisodePopup, // Registra el componente
    },
    data() {
      return {
        mostrarPopup: false, // Variable para controlar la visibilidad de la ventana emergente
      };
    },
    methods: {
      abrirVentanaEmergente() {
        this.mostrarPopup = true;
      },
      cerrarVentanaEmergente() {
        this.mostrarPopup = false;
      },
    },
  };
  </script>
  
<style>
.home {
    height: 100%;
    /* overflow: hidden; */
}

.home-content {
    /* margin-top: 0em; */
    height: inherit;
    overflow: hidden;
    align-items: start;
    justify-content: flex-start;
}

.home-content .more-content{
    width: 100%;
    height: 100%;
    padding-left: 0px;
    background-color: #04001d;
}

.home-content .more-content h2{
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
