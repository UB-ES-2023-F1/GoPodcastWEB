<template>
    <div class="register-login">
        <div class="container pt-5 w-50">
            <div class="logo d-flex justify-content-center">
                <router-link to="/GoPodcast" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                <img src="../assets/logo_white.png" alt="logo" :style="{width: '25px', height: '25px'}">
                <h5 class="ms-2 fw-lighter text-white" style="font-size: 1.3rem;">GoPodcast</h5>
                </router-link>
            </div>
            <h5 id="slogan" class="text-center mt-5 f-italic" style="font-size: 1.8rem;">Podcasts, Play, Repeat!</h5>
            <p class="text-center mt-5 fw-bold" :style="{fontSize: '1.2rem'}">Log in to listen to your favorite podcasts</p>
            
        
            <form class="register-login-form col-xl-7 mx-auto mt-4">
                <div class="form-group left mb-2">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
                </div>
                <div class="form-group left mb-2">
                    <label for="password">Password</label>
                    <div class="password-input">
                        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" placeholder="Password" required>
                        <span class="password-toggle" @click="passwordVisibility">
                            <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" id="togglePasswordIcon" style="color: #bbb;"></i>
                        </span>
                    </div>
                </div>
                <div class="justify-content-center d-flex mt-3">
                    <button type="submit" class="btn-submit btn btn-dark mt-3">Log In</button>
                </div>
        </form>
            
            
            <div class="justify-content-center d-flex mt-3">
                <p class="text-center">You do not have an account? <router-link to="/">Sing in</router-link></p>
            </div>
        </div>
    </div>
</template>







<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            showPassword: false
        }
    },
    methods: {
        passwordVisibility() {
            this.showPassword = !this.showPassword;
        }
    }
}

</script>