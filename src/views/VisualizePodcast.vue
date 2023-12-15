<template>
  <div class="visualize container-fluid m-0 p-0">
    <div class="row w-100 m-0">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main content-->
      <div class="visualize-content col-lg-10 col-md-9 col-sm-12 p-0">
        <div class="row w-100 p-5">
          <TopBar @search="search" />
        </div>
        <!-- If user is searching -->
        <div v-if="searching">
          <h1 class="ps-5">
            Search results.
            <a
              @click="searching = false"
              style="color: rgb(206, 206, 206); cursor: pointer"
              >Go back.</a
            >
          </h1>
          <div class="featured">
            <h2 class="ps-5">Podcasts</h2>
            <PodcastList :podcastList="podcastSearchList" v-if="podcastSearchList.length > 0" />
            <h4 class="ps-5 fw-lighter" v-else>No podcasts found.</h4>
          </div>
          <div class="featured">
            <h2 class="ps-5">Authors</h2>
            <UserList :userList="userSearchList" v-if="userSearchList.length > 0" />
            <h4 class="ps-5 fw-lighter" v-else>No users found.</h4>
          </div>
        </div>

        <div v-else class="row p-5 w-100">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12">
            <div class="contenedor-reducido mb-5">
              <!-- Normal visualization -->
              <div class="row mt-5 ps-5 mr-5" v-if="!editting">
                <div class="col-10 col-sm-4 col-md-4 col-lg-4">
                  <img
                    :src="podcast.img"
                    alt="Imagen"
                    class="reduced-image"
                    v-if="podcast.img"
                  />
                </div>
                <div class="col-10 col-sm-7 col-md-7 col-lg-7">
                  <h1>{{ podcast.name }}</h1>
                  <div v-if="!isAuthor">
                    <button
                      @click="toggleFollow"
                      id="toggleFollow"
                      class="follow-button mt-2 mb-4"
                      :class="{ following: podcast.isFollowing }"
                    >
                      {{ podcast.isFollowing ? "unFavorite" : "Favorite" }}
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn mt-2 mb-4" disabled>AUTHOR</button>
                  </div>
                  <h6>{{ podcast.summary }}</h6>
                  <p>{{ podcast.description }}</p>
                </div>
              </div>

              <!-- Editing mode -->
              <div class="row mt-5 ps-5 mr-5" v-else>
                <div class="col-10 col-sm-4 col-md-4 col-lg-4">
                  <img
                    :src="podcast.img"
                    alt="Imagen"
                    class="reduced-image"
                    v-if="podcast.img"
                  />
                </div>
                <div
                  class="col-10 col-sm-7 col-md-7 col-lg-7"
                  style="display: flex; flex-direction: column"
                >
                  <input
                    type="text"
                    v-model="podcast_edited.name"
                    placeholder="Podcast name"
                  />
                  <div v-if="!isAuthor">
                    <button
                      @click="toggleFollow"
                      class="follow-button mt-2 mb-4"
                      :class="{ following: podcast.isFollowing }"
                    >
                      {{ podcast.isFollowing ? "unFavorite" : "Favorite" }}
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn mt-2 mb-4" disabled>AUTHOR</button>
                  </div>
                  <input
                    type="text"
                    v-model="podcast_edited.summary"
                    placeholder="Podcast summary"
                  />
                  <textarea
                    v-model="podcast_edited.description"
                    placeholder="Podcast description"
                    style="margin-top: 20px; padding-top: 10px"
                  ></textarea>
                </div>
              </div>
              <div style="margin-top: 10px; margin-left: 40px" v-if="isAuthor">
                <button
                  class="btn btn-success me-2"
                  @click="editting = true"
                  v-if="!editting"
                >
                  Edit
                </button>
                <button
                  class="btn btn-success me-2"
                  @click="updatePodcast()"
                  v-if="editting"
                >
                  Save
                </button>
                <button
                  class="btn btn-dark me-2"
                  @click="editting = false"
                  v-if="editting"
                >
                  Cancel
                </button>
                <button class="btn btn-danger me-2" @click="deletePodcast()">
                  Delete
                </button>
                <button
                  class="btn btn-dark me-2"
                  @click="
                    $router.push('/publish/episode/' + this.$route.params.id)
                  "
                  v-if="!editting"
                >
                  New Episode
                </button>
              </div>
              <div class="row mt-3 align-items-center ps-5">
                <Episode
                  :episodes="podcast.episodes"
                  :podcastImage="podcast.img"
                  :podcastName="podcast.name"
                  v-if="podcast.img"
                />
              </div>
              <div v-if="loadingEpisodes" class="loading-overlay">
                <img
                  src="/src/assets/kOnzy.gif"
                  alt="Loading..."
                  style="width: 2em; height: 2em"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Episode from "../components/Episode.vue";
import TopBar from "../components/TopBar.vue";
import UserList from "../components/UserList.vue";
import PodcastList from "../components/PodcastList.vue";
import axios from "axios";

export default {
  components: {
    Sidebar,
    Episode,
    TopBar,
    PodcastList,
    UserList,
  },
  data() {
    return {
      podcast: {},
      podcast_edited: {},
      isAuthor: false,
      editting: false,
      searching: false,
      podcastSearchList: [],
      userSearchList: [],
      loadingEpisodes: true,
    };
  },
  methods: {
    search(nameQuery, authorQuery) {
      console.log(nameQuery, authorQuery);
      if (nameQuery) {
        this.getName(nameQuery);
      } else {
        this.podcastSearchList = [];
      }
      if (authorQuery) {
        this.getAuthor(authorQuery);
      } else {
        this.userSearchList = [];
      }

      this.searching = true;
    },
    getName(nameQuery) {
      const pathSearch =
        import.meta.env.VITE_API_URL + "/search/podcast/" + nameQuery;

      axios
        .get(pathSearch)
        .then((res) => {
          this.podcastSearchList = res.data;
        })
        .catch((error) => {
          this.podcastSearchList = [];
          console.error(error);
        });
    },
    getAuthor(authorQuery) {
      const pathSearch =
        import.meta.env.VITE_API_URL + "/search/user/" + authorQuery;

      axios
        .get(pathSearch)
        .then((res) => {
          this.userSearchList = res.data;
          this.getProfileImg();
        })
        .catch((error) => {
          this.userSearchList = [];
          console.error(error);
        });
    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    getProfileImg() {
      this.userSearchList.forEach((user) => {
        console.log("Usuario:", user.id, user.username, user.image_url);
        const pathProfileImg =
          import.meta.env.VITE_API_URL + "/users/" + user.id + "/image";

        axios
          .get(pathProfileImg, { responseType: "blob" })
          .then(async (res) => {
            const base64data = await this.blobToData(res.data);
            user.image_url = base64data;
            console.log("IMAGE_URL ACTUALIZADO:", user.image_url);
            if (user.image_url === "data:image/jpeg;base64") {
              user.image_url = null;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    getPodcast() {
      const podcastId = this.$route.params.id;
      const pathPodcast =
        import.meta.env.VITE_API_URL + `/podcasts/${podcastId}`;

      axios
        .get(pathPodcast)
        .then((resPodcast) => {
          this.podcast = JSON.parse(JSON.stringify(resPodcast.data));
          this.podcast_edited = JSON.parse(JSON.stringify(resPodcast.data));
          if (this.$store.state.userIsLoggedIn) {
            this.getId();
          }
          this.getCover();
          this.getEpisodes();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getId() {
      const pathID = import.meta.env.VITE_API_URL + "/protected";

      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.access_token,
        },
      };

      axios.get(pathID, axiosConfig).then((res) => {
        console.log(res);
        if (res.data.logged_in_as == this.podcast.author.id) {
          this.isAuthor = true;
        } else {
          this.getFollowing();
        }
      });
    },
    getCover() {
      const pathCover =
        import.meta.env.VITE_API_URL +
        "/podcasts/" +
        this.$route.params.id +
        "/cover";

      axios
        .get(pathCover, { responseType: "blob" })
        .then(async (res) => {
          const base64data = await this.blobToData(res.data);
          this.podcast.img = base64data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    getEpisodes() {
      const pathEpisodes =
        import.meta.env.VITE_API_URL +
        "/podcasts/" +
        this.$route.params.id +
        "/episodes";

      axios
        .get(pathEpisodes)
        .then((res) => {
          this.podcast.episodes = res.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
            this.loadingEpisodes = false
        });
    },
    updatePodcast() {
      const pathUpdate =
        import.meta.env.VITE_API_URL + "/podcasts/" + this.$route.params.id;

      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.access_token,
          "Content-Type": "Multipart/form-data",
        },
      };

      var formData = new FormData();

      formData.append("cover", null);
      formData.append("name", this.podcast_edited.name);
      formData.append("summary", this.podcast_edited.summary);
      formData.append("description", this.podcast_edited.description);
      formData.append("category", "Other");

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .put(pathUpdate, formData, axiosConfig, headers)
        .then((res) => {
          console.log(res.data);
          alert("Cambios realizados");
          this.podcast.name = this.podcast_edited.name;
          this.podcast.summary = this.podcast_edited.summary;
          this.podcast.description = this.podcast_edited.description;
          this.editting = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePodcast() {
      if (confirm("Do you really want to delete this podcast?")) {
        const pathDelete =
          import.meta.env.VITE_API_URL + "/podcasts/" + this.$route.params.id;

        const axiosConfig = {
          headers: {
            Authorization: "Bearer " + this.$store.state.access_token,
          },
        };

        axios
          .delete(pathDelete, axiosConfig)
          .then((res) => {
            console.log("Podcast deleted", res.data);
            alert("The podcast have been deleted succesfully");
            this.$router.push({ name: "Home" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getFollowing() {
      const podcastId = this.podcast.id;
      const path = import.meta.env.VITE_API_URL + `/favorites/${podcastId}`;

      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.access_token,
        },
      };

      axios
        .get(path, axiosConfig)
        .then((response) => {
          this.podcast.isFollowing = response.data.is_favorite;
        })
        .catch((error) => {
          console.error(
            `Error al querer ver si el podcast esta en favorito`,
            error
          );
        });
    },
    toggleFollow() {
      let toggleButton = document.getElementById("toggleFollow");
      toggleButton.disabled = true;

      const podcastId = this.podcast.id;
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.access_token,
        },
      };

      if (this.podcast.isFollowing) {
        const path = import.meta.env.VITE_API_URL + `/favorites/${podcastId}`;
        axios
          .delete(path, axiosConfig)
          .then((response) => {
            this.podcast.isFollowing = false;
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error al dejar de seguir el podcast: ", error);
          })
          .finally(() => {
            toggleButton.disabled = false;
          });
      } else {
        const path = import.meta.env.VITE_API_URL + `/favorites`;
        const params = {
          id: podcastId,
        };
        axios
          .post(path, params, axiosConfig)
          .then((response) => {
            this.podcast.isFollowing = true;
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error al seguir el podcast: ", error);
          })
          .finally(() => {
            toggleButton.disabled = false;
          });
      }
    },
  },
  created() {
    // Descomentar cuando tengamos los endpoints listos
    this.getPodcast();
  },
};
</script>

<style>
.visualize {
  height: 100%;
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

.visualize-content .more-content {
  width: 100%;
  height: 100%;
  padding-left: 0px;
  background-color: #04001d;
}

h6 {
  font-size: 18px;
}

.centrado {
  text-align: center;
  align-items: center;
  justify-content: center;
}

.contenedor-reducido {
  text-align: justify;
  align-items: justify;
  justify-content: justify;
}

.visualize-content .more-content h2 {
  color: #525dff;
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

.follow-button:disabled,
.follow-button:hover:disabled,
.follow-button[disabled] {
  border: 1px solid #99999949;
  color: #99999949;
  cursor: auto;
}

.follow-button.following:disabled,
.follow-button:hover:disabled.following,
.follow-button.following[disabled] {
  border: 1px solid #ffffff49;
  color: #ffffff49;
  background-color: #ffffff13;
  cursor: auto;
}

.btn-success,
.btn-danger,
.btn-dark {
  border-radius: 50px;
  font-size: 14px;
  margin: 0px 10px 0px 10px;
}

input,
textarea {
  min-height: 40px;
  border: none;
  border-radius: 20px 20px 20px 20px;
  padding: 0 20px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.625);
  color: #fff;
}

.disabled {
  pointer-events: none;
}

.loading-overlay {
  width: 100%;
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
