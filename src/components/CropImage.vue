<template>
    <div class="centered-container">
        <label class="btn-submit btn btn-dark mt-3">
            <input type="file" @change="handleImageChange" accept="image/*" style="display:none" />
            Select
            <i class="fas fa-camera"></i>
        </label>
        <div></div>
        <div v-if="selectedImage && !croppedImage" class="image-container">
            <img ref="image" :src="selectedImage" alt="Imagen a recortar" />
        </div>
        <button @click="cropImage" class="btn-submit-bold btn btn-dark mt-3" v-if="showCropButton">Crop</button>
        <img v-if="croppedImage" :src="croppedImage" alt="Imagen Recortada" class="cropped-image" />

    </div>
</template>
  
  <script>
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';
  
  export default {
    data() {
      return {
        selectedImage: null,
        cropper: null,
        croppedImage: null,
        showCropButton: false,
      };
    },
    methods: {
      handleImageChange(e) {
        const file = e.target.files[0];
        this.croppedImage = null;
        if (file) {
          this.selectedImage = URL.createObjectURL(file);
  
          // Destruye cualquier instancia anterior del cropper
          if (this.cropper) {
            this.cropper.destroy();
          }
  
          this.$nextTick(() => {
            this.cropper = new Cropper(this.$refs.image, {
              aspectRatio: 1,
              viewMode: 1,
            });
          });
        }
        this.showCropButton = true;
    },
        cropImage() {
          if (this.cropper) {
            this.cropper.getCroppedCanvas({ width: 300, height: 300 }).toBlob((blob) => {
              const croppedImageUrl = URL.createObjectURL(blob);
              this.croppedImage = croppedImageUrl;
              this.cropper.destroy(); // Destruye la instancia de Cropper
              this.$emit('image-cropped', blob);
            });
          }
          this.showCropButton = false;
        }
    }
};
</script>
 
<style scoped>
.centered-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
.image-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  width: 600px; 
  height: 600px;
}


.cropped-image {
  display: block;
  max-width: 300px;
  margin-top: 20px;
  height: auto;
}
</style>