<template>
    <div class="podcasts-container m-0 p-0">
      <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
        <div v-for="podcast in podcasts" :key="podcast.id" class="podcast">
          <a :href="'/visualize/' + podcast.id">
            <img :src="'src/assets/'+podcast.image_url" :alt="podcast.title">
          </a>
          <span class="name">{{ podcast.title }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import axios from 'axios'

  export default {
    props: [podcastList],
    data() {
      return {
        // Com encara no tenim l'endpoint, dummy data:
        podcasts: [
          { id: 1, image_url: 'podcasts/podcast1.jpg', title: 'podcast1', summary: '', description: '', list_of_episodes: [/*{ id: 1, nombre: '', url: ''}*/], author: '' },
          { id: 2, image_url: 'podcasts/podcast2.jpg', title: 'podcast2' },
          { id: 3, image_url: 'podcasts/podcast3.jpg', title: 'podcast3' },
          { id: 4, image_url: 'podcasts/podcast4.jpg', title: 'podcast4' },
          { id: 5, image_url: 'podcasts/podcast5.jpg', title: 'podcast5' },
          { id: 6, image_url: 'podcasts/podcast6.jpg', title: 'podcast6' },
          { id: 7, image_url: 'podcasts/podcast2.jpg', title: 'podcast2' },
          { id: 8, image_url: 'podcasts/podcast3.jpg', title: 'podcast3' },
          { id: 9, image_url: 'podcasts/podcast4.jpg', title: 'podcast4' },
          { id: 10, image_url: 'podcasts/podcast5.jpg', title: 'podcast5' },
          { id: 11, image_url: 'podcasts/podcast6.jpg', title: 'podcast6' },
        ],
      };
    },
    getPodcasts () {
      const pathPodcasts = 'http://localhost:8000/podcasts/'

      axios.get(pathPodcasts)
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
      // this.getPodcasts() 
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
  