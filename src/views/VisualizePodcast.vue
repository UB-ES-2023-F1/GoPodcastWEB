<template>
    <div class="visualize container-fluid m-0 p-0">
        <div class="row w-100 m-0">
            <!-- Sidebar -->
            <Sidebar />
            <!-- Main content-->
            <div class="visualize-content col-lg-10 col-md-9 col-sm-12 p-0 ">
                <div class="row w-100 mt-5 ps-5">
                    <div class="search col-6">
                        <input type="text" placeholder="Search">
                        <button>Search</button>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <div class="signin  d-flex justify-content-end me-3">
                            <button @click="$router.push('/login');">Sign in</button>
                        </div>
                        <div class="signup d-flex me-2">
                            <button @click="$router.push('/register');">Sign up</button>
                        </div>
                    </div>
                </div>
                <div class="row p-5">
                    <div class="col-12 col-sm-4 col-md-8 col-lg-12">
                        <div class="contenedor-reducido mb-5"> 
                            <div class="row mt-5 ps-5 mr-5">
                                <div class="col-4 col-sm- 4 col-md-4 col-lg-4">
                                    <img :src="podcast.image_url" alt="Imagen" />
                                </div>
                                <div class="col-8 col-sm-8 col-md-8 col-lg-8 pr-3">
                                    <h1>{{ podcast.title }}</h1>
                                    <div>
                                        <button class="follow-button mt-2 mb-4" role="follow-button">Follow</button>
                                    </div>
                                    <h6>{{ podcast.summary }}</h6>
                                    <p>{{ podcast.description }}</p>
                                    

                                </div>

                        
                            </div>
                            <!--
                            <div class="row w-100 mt-5 ps-5 mr-5">
                                <div class="overflow-x-auto flex-nowrap overflow-x-hidden" ref="episodeContainer">
                                    <ul>
                                        <li v-for="(audio, index) in podcast.list_of_episodes" :key="index" >
                                            <audio class="audioStyle" controls :src="audio.episode_url">{{ audio.title }}</audio>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        -->
                        <div class="row mt-3 align-items-center ps-5">
                            <Episode />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    </div>   
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Episode from '../components/Episode.vue';

    export default {
        components: {
            Sidebar,
            Episode,
        },
        data() {
            return {
                podcast:{
                    id: 1,
                    image_url: '/src/assets/podcasts/Moonlight.jpg',
                    title: "Moonlight",
                    summary: "Podcast talking about Cruz Cafuné's new album",
                    description: "Moonlight 922 se trata del segundo trabajo musical de Cruz Cafuné, dos años más tarde de la publicación de su antecesor, Maracucho Bueno Muere Chiquito, siendo este estrenado el día 10 de enero del año 2020 en todas las plataformas digitales.El álbum fue publicado tras el lanzamiento de cuatro adelantos de las trece canciones que serían publicadas; teniendo en cuenta que finalmente, “En Mi Zona” no acabaría formando parte de la Mixtape. Debe ser mencionado, que en un principio, la idea del artista era publicar música durante todas las lunas llenas; y que solo estuviera disponible durante el transcurro de estas, de ahí parte del nombre del álbum; aunque finalmente fue algo que no pudo llevarse a cabo.Como bien lleva haciendo el artista durante años, en el proyecto, decide navegar en distintos géneros musicales, tales como el soul, rap, el R&B y el trap; pero como de costumbre, mostrando una esencia propia que le caracteriza, contando incluso con colaboraciones con Flavio Rodríguez, voz pionera del R&B en castellano o artistas más cercanos a él, como puede ser Abhir Hathi.",
                    list_of_episodes: [
                        { id: 1, episode_title: 'intro', episode_url: '/src/assets/audio/Moonlight_audio.mp3'},
                        { id: 2, episode_title: 'mi_isla', episode_url: '/src/assets/audio/Mi_isla_audio.mp3'},
                    ],
                    author: "Cruz Cafuné",
                }
            };
        },
        methods: {
            getPodcast() {
                const podcastId = this.$route.params.id;
                const pathPodcast = `http://localhost:8000/podcasts/${podcastId}`;

                axios.get(pathPodcast).then((resPodcast) => {
                    this.podcast = resPodcast.data;
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            
            created () {
                // Descomentar cuando tengamos los endpoints listos
                // this.getPodcast() 
            },
        },
        
    };
</script>

<style>
.visualize {
    height: 100%;
}

.visualize-content {
    /* margin-top: 0em; */
    height: inherit;
    overflow: hidden;
    align-items: start;
    justify-content: flex-start;
}

.visualize-content .more-content{
    width: 100%;
    height: 100%;
    padding-left: 0px;
    background-color: #04001d;
}

h6{
    font-size: 18px;
}

.centrado {
    text-align: center;
    align-items: center;
    justify-content: center;
}

.contenedor-reducido{
    text-align: justify;
    align-items: justify;
    justify-content: justify;
}

.visualize-content .more-content h2{
    color: #525dff;
}

.search {
    display: flex;
    margin-bottom: 50px;
}

.search input {
    width: 300px;
    height: 40px;
    border: none;
    border-radius: 50px 0 0 50px;
    padding: 0 20px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.625);
}

.search button {
    width: 5em;
    height: 40px;
    border: none;
    border-radius: 0 50px 50px 0;
    background-color: #2933ff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}


.signup button {
    width: 10vw;
    height: 40px;
    border: none;
    border-radius: 50px;
    background-color: #2933ff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.signup button:hover {
    transform: scale(1.1);
    transition: all 0.35s ease-in-out;
}

.signin button {
    width: 10vw;
    height: 40px;
    border: none;
    border-radius: 50px;
    background-color: #000000;
    color: #ffffff;
    font-size: 16px;
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
ul {
    list-style-type: none;
} 
.follow-button {
    width: 7vw;
    height: 30px;
    background-color: transparent; /* Fondo transparente o el color de fondo que desees */
    border: 1px solid #fff;
    border-radius: 50px;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

.follow-button:hover {
    background-color: #ffffff;
    color: #000000;
    transition: all 0.35s ease-in-out;
}
</style>



