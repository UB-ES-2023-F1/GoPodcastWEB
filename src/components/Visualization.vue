<template>
        <b-row>
            <b-col cols="12" md="6" lg="8" class="contenedor-reducido">
                <img :src="imagenUrl" alt="Imagen" class="img-fluid" />
                <h2>{{ titulo }}</h2>
                <p>{{ resumen }}</p>
                <p>{{ descripcion }}</p>
                <ul>
                    <li v-for="(audio, index) in listOfAudios" :key="index">
                        <audio controls :src="audio.url">{{ audio.nombre }}</audio>
                    </li>
                </ul>
            </b-col>
        </b-row>
</template>

<script>
    export default {
        data() {
            return {
                imagenUrl: 'podcasts/podcast1.jpg',
                titulo: 'Moonlight',
                resumen: "Podcast talking about Cruz Cafuné's new album",
                descripcion: "This podcast talks about the importance of the islands having been born and raised in the Canary Islands",
                listOfAudios: [
                    { nombre: 'intro', url: 'audio/Moonlight_audio.mp3'},
                    { nombre: 'mi_isla', url: 'audio/Mi_isla_audio.mp3'},
                ],
                author: 'Cruz Cafuné',
                listOfComments: [

                ]
            };
        },
    };
</script>