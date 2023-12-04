<template>
  <div class="categories-container">
    <h2>Browse Categories</h2>
    <div class="categories">
      <div v-for="category in categories" :key="category.title" class="category" ref="categoriesContainer"
        @click="this.currentCategory = category.title ; updatePodcasts()">
        <img :src="category.img" :alt="category.title">
        <span class="name text-center">{{ category.title }}</span>
      </div>
    </div>
  </div>
  <div class="podcasts-container" v-if="currentCategory">
    <h4>{{ currentCategory }}</h4>
    <div class="podcasts">
      <div v-for="podcast in podcastsCategory" :key="podcast.id" class="podcast">
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
      categories: [
        // {
        //   title: 'Sports',
        //   img: null
        // },
        // {
        //   title: 'News',
        //   img: null
        // },
        // {
        //   title: 'Music',
        //   img: null
        // }
      ],
      podcasts: [
        // {
        //   title: 'Podcast 1',
        //   category: 'Sports',
        //   img: null
        // },
        // {
        //   title: 'Podcast 2',
        //   category: 'News',
        //   img: null
        // },
        // {
        //   title: 'Podcast 3',
        //   category: 'News',
        //   img: null
        // },
        // {
        //   title: 'Podcast 4',
        //   category: 'Music',
        //   img: null
        // },
        // {
        //   title: 'Podcast 5',
        //   category: 'Music',
        //   img: null
        // },
        // {
        //   title: 'Podcast 6',
        //   category: 'Music',
        //   img: null
        // }
      ],
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
    getPodcasts() {
      console.log('Getting podcasts')
      const pathPodcasts = import.meta.env.VITE_API_URL + '/podcasts'

      axios.get(pathPodcasts)
        .then((res) => {
          this.podcasts = res.data
          console.log(this.podcasts)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updatePodcasts() {
      console.log('Updating podcasts by category: ' + this.currentCategory)
      this.podcastsCategory = this.podcasts.filter(podcast => podcast.category === this.currentCategory)
      if(this.podcastsCategory.length != 0){
        for(let podcast of Object.values(this.podcastsCategory)){
          this.getCover(podcast)
        }
      }
    }
  },
  created() {
    // Descomentar cuando tengamos los endpoints listos
    this.getCategories()
    this.getPodcasts()
  }
};
</script>

<style>
.categories {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  width: 80vw;
  height: 180px;
  overflow: hidden;
  flex-flow: row wrap;
  /* width: 80vw; */
}

.category {
  position: relative;
  display: flex;
  flex-direction: column;
  /* margin-left: 30px; */
  margin-right: 30px;
  padding-bottom: 5em;
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
