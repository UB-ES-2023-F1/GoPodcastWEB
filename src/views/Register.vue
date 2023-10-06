<template>
    <div class="register">
    <div class="container pt-5 w-50">
        <div class="logo d-flex justify-content-center">
            <img src="../assets/fake-logo.png" alt="logo" :style="{width: '30px', height: '30px'}">
            <h5 class="pt-1 ms-2 fw-bold text-black">GoPodcast</h5>
        </div>
        <h5 id="slogan" class="text-center mt-5 f-italic" style="font-size: 1.8rem;">Podcasts, Play, Repeat!</h5>
        <!-- <div class="border-bottom my-5 col-xl-7 mx-auto border-2"></div> -->
        <p class="text-center mt-5 fw-bold" :style="{fontSize: '1.2rem'}">Sign up to listen to your favorite podcasts</p>
        <form @submit.prevent="submitForm" class="register-form col-xl-7 mx-auto mt-4">
            <!-- <div class="form-group mb-2">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
            </div> -->
            <div class="form-group left mb-2">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
            </div>
            <div class="form-group mb-2">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password">
                <small id="pswHelp" class="opacity-50">The password must be blablabla.</small>
            </div>
            <div class="form-group mb-2">
                <label for="confirmPassword">Confirm password</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm password" required>
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
            confirmPassword: ''
        }
    },
    methods: {
        submitForm() {
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match')
                return
            }
        }
    }
}
</script>


