<template>
  <router-view/>
  <Footer/>
</template>

<script>
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Footer
  },
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: var(--text-color);
  margin-top: 0px;
}

#slogan{
  color: var(--primary-color);
  font-style: italic;
  font-family: 'Lucida Sans Unicode';
  font-weight: 800;
}

a{
  color: var(--primary-color);
}

</style>
