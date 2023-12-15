<template>
  <div class="container-fluid m-0 p-0 h-100">
    <div class="row w-100 m-0">
      <Sidebar />
      <div class="publish col-lg-10 col-md-9 col-sm-12 p-0">
        <div class="publish-content p-5">
          <div class="form-content">
            <h4 class="ms-2 text-center text-white" style="font-size: 2rem;">Podcast Name</h4>
            <div class="mb-4 mt-5">
              <h5 class="text-center text-white" style="font-size: 1.4rem;">Publish a new episode</h5>
            </div>
            <div class="row">
              <div class="col-md-6 mx-auto">
                <form @submit.prevent="onSubmit" class="publish-form">
                  <label for="audio" class="label">Upload your audio</label>
                  <input type="file" class="form-control" ref="audio" id="audio" @change="onFileChange" required
                    style="max-width: 100%;" />

                  <div class="mb-3"></div>

                  <div class="form-group">
                    <label for="title" class="label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="title" required
                      style="max-width: 100%;" />
                  </div>
                  <div class="mb-3"></div>

                  <div class="form-group">
                    <label for="description" class="label">Brief description</label>
                    <input type="text" class="form-control" id="description" v-model="description" required
                      style="width: 100%;" />
                  </div>
                  <div class="mb-3"></div>

                  <div class="form-group">
                    <label for="etiquetas" class="label">Tags</label>
                    <input
                        type="text"
                        class="form-control"
                        id="tags"
                        v-model="tagInput"
                        @input="handleTagInput"
                    />
                    <div class="mb-3"></div>
                    <div class="tags-container">
                    <div class="tag" v-for="(tag, index) in tags" :key="index" >
                        {{ tag }}
                    </div>
                    </div>
                  </div>
                  <div class="mb-3"></div>

                  <!-- <image-cropper v-model="episodeImage" /> -->

                  <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;" :disabled="loading">Post Episode</button>
                  <div v-if="loading" class="loading-overlay">
                    <img src="/src/assets/kOnzy.gif" alt="Loading..." style="width: 2em; height: 2em;"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import CropImage from '../components/CropImage.vue';

export default {
  components: {
    Sidebar,
    'image-cropper': CropImage,
  },
  data() {
    return {
      episodeImage: null,
      title: "",
      description: "",
      tags: [],
      audio: null,
      tagInput: null,
      loading: false
    };
  },
  methods: {
    onSubmit() {
      if (this.loading){
        return;
      }

      this.loading = true;

      for (let i = 1; i < this.tags.length; i++) {
        this.tags[i] = '#' + this.tags[i];
      }
      this.tags = [this.tags.join('')]
      console.log("TAGS", this.tags)

      var formData = new FormData();
      
      formData.append('audio', this.audio);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('tags', this.tags);

      const axiosConfig = {
        headers: {
              Authorization: "Bearer " + this.$store.state.access_token,
              "Content-Type": "Multipart/form-data",
            },
      }

      // formData.append('episodeImage', this.episodeImage);
      const path = import.meta.env.VITE_API_URL + '/podcasts/' + this.$route.params.id + '/episodes' 
      
      axios.post(path, formData, axiosConfig)
        .then((response) => {
          console.log(response);
          alert('Episode published successfully');
          this.backToHome()
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false; 
        });
    },
    onFileChange() {
      this.audio = this.$refs.audio.files[0]
    },
    handleTagInput() {
      const tags = this.tagInput.split(/[, ]+/).filter(tag => tag.trim() !== '');
      this.tags = tags;
    },
    backToHome() {
      this.$router.push('/')
    },
  },
};
</script>
  
<style scoped>
.publish {
  height: 100%;
}

.publish-content {
  background-color: rgba(0, 0, 0, 0.42);
  height: max-content;
  width: 100%;
  margin: 0;
  padding: 0;
}

.form-content {
  height: 120vh;
}

.container-fluid {
  background-color: #1C1C1C;
  height: 100%;
}

.label {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
}

.publish .btn-submit-bold {
  font-size: 1.2rem;
  font-weight: normal;
  border-radius: 10px;
  padding: 10px;
  background-color: #000000;
  border: none;
  color: #fff;
}

.publish .btn-submit-bold:hover {
  background-color: #ffffff;
  color: #000000;
  transition: all 0.35s ease-in-out;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #646cff;
  color: #fff;
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Fondo semitransparente */
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  