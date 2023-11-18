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
                        
                    </div>
                </div>
                <div class="row p-5 w-100">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="contenedor-reducido mb-5"> 
                            <div class="row mt-4 ps-4 mr-4">
                                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                    <img :src="episode.episodeImage" alt="Imagen" class="reduced-image mb-4"/>
                                </div>
                                <div class="col-12 col-sm-7 col-md-7 col-lg-7 ">
                                    <title>{{ episode.title }}</title>
                                    <button class="play-like-button" @click="togglePlayback(this.episode)">
                                        <i class="fas fa-play-circle"></i>
                                    </button>
                                    <div class="in-same-line">
                                        <h6>{{ episode.author }}</h6>
                                        <span class="separation">&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;</span>
                                        <duration>{{ episode.duration }}</duration>
                                    </div>
                                    
                                    
                                    <div>
                                        <div v-for="(tag, index) in episode.tags" :key="index" class="tag row"
                                            :style="{ backgroundColor: randomColor(tag) }">
                                            {{ tag }}
                                        </div>
                                        
                                    </div>
                                    <p></p>
                                    <p></p>
                                    <p>{{ episode.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-2 col-md-2 col-lg-2"></div>
                        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
                            <h2>Comments:</h2>
                            <Comment
                                v-for="comment in episode.listOfComments"
                                :key="comment.id"
                                :comment="comment"
                                @toggle-like="toggleLike"
                            />
                        </div>
                        <div class="col-12 col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentEpisode">
            <ProgressBar ref="progressBar" />
        </div>
    </div>   
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Comment from '../components/Comment.vue';
import ProgressBar from '../components/ProgressBar.vue';
import axios from 'axios'

    export default {
        components: {
            Sidebar,
            Comment,
            ProgressBar,
        },
        data() {
            return {
                episode:{ 
                    id: 1, 
                    title: 'Intro', 
                    episodeImage: "/src/assets/podcasts/MMCD.jpg", 
                    description: "Pequeño speech de Cruzzi hablando de la luna, y de la importancia de las Palmas al haberse criado allí.", 
                    audio_url: '/src/assets/audio/Moonlight_audio.mp3', 
                    tags: ["Intro", "Cruzzi", "Moonlight"], 
                    listOfComments: [
                    {
                        date: new Date(),
                        text: "¡Este episodio fue increíblemente informativo! Me encantó cómo los anfitriones profundizaron en el tema y proporcionaron datos detallados que realmente ampliaron mi comprensión. ¡Aprendí mucho en solo unos minutos!",
                        replies: [
                            {
                            date: new Date(),
                            text: "La calidad del sonido en este episodio es excepcional. La producción está muy bien hecha, lo que hizo que la experiencia auditiva fuera muy agradable. ¡Se nota el esfuerzo que pusieron en la edición para garantizar una excelente calidad!",
                            replies: [
                                {
                                date: new Date(),
                                text: "Teneis razón ambos, me encantó el episodio!!",
                                replies: [],
                                },
                            ],
                            },
                            {
                            date: new Date(),
                            text: "Tienes razón este episodio es un 10!",
                            replies: [],
                            },
                        ]},
                        {
                        date: new Date(),
                        text: "Los invitados en este episodio aportaron perspectivas fascinantes. Me encantó escuchar diferentes voces y opiniones sobre el tema. Fue genial ver cómo los anfitriones facilitaron la conversación de manera que todos pudieron expresar sus ideas de manera clara y concisa.",
                        replies: [],
                        },
                    ],
                    author: "Cruz Cafuné",
                    audioElement: null, 
                    isLiked: false 
                },
                currentEpisode: null,
                tagColors: {},
            };
            
        },
        methods: {
            togglePlayback(episode) {
                if (this.currentEpisode === episode) {
                    // Si el mismo episodio está en reproducción, detén la reproducción
                    this.stopPlayback(episode);
                    this.currentEpisode = null;
                } else {
                    // Si se selecciona un nuevo episodio, detén la reproducción actual y comienza el nuevo episodio
                    this.stopCurrentPlayback();
                    this.playEpisode(episode);
                }
            },
            playEpisode(episode) {
                const audioElement = new Audio(episode.audio_url);
                episode.audioElement = audioElement;
                this.currentEpisode = episode;
                audioElement.addEventListener("loadedmetadata", () => {
                    const duration = audioElement.duration;
                    episode.duration = this.formatDuration(duration);
                    audioElement.play(); 
                });
                if (episode !== episode) {
                    this.stopPlayback(ep); 
                }
                this.preloadAudioDuration(ep);
            },
            stopPlayback(episode) {
                if (episode.audioElement) {
                    episode.audioElement.pause();
                }
            },
            stopCurrentPlayback() {
                if (this.currentEpisode) {
                    this.stopPlayback(this.currentEpisode);
                }
            },
            preloadAudioDuration(episode) {
                const audioElement = new Audio(episode.audio_url);
                audioElement.addEventListener("loadedmetadata", () => {
                    const duration = audioElement.duration;
                    episode.duration = this.formatDuration(duration);
                });
            },
            formatDuration(seconds) {
                if (seconds >= 3600) {
                    const hours = Math.floor(seconds / 3600);
                    const minutes = Math.floor((seconds % 3600) / 60);
                    return `${hours} h ${minutes} min`;
                } else if (seconds >= 60) {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = Math.floor(seconds % 60);
                    return `${minutes} min ${remainingSeconds} s`;
                } else {
                    return `${Math.floor(seconds)} s`;
                }
            },
            toggleLike(episode) {
                const episodeId = episode.id;
                const path = `http://localhost:8000/likeEpisode/${episodeId}`;

                if (episode.isLiked) {
                    axios.delete(path).then(response => {
                        episode.isLiked = false;
                        console.log(response.data);
                    })
                        .catch(error => {
                            console.error('Error al eliminar el like: ', error);
                        });
                } else {
                    axios.post(path).then(response => {
                        episode.isLiked = true;
                        console.log(response.data);
                    })
                        .catch(error => {
                            console.error('Error al dar like: ', error);
                        });
                }
            },
            randomColor(tag) {
                if (!this.tagColors[tag]) {
                    const getRandomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                    
                    let color;
                    do {
                    color = `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
                    } while (this.isColorTooLight(color)); // Comprueba si el color es demasiado claro
                    
                    this.tagColors[tag] = color; // Almacena el color generado en tagColors
                }

                return this.tagColors[tag];
            },

            // Función que permita la legibilidad del texto de la etiqueta en relación del color de fondo
            isColorTooLight(color) {
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);

                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                return brightness > 128;
            },
            getEpisode() {
                const podcastId = this.$route.params.podcastId;
                const episodeId = this.$route.params.id;
                const pathEpisode = `http://localhost:8000/podcasts/${podcastId}/episodes/${episodeId}`;

                axios.get(pathEpisode).then((resEpisode) => {
                    episode = resEpisode.data;
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            
        },
        created () {
            // Descomentar cuando tengamos los endpoints listos
            // this.getEpisode() 
            this.episodeId = this.$route.params.id;
        },
        mounted() {
            // Precargar la duración al cargar la página
            this.preloadAudioDuration(this.episode);
        },
        
    };
</script>

<style>
.contenedor-reducido h1 {
    word-wrap: break-word;
}

.in-same-line {
  display: flex;
  align-items: baseline;
}


.in-same-line h6,
.in-same-line duration {
  margin-right: 5px; /* Ajusta el espacio entre el título y la duración */
}


.play-like-button {
    background: transparent;
    border: none;
    font-size: 50px;
    cursor: pointer;
    color: #fff;
    transition: color 0.3s;
    margin-top: 0;
    margin-bottom: 0;
}

.play-like-button:hover {
    color: #007BFF;
    transform: scale(1.2);
}

.visualize {
    height: 100%;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    color: white;
    font-size: 14px
}

.visualize-content {
    height: inherit;
    overflow: hidden;
    align-items: start;
    justify-content: flex-start;
}
title {
    display: block;
    font-size: 3.5em;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1;

}
duration {
    font-size: 17px;
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



