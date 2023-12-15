<template>
    <div class="visualize container-fluid m-0 p-0">
        <div class="row w-100 m-0">
            <!-- Sidebar -->
            <Sidebar />
            <!-- Main content-->
            <div class="visualize-content col-lg-10 col-md-9 col-sm-12 p-0  ">
                <div class="row w-100 p-5">
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

                <div v-else class="row p-5 w-100">

                    <!-- Info section -->
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="contenedor-reducido mb-5">

                            <div v-if="loading" class="loading-overlay">
                                <img src="/src/assets/kOnzy.gif" alt="Loading..." style="width: 2em; height: 2em;"/>
                            </div>

                            <!-- Normal visualization -->
                            <div class="row mt-4 ps-4 mr-4" v-if="!editting && !loading">
                                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                    <div v-if="loading_image" class="loading-overlay">
                                        <img src="/src/assets/kOnzy.gif" alt="Loading..." style="width: 2em; height: 2em;"/>
                                    </div>
                                    <img :src="episode.img" alt="Imagen" class="reduced-image mb-4" v-else/>
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
                                            <button class="like-button" id="like_button" @click="toggleLike()">
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

                                    <div>
                                        <div v-for="(tag, index) in this.tags" :key="index" class="tag row"
                                            :style="{ backgroundColor: randomColor(tag) }">
                                            {{ tag }}
                                        </div>
                                    </div>
                                    <p>{{ episode.description }}</p>
                                </div>
                            </div>

                            <!-- Editting visualization -->
                            <div class="row mt-4 ps-4 mr-4" v-if="editting && !loading">
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
                                    <textarea v-model="episode.description" placeholder="Episode description"></textarea>>
                                </div>
                            </div>

                            <!-- Config buttons -->
                            <div style="margin-top: 10px; margin-left: 20px;" v-if="isAuthor">
                                <button class="btn btn-success me-2" @click="editting = true" v-if="!editting">Edit</button>
                                <button class="btn btn-secondary me-2" @click="editting = false"
                                    v-if="editting">Cancel</button>
                                <button class="btn btn-success me-2" @click="updateEpisode()" v-if="editting">Save</button>
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
                                
                                <CommentForm @add-comment="handleAddComment" v-if="this.$store.state.userIsLoggedIn"/>
                            </div>
                            <!-- Check if there are comments -->
                            <div v-if="episode.comments && episode.comments.length > 0">
                                <Comment v-for="comment in episode.comments" :key="comment.id" :comment="comment" @add-reply="handleAddComment"/>
                            </div>
                            
                            
                        </div>
                        <div class="col-12 col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                    <div v-if="loading" class="loading-overlay">
                        <img src="/src/assets/kOnzy.gif" alt="Loading..." style="width: 2em; height: 2em;"/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <div v-if="currentEpisode">
        <ProgressBar ref="progressBar" :url="episode.audio_url" :coverImg="episode.img" :titlePodcast="episode.podcast_name" :titleEpisode="episode.title" />
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Comment from '../components/Comment.vue';
import CommentForm from '../components/CommentForm.vue';
import TopBar from '../components/TopBar.vue';
import ProgressBar from '../components/ProgressBar.vue';
import UserList from '../components/UserList.vue';
import PodcastList from '../components/PodcastList.vue';
import axios from 'axios'

export default {
    components: {
        Sidebar,
        Comment,
        CommentForm,
        ProgressBar,
        TopBar,
        PodcastList,
        UserList,
    },
    data() {
        return {
            tags:[],
            tagColors: {},
            episode: {},
            episode_edited: {},
            audio_edited: null,
            streamLater: [],
            editting: false,
            isAuthor: false,
            podcastSearchList: [],
            userSearchList: [],
            searching: false,
            currentEpisode: null,
            loading: true,
            loading_image: true,
        };

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
                this.getProfileImg()
                })
                .catch((error) => {
                this.userSearchList = []
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
        getProfileImg() {
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
        
        togglePlayback(episode) {
            if (this.currentEpisode === episode) {
                // Si el mismo episodio está en reproducción, detén la reproducción
                // this.stopPlayback(episode);
                this.currentEpisode = null;
            } else {
                // Si se selecciona un nuevo episodio, detén la reproducción actual y comienza el nuevo episodio
                // this.stopCurrentPlayback();
                this.playEpisode(episode);
            }
        },
        // TODO: Descomentar y linkear con el componente ProgressBar
        playEpisode(episode) {
            this.currentEpisode = episode
            this.$nextTick(() => {
                // Use $nextTick to wait for the ProgressBar component to be mounted
                const progressBar = this.$refs.progressBar;

                // if (progressBar) {
                //     this.$refs.progressBar.setAudioUrl(episode.audio_url);
                //     this.$refs.progressBar.setCoverUrl(this.podcastImage);
                //     this.$refs.progressBar.setTitlePodcast(this.podcastName);
                //     this.$refs.progressBar.setTitleEpisode(episode.title)
                //     this.$refs.progressBar.play();
                //     this.$refs.progressBar.initSlider();
                // } else {
                //     console.error('ProgressBar component or setAudioUrl method not found.');
                // }
            });
        },
        // playEpisode(episode) {
        //     const audioElement = new Audio(episode.audio_url);
        //     episode.audioElement = audioElement;
        //     this.currentEpisode = episode;
        //     audioElement.addEventListener("loadedmetadata", () => {
        //         const duration = audioElement.duration;
        //         episode.duration = this.formatDuration(duration);
        //         audioElement.play();
        //     });
        //     this.episodes.forEach((ep) => {
        //         if (ep !== episode) {
        //             this.stopPlayback(ep);
        //         }
        //         this.preloadAudioDuration(ep);
        //     });
        // },
        // stopPlayback(episode) {
        //     if (episode.audioElement) {
        //         episode.audioElement.pause();
        //     }
        // },
        // stopCurrentPlayback() {
        //     if (this.currentEpisode) {
        //         this.stopPlayback(this.currentEpisode);
        //     }
        // },
        getAudioData() {
            const pathAudio = import.meta.env.VITE_API_URL + '/episodes/' + this.episode.id + '/audio'
            this.episode.audio_url = pathAudio
            // this.preloadAudioDuration(this.episode)
            // axios.get(pathAudio, { responseType: 'blob' })
            //     .then((res) => {
            //         this.episode.audio_url = URL.createObjectURL(res.data)
            //         this.preloadAudioDuration(this.episode)
            //     })
        },
        // formatDuration(seconds) {
        //     if (seconds >= 3600) {
        //         const hours = Math.floor(seconds / 3600);
        //         const minutes = Math.floor((seconds % 3600) / 60);
        //         return `${hours} h ${minutes} min`;
        //     } else if (seconds >= 60) {
        //         const minutes = Math.floor(seconds / 60);
        //         const remainingSeconds = Math.floor(seconds % 60);
        //         return `${minutes} min ${remainingSeconds} s`;
        //     } else {
        //         return `${Math.floor(seconds)} s`;
        //     }
        // },
        getWatchLater() {
            const podcastId = this.episode.id;
            const path = import.meta.env.VITE_API_URL + `/stream_later/${podcastId}`;

            const axiosConfig = {
                headers: {
              Authorization: "Bearer " + this.$store.state.access_token,
            },
            }

            axios.get(path, axiosConfig)
            .then((response) =>{
                this.episode.isLiked = response.data.is_liked
            })
            .catch((error) => {
                this.episode.isLiked = false
                console.error(`Error al querer ver si el podcast esta en favorito`, error)
            })
        },
        toggleLike() {
            let likeButton = document.getElementById('like_button')
            likeButton.disabled = true
            if (!this.$store.state.userIsLoggedIn) {
                this.$router.push({ name: 'Login' })
                return
            }

            const episodeId = this.episode.id;
            const axiosConfig = {
                headers: {
              Authorization: "Bearer " + this.$store.state.access_token,
            },
            }

            if (this.episode.isLiked) {
                const path = import.meta.env.VITE_API_URL + `/stream_later/${episodeId}`;
                axios.delete(path, axiosConfig)
                .then(response => {
                    this.episode.isLiked = false;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error al quitar el like: ', error);
                })
                .finally(() => {
                    likeButton.disabled = false
                });
            } else {
                const path = import.meta.env.VITE_API_URL + `/stream_later`;
                const parameters = {
                    id: this.episode.id
                }
                axios.post(path, parameters, axiosConfig)
                .then(response => {
                    this.episode.isLiked = true;
                    console.log(response.data);
                })
                .catch(error => {
                    likeButton.disabled = false
                    console.error('Error al dar like: ', error);
                })
                .finally(() => {
                    likeButton.disabled = false
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
            this.loading = true
            const episodeId = this.$route.params.id;
            const pathEpisode = import.meta.env.VITE_API_URL + `/episodes/${episodeId}`;

            axios.get(pathEpisode)
            .then((resEpisode) => {
            this.episode = JSON.parse(JSON.stringify(resEpisode.data));
            this.episode_edited = JSON.parse(JSON.stringify(resEpisode.data));
            if (this.$store.state.userIsLoggedIn) {
                this.getId()
            }
            console.log(this.episode)
            this.getCover()
            this.tags = this.episode.tags
            this.getAudioData()
            
            })
            .catch((error) => {
                console.error(error)
            }).finally(() => {
                this.loading = false
            })
            .finally(() => {
                this.loading = false; 
            });
        },
        getId() {
            const pathID = import.meta.env.VITE_API_URL + '/protected'

            const axiosConfig = {
                headers: {
              Authorization: "Bearer " + this.$store.state.access_token,
            },
            }

            axios.get(pathID, axiosConfig)
                .then((res) => {
                    console.log(res)
                    if (res.data.logged_in_as == this.episode.id_author) {
                        this.isAuthor = true
                    }
                    else {
                        this.getWatchLater()
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
                }).finally(() => {
                    this.loading_image = false
                    console.log("!!!", this.loading_image);
                })

        },
        blobToData(blob){
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(blob)
            })
        },
        updateEpisode() {
            const pathUpdate = import.meta.env.VITE_API_URL + "/episodes/" + this.$route.params.id

            const axiosConfig = {
                headers: {
              Authorization: "Bearer " + this.$store.state.access_token,
              "Content-Type": "Multipart/form-data",
            },
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
                    headers: {
              Authorization: "Bearer " + this.$store.state.access_token,
            },
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
    },
    created() {
        // Descomentar cuando tengamos los endpoints listos
        this.getEpisode()
    },
    mounted() {
        // Precargar la duración al cargar la página
        // this.preloadAudioDuration(this.episode);
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
.tag {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    color: white;
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



ul {
    list-style-type: none;
}

.btn-success,
.btn-danger,
.btn-secondary {
    border-radius: 50px;
    font-size: 16px;
    margin: 0px 10px 0px 10px;
}

.disabled {
  pointer-events: none;
}

.loading-overlay {
  width: 100%;
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>



