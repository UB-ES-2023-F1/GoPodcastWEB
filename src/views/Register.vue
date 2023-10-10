<template>
    <div class="register-login">
    <div class="container pt-5 w-50">
        <div class="logo d-flex justify-content-center">
            <router-link to="/GoPodcast" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
            <img src="../assets/logo_white.png" alt="logo" :style="{width: '25px', height: '24px'}">
            <h5 class="ms-2 fw-lighter text-white" style="font-size: 1.3rem;">GoPodcast</h5>
            </router-link>
        </div>
        <h5 id="slogan" class="text-center mt-5 f-italic" style="font-size: 1.8rem;">Podcasts, Play, Repeat!</h5>
        <!-- <div class="border-bottom my-5 col-xl-7 mx-auto border-2"></div> -->
        <p class="text-center mt-5 fw-bold" :style="{fontSize: '1.2rem'}">Sign up to listen to your favorite podcasts</p>
        
        <form @submit.prevent="submitForm" class="register-login-form col-xl-7 mx-auto mt-4">
            <!-- <div class="form-group mb-2">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
            </div> -->
            <div class="form-group left mb-2">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
            </div>
            <div class="form-group left mb-2">
                <label for="password">Password</label>
                <div class="password-input">
                    <input :type="showPassword1 ? 'text' : 'password'" class="form-control" id="password" placeholder="Password" required>
                    <span class="password-toggle" @click="passwordVisibility1">
                        <i class="fas" :class="showPassword1 ? 'fa-eye-slash' : 'fa-eye'" id="togglePasswordIcon1" style="color: #bbb;"></i>
                    </span>
                </div>
                <small id="pswHelp" class="opacity-50">The password must be blablabla.</small>
            </div>
            <div class="form-group left mb-2">
                <label for="confirmPassword">Confirm password</label>
                <div class="password-input">
                    <input :type="showPassword2 ? 'text' : 'password'" class="form-control" id="confirmPassword" placeholder="Confirm password" required>
                    <span class="password-toggle" @click="passwordVisibility2">
                        <i class="fas" :class="showPassword2 ? 'fa-eye-slash' : 'fa-eye'" id="togglePasswordIcon2" style="color: #bbb;"></i>
                    </span>
                </div>
            </div>
            
            <!-- <div class="form-group mb-2">
                <label for="birthdate">Birthdate</label>
                <input type="date" class="form-control" id="birthdate" placeholder="Birthdate" required>
            </div> -->
            
            <div class="justify-content-center d-flex mt-3">
                <button type="submit" class="btn-submit btn btn-dark mt-3">Sign Up</button>
            </div>
        </form>
        <div class="d-flex justify-content-center mt-4">
            <p class="text-center">Already have an account? <router-link to="/login">Log in</router-link></p>
        </div>
    </div>
</div>
</template>

<style>

</style>

<script>
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            showPassword1: false,
            showPassword2: false

        }
    },
    methods: {
        submitForm() {
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match')
                return
            }
        },
        passwordVisibility1() {
            this.showPassword1 = !this.showPassword1;
        },
        passwordVisibility2() {
            this.showPassword2 = !this.showPassword2;
        }
    }
}
</script>


