<template>
    <div class="publish">
        <div class="container pt-3 w-300">
            <div class="logo d-flex justify-content-left mb-4">
                <router-link to="/" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                <img src="../assets/logo_white.png" alt="logo" :style="{width: '40px', height: '40px'}">
                <h5 class="ms-2  text-white" style="font-size: 2rem;">GoPodcast</h5>
                </router-link>
            </div>
            <div class="contenedor-reducido">
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        
                        <form @submit.prevent="publicarPodcast" class="publish-form">
                        
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
                        
                            <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;"  @click="onSubmit">Publicar Podcast</button>
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
            titulo: null,
            resumen: null,
            descripcion: null,
            tags: []
        };
    },
    methods: {
        onSubmit() {
            const parameters = {
                imagenPortada: this.imagenPortada,
                titulo: this.titulo,
                resumen: this.resumen,
                descripcion: this.descripcion,
                tags: this.tags
            }
            console.log(parameters)
            const path = 'http://localhost:5173/podcast' // Descomentar y modificar por el endpoint correcto
            axios.post(path, parameters)
            .then((res) => {
                alert('Podcast Posted')
                this.backToHome()
            })
            .catch((error) => {
                alert('Error posting podcast')
                console.error(error)
            })  
        },
        backToHome() {
            this.$router.push('/')
        }
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

