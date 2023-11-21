<template>
  <div class="m-0 p-0">
    <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
      <div v-for="episode in episodesList" :key="episode.id" class="podcast" @click="goToPodcast(episode.id)">
        <a :href="'/visualize/' + episode.id">
          <img :src="episode.img" :alt="episode.title" class="podcast-img" v-if="episode.img">
        </a>
        <span class="title">{{ episode.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    episodesList: {
      type: Array,
      default: []
    }
  },
  watch: {
    episodesList(newValue, oldValue) {
      this.getCovers()
    }
  },
  methods: {
    getCovers() {
      this.episodesList.forEach(episode => {
        const pathCovers = import.meta.env.VITE_API_URL + '/podcasts/' + episode.id_podcast + '/cover'

        axios.get(pathCovers, { responseType: "blob" })
          .then(async (res) => {
            const base64data = await this.blobToData(res.data)
            episode.img = base64data
          })
          .catch((error) => {
            console.error(error)
          })
      });

    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    },
  },
  created() {
    // Uncomment when endpoints are ready
    // this.getStreamLater();
  },
  mounted() {
    const podcastsContainer = this.$refs.podcastsContainer;
    podcastsContainer.addEventListener('wheel', (e) => {
      if (e.deltaX !== 0) {
        podcastsContainer.scrollLeft += e.deltaX;
        e.preventDefault();
      }
    });
  },
}
</script>

<style scoped>
.podcasts {
  display: flex;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 20px;
}

.podcasts-container {
  margin-top: 50px;
  width: 100vw;
  height: 300px;
  overflow: hidden;
}

.podcast {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.podcast-img {
  width: 160px;
  height: 160px;
  border-radius: 2%;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.podcast:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.podcast:hover .podcast-img {
  box-shadow: 0 0 15px rgba(0, 72, 255, 0.784);
}
</style>
