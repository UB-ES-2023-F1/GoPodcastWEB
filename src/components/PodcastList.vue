<template>
    <div class="podcasts-container m-0 p-0">
      <div class="podcasts overflow-x-auto flex-nowrap overflow-x-hidden" ref="podcastsContainer">
        <div v-for="podcast in podcasts" :key="podcast.id" class="podcast">
          <img :src="'src/assets/'+podcast.image_url" :alt="podcast.title">
          <span class="name">{{ podcast.title }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        podcasts: [
          { id: 1, image_url: 'podcasts/podcast1.jpg', title: 'podcast1' },
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
    mounted() {
      // Obtener el contenedor de los podcasts
      const podcastsContainer = this.$refs.podcastsContainer;
  
      // Configurar un evento de desplazamiento horizontal cuando se desplace el ratón
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
    margin-left: 30px;
  }
  
  .podcast img {
    width: 200px;
    height: 200px;
    border-radius: 5%;
    margin-bottom: 10px;
  }
  
  .podcast .name {
    font-size: 18px;
    font-weight: 600;
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
  