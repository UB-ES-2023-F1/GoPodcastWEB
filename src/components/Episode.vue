<template>
    <div v-for="episode in podcast.list_of_episodes" :key="episode.id" class="episode">
        <div class="row mt-2 p-2 contenedor-episodio">
            <div class="col-12 col-sm-3 col-md-3 col-lg-3">
                <img :src="podcast.image_url" alt="Imagen" class="reduced-image borde-redondeado" />
            </div>
            <div class="col-12 col-sm-9 col-md-9 col-lg-9">
                <div class="row">
                    <h6>{{ episode.episode_title }}</h6>
                </div>
                <div class="row">
                    <p>{{ episode.description }}</p>
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
                        <button class="play-like-button" @click="toggleLike(episode)">
                            <i :class="episode.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            podcast: {
                id: 1,
                image_url: '/src/assets/podcasts/Moonlight.jpg',
                title: "Moonlight",
                summary: "Podcast talking about Cruz Cafuné's new album",
                description: "This podcast talks about the importance of the islands having been born and raised in the Canary Islands",
                list_of_episodes: [
                    { id: 1, episode_title: 'intro', description: "Pequeño speech de Cruzzi hablando de la luna", episode_url: '/src/assets/audio/Moonlight_audio.mp3', audioElement: null, isLiked: false },
                    { id: 2, episode_title: 'mi_isla', description: "Canción de Cruzzi inicio album Moonlight922", episode_url: '/src/assets/audio/Mi_isla_audio.mp3', audioElement: null, isLiked: false },
                ],
                author: "Cruz Cafuné",
            },
            currentEpisode: null,
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
            const audioElement = new Audio(episode.episode_url);
            episode.audioElement = audioElement;
            this.currentEpisode = episode;
            audioElement.addEventListener("loadedmetadata", () => {
                const duration = audioElement.duration;
                episode.duration = this.formatDuration(duration);
                audioElement.play(); 
            });
            this.podcast.list_of_episodes.forEach((ep) => {
                if (ep !== episode) {
                this.stopPlayback(ep); 
                }
                this.preloadAudioDuration(ep);
            });
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
            const audioElement = new Audio(episode.episode_url);
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
            const pathPodcast = `http://localhost:8000/podcasts/${podcastId}`;

            axios.get(pathPodcast).then((resPodcast) => {
                this.podcast = resPodcast.data;
            })
            .catch((error) => {
                console.error(error);
            });
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
    },
    created () {
        // Descomentar cuando tengamos los endpoints listos
        // this.getPodcast() 
    },
  
    mounted() {
        // Precargar la duración al cargar la página
        this.podcast.list_of_episodes.forEach((episode) => {
            this.preloadAudioDuration(episode);
        });
    },
};
</script>
  


<style>
.reduced-image {
    width: 100%; /* Ajusta el valor al tamaño que desees */
    height: auto; /* Mantiene la proporción de aspecto */
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
    color: #fff; /* Color de ícono */
    transition: color 0.3s;
}

.play-like-button:hover {
    color: #007BFF; /* Cambiar color al pasar el mouse */
}

</style>