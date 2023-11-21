<template>
  <div class="categories-container">
    <h2>Browse Categories</h2>
    <div class="categories">
      <div v-for="category in categories" :key="category.title" class="category" ref="categoriesContainer">
        <img :src="category.img" :alt="category.title">
        <span class="name text-center">{{ category.title }}</span>
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
    };
  },
  methods: {
    async getCategories() {
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
      // this.podcastList.forEach(podcast => {
      //   const pathCovers = import.meta.env.VITE_API_URL + '/podcasts/' + podcast.id + '/cover'

      //   axios.get(pathCovers, { responseType: "blob" })
      //     .then(async (res) => {
      //       const base64data = await this.blobToData(res.data)
      //       podcast.img = base64data
      //     })
      //     .catch((error) => {
      //       console.error(error)
      //     })
      // });

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
    this.getCategories()
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
