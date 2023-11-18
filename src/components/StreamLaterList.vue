<template>
    <div class="m-0 p-0">
      <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
        <div v-for="episode in episodes_dummy" :key="episode.id" class="podcast">
          <a :href="'/visualize/' + episode.id">
            <img :src="'../src/assets/'+episode.podcast.image_url" :alt="episode.title">
          </a>
          <span class="name">{{ episode.title }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import axios from 'axios'

  export default {
    data() {
      return {
        episodes: [],
         // Com encara no tenim l'endpoint, dummy data:
        episodes_dummy: [
          { id: 1, title: "EP1: Into the Woods", description: "", id_podcast: 4, 
            podcast: { id: 4, title: "White Xmas", image_url: "podcasts/podcast4.jpg" }},
          { id: 2, title: "EP2: White Xmas", description: "", id_podcast: 6,
            podcast: { id: 6, title: "White Xmas", image_url: "podcasts/podcast6.jpg" }},
          { id: 3, title: "EP3: Destroy Santa!!", description: "", id_podcast: 6,
            podcast: { id: 6, title: "White Xmas", image_url: "podcasts/podcast6.jpg" }},
          { id: 4, title: "EP7: Silly Lily", description: "", id_podcast: 5,
            podcast: { id: 5, title: "Lily Adventures", image_url: "podcasts/podcast5.jpg" }},
          // { id: 5, title: "White Xmas", description: "", id_podcast: 5,
          //   podcast: { id: 5, title: "White Xmas", image_url: "podcasts/podcast6.jpg" }},
          // { id: 6, title: "White Xmas", description: "", id_podcast: 5,
          //   podcast: { id: 5, title: "White Xmas", image_url: "podcasts/podcast1.jpg" }},
          // { id: 7, title: "White Xmas", description: "", id_podcast: 5,
          //   podcast: { id: 5, title: "White Xmas", image_url: "podcasts/podcast1.jpg" }},
          // { id: 8, title: "White Xmas", description: "", id_podcast: 5,
          //   podcast: { id: 5, title: "White Xmas", image_url: "podcasts/podcast1.jpg" }},
        ]

       
        // podcasts: [
        //   { id: 9, image_url: 'podcasts/podcast4.jpg', title: 'podcast4' },
        //   { id: 10, image_url: 'podcasts/podcast5.jpg', title: 'podcast5' },
        //   { id: 11, image_url: 'podcasts/podcast6.jpg', title: 'podcast6' },
        // ],
      };
    },
    getStreamLater () {
      const pathStreamLater = 'http://localhost:8000/stream_later'
      const pathEpisodes = 'http://localhost:8000/podcasts/'

      axios.get(pathPodcasts)
        .then((res) => {
          var episodes = res.data.filter((episode) => {
            return episode.id != null
          })
          console.log(episodes)
          var promises = []
          for (let i = 0; i < episodes.length; i++) {
            const promise = axios.get(pathPodcasts + episodes[i].id)
              .then((resPodcast) => {
                episodes[i].podcast = {
                  'podcast_title': resPodcast.data.title,
                  'podcast_image_url': resPodcast.data.image_url
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
            console.log(episodes)
            this.episodes = episodes
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    created () {
      // Descomentar cuando tengamos los endpoints listos
      // this.getStreamLater()
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
    margin-left: 20px;
  }
  
  .podcast img {
    width: 160px;
    height: 160px;
    border-radius: 2%;
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
  