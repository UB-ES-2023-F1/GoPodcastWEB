<template>
  <div class="podcasts-container m-0 p-0">
    <div class="podcasts" id="podcasts-container">
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
    makeDraggable() {
      const ele = document.getElementById('podcasts-container');
      ele.style.cursor = 'grab';

      let pos = { top: 0, left: 0, x: 0, y: 0 };

      const mouseDownHandler = function (e) {
          ele.style.cursor = 'grabbing';
          ele.style.userSelect = 'none';

          pos = {
              left: ele.scrollLeft,
              top: ele.scrollTop,
              // Get the current mouse position
              x: e.clientX,
              y: e.clientY,
          };

          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
          // How far the mouse has been moved
          const dx = e.clientX - pos.x;
          const dy = e.clientY - pos.y;

          // Scroll the element
          ele.scrollTop = pos.top - dy;
          ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
          ele.style.cursor = 'grab';
          ele.style.removeProperty('user-select');

          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
      };

      // Attach the handler
      ele.addEventListener('mousedown', mouseDownHandler);
    }
  },
  created() {
    // Descomentar cuando tengamos los endpoints listos
    this.getCovers()
  },
  mounted() {
    
    this.makeDraggable()
  }
};
</script>
  
<style>
.podcasts {
  display: flex;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 20px;
  justify-content: flex-start;
  width: 82%;/* Ajusta según tus necesidades */
  overflow: auto;
  white-space: nowrap;
  
  /* width: 80vw; */
}

.podcasts::-webkit-scrollbar{
  display: none;
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
  