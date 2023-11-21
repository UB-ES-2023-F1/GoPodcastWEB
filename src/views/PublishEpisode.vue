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

                  <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;">Post Episode</button>
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
      podcastId: '4375bc80-362e-4869-acd8-800f313e8b38', // TODO: get podcast id from url
      tagInput: null
    };
  },
  methods: {
    onSubmit() {
      const tags = this.tagInput.split(/[, ]+/).filter(tag => tag.trim() !== '');
      console.log('Etiquetas:', tags);

      var formData = new FormData();
      
      formData.append('audio', this.audio);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('tags', this.tags);

      const axiosConfig = {
        withCredentials: true
      }

      // formData.append('episodeImage', this.episodeImage);
      const path = import.meta.env.VITE_API_URL + '/podcasts/' + this.podcastId + '/episodes' 
      
      axios.post(path, formData, axiosConfig, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response);
          alert('Episode published successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFileChange() {
      this.audio = this.$refs.audio.files[0]
    },
    handleTagInput() {
      const tags = this.tagInput.split(/[, ]+/).filter(tag => tag.trim() !== '');
      this.tags = tags;
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
</style>
  