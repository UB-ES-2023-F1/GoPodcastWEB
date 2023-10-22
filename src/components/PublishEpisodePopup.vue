<template>
    <div class="publish-popup">
      <div class="popup-content">
        <div class="popup-header">
          <h2>Publicar Episodio</h2>
          <button @click="cerrarVentana" class="close-button">X</button>
        </div>
        <div class="popup-body">
          <form @submit.prevent="publicarEpisodio" class="publish-form">
            <button class="btn-submit btn btn-dark mt-3 h-100 fs-6">
              <input type="file" @change="handleImageChange" accept="image/*" style="display:none" />
              Seleccionar
              <i class="fas fa-camera"></i>
            </button>
            <div class="row">  
            <div class="form-row col-6">
              <div class="form-group">
                <label for="titulo" class="label">Título</label>
                <input type="text" class="form-control" id="titulo" v-model="titulo" required />
              </div>
            </div>
            <div class="form-group col-6">
                <label for="resumen" class="label">Breve Resumen</label>
                <input type="text" class="form-control" id="resumen" v-model="resumen" required />
              </div>
            </div>
            <div class="form-group">
              <label for="descripcion" class="label">Descripción del Episodio</label>
              <textarea class="form-control" id="descripcion" v-model="descripcion" required></textarea>
            </div>
            <div class="form-group">
              <label for="etiquetas" class="label">Etiquetas</label>
              <input type="tag" class="form-control" id="tags" v-model="tags" required />
            </div>
            <button type="submit" class="btn-submit-bold btn btn-dark mt-3">Publicar Episodio</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CropImage from "../components/CropImage.vue";
  
  export default {
    components: {
      "image-cropper": CropImage,
    },
    data() {
      return {
        imagenPortada: null,
        titulo: "",
        resumen: "",
        descripcion: "",
        tags: [],
      };
    },
    methods: {
      cerrarVentana() {
        // Agrega aquí la lógica para cerrar la ventana de publicación.
      },
      publicarEpisodio() {
        // Agrega aquí la lógica para publicar el episodio.
      },
    },
  };
  </script>
  

  <style scoped>
  .popup-content {
    width: 50%;
    max-height: 70%;
    overflow-y: auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.924);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: red;
  }
  
  .label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>
  