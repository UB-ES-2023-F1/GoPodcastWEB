<template>
  <div class="categories-container" v-if="podcasts.length > 0">
    <div
      :class="{
        'podcasts-container': podcasts.length !== 0,
        'no-spacing-class': podcasts.length === 0,
      }"
    >
      <h4>{{ category.title }}</h4>
      <div
        class="podcasts"
        :style="{ marginBottom: podcasts.length !== 0 ? '100px' : '0' }"
      >
        <div v-for="podcast in podcasts" :key="podcast.id" class="podcast">
          <a :href="'/visualize/' + podcast.id">
            <img :src="podcast.img" :alt="podcast.name" v-if="podcast.img" />
          </a>
          <span class="name text-center">{{ podcast.name }}</span>
        </div>
      </div>
    </div>
    <div class="espacio"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      podcasts: [],
    };
  },
  methods: {
    getCovers() {
      console.log("Getting covers");
      this.podcasts.forEach((podcast) => {
        const pathCover = import.meta.env.VITE_API_URL + podcast.cover;

        axios
          .get(pathCover, { responseType: "blob" })
          .then(async (res) => {
            const base64data = await this.blobToData(res.data);
            podcast.img = base64data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    getCover(podcast) {
      const pathCover =
        import.meta.env.VITE_API_URL + "/podcasts/" + podcast.id + "/cover";

      axios
        .get(pathCover, { responseType: "blob" })
        .then(async (res) => {
          const base64data = await this.blobToData(res.data);
          podcast.img = base64data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    getPodcasts() {
      console.log("Getting podcasts");
      const pathPodcasts =
        import.meta.env.VITE_API_URL +
        "/podcasts/categories/" +
        this.category.title;

      axios
        .get(pathPodcasts)
        .then((res) => {
          this.podcasts = res.data;
          if (this.podcasts.length > 0){
              this.getCovers();
          }
          console.log("Podcastssss", this.podcasts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // Descomentar cuando tengamos los endpoints listos
    this.getPodcasts();
  },
};
</script>

<style>
.podcasts {
  display: flex;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 20px;
  justify-content: flex-start;
  width: 75%; /* Ajusta según tus necesidades */
  overflow: auto;
  white-space: nowrap;

  /* width: 80vw; */
}

.podcasts-container {
  margin-top: 50px;
  width: 100vw;
  height: 300px;
}

.podcast {
  display: flex;
  flex-direction: column;
  /* align-items: center;
    justify-content: center; */
  margin-left: 45px;
  text-align: center;
  align-items: center;
}

.podcast img {
  width: 210px;
  height: 210px;
  border-radius: 5%;
  margin-bottom: 10px;
}

.podcast .title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.podcast:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.podcast:hover img {
  box-shadow: 0 0 15px rgba(0, 72, 255, 0.784);
}

.espacio {
  margin-bottom: 20px;
  padding-bottom: 20px;
}

.no-spacing-class {
  padding-top: 30px;
}
</style>
