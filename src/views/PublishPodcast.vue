<!--
<template>
    <div class="publish">
        <div class="container pt-3 w-300">
            <div class="logo d-flex justify-content-left mb-4">
                <router-link to="/GoPodcast" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                <img src="../assets/logo_white.png" alt="logo" :style="{width: '50px', height: '50px'}">
                <h5 class="ms-2  text-white" style="font-size: 3rem;">GoPodcast</h5>
                </router-link>
            </div>
            
            <div class="contenedor-reducido">
                
                
                    <form class="register-login-form col-xl-5 mx-auto mt-4">
                        <div class="centered-container">
                            <h2>Portada del Podcast</h2>
                            <div class="mb-3"></div>
                            <image-cropper></image-cropper>
                            <div class="mb-3"></div>
                        </div>
                        <div class="form-group left mb-2">
                            <h4>Título del Podcast</h4>
                            <input v-model="title" type="text" class="form-control" id="title" required>
                        </div>
                        <div class="form-group left mb-2">
                            <h4>Resumen</h4>
                            <input v-model="summary" type="text" class="form-control" id="summary" required>
                        </div>
                        <div class="form-group left mb-2">
                            <h4>Descripción</h4>
                            <input v-model="description" type="text" class="form-control" id="description" required>
                        </div>
                        <div class="justify-content-center d-flex mt-3">
                            <button type="submit" class="btn-submit btn btn-dark mt-3">Subir Podcast</button>
                        </div>
                    </form>
                
                
            </div>
            
        </div>
    </div>
</template>
-->
<template>
    <div class="publish">
        <div class="container pt-3 w-300">
            <div class="logo d-flex justify-content-left mb-4">
                <router-link to="/GoPodcast" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                <img src="../assets/logo_white.png" alt="logo" :style="{width: '40px', height: '40px'}">
                <h5 class="ms-2  text-white" style="font-size: 2rem;">GoPodcast</h5>
                </router-link>
            </div>
            
            <div class="contenedor-reducido">
                <div class="row">
                <div class="col-md-6 mx-auto">
                    
                    <form @submit.prevent="publicarPodcast" class="register-login-form">
                    
                    <image-cropper v-model="imagenPortada" />
                    <div class="mb-3"></div>
                    
                    <div class="form-group">
                        <label for="titulo" class="label">Título</label>
                        <input type="text" class="form-control" id="titulo" v-model="titulo" required style="max-width: 100%;"/>
                    </div>
                    <div class="mb-3"></div>
                    
                    <div class="form-group">
                        <label for="resumen" class="label">Breve Resumen</label>
                        <input type="text" class="form-control" id="resumen" v-model="resumen" required style="width: 100%;"/>
                    </div>
                    <div class="mb-3"></div>
                    
                    <div class="form-group">
                        <label for="descripcion" class="label">Descripción del Podcast</label>
                        <textarea class="form-control" id="descripcion" v-model="descripcion" required style="width: 100%;"></textarea>
                    </div>
                    <div class="mb-3"></div>
                    
                    <div class="form-group">
                        <label for="etiquetas" class="label">Etiquetas</label>
                        <input type="tag" class="form-control" id="tags" v-model="tags" required style="width: 100%;"/>
                    </div>
                    <div class="mb-3"></div>
                    
                    <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;">Publicar Podcast</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
  </template>


<script>
import CropImage from '../components/CropImage.vue';

export default {
    components: {
        'image-cropper': CropImage,
    },
    data() {
        return {
            imagenPortada: null,
            titulo: "",
            resumen: "",
            descripcion: "",
            tags: []
        };
    },
    methods: {
        
    }
};
</script>

<style scoped>
.label {
  font-size: 17px;
  font-weight: bold; 
  margin-bottom: 10px;
}
</style>