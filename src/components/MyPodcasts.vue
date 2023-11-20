<template>
  <div class="m-0 p-0">
    <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
      <div v-for="podcast in podcasts" :key="podcast.id" class="podcast" @click="goToPodcast(podcast.id)">
        <a :href="'/visualize/' + podcast.id">
          <img :src="'../src/assets/' + podcast.image_url" :alt="podcast.title" class="podcast-img">
        </a>
        <span class="title">{{ podcast.title }}</span>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      // Dummy data until we have the endpoint:
      podcasts: [
        { id: 11, image_url: 'podcasts/podcast6.jpg', title: 'A Christmas Tragedy' }
      ]
    };
  },
  methods: {
    async getMyPodcasts() {
      const pathPodcasts = import.meta.env.VITE_API_URL + '/my_podcasts';

      try {
        const res = await axios.get(pathPodcasts);
        this.podcasts = res.data.filter(podcast => podcast.id != null);
        console.log(this.podcasts);
      } catch (error) {
        console.error(error);
      }
    },
    goToPodcast(podcastId) {
      this.$router.push(`/visualize/${podcastId}`);
    }
  },
  created() {
    // Uncomment when endpoints are ready
    // this.getMyPodcasts();
  },
  mounted() {
    const podcastsContainer = this.$refs.podcastsContainer;
    podcastsContainer.addEventListener('wheel', (e) => {
      if (e.deltaX !== 0) {
        podcastsContainer.scrollLeft += e.deltaX;
        e.preventDefault();
      }
    });
  }
};
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
