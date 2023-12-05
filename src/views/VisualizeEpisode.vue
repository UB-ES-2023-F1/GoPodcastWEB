<template>
    <div class="visualize container-fluid m-0 p-0">
        <div class="row w-100 m-0">
            <!-- Sidebar -->
            <Sidebar />
            <!-- Main content-->
            <div class="visualize-content col-lg-10 col-md-9 col-sm-12 p-0  ">
                <div class="row w-100 p-5">
                    <TopBar />
                </div>
                <div class="row p-5 w-100">

                    <!-- Info section -->
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="contenedor-reducido mb-5">
                            <!-- Normal visualization -->
                            <div class="row mt-4 ps-4 mr-4" v-if="!editting">
                                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                    <img :src="episode.img" alt="Imagen" class="reduced-image mb-4" />
                                </div>
                                <div class="col-12 col-sm-7 col-md-7 col-lg-7 ">
                                    <title>{{ episode.title }}</title>
                                    <div class="row">
                                        <div class="col-3 col-sm-1 col-md-1 col-lg-1">
                                            <button class="play-button" @click="togglePlayback(this.episode)">
                                                <i class="fas fa-play-circle"></i>
                                            </button>
                                        </div>
                                        <div class="col-3 col-sm-1 col-md-1 col-lg-1"></div>
                                        <!-- Like button. Only when logged in -->
                                        <div class="col-3 col-sm-1 col-md-1 col-lg-1 mt-3">
                                            <button class="like-button" @click="toggleLike()">
                                                <i :class="episode.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p></p>
                                    <div class="in-same-line">
                                        <h6><a :href="'/visualize/' + episode.id_podcast">{{ episode.podcast_name }}</a>
                                        </h6>
                                        <span class="separation">&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;</span>
                                        <h6><a :href="'/profile/' + episode.id_author">{{ episode.author_name }}</a></h6>
                                    </div>


                                    <!-- Tag section. Not implemented for the moment -->
                                    <!--
                                    <div>
                                        <div v-for="(tag, index) in episode.tags" :key="index" class="tag row"
                                            :style="{ backgroundColor: randomColor(tag) }">
                                            {{ tag }}
                                        </div>

                                    </div>
                                    -->
                                    <p>{{ episode.description }}</p>
                                </div>
                            </div>

                            <!-- Editting visualization -->
                            <div class="row mt-4 ps-4 mr-4" v-else>
                                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                    <img :src="episode.img" alt="Imagen" class="reduced-image mb-4" />
                                </div>
                                <div class="col-12 col-sm-7 col-md-7 col-lg-7 ">
                                    <input type="text" v-model="episode_edited.title" placeholder="Episode name">
                                    <div class="row">
                                        <div style="margin-top: 15px; width: auto;">
                                            <input type="file" class="form-control" ref="audio" id="audio"
                                                @change="onFileChange" required />
                                        </div>
                                        <div class="col-3 col-sm-1 col-md-1 col-lg-1"></div>
                                        <!-- Like button. Only when logged in and if not author -->
                                        <div class="col-3 col-sm-1 col-md-1 col-lg-1 mt-3" v-if="!isAuthor">
                                            <button class="like-button" @click="toggleLike()">
                                                <i :class="episode.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p></p>
                                    <div class="in-same-line">
                                        <h6><a :href="'/visualize/' + episode.id_podcast">{{ episode.podcast_name }}</a>
                                        </h6>
                                        <span class="separation">&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;</span>
                                        <h6><a :href="'/profile/' + episode.id_author">{{ episode.author_name }}</a></h6>
                                    </div>


                                    <!-- Tag section. Not implemented for the moment -->
                                    <!--
                                    <div>
                                        <div v-for="(tag, index) in episode.tags" :key="index" class="tag row"
                                            :style="{ backgroundColor: randomColor(tag) }">
                                            {{ tag }}
                                        </div>

                                    </div>
                                    -->
                                    <textarea v-model="episode.description" placeholder="Episode description"></textarea>>
                                </div>
                            </div>

                            <!-- Config buttons -->
                            <div style="margin-top: 10px; margin-left: 20px;" v-if="isAuthor">
                                <button class="btn btn-success me-2" @click="editting = true" v-if="!editting">Edit</button>
                                <button class="btn btn-success me-2" @click="updateEpisode()" v-if="editting">Save</button>
                                <button class="btn btn-success me-2" @click="editting = false"
                                    v-if="editting">Cancel</button>
                                <button class="btn btn-danger me-2" @click="deletePodcast()">Delete</button>
                            </div>
                        </div>
                    </div>

                    <!-- Comment section -->
                    <div class="row">
                        <div class="col-12 col-sm-2 col-md-2 col-lg-2"></div>
                        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
                            <h2>Comments:</h2>
                            <div>
                                
                                <CommentForm @add-comment="handleAddComment"/>
                            </div>
                            <!-- Check if there are comments -->
                            <div v-if="episode.comments && episode.comments.length > 0">
                                <Comment v-for="comment in episode.comments" :key="comment.id" :comment="comment" @add-reply="handleAddComment"/>
                            </div>
                            
                            
                        </div>
                        <div class="col-12 col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-if="currentEpisode">
            <ProgressBar ref="progressBar" />
        </div> -->
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Comment from '../components/Comment.vue';
import CommentForm from '../components/CommentForm.vue';
import TopBar from '../components/TopBar.vue';
import ProgressBar from '../components/ProgressBar.vue';
import axios from 'axios'

export default {
    components: {
        Sidebar,
        Comment,
        CommentForm,
        ProgressBar,
        TopBar,
    },
    data() {
        return {
            // episode:{ 
            //     id: 1, 
            //     title: 'Intro', 
            //     episodeImage: "/src/assets/podcasts/MMCD.jpg", 
            //     description: "Pequeño speech de Cruzzi hablando de la luna, y de la importancia de las Palmas al haberse criado allí.", 
            //     audio_url: '/src/assets/audio/Moonlight_audio.mp3', 
            //     tags: ["Intro", "Cruzzi", "Moonlight"], 
            //     comments: [
            //     {
            //         date: new Date(),
            //         text: "¡Este episodio fue increíblemente informativo! Me encantó cómo los anfitriones profundizaron en el tema y proporcionaron datos detallados que realmente ampliaron mi comprensión. ¡Aprendí mucho en solo unos minutos!",
            //         replies: [
            //             {
            //             date: new Date(),
            //             text: "La calidad del sonido en este episodio es excepcional. La producción está muy bien hecha, lo que hizo que la experiencia auditiva fuera muy agradable. ¡Se nota el esfuerzo que pusieron en la edición para garantizar una excelente calidad!",
            //             replies: [
            //                 {
            //                 date: new Date(),
            //                 text: "Teneis razón ambos, me encantó el episodio!!",
            //                 replies: [],
            //                 },
            //             ],
            //             },
            //             {
            //             date: new Date(),
            //             text: "Tienes razón este episodio es un 10!",
            //             replies: [],
            //             },
            //         ]},
            //         {
            //         date: new Date(),
            //         text: "Los invitados en este episodio aportaron perspectivas fascinantes. Me encantó escuchar diferentes voces y opiniones sobre el tema. Fue genial ver cómo los anfitriones facilitaron la conversación de manera que todos pudieron expresar sus ideas de manera clara y concisa.",
            //         replies: [],
            //         },
            //     ],
            //     author: "Cruz Cafuné",
            //     audioElement: null, 
            //     isLiked: false 
            // },
            // currentEpisode: null,
            // tagColors: {},
            episode: {},
            episode_edited: {},
            audio_edited: null,
            streamLater: [],
            editting: false,
            isAuthor: false,
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
        toggleLike() {
            if (!this.$store.state.userIsLoggedIn) {
                console.log("Going to login");
                this.$router.push({ name: 'Login' })
                return
            }

            const episodeId = this.episode.id;
            const path = import.meta.env.VITE_API_URL + `/stream_later/${episodeId}`;

            if (this.episode.isLiked) {
                axios.delete(path).then(response => {
                    this.episode.isLiked = false;
                    console.log(response.data);
                })
                    .catch(error => {
                        console.error('Error al eliminar el like: ', error);
                    });
            } else {
                axios.post(path).then(response => {
                    this.episode.isLiked = true;
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
            const episodeId = this.$route.params.id;
            const pathEpisode = import.meta.env.VITE_API_URL + `/episodes/${episodeId}`;

            axios.get(pathEpisode).then((resEpisode) => {
                this.episode = JSON.parse(JSON.stringify(resEpisode.data));
                this.episode_edited = JSON.parse(JSON.stringify(resEpisode.data));
                if (this.$store.state.userIsLoggedIn) {
                    this.getId()
                }
                console.log(this.episode)
                this.getCover()
                
            })
                .catch((error) => {
                    console.error(error);
                });
        },
        getId() {
            const pathID = import.meta.env.VITE_API_URL + '/protected';

            const axiosConfig = {
                withCredentials: true
            }

            axios.get(pathID, axiosConfig)
                .then((res) => {
                    console.log(res)
                    if (res.data.logged_in_as == this.episode.id_author) {
                        this.isAuthor = true
                    }
                })
        },
        getCover() {
            const pathCovers = import.meta.env.VITE_API_URL + '/podcasts/' + this.episode.id_podcast + '/cover'

            axios.get(pathCovers, { responseType: "blob" })
                .then(async (res) => {
                    const base64data = await this.blobToData(res.data)
                    this.episode.img = base64data
                })
                .catch((error) => {
                    console.error(error)
                })

        },
        blobToData(blob) {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(blob)
            })
        },
        updateEpisode() {
            const pathUpdate = import.meta.env.VITE_API_URL + "/episodes/" + this.$route.params.id

            const axiosConfig = {
                withCredentials: true
            }

            var formData = new FormData();
            
            formData.append("audio", this.audio_edited);
            formData.append("title", this.episode_edited.title)
            formData.append("description", this.episode_edited.description)

            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            axios.put(pathUpdate, formData, axiosConfig, headers)
                .then((res) => {
                    console.log(res.data)
                    alert("Cambios realizados")
                    this.episode.audio_url = this.audio_edited
                    this.episode.title = this.episode_edited.title
                    this.episode.description = this.episode_edited.description
                    this.editting = false
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        deletePodcast() {
            if (confirm("Do you really want to delete this episode?")) {
                const pathDelete = import.meta.env.VITE_API_URL + "/episodes/" + this.$route.params.id

                const axiosConfig = {
                    withCredentials: true
                }

                axios.delete(pathDelete, axiosConfig)
                    .then((res) => {
                        console.log("Episode deleted", res.data)
                        alert("The episode have been deleted succesfully")
                        this.$router.push('/visualize/' + this.episode.id_podcast)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        onFileChange() {
            this.audio_edited = this.$refs.audio.files[0]
        },
        handleAddComment() {
            const episodeId = this.$route.params.id;
            const pathComments = import.meta.env.VITE_API_URL + `/episodes/${episodeId}/comments`;

            axios.get(pathComments).then((resComments) => {
                this.episode.comments = resComments.data;
                console.log(this.episode.comments)
            })
            .catch((error) => {
                console.error(error);
            });
        },
        obtainCertainComment(commentId){

        }
    },
    created() {
        // Descomentar cuando tengamos los endpoints listos
        this.getEpisode()
    },
    mounted() {
        // Precargar la duración al cargar la página
        this.preloadAudioDuration(this.episode);
    },

};
</script>

<style scoped>
.contenedor-reducido h1 {
    word-wrap: break-word;
}

.in-same-line {
    display: flex;
    align-items: baseline;
}

.vert {
    display: flex;
    align-items: center;
    justify-content: center;
}

.like-button {
    background: transparent;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #fff;
    transition: color 0.3s;
    margin-top: 0;
    margin-bottom: 0;
    align-items: center;

}

.like-button:hover {
    color: #007BFF;
    transform: scale(1.2);
}


.play-button {
    background: transparent;
    border: none;
    font-size: 50px;
    cursor: pointer;
    color: #fff;
    transition: color 0.3s;
    margin-top: 0;
    margin-bottom: 0;
}

.play-button:hover {
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

.visualize-content .more-content {
    width: 100%;
    height: 100%;
    padding-left: 0px;
    background-color: #04001d;
    margin-bottom: 0;
}

h6 {
    font-size: 18px;
}

.centrado {
    text-align: center;
    align-items: center;
    justify-content: center;
}

.contenedor-reducido {
    text-align: justify;
    align-items: justify;
    justify-content: justify;
}

.visualize-content .more-content h2 {
    color: #525dff;
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

.btn-success,
.btn-danger,
.btn-dark {
    border-radius: 50px;
    font-size: 16px;
    margin: 0px 10px 0px 10px;
}
</style>



