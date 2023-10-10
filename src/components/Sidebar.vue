<template>
    <div class="sidebar col-lg-3 col-md-3 p-3 text-white">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img src="../assets/logo_white.png" alt="logo" class="mx-auto logo" :style="{ width: '50px', height: '50px' }">
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item align-items-center">
                <a href="#" class="nav-link active" aria-current="page"  @click="$router.push('/')">
                    <img src="../assets/icons/ic_home.png" alt="home" style="width: 20px; height: 20px;">
                    Home
                </a>
            </li>
            <li>
                <a href="#" class="nav-link" @click="$router.push('/discover');">
                    <img src="../assets/icons/ic_discover.png" alt="discover" style="width: 20px; height: 20px;">
                    Discover
                </a>
            </li>
            <li>
                <a href="#" class="nav-link" @click="$router.push('/library');">
                    <img src="../assets/icons/ic_vinyl.png" alt="library" style="width: 20px; height: 20px;">
                    My library
                </a>
            </li>
            <li>
                <a href="#" class="nav-link" @click="$router.push('/community');">
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
</template>
  
<script>
export default {
    data() {
        return {
        };
    }
};
</script>

<style>
.sidebar {
    height: 100vh;
    overflow: hidden;
    font-size: 1.25rem;
    letter-spacing: 0.05rem;
}

.sidebar .logo {
    margin-top: 20px;
    margin-bottom: 10px;
}

.sidebar .logo:hover {
    transform: scale(1.1);
    transition: all 0.35s ease-in-out;
}
.sidebar hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar .nav-pills .nav-link {
    color: #fff;
    border-radius: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
}
.sidebar img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.sidebar a:hover {
    transform: scale(1.05);
    transition: all 0.35s ease-in-out;
    padding-top: 15px;
    padding-bottom: 15px;
}

.sidebar .nav-pills .nav-link:hover {
    font-weight: 600;
}

.sidebar .nav-pills .nav-link.active {
    background-color: #2b00ff;
}

</style>

