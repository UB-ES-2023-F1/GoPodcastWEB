<template>
    <div class="publish">
        <div class="container">
            <div class="logo d-flex justify-content-left mb-4 pt-3">
                <router-link to="/" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                <img src="../assets/logo_white.png" alt="logo" :style="{width: '40px', height: '40px'}">
                <h5 class="ms-2  text-white" style="font-size: 2rem;">GoPodcast</h5>
                </router-link>
            </div>
            
            <div class="row ">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="contenedor-reducido">
                        <div class="row mb-5 mt-3">
                            <div class="col-md-6 mx-auto">
                                <form @submit.prevent="publicarPodcast" class="publish-form">
                                
                                    <image-cropper v-model="imagenPortada" @image-cropped="handleImageCropped" />
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="titulo" class="label">Title</label>
                                        <input type="text" class="form-control" id="titulo" v-model="titulo" required style="max-width: 100%;"/>
                                    </div>
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="resumen" class="label">Short summary</label>
                                        <input type="text" class="form-control" id="resumen" v-model="resumen" required style="width: 100%;"/>
                                    </div>
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="descripcion" class="label">Podcast description</label>
                                        <textarea class="form-control" id="descripcion" v-model="descripcion" required style="width: 100%;"></textarea>
                                    </div>
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="etiquetas" class="label">Tags</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="etiquetas"
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
                                
                                    <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;"  @click="onSubmit">Publish Podcast</button>
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
import CropImage from '../components/CropImage.vue';
import axios from 'axios';

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
            tags: [], 
            tagInput: null
        };
    },
    methods: {
        handleImageCropped(blob){
            this.imagenPortada = blob;
        },
        onSubmit() {
            const tags = this.tagInput.split(/[, ]+/).filter(tag => tag.trim() !== '');
            console.log('Etiquetas:', tags);
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
                this.backToHome()
            })
            .catch((error) => {
                alert('Error posting podcast')
                console.error(error)
            })  
        },
        handleTagInput() {
            const tags = this.tagInput.split(/[, ]+/).filter(tag => tag.trim() !== '');
            this.tags = tags;
        },

/*            FUTURA IMPLEMENTACIÓN:
onSubmit() {
    const formData = new FormData();
    formData.append('imagenPortada', this.imagenPortada, 'imagen.png'); // 'imagen.png' es el nombre del archivo en el servidor

    // Luego, haz la solicitud HTTP para cargar la imagen
    const path = 'http://localhost:5173/podcast'; // Modifica esto por tu endpoint correcto
    axios.post(path, formData)
      .then((res) => {
        alert('Podcast Posted');
        this.backToHome();
      })
      .catch((error) => {
        alert('Error posting podcast');
        console.error(error);
      });
},
}*/
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

