<template>
        <b-row>
            <b-col cols="12" md="6" lg="8" class="contenedor-reducido">
                <img :src="image_url" alt="Imagen" class="img-fluid" />
                <h2>{{ title }}</h2>
                <p>{{ summary }}</p>
                <p>{{ description }}</p>
                <ul>
                    <li v-for="(audio, index) in list_of_episodes" :key="index">
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
                podcast: {
                    id: 1,
                    image_url: '/src/assets/podcasts/Moonlight.jpg',
                    title: "Moonlight",
                    summary: "Podcast talking about Cruz Cafuné's new album",
                    description: "This podcast talks about the importance of the islands having been born and raised in the Canary Islands",
                    list_of_episodes: [
                        { id: 1, title: 'intro', episodeImage: "/src/assets/podcasts/MMCD.jpg", description: "Pequeño speech de Cruzzi hablando de la luna, y de la importancia de las Palmas al haberse criado allí.", audio_url: '/src/assets/audio/Moonlight_audio.mp3', tags: ["Intro", "Cruzzi", "Moonlight"], listOfComments: [], audioElement: null, isLiked: false },
                        { id: 2, title: 'mi_isla', episodeImage: "/src/assets/podcasts/MBMC.jpg", description: "Canción de Cruzzi inicio album Moonlight922", audio_url: '/src/assets/audio/Mi_isla_audio.mp3', tags: ["LPGC", "Cruzzi", "Luna"], listOfComments: [], audioElement: null, isLiked: false },
                    ],
                    author: "Cruz Cafuné",
                },
            };
        },
    };
</script>