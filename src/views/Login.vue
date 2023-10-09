<template>
    <div class="login">
        <div class="container pt-5 w-50">
            <div class="logo d-flex justify-content-center">
                <router-link to="/GoPodcast" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                <img src="../assets/logo_white.png" alt="logo" :style="{width: '25px', height: '25px'}">
                <h5 class="ms-2 fw-lighter text-white" style="font-size: 1.3rem;">GoPodcast</h5>
                </router-link>
            </div>
            <h5 id="slogan" class="text-center mt-5 f-italic" style="font-size: 1.8rem;">Podcasts, Play, Repeat!</h5>
            <p class="text-center mt-5 fw-bold" :style="{fontSize: '1.2rem'}">Log in to listen to your favorite podcasts</p>
            
        </div>
    </div>
</template>