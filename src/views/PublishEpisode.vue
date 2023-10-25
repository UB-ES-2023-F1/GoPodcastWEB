<template>
    <div class="container-fluid m-0 p-0">
      <div class="row w-100 m-0">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Main content-->
        <div class="publish col-lg-10 col-md-9 col-sm-12 p-0">
            <div class="publish-content p-5">
                <h4 class="ms-2 text-center text-white" style="font-size: 2rem;">Podcast Name</h4>
            <div class=" mb-4 mt-5">
                
                <h5 class="text-center text-white" style="font-size: 1.4rem;">Publish a new episode</h5>
            </div>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    
                    <form @submit.prevent="publicarPodcast" class="publish-form">
                    
                    <label for="audio" class="label">Upload your audio</label>
                    <input type="file" class="form-control" id="audio" v-on:change="onFileChange" required style="max-width: 100%;"/>

                    <div class="mb-3"></div>
                    
                    <div class="form-group">
                        <label for="titulo" class="label">Title</label>
                        <input type="text" class="form-control" id="titulo" v-model="titulo" required style="max-width: 100%;"/>
                    </div>
                    <div class="mb-3"></div>
                    
                    <div class="form-group">
                        <label for="resumen" class="label">Brief description</label>
                        <input type="text" class="form-control" id="resumen" v-model="resumen" required style="width: 100%;"/>
                    </div>
                    <div class="mb-3"></div>
                    
                    
                    <div class="form-group">
                        <label for="etiquetas" class="label">Tags</label>
                        <input type="tag" class="form-control" id="tags" v-model="tags" required style="width: 100%;"/>
                    </div>
                    <div class="mb-3"></div>
                    <image-cropper v-model="imagenPortada" />
                    
                    <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;">Publicar Podcast</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </template>


<script>
import Sidebar from '../components/Sidebar.vue';
import CropImage from '../components/CropImage.vue';

export default {
    components: {
        Sidebar,
        'image-cropper': CropImage,
    },
    data() {
        return {
            imagenPortada: null,
            titulo: "",
            resumen: "",
            descripcion: "",
            tags: [],
            audio: null
        };
    },
    methods: {
        
    }
};
</script>

<style scoped>
.publish{
    height: max-content;
}

.publish .publish-content{
    background-color: rgba(0, 0, 0, 0.42);
    height: max-content;
    width: 100%;
    margin: 0;
    padding: 0;
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
</style>

