<template>
    <div class="visualize container-fluid m-0 p-0">
        <div class="row w-100 m-0">
            <!-- Sidebar -->
            <Sidebar />
            <!-- Main content-->
            <div class="visualize-content col-lg-10 col-md-9 col-sm-12 p-0  ">
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
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="contenedor-reducido mb-5"> 
                            <div class="row mt-5 ps-5 mr-5">
                                <div class="col-10 col-sm-4 col-md-4 col-lg-4">
                                    <img :src="podcast.image_url" alt="Imagen" class="reduced-image"/>
                                </div>
                                <div class="col-10 col-sm-7 col-md-7 col-lg-7 ">
                                    <h1>{{ podcast.title }}</h1>
                                    <div>
                                        <button @click="toggleFollow" class="follow-button mt-2 mb-4" :class="{ following: podcast.isFollowing }">
                                            {{ podcast.isFollowing ? 'Unfollow' : 'Follow' }}
                                        </button>
                                    </div>
                                    <h6>{{ podcast.summary }}</h6>
                                    <p>{{ podcast.description }}</p>
                                </div>
                            </div>
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
import ProgressBar from '../components/ProgressBar.vue';
import axios from 'axios'

    export default {
        components: {
            Sidebar,
            Episode,
            ProgressBar,
        },
        data() {
            return {
                podcast:{
                    id: 1,
                    image_url: '/src/assets/podcasts/Moonlight.jpg',
                    title: "Moonlight",
                    summary: "Podcast talking about Cruz Cafuné's new album",
                    description: "Moonlight 922 se trata del segundo trabajo musical de Cruz Cafuné, dos años más tarde de la publicación de su antecesor, Maracucho Bueno Muere Chiquito, siendo este estrenado el día 10 de enero del año 2020 en todas las plataformas digitales.El álbum fue publicado tras el lanzamiento de cuatro adelantos de las trece canciones que serían publicadas; teniendo en cuenta que finalmente, “En Mi Zona” no acabaría formando parte de la Mixtape. Debe ser mencionado, que en un principio, la idea del artista era publicar música durante todas las lunas llenas; y que solo estuviera disponible durante el transcurro de estas, de ahí parte del nombre del álbum; aunque finalmente fue algo que no pudo llevarse a cabo.",
                    list_of_episodes: [
                        { id: 1, episode_title: 'intro', episode_url: '/src/assets/audio/Moonlight_audio.mp3'},
                        { id: 2, episode_title: 'mi_isla', episode_url: '/src/assets/audio/Mi_isla_audio.mp3'},
                    ],
                    author: "Cruz Cafuné",
                    isFollowing: false,
                },
            };
        },
        methods: {
            getPodcast() {
                const podcastId = this.$route.params.id;
                const pathPodcast = `https://gopodcastapi.azurewebsites.net/podcasts/${podcastId}`;

                axios.get(pathPodcast).then((resPodcast) => {
                    this.podcast = resPodcast.data;
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            toggleFollow() {
                const podcastId = this.podcast.id;
                const path = `https://gopodcastapi.azurewebsites.net/followPodcast/${podcastId}`;

                if (this.podcast.isFollowing) {
                    axios.delete(path).then(response => {
                        this.podcast.isFollowing = false;
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error al dejar de seguir el podcast: ', error);
                    });
                } else {
                    axios.post(path).then(response => {
                        this.podcast.isFollowing = true;
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error al seguir el podcast: ', error);
                    });
                }
            },
            
        },
        created () {
            // Descomentar cuando tengamos los endpoints listos
            // this.getPodcast() 
        },
        
    };
</script>

<style>
.visualize {
    height: 100%;
}

.visualize-content {
    height: inherit;
    overflow: hidden;
    align-items: start;
    justify-content: flex-start;
}

.reduced-image {
    width: 100%; 
    height: auto;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); 
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
    width: 9vw;
    height: 30px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50px;
    transition: all 0.35s ease-in-out;
}

.follow-button.following {
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
}

.follow-button:not(.following) {
    background-color: transparent; 
    border: 1px solid #fff;
    color: #fff;
}

.follow-button:hover.following {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    
}

.follow-button:hover:not(.following) {
    background-color: #fff;
    color: #000;
}
</style>



