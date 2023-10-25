<template>
    <div class="home container-fluid m-0 p-0">
        <div class="row w-100 m-0">
            <!-- Sidebar -->
            <Sidebar />
            <!-- Main content-->
            <div class="home-content col-lg-10 col-md-9 col-sm-12 p-0 ">
                <div class="row w-100 mt-5 ps-5">
                    <div class="search col-6">
                        <input type="text" placeholder="Search">
                        <button>Search</button>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <div class="signin  d-flex justify-content-end me-3">
                            <button @click="$router.push('/login');">Sign in</button>
                        </div>
                        <div class="signup d-flex me-2">
                            <button @click="$router.push('/register');">Sign up</button>
                        </div>
                    </div>
                </div>
                <div class="row w-100 mt-5 ps-5 mr-5">
                <div class="col-12 col-md-8 col-lg 8">
                    <div class="contenedor-reducido mb-5"> 
                        <img :src="imagenUrl" alt="Imagen" class="img-fluid" />
                        <h2>{{ titulo }}</h2>
                        <p>{{ resumen }}</p>
                        <p>{{ descripcion }}</p>
                        <ul>
                            <li v-for="(audio, index) in listOfAudios" :key="index">
                                <audio controls :src="audio.url">{{ audio.nombre }}</audio>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-md-4 col-lg 4">
                    <div class="contenedor-reducido mb-5"> 
                        <h2>Created by: {{ author }}</h2>
                        <button>Like</button>
                        <button>Share</button>
                        <button>Follow</button>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    </div>   
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

    export default {
        components: {
            Sidebar,
        },
        data() {
            return {
                imagenUrl: 'src/assets/podcasts/Moonlight.jpg',
                titulo: 'Moonlight',
                resumen: "Podcast talking about Cruz Cafuné's new album",
                descripcion: "This podcast talks about the importance of the islands having been born and raised in the Canary Islands",
                listOfAudios: [
                    { nombre: 'intro', url: 'src/assets/audio/Moonlight_audio.mp3'},
                    { nombre: 'mi_isla', url: 'src/assets/audio/Mi_isla_audio.mp3'},
                ],
                author: 'Cruz Cafuné',
                listOfComments: [

                ]
            };
        },
    };
</script>

<style>
.home {
    height: 100%;
    /* overflow: hidden; */
}

.home-content {
    /* margin-top: 0em; */
    height: inherit;
    overflow: hidden;
    align-items: start;
    justify-content: flex-start;
}

.home-content .more-content{
    width: 100%;
    height: 100%;
    padding-left: 0px;
    background-color: #04001d;
}

.home-content .more-content h2{
    color: #525dff;
}

.search {
    display: flex;
    margin-bottom: 50px;
}

.search input {
    width: 300px;
    height: 40px;
    border: none;
    border-radius: 50px 0 0 50px;
    padding: 0 20px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.625);
}

.search button {
    width: 5em;
    height: 40px;
    border: none;
    border-radius: 0 50px 50px 0;
    background-color: #2933ff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}


.signup button {
    width: 10vw;
    height: 40px;
    border: none;
    border-radius: 50px;
    background-color: #2933ff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.signup button:hover {
    transform: scale(1.1);
    transition: all 0.35s ease-in-out;
}

.signin button {
    width: 10vw;
    height: 40px;
    border: none;
    border-radius: 50px;
    background-color: #000000;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
}

.signin button:hover {
    background-color: #ffffff;
    color: #000000;
    transition: all 0.35s ease-in-out;
}


h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
}

.featured {
    margin-top: 30px;
    margin-bottom: 35px;
    width: inherit;
}
</style>
