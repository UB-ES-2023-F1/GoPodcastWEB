import { createApp } from 'vue'
import './style.css'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'




const app = createApp(App)
app.use(router)
app.use(VueTheMask)
app.mount('#app')
