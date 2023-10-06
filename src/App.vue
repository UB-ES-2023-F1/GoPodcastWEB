<template>
  <router-view/>
</template>

<script>
export default {
name: 'App'
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
