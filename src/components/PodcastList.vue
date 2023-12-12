<template>
  <div class="podcasts-container m-0 p-0">
    <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
      <div v-for="podcast in podcastList" :key="podcast.id" class="podcast">
        <a :href="'/visualize/' + podcast.id">
          <img :src="podcast.img" :alt="podcast.name" v-if="podcast.img">
        </a>
        <span class="name">{{ podcast.name }}</span>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

// import axios from 'axios'

export default {
  props: {
    podcastList: {
      type: Array,
      default: []
    }
  },
  watch: {
    podcastList() {
      this.getCovers()
    }
  },
  data() {
    return {
      imagePath: '../assets/cache/podcast_covers/',
      imgTest: null
    }
  },
  methods: {
    getCovers() {
      this.podcastList.forEach(podcast => {
        const pathCovers = import.meta.env.VITE_API_URL + '/podcasts/' + podcast.id + '/cover'

        axios.get(pathCovers, { responseType: "blob" })
          .then(async (res) => {
            const base64data = await this.blobToData(res.data)
            podcast.img = base64data
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
    // Descomentar cuando tengamos los endpoints listos
    this.getCovers()
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
};
</script>
  
<style>
.podcasts {
  display: flex;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 20px;
  justify-content: flex-start;
  width: 80%; /* Ajusta según tus necesidades */
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
</style>
  
