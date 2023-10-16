<template>
    <div class="popular podcasts-container m-0 p-0">
      <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
        <div v-for="podcast in podcasts" :key="podcast.id" class="podcast">
          <img :src="'src/assets/'+podcast.image_url" :alt="podcast.title">
          <span class="name">{{ podcast.title }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import axios from 'axios'
  
  export default {
    data() {
      return {
        // Com encara no tenim l'endpoint, dummy data:
        podcasts: [
          { id: 1, image_url: 'podcasts/podcast4.jpg', title: 'podcast1' },
          { id: 2, image_url: 'podcasts/podcast3.jpg', title: 'podcast2' },
          { id: 3, image_url: 'podcasts/podcast2.jpg', title: 'podcast3' },
          { id: 4, image_url: 'podcasts/podcast1.jpg', title: 'podcast4' },
          { id: 5, image_url: 'podcasts/podcast4.jpg', title: 'podcast5' },
          { id: 6, image_url: 'podcasts/podcast3.jpg', title: 'podcast6' },
          { id: 7, image_url: 'podcasts/podcast2.jpg', title: 'podcast2' },
          { id: 8, image_url: 'podcasts/podcast1.jpg', title: 'podcast3' },
          { id: 9, image_url: 'podcasts/podcast4.jpg', title: 'podcast4' },
          { id: 10, image_url: 'podcasts/podcast5.jpg', title: 'podcast5' },
          { id: 11, image_url: 'podcasts/podcast6.jpg', title: 'podcast6' },
        ],
      };
    },
    getPopulars () {
      const pathPodcasts = 'http://localhost:8000/podcasts/'
      const pathPopulars = 'http://localhost:8000/populars/'

      axios.get(pathPopulars)
        .then((res) => {
          var podcasts = res.data.filter((podcast) => {
            return podcast.id != null
          })
          console.log(podcasts)
          var promises = []
          for (let i = 0; i < podcasts.length; i++) {
            const promise = axios.get(pathPodcasts + podcasts[i].title)
              .then((resPodcast) => {
                delete podcasts[i].title
                console.log('resComp')
                console.log(resPodcast.data)
                podcasts[i].info = {
                  'description': resPodcast.data.description,
                  'category': resPodcast.data.category
                  // 'image': resPodcast.data.image_url
                }
              })
              .catch((error) => {
                console.error(error)
              })
            console.log('Pushed promise: ')
            console.log(promise)
            promises.push(promise)
          }
          Promise.all(promises).then((_) => {
            console.log(podcasts)
            this.podcasts = podcasts
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    created () {
      // Descomentar cuando tengamos los endpoints listos
      // this.getPopulars() 
    },
    mounted() {
      const podcastsContainer = this.$refs.podcastsContainer;
      podcastsContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          podcastsContainer.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      });
    },
  };
  </script>
  
  <style>
  
  .popular .podcast img {
    width: 150px;
    height: 150px;
    border-radius: 5%;
    margin-bottom: 10px;
  }

  .popular .podcast:hover img {
    box-shadow: 0 0 15px rgba(144, 0, 255, 0.784);
  }

  .popular .podcast{
    margin-left: 30px;
  }
  </style>
  