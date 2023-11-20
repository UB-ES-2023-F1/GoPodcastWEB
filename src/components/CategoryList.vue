<template>
    <div class="categories-container">
    <h2>Browse Categories</h2>
    <div class="categories">
        <div v-for="category in categories" :key="category.id" class="category" ref="categoriesContainer">
            <img :src="'src/assets/'+category.image_url" :alt="category.title">
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
            // Com encara no tenim l'endpoint, dummy data:
            categories : [
                // { id: 1, image_url: 'categories/categorySport.jpg', title: 'Pop' },
                // { id: 2, image_url: 'categories/categoryRanking.jpg', title: 'Suspense' },
                // { id: 3, image_url: 'categories/categoryEntertainment.jpg', title: 'Historia' },
                // { id: 4, image_url: 'categories/categorySport.jpg', title: 'Sport' },
                // { id: 5, image_url: 'categories/categoryMusic.jpg', title: 'Music' },
                // { id: 6, image_url: 'categories/categoryEntertainment.jpg', title: 'Entertainment' },
                // { id: 7, image_url: 'categories/categoryRanking.jpg', title: 'Ranking' },
                // { id: 8, image_url: 'categories/categorySport.jpg', title: 'Sport' },
                // { id: 9, image_url: 'categories/categoryMusic.jpg', title: 'Music' },
                // { id: 10, image_url: 'categories/categoryEntertainment.jpg', title: 'Entertainment' },
                // { id: 11, image_url: 'categories/categoryRanking.jpg', title: 'Ranking' },
            ],
        };
    },
    methods: {
      getCategories () {
        const pathCategories = import.meta.env.VITE_API_URL + '/categories'
  
        axios.get(pathCategories)
          .then((res) => {
            var categories = res.data.filter((category) => {
              return category.id != null
            })
            this.categories = categories
          })
          .catch((error) => {
            console.error(error)
          })
      },
    },
    created () {
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
  
  .category{
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
