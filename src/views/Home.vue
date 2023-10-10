<template>
    <div class="home container-fluid m-0 p-0">
    <div class="row w-100 m-0">
        <!-- Sidebar -->
        <div class="sidebar col-lg-3 col-md-3 p-3 text-white">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src="../assets/logo_white.png" alt="logo" class="mx-auto" :style="{ width: '40px', height: '40px' }">
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item align-items-center">
                    <a href="#" class="nav-link active" aria-current="page">
                        <img src="../assets/icons/ic_home.png" alt="home" style="width: 20px; height: 20px;">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        <img src="../assets/icons/ic_discover.png" alt="discover" style="width: 20px; height: 20px;">
                        Discover
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        <img src="../assets/icons/ic_vinyl.png" alt="library" style="width: 20px; height: 20px;">
                        My library
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        <img src="../assets/icons/ic_community.png" alt="community" style="width: 20px; height: 20px;">
                        Community
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-black">
                        About us
                    </a>
                </li>
            </ul>
        </div>
        <!-- Main content-->
        <div class="home-content col-lg-9 col-md-9 col-sm-9 p-0 ps-5">
                <div class="search">
                    <input type="text" placeholder="Search">
                    <button>Search</button>
                </div>
                <div class="signup">
                    <button>Sign up</button>
                </div>
                <div class="signin">
                    <button>Sign in</button>
                </div>
            
                <div class="featured">
                    <h2>Featured Podcasts</h2>
                    <PodcastList />
                </div>
                <CategoryList />
            
        </div>
    </div>
</div>
</template>

<script>
import CategoryList from '../components/CategoryList.vue';
import PodcastList from '../components/PodcastList.vue';

export default {
    name: 'Home',
    components: {
    PodcastList,
    CategoryList
},
};
</script>

<style>
.home {
    height: 100vh;
    overflow: hidden;
}

.sidebar {
    height: 100vh;
    overflow: hidden;
}

.home-content {
    margin-top: 2em;
    height: inherit;
    overflow: hidden;
    align-items: start;
}

.search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.search input {
    width: 300px;
    height: 50px;
    border: none;
    border-radius: 50px 0 0 50px;
    padding: 0 20px;
    font-size: 18px;
}

.search button {
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 0 50px 50px 0;
    background-color: #1db954;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}

.signup {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.signup button {
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 50px;
    background-color: #1db954;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}

.signin {
    display: flex;
    align-items: center;
    justify-content: center;
}

.signin button {
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 50px;
    background-color: #fff;
    color: #1db954;
    font-size: 18px;
    cursor: pointer;
}

h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
}



.featured {
    margin-bottom: 50px;
    width: inherit;
}
</style>
