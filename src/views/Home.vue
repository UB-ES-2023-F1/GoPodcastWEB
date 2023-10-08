<template>
    <div class="home container-fluid m-0 p-0">
    <div class="row w-100">
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
        <div class="home-content col-lg-9 col-md-9 col-sm-9 p-0">
            <div class="col-lg-6">
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
            </div>
            <div class="">
                <div class="featured">
                    <h2>Featured Podcasts</h2>
                    <div class="podcasts">
                        <div class="podcast">
                            <img src="../assets/podcasts/podcast1.jpg" alt="Podcast">
                            <span class="name">Pop Hits</span>
                        </div>
                        <div class="podcast">
                            <img src="../assets/podcasts/podcast2.jpg" alt="Podcast">
                            <span class="name">Rock Classics</span>
                        </div>
                        <div class="podcast">
                            <img src="../assets/podcasts/podcast3.jpg" alt="Podcast">
                            <span class="name">Hip Hop Essentials</span>
                        </div>
                        <div class="podcast">
                            <img src="../assets/podcasts/podcast4.jpg" alt="Podcast">
                            <span class="name">Hip Hop Essentials</span>
                        </div>
                        <div class="podcast">
                            <img src="../assets/podcasts/podcast5.jpg" alt="Podcast">
                            <span class="name">Hip Hop Essentials</span>
                        </div>
                        <div class="podcast">
                            <img src="../assets/podcasts/podcast6.jpg" alt="Podcast">
                            <span class="name">Hip Hop Essentials</span>
                        </div>
                    </div>
                </div>
                <div class="categories">
                    <h2>Browse Categories</h2>
                    <div class="category">
                        <img src="../assets/categories/category1.jpg" alt="Category">
                        <span class="name">Pop</span>
                    </div>
                    <div class="category">
                        <img src="../assets/categories/category2.jpg" alt="Category">
                        <span class="name">Rock</span>
                    </div>
                    <div class="category">
                        <img src="../assets/categories/category3.jpg" alt="Category">
                        <span class="name">Hip Hop</span>
                    </div>
                    <div class="category">
                        <img src="../assets/categories/category4.jpg" alt="Category">
                        <span class="name">Electronic</span>
                    </div>
                    <div class="category">
                        <img src="../assets/categories/category5.jpg" alt="Category">
                        <span class="name">Classical</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

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
    height: 100vh;
    overflow: hidden;
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

.podcasts {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.podcast {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 1.2em;
}

.podcast img {
    width: 200px;
    height: 200px;
    border-radius: 5%;
    margin-bottom: 10px;
}

.podcast .name {
    font-size: 18px;
    font-weight: 600;
}

.categories {
    margin-top: 50px;
}

.category {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.category img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}

.category .name {
    font-size: 18px;
    font-weight: 600;
}

.featured {
    margin-bottom: 50px;
}
</style>
