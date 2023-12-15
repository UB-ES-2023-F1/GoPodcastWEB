<template>
  <div v-for="episode in episodes" :key="episode.id" class="episode">
    <div class="row mt-2 p-2 contenedor-episodio">
      <div class="col-12 col-sm-9 col-md-9 col-lg-9">
        <div class="row">
          <a :href="'/visualizeEpisode/' + episode.id">
            <h4>{{ episode.title }}</h4>
          </a>
        </div>
        <div class="row">
          <p
            style="
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            "
          >
            {{ episode.description }}
          </p>
        </div>
        <!-- 
            <div class="row centrados_elementos">
                    <div class="col-7 col-md-2 col-lg-2">
                        <button class="play-like-button" @click="togglePlayback(episode)">
                        <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="col-7 col-md-3 col-lg-3 mt-2">
                        <p>{{ episode.duration }}</p>
                    </div>
                    </div> 
        -->
        <div
          v-for="(tag, index) in episode.tags"
          :key="index"
          class="tag row"
          :style="{ backgroundColor: randomColor(tag) }"
        >
          {{ tag }}
        </div>
      </div>
      <div class="col-7 col-md-2 col-lg-2" v-if="showLike">
        <button
          class="play-like-button"
          :id="episode.id"
          @click="toggleLike(episode)"
        >
          <i :class="episode.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    episodes: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tagColors: {},
      showLike: false,
    };
  },
  watch: {
    episodes(newValue, oldValue) {
      this.episodes.forEach((episode) => {
        this.getLike(episode);
      });
    },
  },
  methods: {
    getLike(episode) {
      const episodeId = episode.id;
      console.log(episodeId);
      const path = import.meta.env.VITE_API_URL + `/stream_later/${episodeId}`;

      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.access_token,
        },
      };

      axios
        .get(path, axiosConfig)
        .then((response) => {
          episode.isLiked = response.data.is_liked;
          console.log(episode.id, episode.isLiked);
        })
        .catch((error) => {
          this.episode.isLiked = false;
          console.error(
            `Error al querer ver si el podcast esta en favorito`,
            error
          );
        })
        .finally(() => {
          this.showLike = true;
        });
    },
    toggleLike(episode) {
      let button = document.getElementById(episode.id);
      console.log(button);
      button.disabled = true;

      if (!this.$store.state.userIsLoggedIn) {
        this.$router.push({ name: "Login" });
        return;
      }

      const episodeId = episode.id;
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.access_token,
        },
      };

      if (episode.isLiked) {
        const path = `${
          import.meta.env.VITE_API_URL
        }/stream_later/${episodeId}`;
        axios
          .delete(path, axiosConfig)
          .then((response) => {
            episode.isLiked = false;
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error al eliminar el like: ", error);
          })
          .finally(() => {
            button.disabled = false;
          });
      } else {
        const path = `${import.meta.env.VITE_API_URL}/stream_later`;
        const params = {
          id: episodeId,
        };

        axios
          .post(path, params, axiosConfig)
          .then((response) => {
            episode.isLiked = true;
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error al dar like: ", error);
          })
          .finally(() => {
            button.disabled = false;
          });
      }
    },
    randomColor(tag) {
      if (!this.tagColors[tag]) {
        const getRandomHex = () =>
          Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, "0");

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
  margin-right: 10%;
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
  color: #007bff;
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
