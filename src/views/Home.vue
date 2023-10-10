<template>
    <div class="home container-fluid m-0 p-0">
    <div class="row w-100 m-0">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Main content-->
        <div class="home-content col-lg-9 col-md-9 col-sm-9 p-0 ps-5">
                <div class="row w-100 m-0">
                    <div class="search col-6">
                        <input type="text" placeholder="Search">
                        <button>Search</button>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                    <div class="signin  d-flex justify-content-end me-3">
                        <button>Sign in</button>
                    </div>
                    <div class="signup d-flex me-2">
                        <button>Sign up</button>
                    </div></div>
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
import Sidebar from '../components/Sidebar.vue';

export default {
    name: 'Home',
    components: {
    PodcastList,
    CategoryList,
    Sidebar
},
};
</script>

<style>
.home {
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
    margin-bottom: 50px;
}

.search input {
    width: 300px;
    height: 50px;
    border: none;
    border-radius: 50px 0 0 50px;
    padding: 0 20px;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.625);
}

.search button {
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 0 50px 50px 0;
    background-color: #2933ff;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}


.signup button {
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 50px;
    background-color: #2933ff;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}

.signup button:hover {
    transform: scale(1.1);
    transition: all 0.35s ease-in-out;
}

.signin button {
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 50px;
    background-color: #000000;
    color: #ffffff;
    font-size: 18px;
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
    margin-bottom: 50px;
    width: inherit;
}
</style>
