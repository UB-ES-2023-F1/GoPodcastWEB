<template>
    <div class="player">
        <div id="audio-player-root">
            <div>
                <audio style="display:none" ref="player" :id="playerid">
                    <source :src="audioUrl" type="audio/mpeg" />
                </audio>
            </div>
            <div class="player-content w-full rounded-lg shadow-lg">
                <div id="player-row" class="row flex-wrap w-full max-w-5xl">
                    <div class="episode-cover d-inline col-4 col-md-4">
                        <img src="../assets/podcasts/podcast1.jpg" alt="cover" class="cover d-none d-lg-inline" />
                        <div class="d-inline">
                            <h6 class="text-white ps-3 d-lg-inline d-md-block pt-md-4">ABOUT CHRISTMAS</h6>
                            <h6 class="opacity-50 ps-3 pe-5 d-lg-inline d-md-block">Episode 1</h6>
                        </div>

                        <div id="button-div" class="flex-initial pr-3 d-inline ps-md-3">
                            <svg @click="toggleAudio()" v-show="!isPlaying" class="play-button text-gray-400"
                                :class="{ 'text-orange-600': audioLoaded, 'hover:text-orange-400': audioLoaded, 'cursor-pointer': audioLoaded }"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clip-rule="evenodd" />
                            </svg>
                            <svg @click="toggleAudio()" v-show="isPlaying"
                                class="play-button text-orange-400 hover:text-orange-400 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div id="progress-bar" class="col-8 d-inline text-center pt-5">
                        <span>{{ elapsedTime() }}</span>
                        <div class="overlay-container h-full d-inline px-2">
                            <input v-model="playbackTime" type="range" min="0" :max="audioDuration" class="slider h-full"
                                id="position" name="position" />
                            <div v-show="!audioLoaded"
                                class="absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
                                style="color: #94bcec">
                                Loading please wait...
                            </div>
                        </div>
                        <span>{{ totalTime() }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.player {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.player h6 {
    display: inline;
}

.player-content {
    background-color: rgb(0, 0, 0);
}

.play-button {
    height: 45px;
}

.cover {
    width: 8em;
    height: inherit;
}

input[type="range"] {
    -webkit-appearance: none;
    overflow: hidden;
    width: 80%;
    cursor: pointer;
    outline: none;
    height: 12px;
    border-radius: 20px;
    background: transparent;
}

input[type="range"]:focus {
    outline: none;
}

::-webkit-slider-runnable-track {
    background: #2e2e2e;
}

::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 40px;
    background: #fff;
    box-shadow: -100vw 0 0 100vw rgb(90, 30, 255);
    border: none;
}

::-moz-range-track {
    height: 40px;
    background: #ddd;
}

::-moz-range-thumb {
    background: #fff;
    height: 40px;
    width: 0;
    border: none;
    border-radius: 0 !important;
    box-shadow: -100vw 0 0 100vw rgb(90, 30, 255);
    box-sizing: border-box;
}

::-ms-fill-lower {
    background: dodgerblue;
}

::-ms-thumb {
    background: #fff;
    border: 2px solid #999;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
}

::-ms-ticks-after {
    display: none;
}

::-ms-ticks-before {
    display: none;
}

::-ms-track {
    background: #ddd;
    color: transparent;
    height: 40px;
    border: none;
}

::-ms-tooltip {
    display: none;
}
</style>

<script>
import axios from 'axios';

export default {
    props: ["url", "playerid"],
    data() {
        return {
            playbackTime: 0,
            audioDuration: 100,
            audioLoaded: false,
            isPlaying: false,
            episodeToken: "",
            audioUrl: "src/assets/audio/episodes/episode1.mp3"
        };
    },
    methods: {
        fetchAudio() {
            axios.get('/api/episodes/' + this.episodeToken + '/audio').then((response) => {
                this.audioUrl = response.data.url;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        initSlider() {
            var audio = this.$refs.player;
            if (audio) {
                this.audioDuration = Math.round(audio.duration);
            }
        },
        convertTime(seconds) {
            const format = val => `0${Math.floor(val)}`.slice(-2);
            var hours = seconds / 3600;
            var minutes = (seconds % 3600) / 60;
            return [minutes, seconds % 60].map(format).join(":");
        },
        totalTime() {
            var audio = this.$refs.player;
            if (audio) {
                var seconds = audio.duration;
                return this.convertTime(seconds);
            } else {
                return '00:00';
            }
        },
        elapsedTime() {
            var audio = this.$refs.player;
            if (audio) {
                var seconds = audio.currentTime;
                return this.convertTime(seconds);
            } else {
                return '00:00';
            }
        },
        playbackListener(e) {
            var audio = this.$refs.player;
            this.playbackTime = audio.currentTime;
            audio.addEventListener("ended", this.endListener);
            audio.addEventListener("pause", this.pauseListener);
        },
        pauseListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        endListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        cleanupListeners() {
            var audio = this.$refs.player;
            audio.removeEventListener("timeupdate", this.playbackListener);
            audio.removeEventListener("ended", this.endListener);
            audio.removeEventListener("pause", this.pauseListener);
        },
        toggleAudio() {
            var audio = this.$refs.player;
            if (audio.paused) {
                audio.play();
                this.isPlaying = true;
            } else {
                audio.pause();
                this.isPlaying = false;
            }
        },
    },
    mounted: function () {
        // this.fetchAudio(); // TODO: Descomentar cuando esté la parte de backend preparada
        this.$nextTick(function () {
            var audio = this.$refs.player;
            audio.addEventListener("loadedmetadata", function (e) {
                this.initSlider();
            }.bind(this));
            audio.addEventListener("canplay", function (e) {
                this.audioLoaded = true;
            }.bind(this));
            this.$watch("isPlaying", function () {
                if (this.isPlaying) {
                    var audio = this.$refs.player;
                    this.initSlider();
                    if (!this.listenerActive) {
                        this.listenerActive = true;
                        audio.addEventListener("timeupdate", this.playbackListener);
                    }
                }
            });
            this.$watch("playbackTime", function () {
                var audio = this.$refs.player;
                var diff = Math.abs(this.playbackTime - this.$refs.player.currentTime);
                if (diff > 0.01) {
                    this.$refs.player.currentTime = this.playbackTime;
                }
            });
        });
    }
};
</script>

<!-- Adaptado de: https://muhammadatt.medium.com/building-an-mp3-audio-player-in-vue-js-c5884207251c -->
