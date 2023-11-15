<template>
    <div class="container-fluid m-0 p-0 h-100">
        <div class="row w-100 m-0">
            <Sidebar />
            <div class="publish col-lg-10 col-md-9 col-sm-12 p-0">
                <div class="profile-content p-5">
                    <div>
                    <img src="../assets/redpanda.jpg" alt="profile" class="profile-img rounded-circle" style="width: 15vw; max-width: 15em;" />
                    <div style="display: inline-block;" class="ms-4">
                        <h1 class="profile-name mt-1">{{ user.name }}</h1>
                        <p class="type opacity-50">USER</p>
                        <p class="profile-bio mb-0 wrap">{{ user.bio }}</p>

                    </div>
                </div>
                    
                    <div class="favorite-podcasts">
                        <h2 class="label mt-5 mb-3">Favorite Podcasts</h2>
                        <FavoriteList />
                    </div>
                    <div class="streamlater-podcasts">
                        <h2 class="label mt-5 mb-3">Watch Later</h2>
                        <StreamLaterList />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style>
.profile {
    height: 100%;
}

.profile-content {
    background-color: rgba(0, 0, 0, 0.559);
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}

.form-content {
    height: 120vh;
}

.container-fluid {
    background-color: #1C1C1C;
    height: 100%;
}

.label {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
}

.profile .btn-submit-bold {
    font-size: 1.2rem;
    font-weight: normal;
    border-radius: 10px;
    padding: 10px;
    background-color: #000000;
    border: none;
    color: #fff;
}

.profile .btn-submit-bold:hover {
    background-color: #ffffff;
    color: #000000;
    transition: all 0.35s ease-in-out;
}
</style>
    

<script>
import Sidebar from '../components/Sidebar.vue'
import StreamLaterList from '../components/StreamLaterList.vue'
import FavoriteList from '../components/FavoriteList.vue'

export default {
    components: {
        Sidebar,
        StreamLaterList,
        FavoriteList
    },
    data() {
        return {
            user: {
                name: 'John Doe',
                avatar: 'https://via.placeholder.com/150',
                bio: 'Me gustan los podcasts y los pandas rojos, yey! Dame follow para ver mis playlist :D',
                email: 'johndoe@example.com',
                location: 'New York, NY',
                website: 'https://example.com'
            }
        }
    }
}
</script>
