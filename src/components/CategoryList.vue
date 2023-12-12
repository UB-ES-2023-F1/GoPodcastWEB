<template>
  <div class="categories-container">
    <h2>Browse Categories</h2>
    <div class="categories overflow-x-auto overflow-x-hidden" ref="categoriesContainer">
      <div v-for="category in categories" :key="category.title" class="category"
        @click="this.currentCategory = category.title ; getPodcasts()">
        <img :src="category.img" :alt="category.title">
        <span class="name text-center">{{ category.title }}</span>
      </div>
    </div>
  </div>
  <div class="podcasts-container" v-if="currentCategory">
    <h4>{{ currentCategory }}</h4>
    <div class="podcasts">
      <div v-for="podcast in podcasts" :key="podcast.id" class="podcast">
        <a :href="'/visualize/' + podcast.id">
          <img :src="podcast.img" :alt="podcast.name"  v-if="podcast.img">
        </a>
        <span class="name text-center">{{ podcast.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: [],
      podcasts: [],
      podcastsCategory: [],
      currentCategory: null,
    };
  },
  methods: {
    async getCategories() {
      console.log('Getting categories')
      const pathCategories = import.meta.env.VITE_API_URL + '/categories'

      try {
        const response = await axios.get(pathCategories)
        this.categories = response.data
      } catch (e) {
        console.log(e)
      }
      this.getCovers()
    },
    getCovers() {
      console.log('Getting covers')
      this.categories.forEach(category => {
        const pathCover = import.meta.env.VITE_API_URL + category.image_url

        axios.get(pathCover, { responseType: "blob" })
          .then(async (res) => {
            const base64data = await this.blobToData(res.data)
            category.img = base64data
          })
          .catch((error) => {
            console.log(error)
          })
      })
    },
    getCover(podcast) {
      const pathCover = import.meta.env.VITE_API_URL + '/podcasts/' + podcast.id + '/cover'

      axios.get(pathCover, { responseType: "blob" })
        .then(async (res) => {
            const base64data = await this.blobToData(res.data)
            podcast.img = base64data
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
    getCoversv2() {
        console.log('Getting covers')
        this.podcasts.forEach(podcast => {
            const pathCover = import.meta.env.VITE_API_URL + podcast.cover

            axios.get(pathCover, { responseType: "blob" })
            .then(async (res) => {
                const base64data = await this.blobToData(res.data)
                podcast.img = base64data
            })
            .catch((error) => {
                console.log(error)
            })
        })
    },
    getPodcasts() {
      console.log('Getting podcasts')
      const pathPodcasts = import.meta.env.VITE_API_URL + '/podcasts/categories/' + this.currentCategory

      axios.get(pathPodcasts)
        .then((res) => {
          this.podcasts = res.data
          console.log(this.podcasts)
          this.getCoversv2()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /*
    updatePodcasts() {
      console.log('Updating podcasts by category: ' + this.currentCategory)
      this.podcastsCategory = this.podcasts.filter(podcast => podcast.category === this.currentCategory)
      if(this.podcastsCategory.length != 0){
        for(let podcast of Object.values(this.podcastsCategory)){
          this.getCover(podcast)
        }
      }
    }*/
  },
  created() {
    // Descomentar cuando tengamos los endpoints listos
    this.getCategories()
    this.getPodcasts()
  },
  mounted() {
    const categoriesContainer = this.$refs.categoriesContainer;
    categoriesContainer.addEventListener('wheel', (e) => {
      if (e.deltaX !== 0) {
        categoriesContainer.scrollLeft += e.deltaX;
        e.preventDefault();
      }
    });
  },
};
</script>

<style>
.categories {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 25px 30px; 
  width: 70%;
  overflow: auto;
  white-space: nowrap;
}

.categories-container {
  overflow-x: auto;
  white-space: nowrap;
}

.category {
  position: relative;
  display: flex;
  flex-direction: column;
  /* margin-left: 30px; */
  margin-right: 30px;
  padding-bottom: 10px;
  align-items: center;
}

.category img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.category.name {
  font-size: 18px;
  font-weight: 600;
}

.category:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.category:hover img {
  box-shadow: 0 0 15px rgba(162, 0, 255, 0.784);
}
</style>
