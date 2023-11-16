<template>
    <div class="visualize container-fluid m-0 p-0">
        <div class="row w-100 m-0">
            <!-- Sidebar -->
            <Sidebar />
            <!-- Main content-->
            <div class="visualize-content col-lg-10 col-md-9 col-sm-12 p-0  ">
                <div class="row w-100 mt-5 ps-5">
                    <div class="search col-6">
                        <input type="text" placeholder="Search">
                        <button>Search</button>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        
                    </div>
                </div>
                <div class="row p-5">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="contenedor-reducido mb-5"> 
                            <div class="row mt-5 ps-5 mr-5">
                                <div class="col-10 col-sm-4 col-md-4 col-lg-4">
                                    <img :src="episode.episodeImage" alt="Imagen" class="reduced-image mb-4"/>
                                </div>
                                <div class="col-10 col-sm-7 col-md-7 col-lg-7 ">
                                    <h1>{{ episode.title }}</h1>
                                    <div>
                                        <div v-for="(tag, index) in episode.tags" :key="index" class="tag row"
                                            :style="{ backgroundColor: randomColor() }">
                                            {{ tag }}
                                        </div>
                                    </div>
                                    <h6>{{ episode.summary }}</h6>
                                    <p>{{ episode.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <Comment
                                v-for="comment in episode.listOfComments"
                                :key="comment.id"
                                :comment="comment"
                                @toggle-like="toggleLike"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    </div>   
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Comment from '../components/Comment.vue';
import ProgressBar from '../components/ProgressBar.vue';
import axios from 'axios'

    export default {
        components: {
            Sidebar,
            Comment,
            ProgressBar,
        },
        data() {
            return {
                episode:{ 
                    id: 1, 
                    title: 'intro', 
                    episodeImage: "/src/assets/podcasts/MMCD.jpg", 
                    description: "Pequeño speech de Cruzzi hablando de la luna, y de la importancia de las Palmas al haberse criado allí.", 
                    audio_url: '/src/assets/audio/Moonlight_audio.mp3', 
                    tags: ["Intro", "Cruzzi", "Moonlight"], 
                    listOfComments: [
                    {
                        id: "p5jg9d8k",
                        author: 'User1',
                        date: new Date(),
                        text: "Comentario Prueba1",
                        liked: false,
                        replies: [
                            {
                            id: "p5jg9d81",
                            author: 'User2',
                            date: new Date(),
                            text: "Comentario Prueba Res1",
                            liked: false,
                            replies: [
                                {
                                id: "p5jg9d71",
                                author: 'User2',
                                date: new Date(),
                                text: "Comentario Prueba Res1Res1",
                                liked: false,
                                replies: [],
                                },
                            ],
                            },
                            {
                            id: "p5jg9d31",
                            author: 'User3',
                            date: new Date(),
                            text: "Comentario Prueba Res2",
                            liked: false,
                            replies: [],
                            },
                        ]},
                        {
                        id: "p5jg9d30",
                        author: 'User3',
                        date: new Date(),
                        text: "Comentario Prueba 2",
                        liked: false,
                        replies: [],
                        },
                    ], 
                    audioElement: null, 
                    isLiked: false 
                },
            };
        },
        methods: {
            getEpisode() {
                const podcastId = this.$route.params.podcastId;
                const episodeId = this.$route.params.id;
                const pathEpisode = `http://localhost:8000/podcasts/${podcastId}/episodes/${episodeId}`;

                axios.get(pathEpisode).then((resEpisode) => {
                    this.episode = resEpisode.data;
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            randomColor() {
                const letters = "0123456789ABCDEF";
                let color = "#";
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            },
            
        },
        created () {
            // Descomentar cuando tengamos los endpoints listos
            // this.getEpisode() 
            this.episodeId = this.$route.params.id;
        },
        
    };
</script>

<style>
.visualize {
    height: 100%;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    color: white;
}

.visualize-content {
    height: inherit;
    overflow: hidden;
    align-items: start;
    justify-content: flex-start;
}

.reduced-image {
    width: 100%; 
    height: auto;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); 
}

.visualize-content .more-content{
    width: 100%;
    height: 100%;
    padding-left: 0px;
    background-color: #04001d;
}

h6{
    font-size: 18px;
}

.centrado {
    text-align: center;
    align-items: center;
    justify-content: center;
}

.contenedor-reducido{
    text-align: justify;
    align-items: justify;
    justify-content: justify;
}

.visualize-content .more-content h2{
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
ul {
    list-style-type: none;
} 

.follow-button {
    width: 9vw;
    height: 30px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50px;
    transition: all 0.35s ease-in-out;
}

.follow-button.following {
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
}

.follow-button:not(.following) {
    background-color: transparent; 
    border: 1px solid #fff;
    color: #fff;
}

.follow-button:hover.following {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    
}

.follow-button:hover:not(.following) {
    background-color: #fff;
    color: #000;
}
</style>



