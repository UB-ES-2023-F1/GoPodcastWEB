<template>
    <div v-for="episode in episodes" :key="episode.id" class="episode">
        <div class="row mt-2 p-2 contenedor-episodio">
            <div class="col-12 col-sm-9 col-md-9 col-lg-9">
                <div class="row">
                    <a :href="'/visualizeEpisode/' + episode.id">
                        <h4>{{ episode.title }} </h4>
                    </a>
                </div>
                <div class="row centrados_elementos">
                    <div class="col-7 col-md-2 col-lg-2">
                        <button class="play-like-button" @click="togglePlayback(episode)">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="col-7 col-md-3 col-lg-3 mt-2">
                        <p>{{ episode.duration }}</p>
                    </div>
                    <div class="col-7 col-md-2 col-lg-2">
                        <button v-if="show_liked" class="play-like-button" id="like_button" @click="toggleLike(episode)">
                            <i :class="episode.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                        </button>
                    </div>
                </div>
                <div v-for="(tag, index) in episode.tags" :key="index" class="tag row"
                    :style="{ backgroundColor: randomColor(tag) }">
                    {{ tag }}
                </div>
            </div>
        </div>
    </div>

    <div v-if="currentEpisode">
        <ProgressBar ref="progressBar" :url="currentEpisode.audio_url" :coverImg="podcastImage"
            :titlePodcast="podcastName" :titleEpisode="currentEpisode.title" :idEpisode="currentEpisode.id" />
    </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue';
import axios from 'axios'

export default {
    props: {
        episodes: {
            type: Array,
            default: []
        },
        podcastImage: {
            type: String,
            default: null
        },
        podcastName: {
            type: String,
            default: ""
        },
        show_liked: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ProgressBar,
    },
    data() {
        return {
            currentEpisode: null,
            tagColors: {},
        };
    },
    watch: {
        episodes(newValue, oldValue) {
            this.episodes.forEach((episode) => {
                this.getAudioData(episode);
            });
        }
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
        // TODO: Descomentar y linkear con el componente ProgressBar
        playEpisode(episode) {
            this.currentEpisode = episode
            // this.$nextTick(() => {
            //     // Use $nextTick to wait for the ProgressBar component to be mounted
            //     const progressBar = this.$refs.progressBar;

            //     if (progressBar) {
            //         this.$refs.progressBar.setAudioUrl(episode.audio_url);
            //         this.$refs.progressBar.setCoverUrl(this.podcastImage);
            //         this.$refs.progressBar.setTitlePodcast(this.podcastName);
            //         this.$refs.progressBar.setTitleEpisode(episode.title)
            //         this.$refs.progressBar.play();
            //         this.$refs.progressBar.initSlider();
            //     } else {
            //         console.error('ProgressBar component or setAudioUrl method not found.');
            //     }
            // });
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
        getAudioData(episode) {
            const pathAudio = import.meta.env.VITE_API_URL + '/episodes/' + episode.id + '/audio'
            
            axios.get(pathAudio, { responseType: 'blob' })
                .then((res) => {
                    episode.audio_url = URL.createObjectURL(res.data)
                    this.preloadAudioDuration(episode)
                })
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
        toggleLike(episode) {
            if (!this.$store.state.userIsLoggedIn) {
                this.$router.push({ name: 'Login' })
                return
            }

            let likeButton = document.getElementById('like_button')
            likeButton.disabled = true

            const episodeId = episode.id;
            const axiosConfig = {
                headers: { Authorization: 'Bearer ' + this.$store.state.access_token }
            }

            if (episode.isLiked) {
                const path = import.meta.env.VITE_API_URL + `/stream_later/${episodeId}`;
                axios.delete(path, axiosConfig)
                .then(response => {
                    episode.isLiked = false;
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
                    id: episode.id
                }
                axios.post(path, parameters, axiosConfig)
                .then(response => {
                    episode.isLiked = true;
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
    },
};
</script>
  


<style>
.reduced-image {
    width: 100%;
    height: auto;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    color: white;
}

.container {
    text-align: center;
    align-items: center;
    justify-content: center;
}

.contenedor-episodio {
    background-color: #555;
    color: #fff;
    width: 60%;
    padding: 12px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: justify;
    align-items: justify;
    justify-content: justify;
}

.borde-redondeado {
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
}

.centrados_elementos {
    text-align: justify;
    align-items: justify;
    justify-content: justify;
}

.play-like-button {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #fff;
    transition: color 0.3s;
}

.play-like-button:hover {
    color: #007BFF;
}

#imagen-interactiva {
    transition: filter 0.3s;
}

#imagen-interactiva:hover {
    filter: brightness(0.8);
}

a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    filter: brightness(0.8);
}
</style>