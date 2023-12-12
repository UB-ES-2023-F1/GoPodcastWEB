<template>
    <div class="publish">
        <div class="container">
            <div class="logo d-flex justify-content-left mb-4 pt-3">
                <router-link to="/" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                    <img src="../assets/logo_white.png" alt="logo" :style="{ width: '40px', height: '40px' }">
                    <h5 class="ms-2  text-white" style="font-size: 2rem;">GoPodcast</h5>
                </router-link>
            </div>
            <div class="row ">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="contenedor-reducido">
                        <div class="row mb-5 mt-3">
                            <div class="col-md-6 mx-auto">
                                <form @submit.prevent="publicarPodcast" class="publish-form">
                                
                                    <image-cropper v-model="image" @image-cropped="handleImageCropped" />
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="titulo" class="label">Title</label>
                                        <input type="text" class="form-control" id="titulo" v-model="title" required style="max-width: 100%;"/>
                                    </div>
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="resumen" class="label">Short summary</label>
                                        <input type="text" class="form-control" id="resumen" v-model="summary" required style="width: 100%;"/>
                                    </div>
                                    <div class="mb-3"></div>
                                
                                    <div class="form-group">
                                        <label for="descripcion" class="label">Podcast description</label>
                                        <textarea class="form-control" id="descripcion" v-model="description" required style="width: 100%;"></textarea>
                                    </div>
                                    <div class="mb-3"></div>
                                    <div>
                                        <h2>Selecciona una categoría</h2>
                                        <div class="categorias-container">
                                            <button class="btn-category"
                                                v-for="categoria in categories"
                                                :key="categoria.title"
                                                :class="{ 'selected': categoria.title === this.category }"
                                                @click="seleccionarCategoria(categoria.title)"
                                            >
                                                {{ categoria.title }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="mb-3"></div>
                                    <button type="submit" class="btn-submit-bold btn btn-dark mt-3" style="width: 100%;"  @click="onSubmit" :disabled="loading">Publish Podcast</button>
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
import CropImage from '/src/components/CropImage.vue';
import axios from 'axios';

export default {
    components: {
        'image-cropper': CropImage,
    },
    data() {
        return {
            image: null,
            title: null,
            summary: null,
            description: null,
            category: null,
            categories: [],
            loading: false,
        };
    },
    methods: {
        handleImageCropped(blob) {
            this.image = blob;
        },
        onSubmit() {
            if (this.loading){
                return;
            }

            this.loading = true;

            var formData = new FormData();

            formData.append("cover", this.image);
            formData.append("name", this.title)
            formData.append("summary", this.summary)
            formData.append("description", this.description)
            formData.append("category", this.category)

            const parameters = {
                cover: this.image,
                name: this.title,
                summary: this.summary,
                descripcion: this.description,
                category: this.category
            }


            const axiosConfig = {
                withCredentials: true
            }

            console.log(parameters)
            const path = import.meta.env.VITE_API_URL + '/podcasts'
            axios.post(path, formData, axiosConfig, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    alert('Podcast Posted')
                    this.backToHome()
                })
                .catch((error) => {
                    if(parameters.cover == null){
                        alert('Añadir imagen de podcast')
                        console.error(error)
                    }else{
                        alert('Error posting podcast')
                        console.error(error)
                    }

                    
                })
                .finally(() => {
                    this.loading = false; 
                });
        },

        backToHome() {
            this.$router.push('/')
        },
        getCategories() {
            const path = import.meta.env.VITE_API_URL + '/categories'
            axios.get(path).then((res) => {
                this.categories = res.data
            })
            .catch((error)=> {
                alert('Error getting categories')
                console.error(error)
            })
        },
        seleccionarCategoria(tituloCategoria) {
            this.category = tituloCategoria;
        },
    },
    created(){
        this.getCategories()
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
/*
.btn-category {
  padding: 0.6rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  background-color: var(--category-color);
  border: 1px solid var(--category-border-color);
  color: var(--category-text-color);
  cursor: pointer;
  font-weight: normal; 
}


.btn-category.selected {
  background-color: var(--category-selected-color);
  color: #fff;
}
*/

.btn-category {
  padding: 0.25rem 0.85rem; 
  border-radius: 8px;
  font-size: 1rem;
  background-color: #e0e0e0; 
  border: 1px solid #ccc;
  color: #333;
  cursor: pointer;
  font-weight: normal;
  margin: 0.1rem;
}

.btn-category.selected {
  background-color: #646cff;
  color: #fff; 
}
.categorias-container {
  text-align: center; /* Centra los botones */
}

.categorias-container button {
  margin: 7px; /* Agrega un pequeño margen entre los botones */
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

